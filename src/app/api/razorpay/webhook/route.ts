import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('x-razorpay-signature') ?? ''
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET ?? ''

  // CRITICAL: always verify HMAC before processing
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex')
  if (expected !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const event = JSON.parse(body) as {
    event: string
    payload: {
      subscription?: { entity: { id: string; notes?: { user_id?: string; plan_id?: string } } }
      payment?: { entity: { id: string; order_id: string; amount: number; status: string; notes?: { user_id?: string; plan_id?: string } } }
    }
  }

  const supabase = createServiceClient()

  if (event.event === 'payment.captured') {
    const payment = event.payload.payment?.entity
    if (!payment) return NextResponse.json({ received: true })

    const userId = payment.notes?.user_id
    const planId = payment.notes?.plan_id

    if (userId && planId) {
      // Idempotency check — skip if this payment was already processed
      const { data: existing } = await supabase
        .from('payment_events')
        .select('id')
        .eq('gateway_event_id', payment.id)
        .single()

      if (existing) {
        return NextResponse.json({ received: true, skipped: 'already processed' })
      }

      const { data: plan } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', planId)
        .single()

      if (plan) {
        // Deactivate any OTHER active subscriptions (exclude this order).
        await supabase
          .from('subscriptions')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('status', 'active')
          .neq('razorpay_subscription_id', payment.order_id)

        const endsAt = new Date()
        if (plan.interval === 'yearly') {
          endsAt.setFullYear(endsAt.getFullYear() + 1)
        } else {
          endsAt.setMonth(endsAt.getMonth() + 1)
        }

        // Upsert subscription — handles case where handler() already created it
        await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            plan_id: planId,
            status: 'active',
            razorpay_subscription_id: payment.order_id,
            current_period_start: new Date().toISOString(),
            current_period_end: endsAt.toISOString(),
            cancelled_at: null,
          }, { onConflict: 'razorpay_subscription_id' })

        // Log payment event (used as idempotency key above)
        await supabase.from('payment_events').insert({
          user_id: userId,
          gateway: 'razorpay',
          event_type: 'payment.captured',
          amount_inr_paise: payment.amount,
          gateway_event_id: payment.id,
          payload: event.payload,
        })

        await supabase.from('audit_logs').insert({
          actor_id: userId,
          action: 'subscription.activated',
          resource: 'subscription',
          resource_id: planId,
          metadata: { plan_id: planId, payment_id: payment.id, source: 'webhook' },
        })
      }
    }
  }

  if (event.event === 'subscription.cancelled') {
    const sub = event.payload.subscription?.entity
    if (!sub) return NextResponse.json({ received: true })

    await supabase
      .from('subscriptions')
      .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
      .eq('razorpay_subscription_id', sub.id)
  }

  return NextResponse.json({ received: true })
}
