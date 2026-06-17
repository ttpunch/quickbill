'use server'

import { createClient } from '@/lib/supabase/server'
import { createInvoiceSchema, calcGst } from './schema'
import type { CreateInvoiceInput } from './schema'
import type { Invoice } from '@/types'
import { saveClientFromInvoice } from '@/modules/clients/actions'
import { revalidatePath } from 'next/cache'

async function getAuthUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return { supabase, user }
}

export async function getInvoices(): Promise<Invoice[]> {
  const { supabase, user } = await getAuthUser()

  const { data, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Invoice[]
}

export async function getInvoice(id: string): Promise<Invoice | null> {
  const { supabase, user } = await getAuthUser()

  const { data, error } = await supabase
    .from('invoices')
    .select('*, invoice_items(*)')
    .eq('id', id)
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .single()

  if (error) return null
  return data as Invoice
}

export async function createInvoice(input: CreateInvoiceInput): Promise<{ id: string } | { error: string }> {
  const parsed = createInvoiceSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { supabase, user } = await getAuthUser()

  // Check free plan limit
  const { data: userData } = await supabase
    .from('users')
    .select('invoice_count')
    .eq('id', user.id)
    .single()

  const { data: subData } = await supabase
    .from('subscriptions')
    .select('plan_id, subscription_plans(invoice_limit)')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  const invoiceLimit = (subData as unknown as { subscription_plans: { invoice_limit: number | null } } | null)
    ?.subscription_plans?.invoice_limit ?? 5

  const invoiceCount = userData?.invoice_count ?? 0
  if (invoiceLimit !== null && invoiceCount >= invoiceLimit) {
    return { error: 'Free plan limit reached. Upgrade to Pro for unlimited invoices.' }
  }

  // Calculate totals (all in paise)
  const subtotalPaise = parsed.data.items.reduce((sum, item) => {
    return sum + Math.round(item.quantity * item.rate_paise)
  }, 0)

  const { cgst, sgst, total } = calcGst(subtotalPaise, parsed.data.gst_rate)

  // Generate invoice number
  const year = new Date().getFullYear()
  const invoiceNumber = `INV-${year}-${String(invoiceCount + 1).padStart(3, '0')}`

  // Insert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      user_id: user.id,
      invoice_number: invoiceNumber,
      client_name: parsed.data.client_name,
      client_email: parsed.data.client_email || null,
      client_gstin: parsed.data.client_gstin || null,
      status: 'unpaid',
      subtotal_paise: subtotalPaise,
      gst_rate: parsed.data.gst_rate,
      cgst_paise: cgst,
      sgst_paise: sgst,
      total_paise: total,
      due_date: parsed.data.due_date || null,
      notes: parsed.data.notes || null,
    })
    .select('id')
    .single()

  if (invoiceError || !invoice) return { error: invoiceError?.message ?? 'Failed to create invoice' }

  // Insert line items
  const items = parsed.data.items.map((item) => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    rate_paise: item.rate_paise,
    amount_paise: Math.round(item.quantity * item.rate_paise),
  }))

  await supabase.from('invoice_items').insert(items)

  // Increment invoice count
  await supabase
    .from('users')
    .update({ invoice_count: invoiceCount + 1 })
    .eq('id', user.id)

  // Save / refresh this client for next time
  await saveClientFromInvoice({
    name: parsed.data.client_name,
    email: parsed.data.client_email,
    gstin: parsed.data.client_gstin,
  })

  // Log to audit_logs
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'invoice.created',
    resource: 'invoice',
    resource_id: invoice.id,
  })

  revalidatePath('/dashboard')
  return { id: invoice.id }
}

export async function markInvoicePaid(id: string): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()

  const { error } = await supabase
    .from('invoices')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'invoice.marked_paid',
    resource: 'invoice',
    resource_id: id,
  })

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/invoices/${id}`)
  return {}
}

export async function deleteInvoice(id: string): Promise<{ error?: string }> {
  const { supabase, user } = await getAuthUser()

  const { error } = await supabase
    .from('invoices')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'invoice.deleted',
    resource: 'invoice',
    resource_id: id,
  })

  revalidatePath('/dashboard')
  return {}
}
