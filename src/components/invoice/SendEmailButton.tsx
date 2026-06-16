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
        className="btn-ghost disabled:opacity-50"
      >
        {status === 'sent' ? (
          <>
            <svg className="h-4 w-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Email sent
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {status === 'sending' ? 'Sending…' : 'Email to client'}
          </>
        )}
      </button>
      {status === 'error' && <p className="mt-1 text-xs text-danger">{errorMsg}</p>}
    </div>
  )
}
