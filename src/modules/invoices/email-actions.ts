'use server'

import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { InvoiceEmail } from '@/emails/invoice-email'
import { revalidatePath } from 'next/cache'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInvoiceEmail(invoiceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: invoice } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('id', invoiceId)
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .single()

  if (!invoice) return { error: 'Invoice not found' }
  if (!invoice.client_email) return { error: 'Client email not set on this invoice' }

  const { data: userData } = await supabase
    .from('users')
    .select('business_name, upi_id')
    .eq('id', user.id)
    .single()

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'invoices@quikbil.com',
    to: invoice.client_email,
    subject: `Invoice ${invoice.invoice_number} from ${userData?.business_name ?? 'QuickBill'}`,
    react: React.createElement(InvoiceEmail, {
      invoice,
      businessName: userData?.business_name,
      upiId: userData?.upi_id,
    }),
  })

  if (error) return { error: error.message }

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'invoice.email_sent',
    resource: 'invoice',
    resource_id: invoiceId,
    metadata: { to: invoice.client_email },
  })

  return { success: true }
}

export async function sendInvoiceReminder(invoiceId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data: invoice } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('id', invoiceId)
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .single()

  if (!invoice) return { error: 'Invoice not found' }
  if (invoice.status === 'paid') return { error: 'This invoice is already paid' }
  if (!invoice.client_email) return { error: 'Client email not set on this invoice' }

  const { data: userData } = await supabase
    .from('users')
    .select('business_name, upi_id')
    .eq('id', user.id)
    .single()

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'invoices@quikbil.com',
    to: invoice.client_email,
    subject: `Reminder: Invoice ${invoice.invoice_number} from ${userData?.business_name ?? 'QuickBill'}`,
    react: React.createElement(InvoiceEmail, {
      invoice,
      businessName: userData?.business_name,
      upiId: userData?.upi_id,
      reminder: true,
    }),
  })

  if (error) return { error: error.message }

  await supabase
    .from('invoices')
    .update({
      last_reminder_sent_at: new Date().toISOString(),
      reminder_count: (invoice.reminder_count ?? 0) + 1,
    })
    .eq('id', invoiceId)

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'invoice.reminder_sent',
    resource: 'invoice',
    resource_id: invoiceId,
    metadata: { to: invoice.client_email },
  })

  revalidatePath(`/dashboard/invoices/${invoiceId}`)
  return { success: true }
}
