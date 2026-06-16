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
        <button
          onClick={handleMarkPaid}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Mark as paid
        </button>
      )}

      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="flex items-center gap-2 px-4 py-2 border border-red-100 text-sm font-medium text-red-500 rounded-lg hover:bg-red-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 border border-red-100 rounded-lg bg-red-50">
          <span className="text-sm text-red-600">Delete this invoice?</span>
          <button onClick={handleDelete} className="text-xs px-2 py-1 bg-red-500 text-white rounded font-medium">Yes</button>
          <button onClick={() => setConfirming(false)} className="text-xs px-2 py-1 border border-gray-200 bg-white rounded">No</button>
        </div>
      )}
    </>
  )
}
