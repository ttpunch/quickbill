import { createClient } from '@/lib/supabase/server'
import { isAdminEmail } from '@/lib/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminNav from './AdminNav'

export const metadata = { title: 'Admin · QuickBill', robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')
  // Non-admins are bounced to their own dashboard — the admin area is invisible to them.
  if (!isAdminEmail(user.email)) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-8">
          <div className="mb-4 flex items-center justify-between">
            <Link href="/admin" className="inline-flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand font-display text-lg leading-none text-cream">Q</span>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">Admin</span>
              <span className="badge bg-gold-soft text-gold">read-only</span>
            </Link>
            <Link href="/dashboard" className="font-mono text-xs text-muted transition-colors hover:text-brand">← back to app</Link>
          </div>
          <AdminNav />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">{children}</main>
    </div>
  )
}
