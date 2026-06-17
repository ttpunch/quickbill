import { getInvoice } from '@/modules/invoices/actions'
import { formatInr } from '@/modules/invoices/schema'
import { notFound } from 'next/navigation'
import InvoiceDetailActions from '@/components/invoice/InvoiceDetailActions'
import SendEmailButton from '@/components/invoice/SendEmailButton'
import SendReminderButton from '@/components/invoice/SendReminderButton'

const statusColors: Record<string, string> = {
  paid: 'bg-paid-soft text-paid',
  unpaid: 'bg-unpaid-soft text-unpaid',
  overdue: 'bg-overdue-soft text-overdue',
  draft: 'bg-paper-deep text-muted',
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
    <div className="reveal max-w-2xl">
      <a href="/dashboard" className="mb-5 inline-flex items-center gap-1.5 font-mono text-xs text-faint transition-colors hover:text-brand">
        ← back to ledger
      </a>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-mono text-2xl font-semibold tracking-tight text-ink">{invoice.invoice_number}</h1>
          <p className="mt-1 text-sm text-muted">
            {new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <span className={`badge ${statusColors[invoice.status]}`}>{invoice.status}</span>
      </div>

      {/* Invoice card */}
      <div className="card mb-5 overflow-hidden p-0">
        {/* Client info */}
        <div className="border-b border-line p-6">
          <p className="kicker mb-1.5">Bill to</p>
          <p className="font-display text-lg font-semibold text-ink">{invoice.client_name}</p>
          {invoice.client_email && <p className="text-sm text-muted">{invoice.client_email}</p>}
          {invoice.client_gstin && <p className="font-mono text-sm text-faint">{invoice.client_gstin}</p>}
          {invoice.due_date && (
            <p className="mt-2 font-mono text-xs text-faint">
              Due {new Date(invoice.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>

        {/* Line items */}
        <div className="border-b border-line p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
                <th className="pb-2 text-left font-normal">Description</th>
                <th className="pb-2 text-right font-normal">Qty</th>
                <th className="pb-2 text-right font-normal">Rate</th>
                <th className="pb-2 text-right font-normal">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(invoice.invoice_items ?? []).map((item, i) => (
                <tr key={i}>
                  <td className="py-2.5 text-ink">{item.description}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums text-muted">{item.quantity}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums text-muted">{formatInr(item.rate_paise)}</td>
                  <td className="py-2.5 text-right font-mono font-medium tabular-nums text-ink">{formatInr(item.amount_paise)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="bg-cream/40 p-6">
          <div className="ml-auto max-w-xs space-y-1.5 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-ink">{formatInr(invoice.subtotal_paise)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>CGST ({invoice.gst_rate / 2}%)</span>
              <span className="font-mono tabular-nums">{formatInr(invoice.cgst_paise)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>SGST ({invoice.gst_rate / 2}%)</span>
              <span className="font-mono tabular-nums">{formatInr(invoice.sgst_paise)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-display text-base font-semibold text-ink">Total</span>
              <span className="font-mono text-lg font-semibold tabular-nums text-brand">{formatInr(invoice.total_paise)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="border-t border-line px-6 py-5">
            <p className="kicker mb-1">Notes</p>
            <p className="text-sm text-muted">{invoice.notes}</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={`/api/invoices/${invoice.id}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
        >
          <svg className="h-4 w-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </a>

        <SendEmailButton invoiceId={invoice.id} clientEmail={invoice.client_email} />
        {invoice.status !== 'paid' && (
          <SendReminderButton
            invoiceId={invoice.id}
            clientEmail={invoice.client_email}
            lastSentAt={invoice.last_reminder_sent_at ?? null}
          />
        )}
        <InvoiceDetailActions invoice={invoice} />
      </div>
    </div>
  )
}
