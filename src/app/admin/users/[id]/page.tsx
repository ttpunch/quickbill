import { getAdminUserDetail } from '@/modules/admin/actions'
import { formatInr } from '@/modules/invoices/schema'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const invoiceStatusColors: Record<string, string> = {
  paid: 'bg-paid-soft text-paid',
  unpaid: 'bg-unpaid-soft text-unpaid',
  overdue: 'bg-overdue-soft text-overdue',
  draft: 'bg-paper-deep text-muted',
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const detail = await getAdminUserDetail(id)
  if (!detail) notFound()

  const { user, invoices, questions, activity } = detail

  const fields: [string, string | null][] = [
    ['Email', user.email],
    ['Name', user.name],
    ['Business name', user.business_name],
    ['GSTIN', user.gst_number],
    ['UPI ID', user.upi_id],
    ['Invoice count', user.invoice_count.toString()],
    ['Onboarded', user.onboarded_at ? fmtDateTime(user.onboarded_at) : 'No'],
    ['Joined', fmtDateTime(user.created_at)],
    ['Deletion requested', user.deletion_requested_at ? fmtDateTime(user.deletion_requested_at) : '—'],
  ]

  return (
    <div className="reveal">
      <Link href="/admin/users" className="mb-5 inline-flex font-mono text-xs text-faint transition-colors hover:text-brand">← all users</Link>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">{user.business_name || user.name || user.email}</h1>
      <p className="mb-6 font-mono text-xs text-faint">{user.email}</p>

      {/* Profile */}
      <div className="card mb-8 p-6">
        <p className="kicker mb-4">Profile</p>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 border-b border-line/60 pb-2">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-right text-sm font-medium text-ink">{value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Invoices */}
      <p className="kicker mb-4">Invoices ({invoices.length})</p>
      <div className="card mb-8 overflow-x-auto p-0">
        <table className="w-full min-w-[34rem] text-sm">
          <thead>
            <tr className="border-b border-line bg-cream/50 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
              <th className="px-5 py-3">Invoice #</th>
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {invoices.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-6 text-muted">No invoices.</td></tr>
            ) : (
              invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-5 py-3 font-mono text-xs text-muted">{inv.invoice_number}</td>
                  <td className="px-5 py-3 text-ink">{inv.client_name}</td>
                  <td className="px-5 py-3 text-right font-mono tabular-nums text-ink">{formatInr(inv.total_paise)}</td>
                  <td className="px-5 py-3"><span className={`badge ${invoiceStatusColors[inv.status] ?? ''}`}>{inv.status}</span></td>
                  <td className="px-5 py-3 text-muted">{new Date(inv.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Questions */}
      <p className="kicker mb-4">Questions ({questions.length})</p>
      <div className="card mb-8 divide-y divide-line p-0">
        {questions.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted">No questions submitted.</p>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="px-5 py-4">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="font-medium text-ink">{q.subject || 'Question'}</p>
                <span className="badge bg-paper-deep text-muted">{q.status}</span>
              </div>
              <p className="text-sm text-muted">{q.message}</p>
              <p className="mt-2 font-mono text-xs text-faint">{fmtDateTime(q.created_at)}</p>
            </div>
          ))
        )}
      </div>

      {/* Activity */}
      <p className="kicker mb-4">Activity ({activity.length})</p>
      <div className="card divide-y divide-line p-0">
        {activity.length === 0 ? (
          <p className="px-5 py-6 text-sm text-muted">No recorded activity.</p>
        ) : (
          activity.map((a) => (
            <div key={a.id} className="flex items-center justify-between gap-4 px-5 py-3">
              <div>
                <p className="font-mono text-sm text-ink">{a.action}</p>
                <p className="font-mono text-xs text-faint">{a.resource}{a.resource_id ? ` · ${a.resource_id.slice(0, 8)}` : ''}</p>
              </div>
              <p className="shrink-0 font-mono text-xs text-faint">{fmtDateTime(a.created_at)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
