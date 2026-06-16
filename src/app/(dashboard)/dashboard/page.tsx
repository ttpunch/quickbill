import { getInvoices } from '@/modules/invoices/actions'
import { formatInr } from '@/modules/invoices/schema'
import Link from 'next/link'
import InvoiceActions from '@/components/invoice/InvoiceActions'

const statusColors: Record<string, string> = {
  paid: 'bg-paid-soft text-paid',
  unpaid: 'bg-unpaid-soft text-unpaid',
  overdue: 'bg-overdue-soft text-overdue',
  draft: 'bg-paper-deep text-muted',
}

export default async function DashboardPage() {
  const invoices = await getInvoices()

  const totalEarned = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total_paise, 0)

  const unpaidCount = invoices.filter((inv) => inv.status === 'unpaid').length
  const paidCount = invoices.filter((inv) => inv.status === 'paid').length

  return (
    <div className="reveal">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <p className="kicker mb-2">Your ledger</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Invoices</h1>
        </div>
        <Link href="/dashboard/invoices/new" className="btn-primary hidden sm:inline-flex">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          New Invoice
        </Link>
      </div>

      {/* Stats */}
      {invoices.length > 0 && (
        <div className="mb-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          {[
            { label: 'Total', value: invoices.length.toString(), accent: false },
            { label: 'Paid', value: paidCount.toString(), accent: false },
            { label: 'Unpaid', value: unpaidCount.toString(), accent: false },
            { label: 'Earned', value: formatInr(totalEarned), accent: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-faint">{stat.label}</p>
              <p className={`mt-1.5 font-display text-2xl font-semibold tabular-nums ${stat.accent ? 'text-brand' : 'text-ink'}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="card flex flex-col items-center justify-center px-6 py-20 text-center">
          <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-soft">
            <svg className="h-8 w-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-semibold text-ink">No invoices yet</h2>
          <p className="mt-1 mb-6 text-sm text-muted">Create your first GST invoice in 60 seconds.</p>
          <Link href="/dashboard/invoices/new" className="btn-primary">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            Create invoice
          </Link>
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-cream/50">
                <th className="px-5 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">Invoice #</th>
                <th className="px-5 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">Client</th>
                <th className="hidden px-5 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint sm:table-cell">Date</th>
                <th className="px-5 py-3 text-right font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">Amount</th>
                <th className="px-5 py-3 text-left font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="transition-colors hover:bg-cream/60">
                  <td className="px-5 py-3.5">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="font-mono text-xs text-muted transition-colors hover:text-brand">
                      {invoice.invoice_number}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-ink">{invoice.client_name}</td>
                  <td className="hidden px-5 py-3.5 text-muted sm:table-cell">
                    {new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium tabular-nums text-ink">
                    {formatInr(invoice.total_paise)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`badge ${statusColors[invoice.status]}`}>{invoice.status}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <InvoiceActions invoice={invoice} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
