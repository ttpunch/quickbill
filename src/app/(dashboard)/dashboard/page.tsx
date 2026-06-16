import { getInvoices } from '@/modules/invoices/actions'
import { formatInr } from '@/modules/invoices/schema'
import Link from 'next/link'
import InvoiceActions from '@/components/invoice/InvoiceActions'

const statusColors: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  unpaid: 'bg-yellow-50 text-yellow-700',
  overdue: 'bg-red-50 text-red-700',
  draft: 'bg-gray-50 text-gray-600',
}

export default async function DashboardPage() {
  const invoices = await getInvoices()

  const totalEarned = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total_paise, 0)

  const unpaidCount = invoices.filter((inv) => inv.status === 'unpaid').length
  const paidCount = invoices.filter((inv) => inv.status === 'paid').length

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your GST invoices</p>
      </div>

      {/* Stats */}
      {invoices.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total', value: invoices.length.toString() },
            { label: 'Paid', value: paidCount.toString() },
            { label: 'Unpaid', value: unpaidCount.toString() },
            { label: 'Earned', value: formatInr(totalEarned) },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-sm font-medium text-gray-900 mb-1">No invoices yet</h2>
          <p className="text-sm text-gray-400 mb-5">Create your first GST invoice in 60 seconds</p>
          <Link
            href="/dashboard/invoices/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create invoice
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Invoice #</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 hidden sm:table-cell">Date</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">
                    <Link href={`/dashboard/invoices/${invoice.id}`} className="hover:text-indigo-600">
                      {invoice.invoice_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{invoice.client_name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">
                    {new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">
                    {formatInr(invoice.total_paise)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[invoice.status]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
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
