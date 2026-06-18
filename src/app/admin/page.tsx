import { getAdminOverview } from '@/modules/admin/actions'
import Link from 'next/link'

export default async function AdminOverviewPage() {
  const overview = await getAdminOverview()
  if (!overview) return <p className="text-sm text-muted">Unable to load admin data.</p>

  const stats = [
    { label: 'Total users', value: overview.totalUsers.toString() },
    { label: 'Onboarded', value: overview.onboardedUsers.toString() },
    { label: 'Pro subscribers', value: overview.proUsers.toString(), accent: true },
    { label: 'Invoices created', value: overview.totalInvoices.toString() },
    { label: 'Open questions', value: overview.openQuestions.toString() },
  ]

  return (
    <div className="reveal">
      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight text-ink">Overview</h1>

      <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="bg-surface px-5 py-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">{s.label}</p>
            <p className={`mt-1.5 font-display text-2xl font-semibold tabular-nums ${s.accent ? 'text-brand' : 'text-ink'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="kicker">Newest sign-ups</p>
        <Link href="/admin/users" className="font-mono text-xs text-brand hover:underline">all users →</Link>
      </div>
      <div className="mt-4 card divide-y divide-line p-0">
        {overview.recentUsers.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted">No users yet.</p>
        ) : (
          overview.recentUsers.map((u) => (
            <Link key={u.id} href={`/admin/users/${u.id}`} className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-cream/60">
              <div>
                <p className="font-medium text-ink">{u.business_name || u.email}</p>
                <p className="font-mono text-xs text-faint">{u.email}</p>
              </div>
              <p className="font-mono text-xs text-faint">
                {new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
