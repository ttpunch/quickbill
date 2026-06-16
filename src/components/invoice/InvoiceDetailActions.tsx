'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { markInvoicePaid, deleteInvoice } from '@/modules/invoices/actions'
import type { Invoice } from '@/types'

export default function InvoiceDetailActions({ invoice }: { invoice: Invoice }) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)

  async function handleMarkPaid() {
    await markInvoicePaid(invoice.id)
    router.refresh()
  }

  async function handleDelete() {
    await deleteInvoice(invoice.id)
    router.push('/dashboard')
  }

  return (
    <>
      {invoice.status !== 'paid' && (
        <button onClick={handleMarkPaid} className="btn-ghost">
          <svg className="h-4 w-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Mark as paid
        </button>
      )}

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="inline-flex items-center gap-2 rounded-full border border-danger/25 px-5 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-danger-soft"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      ) : (
        <div className="flex items-center gap-2 rounded-full border border-danger/25 bg-danger-soft px-4 py-2">
          <span className="text-sm text-danger">Delete this invoice?</span>
          <button onClick={handleDelete} className="rounded-full bg-danger px-3 py-1 text-xs font-semibold text-cream">Yes</button>
          <button onClick={() => setConfirming(false)} className="rounded-full border border-line-strong bg-surface px-3 py-1 text-xs">No</button>
        </div>
      )}
    </>
  )
}
