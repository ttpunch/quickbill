'use client'

import { useState } from 'react'
import { sendInvoiceEmail } from '@/modules/invoices/email-actions'

export default function SendEmailButton({ invoiceId, clientEmail }: { invoiceId: string; clientEmail: string | null }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (!clientEmail) return null

  async function handleSend() {
    setStatus('sending')
    const result = await sendInvoiceEmail(invoiceId)
    if (result?.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  return (
    <div>
      <button
        onClick={handleSend}
        disabled={status === 'sending' || status === 'sent'}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
      >
        {status === 'sent' ? (
          <>
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Email Sent
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {status === 'sending' ? 'Sending…' : 'Email to Client'}
          </>
        )}
      </button>
      {status === 'error' && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
    </div>
  )
}
