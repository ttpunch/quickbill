'use client'

import { useState } from 'react'
import { sendInvoiceReminder } from '@/modules/invoices/email-actions'

export default function SendReminderButton({
  invoiceId,
  clientEmail,
  lastSentAt,
}: {
  invoiceId: string
  clientEmail: string | null
  lastSentAt: string | null
}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  if (!clientEmail) return null

  async function handleSend() {
    setStatus('sending')
    const result = await sendInvoiceReminder(invoiceId)
    if (result?.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('sent')
    }
  }

  const lastSentLabel = lastSentAt
    ? `Last reminded ${new Date(lastSentAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
    : null

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
            Reminder sent
          </>
        ) : (
          <>
            <svg className="h-4 w-4 text-unpaid" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {status === 'sending' ? 'Sending…' : 'Send reminder'}
          </>
        )}
      </button>
      {status !== 'sent' && lastSentLabel && (
        <p className="mt-1 font-mono text-xs text-faint">{lastSentLabel}</p>
      )}
      {status === 'error' && <p className="mt-1 text-xs text-danger">{errorMsg}</p>}
    </div>
  )
}
