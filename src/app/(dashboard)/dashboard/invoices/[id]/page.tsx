import { getInvoice } from '@/modules/invoices/actions'
import { formatInr } from '@/modules/invoices/schema'
import { notFound } from 'next/navigation'
import InvoiceDetailActions from '@/components/invoice/InvoiceDetailActions'
import SendEmailButton from '@/components/invoice/SendEmailButton'

const statusColors: Record<string, string> = {
  paid: 'bg-green-50 text-green-700',
  unpaid: 'bg-yellow-50 text-yellow-700',
  overdue: 'bg-red-50 text-red-700',
  draft: 'bg-gray-50 text-gray-600',
}

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const invoice = await getInvoice(id)
  if (!invoice) notFound()

  const waMessage = encodeURIComponent(
    `Hi ${invoice.client_name}, please find your invoice ${invoice.invoice_number}.\n\nAmount due: ${formatInr(invoice.total_paise)}\n\nThank you!`
  )
  const whatsappUrl = `https://wa.me/?text=${waMessage}`

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-mono">{invoice.invoice_number}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[invoice.status]}`}>
          {invoice.status}
        </span>
      </div>

      {/* Invoice card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden mb-4">
        {/* Client info */}
        <div className="p-5 border-b border-gray-50">
          <p className="text-xs text-gray-500 mb-1">Bill To</p>
          <p className="font-medium text-gray-900">{invoice.client_name}</p>
          {invoice.client_email && <p className="text-sm text-gray-500">{invoice.client_email}</p>}
          {invoice.client_gstin && <p className="text-sm text-gray-400 font-mono">{invoice.client_gstin}</p>}
          {invoice.due_date && (
            <p className="text-xs text-gray-400 mt-2">
              Due: {new Date(invoice.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Line items */}
        <div className="p-5 border-b border-gray-50">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500">
                <th className="text-left pb-2 font-medium">Description</th>
                <th className="text-right pb-2 font-medium">Qty</th>
                <th className="text-right pb-2 font-medium">Rate</th>
                <th className="text-right pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(invoice.invoice_items ?? []).map((item, i) => (
                <tr key={i}>
                  <td className="py-2 text-gray-700">{item.description}</td>
                  <td className="py-2 text-right text-gray-600">{item.quantity}</td>
                  <td className="py-2 text-right text-gray-600">{formatInr(item.rate_paise)}</td>
                  <td className="py-2 text-right font-medium text-gray-900">{formatInr(item.amount_paise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="p-5">
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatInr(invoice.subtotal_paise)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>CGST ({invoice.gst_rate / 2}%)</span>
              <span>{formatInr(invoice.cgst_paise)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>SGST ({invoice.gst_rate / 2}%)</span>
              <span>{formatInr(invoice.sgst_paise)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>{formatInr(invoice.total_paise)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="px-5 pb-5">
            <p className="text-xs text-gray-400 mb-1">Notes</p>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <a
          href={`/api/invoices/${invoice.id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </a>

        <SendEmailButton invoiceId={invoice.id} clientEmail={invoice.client_email} />
        <InvoiceDetailActions invoice={invoice} />
      </div>
    </div>
  )
}
