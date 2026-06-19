import { getAdminActivity } from '@/modules/admin/actions'
import Link from 'next/link'

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AdminActivityPage() {
  const activity = await getAdminActivity(150)

  return (
    <div className="reveal">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Activity</h1>
        <p className="font-mono text-xs text-faint">last {activity.length} events</p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[42rem] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream/50 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
              <th className="px-5 py-3">Action</th>
              <th className="px-5 py-3">Resource</th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {activity.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-6 text-muted">No activity recorded.</td></tr>
            ) : (
              activity.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-cream/60">
                  <td className="px-5 py-3 font-mono text-xs text-ink">{a.action}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted">{a.resource}{a.resource_id ? ` · ${a.resource_id.slice(0, 8)}` : ''}</td>
                  <td className="px-5 py-3 text-muted">
                    {a.actor ? (
                      <span title={a.actor.email}>{a.actor.business_name || a.actor.email}</span>
                    ) : '—'}
                  </td>
                  <td className="px-5 py-3 font-mono text-xs text-faint">{fmtDateTime(a.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-faint">
        Activity is sourced from the <span className="font-mono">audit_logs</span> table. Drill into a single user from{' '}
        <Link href="/admin/users" className="text-brand hover:underline">Users</Link>.
      </p>
    </div>
  )
}
