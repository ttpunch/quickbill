import { createServiceClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { InvoiceEmail } from '@/emails/invoice-email'
import { NextResponse } from 'next/server'
import React from 'react'
import type { Invoice } from '@/types'

export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

// Days an invoice must be overdue / idle before the first reminder, and the
// minimum gap between reminders so clients aren't spammed.
const REMINDER_GAP_DAYS = 3
const MAX_REMINDERS = 4

// Triggered daily by Vercel Cron (see vercel.ts). Emails a payment reminder for
// unpaid invoices that are past due (or 3+ days old) and haven't been reminded
// in the last 3 days. Guarded by CRON_SECRET like the keepalive route.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: { code: 'unauthorized', message: 'Invalid cron secret', request_id: crypto.randomUUID() } },
      { status: 401 },
    )
  }

  const supabase = createServiceClient()
  const now = Date.now()
  const gapMs = REMINDER_GAP_DAYS * 24 * 60 * 60 * 1000
  const cutoffIso = new Date(now - gapMs).toISOString()

  // Candidate invoices: unpaid, not deleted, have a client email, under the cap.
  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('status', 'unpaid')
    .is('deleted_at', null)
    .not('client_email', 'is', null)
    .lt('reminder_count', MAX_REMINDERS)

  if (error) {
    return NextResponse.json(
      { error: { code: 'reminders_query_failed', message: error.message, request_id: crypto.randomUUID() } },
      { status: 500 },
    )
  }

  let sent = 0
  let skipped = 0

  for (const invoice of (invoices ?? []) as Invoice[]) {
    // Respect the gap since the last reminder.
    if (invoice.last_reminder_sent_at && new Date(invoice.last_reminder_sent_at).toISOString() > cutoffIso) {
      skipped++
      continue
    }

    // Only chase invoices that are past due, or 3+ days old if no due date set.
    const dueBasis = invoice.due_date
      ? new Date(invoice.due_date).getTime()
      : new Date(invoice.created_at).getTime() + gapMs
    if (now < dueBasis) {
      skipped++
      continue
    }

    const { data: userData } = await supabase
      .from('users')
      .select('business_name, upi_id')
      .eq('id', invoice.user_id)
      .single()

    const { error: sendError } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'invoices@quikbil.com',
      to: invoice.client_email as string,
      subject: `Reminder: Invoice ${invoice.invoice_number} from ${userData?.business_name ?? 'QuickBill'}`,
      react: React.createElement(InvoiceEmail, {
        invoice,
        businessName: userData?.business_name,
        upiId: userData?.upi_id,
        reminder: true,
      }),
    })

    if (sendError) {
      skipped++
      continue
    }

    await supabase
      .from('invoices')
      .update({
        last_reminder_sent_at: new Date().toISOString(),
        reminder_count: (invoice.reminder_count ?? 0) + 1,
      })
      .eq('id', invoice.id)

    sent++
  }

  return NextResponse.json({ ok: true, sent, skipped, ranAt: new Date().toISOString() })
}
