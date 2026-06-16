import { createClient } from '@/lib/supabase/server'
import { ReceiptPDF, type ReceiptData } from '@/lib/pdf/receipt-template'
import { renderToBuffer } from '@react-pdf/renderer'
import { NextResponse } from 'next/server'
import React from 'react'
import type { DocumentProps } from '@react-pdf/renderer'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: payment } = await supabase
    .from('payment_events')
    .select('id, amount_inr_paise, gateway_event_id, created_at')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!payment) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Resolve the plan name from the amount paid.
  const { data: plan } = await supabase
    .from('subscription_plans')
    .select('name')
    .eq('price_inr_paise', payment.amount_inr_paise)
    .maybeSingle()

  const { data: userData } = await supabase
    .from('users')
    .select('name, business_name')
    .eq('id', user.id)
    .single()

  const date = new Date(payment.created_at)

  const receipt: ReceiptData = {
    receiptNumber: `RCPT-${date.getFullYear()}-${payment.id.slice(0, 8).toUpperCase()}`,
    date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    planName: plan?.name ?? 'Pro',
    totalPaise: payment.amount_inr_paise,
    paymentId: payment.gateway_event_id ?? '—',
    customerEmail: user.email ?? '',
    customerName: userData?.name,
    customerBusiness: userData?.business_name,
  }

  const element = React.createElement(ReceiptPDF, { receipt }) as unknown as React.ReactElement<DocumentProps>
  const buffer = await renderToBuffer(element)
  const uint8 = new Uint8Array(buffer)

  return new NextResponse(uint8, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${receipt.receiptNumber}.pdf"`,
    },
  })
}
