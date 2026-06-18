'use server'

import { createClient, createServiceClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'

/**
 * Confirms the current session belongs to an allowlisted admin.
 * Returns the service-role client (bypasses RLS) only when authorised.
 * Every admin read goes through this guard.
 */
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || !isAdminEmail(user.email)) return null
  return createServiceClient()
}

export interface AdminUserRow {
  id: string
  email: string
  name: string | null
  business_name: string | null
  gst_number: string | null
  upi_id: string | null
  invoice_count: number
  onboarded_at: string | null
  created_at: string
  deleted_at: string | null
  deletion_requested_at: string | null
}

export interface AdminOverview {
  totalUsers: number
  onboardedUsers: number
  proUsers: number
  totalInvoices: number
  openQuestions: number
  recentUsers: { id: string; email: string; business_name: string | null; created_at: string }[]
}

export interface AdminActivityRow {
  id: string
  action: string
  resource: string
  resource_id: string | null
  created_at: string
  metadata: Record<string, unknown> | null
  actor: { email: string; business_name: string | null } | null
}

export interface AdminQuestionRow {
  id: string
  subject: string | null
  message: string
  status: 'open' | 'answered' | 'closed'
  created_at: string
  user: { id: string; email: string; business_name: string | null } | null
}

export async function getAdminOverview(): Promise<AdminOverview | null> {
  const db = await requireAdmin()
  if (!db) return null

  const now = new Date().toISOString()

  const [
    { count: totalUsers },
    { count: onboardedUsers },
    { count: proUsers },
    { count: totalInvoices },
    { count: openQuestions },
    { data: recentUsers },
  ] = await Promise.all([
    db.from('users').select('id', { count: 'exact', head: true }).is('deleted_at', null),
    db.from('users').select('id', { count: 'exact', head: true }).not('onboarded_at', 'is', null),
    db.from('subscriptions').select('id', { count: 'exact', head: true }).eq('status', 'active').gt('current_period_end', now),
    db.from('invoices').select('id', { count: 'exact', head: true }).is('deleted_at', null),
    db.from('questions').select('id', { count: 'exact', head: true }).eq('status', 'open'),
    db.from('users').select('id, email, business_name, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  return {
    totalUsers: totalUsers ?? 0,
    onboardedUsers: onboardedUsers ?? 0,
    proUsers: proUsers ?? 0,
    totalInvoices: totalInvoices ?? 0,
    openQuestions: openQuestions ?? 0,
    recentUsers: (recentUsers ?? []) as AdminOverview['recentUsers'],
  }
}

export async function getAdminUsers(): Promise<AdminUserRow[]> {
  const db = await requireAdmin()
  if (!db) return []

  const { data } = await db
    .from('users')
    .select('id, email, name, business_name, gst_number, upi_id, invoice_count, onboarded_at, created_at, deleted_at, deletion_requested_at')
    .order('created_at', { ascending: false })

  return (data ?? []) as AdminUserRow[]
}

export interface AdminUserDetail {
  user: AdminUserRow
  invoices: { id: string; invoice_number: string; client_name: string; status: string; total_paise: number; created_at: string }[]
  questions: AdminQuestionRow[]
  activity: AdminActivityRow[]
}

export async function getAdminUserDetail(userId: string): Promise<AdminUserDetail | null> {
  const db = await requireAdmin()
  if (!db) return null

  const { data: user } = await db
    .from('users')
    .select('id, email, name, business_name, gst_number, upi_id, invoice_count, onboarded_at, created_at, deleted_at, deletion_requested_at')
    .eq('id', userId)
    .single()

  if (!user) return null

  const [{ data: invoices }, { data: questions }, { data: activity }] = await Promise.all([
    db.from('invoices').select('id, invoice_number, client_name, status, total_paise, created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(50),
    db.from('questions').select('id, subject, message, status, created_at, user:user_id(id, email, business_name)').eq('user_id', userId).order('created_at', { ascending: false }),
    db.from('audit_logs').select('id, action, resource, resource_id, created_at, metadata, actor:actor_id(email, business_name)').eq('actor_id', userId).order('created_at', { ascending: false }).limit(50),
  ])

  return {
    user: user as AdminUserRow,
    invoices: (invoices ?? []) as AdminUserDetail['invoices'],
    questions: (questions ?? []) as unknown as AdminQuestionRow[],
    activity: (activity ?? []) as unknown as AdminActivityRow[],
  }
}

export async function getAdminActivity(limit = 100): Promise<AdminActivityRow[]> {
  const db = await requireAdmin()
  if (!db) return []

  const { data } = await db
    .from('audit_logs')
    .select('id, action, resource, resource_id, created_at, metadata, actor:actor_id(email, business_name)')
    .order('created_at', { ascending: false })
    .limit(limit)

  return (data ?? []) as unknown as AdminActivityRow[]
}

export async function getAdminQuestions(): Promise<AdminQuestionRow[]> {
  const db = await requireAdmin()
  if (!db) return []

  const { data } = await db
    .from('questions')
    .select('id, subject, message, status, created_at, user:user_id(id, email, business_name)')
    .order('created_at', { ascending: false })

  return (data ?? []) as unknown as AdminQuestionRow[]
}
