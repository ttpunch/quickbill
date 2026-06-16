'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export async function ensureUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single()

  if (!existing) {
    await supabase.from('users').insert({
      id: user.id,
      email: user.email ?? '',
      invoice_count: 0,
    })
  }
}

export async function getUserProfile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

const profileSchema = z.object({
  name: z.string().max(100).optional(),
  business_name: z.string().max(200).optional(),
  gst_number: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format').optional().or(z.literal('')),
  upi_id: z.string().max(100).optional(),
})

export async function updateUserProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const parsed = profileSchema.safeParse({
    name: formData.get('name') || undefined,
    business_name: formData.get('business_name') || undefined,
    gst_number: formData.get('gst_number') || '',
    upi_id: formData.get('upi_id') || undefined,
  })

  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const updates: Record<string, unknown> = {}
  if (parsed.data.name !== undefined) updates.name = parsed.data.name
  if (parsed.data.business_name !== undefined) updates.business_name = parsed.data.business_name
  if (parsed.data.gst_number !== undefined) updates.gst_number = parsed.data.gst_number || null
  if (parsed.data.upi_id !== undefined) updates.upi_id = parsed.data.upi_id

  const { error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', user.id)

  if (error) return { error: error.message }

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'profile.update',
    resource: 'user',
    resource_id: user.id,
    metadata: updates,
  })

  revalidatePath('/dashboard/settings')
  return { success: true }
}
