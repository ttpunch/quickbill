import { getAdminUsers } from '@/modules/admin/actions'
import Link from 'next/link'

export default async function AdminUsersPage() {
  const users = await getAdminUsers()

  return (
    <div className="reveal">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Users</h1>
        <p className="font-mono text-xs text-faint">{users.length} total</p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full min-w-[44rem] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream/50 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
              <th className="px-5 py-3">Business / email</th>
              <th className="px-5 py-3">GSTIN</th>
              <th className="px-5 py-3 text-right">Invoices</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-6 text-muted">No users yet.</td></tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-cream/60">
                  <td className="px-5 py-3.5">
                    <Link href={`/admin/users/${u.id}`} className="font-medium text-ink transition-colors hover:text-brand">
                      {u.business_name || u.name || '—'}
                    </Link>
                    <p className="font-mono text-xs text-faint">{u.email}</p>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-muted">{u.gst_number || '—'}</td>
                  <td className="px-5 py-3.5 text-right font-mono tabular-nums text-ink">{u.invoice_count}</td>
                  <td className="px-5 py-3.5 text-muted">
                    {new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5">
                    {u.deleted_at ? (
                      <span className="badge bg-danger-soft text-danger">deleted</span>
                    ) : u.deletion_requested_at ? (
                      <span className="badge bg-unpaid-soft text-unpaid">deletion req.</span>
                    ) : u.onboarded_at ? (
                      <span className="badge bg-paid-soft text-paid">active</span>
                    ) : (
                      <span className="badge bg-paper-deep text-muted">pending</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
