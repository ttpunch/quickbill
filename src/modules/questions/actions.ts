'use server'

import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

export interface Question {
  id: string
  user_id: string
  subject: string | null
  message: string
  status: 'open' | 'answered' | 'closed'
  created_at: string
  updated_at: string
}

const questionSchema = z.object({
  subject: z.string().trim().max(150).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Please describe your question (at least 5 characters).').max(2000),
})

export async function submitQuestion(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const parsed = questionSchema.safeParse({
    subject: formData.get('subject') ?? '',
    message: formData.get('message') ?? '',
  })

  if (!parsed.success) return { error: parsed.error.issues[0].message }

  const { error } = await supabase.from('questions').insert({
    user_id: user.id,
    subject: parsed.data.subject || null,
    message: parsed.data.message,
  })

  if (error) return { error: error.message }

  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'question.submitted',
    resource: 'question',
    resource_id: user.id,
    metadata: { subject: parsed.data.subject || null },
  })

  revalidatePath('/dashboard/help')
  return { success: true }
}

export async function getMyQuestions(): Promise<Question[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data ?? []) as Question[]
}
