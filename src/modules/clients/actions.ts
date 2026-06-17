'use server'

import { createClient } from '@/lib/supabase/server'

export interface Client {
  id: string
  name: string
  email: string | null
  gstin: string | null
}

export async function getClients(): Promise<Client[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from('clients')
    .select('id, name, email, gstin')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('name', { ascending: true })

  return data ?? []
}

// Auto-save the client used on an invoice so it's available next time.
// Upserts on (user_id, lower(name)) — updates email/gstin if they changed.
export async function saveClientFromInvoice(args: {
  name: string
  email?: string | null
  gstin?: string | null
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const name = args.name.trim()
  if (!name) return

  const { data: existing } = await supabase
    .from('clients')
    .select('id')
    .eq('user_id', user.id)
    .ilike('name', name)
    .is('deleted_at', null)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('clients')
      .update({
        email: args.email || null,
        gstin: args.gstin || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
  } else {
    await supabase.from('clients').insert({
      user_id: user.id,
      name,
      email: args.email || null,
      gstin: args.gstin || null,
    })
  }
}
