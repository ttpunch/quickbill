'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { isRazorpayTestMode } from '@/lib/razorpay-mode'
import Razorpay from 'razorpay'

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    throw new Error('Razorpay keys not configured')
  }
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

export async function getUserSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Active AND not yet expired — auto-downgrades once the period ends,
  // no cron required. An expired row simply stops counting as Pro.
  const { data } = await supabase
    .from('subscriptions')
    .select('*, subscription_plans(*)')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())
    .order('current_period_end', { ascending: false })
    .limit(1)
    .maybeSingle()

  return data
}

export async function cancelSubscription() {
  const supabase = await createClient()
  const adminSupabase = createServiceClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Cancel at period end — user keeps Pro until current_period_end,
  // then getUserSubscription stops returning it.
  const { error } = await adminSupabase
    .from('subscriptions')
    .update({ cancel_at_period_end: true, cancelled_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())

  if (error) return { error: error.message }

  await adminSupabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'subscription.cancel_scheduled',
    resource: 'subscription',
    resource_id: user.id,
  })

  revalidatePath('/dashboard/billing')
  return { success: true }
}

export async function resumeSubscription() {
  const supabase = await createClient()
  const adminSupabase = createServiceClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await adminSupabase
    .from('subscriptions')
    .update({ cancel_at_period_end: false, cancelled_at: null })
    .eq('user_id', user.id)
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString())

  if (error) return { error: error.message }

  await adminSupabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'subscription.resumed',
    resource: 'subscription',
    resource_id: user.id,
  })

  revalidatePath('/dashboard/billing')
  return { success: true }
}

export async function getBillingHistory() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('payment_events')
    .select('id, event_type, amount_inr_paise, gateway, gateway_event_id, created_at')
    .eq('user_id', user.id)
    .eq('event_type', 'payment.captured')
    .order('created_at', { ascending: false })

  if (error) return []
  return data ?? []
}

export async function getPlans() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('subscription_plans')
    .select('*')
    .order('price_inr_paise', { ascending: true })
  return data ?? []
}

export async function createSubscriptionOrder(planId: string) {
  // Beta: payments stay disabled while Razorpay is in test mode. This guard
  // lifts automatically once live keys are configured (isRazorpayTestMode).
  if (isRazorpayTestMode) {
    return { error: 'Pro plans are launching soon — payments aren’t live yet.' }
  }
  if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    return { error: 'Payments are not configured yet. Please contact support.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: plan } = await supabase
    .from('subscription_plans')
    .select('*')
    .eq('id', planId)
    .single()

  if (!plan) return { error: 'Plan not found' }

  let order: { id: string }
  try {
    const razorpay = getRazorpay()
    order = await razorpay.orders.create({
      amount: plan.price_inr_paise,
      currency: 'INR',
      receipt: `sub_${user.id.slice(0, 8)}_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan_id: planId,
      },
    }) as { id: string }
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'error' in err) {
      const rzpErr = err as { error: { description?: string } }
      return { error: rzpErr.error.description ?? 'Payment gateway error' }
    }
    const msg = err instanceof Error ? err.message : String(err)
    return { error: `Payment gateway error: ${msg}` }
  }

  return { orderId: order.id, amount: plan.price_inr_paise, planName: plan.name, planId }
}

export async function activateSubscriptionAfterPayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  planId,
}: {
  razorpayOrderId: string
  razorpayPaymentId: string
  razorpaySignature: string
  planId: string
}) {
  // Beta guard — refuse to activate Pro while in test mode, even if a request
  // reaches here directly (e.g. with Razorpay test cards).
  if (isRazorpayTestMode) {
    return { error: 'Pro plans are launching soon — payments aren’t live yet.' }
  }

  const supabase = await createClient()
  const adminSupabase = createServiceClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Verify signature server-side
  const crypto = await import('crypto')
  const body = `${razorpayOrderId}|${razorpayPaymentId}`
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET ?? '')
    .update(body)
    .digest('hex')

  if (expectedSig !== razorpaySignature) return { error: 'Invalid payment signature' }

  const { data: plan } = await adminSupabase
    .from('subscription_plans')
    .select('*')
    .eq('id', planId)
    .single()

  if (!plan) return { error: 'Plan not found' }

  // Deactivate any OTHER active subscriptions (exclude this order to avoid
  // cancelling the row we are about to create, even under a webhook race).
  await adminSupabase
    .from('subscriptions')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('status', 'active')
    .neq('razorpay_subscription_id', razorpayOrderId)

  const endsAt = new Date()
  if (plan.interval === 'yearly') {
    endsAt.setFullYear(endsAt.getFullYear() + 1)
  } else {
    endsAt.setMonth(endsAt.getMonth() + 1)
  }

  // Upsert on the unique razorpay_subscription_id so handler + webhook converge
  // on a single active row instead of fighting each other.
  await adminSupabase.from('subscriptions').upsert({
    user_id: user.id,
    plan_id: planId,
    status: 'active',
    razorpay_subscription_id: razorpayOrderId,
    current_period_start: new Date().toISOString(),
    current_period_end: endsAt.toISOString(),
    cancelled_at: null,
  }, { onConflict: 'razorpay_subscription_id' })

  await adminSupabase.from('payment_events').insert({
    user_id: user.id,
    gateway: 'razorpay',
    event_type: 'payment.captured',
    amount_inr_paise: plan.price_inr_paise,
    gateway_event_id: razorpayPaymentId,
    payload: { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
  })

  await adminSupabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'subscription.activated',
    resource: 'subscription',
    resource_id: planId,
    metadata: { plan_id: planId, payment_id: razorpayPaymentId },
  })

  return { success: true }
}
