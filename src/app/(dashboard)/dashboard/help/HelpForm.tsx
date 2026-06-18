'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { submitQuestion } from '@/modules/questions/actions'

export default function HelpForm() {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError(null)

    const result = await submitQuestion(new FormData(e.currentTarget))

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      formRef.current?.reset()
      router.refresh()
      setTimeout(() => setSuccess(false), 4000)
    }
    setSaving(false)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="card space-y-4 p-6">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Subject <span className="font-sans normal-case text-faint">(optional)</span></label>
        <input name="subject" type="text" maxLength={150} placeholder="e.g. How do I change my GSTIN?" className="field" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Your question *</label>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          placeholder="Describe your question or issue in detail…"
          className="field resize-none"
        />
      </div>

      {error && (
        <p className="rounded-xl border border-overdue/20 bg-danger-soft px-4 py-2.5 text-sm text-danger">{error}</p>
      )}
      {success && (
        <p className="rounded-xl border border-brand/15 bg-paid-soft px-4 py-2.5 text-sm text-paid">Thanks — your question has been sent. We&apos;ll get back to you over email.</p>
      )}

      <button type="submit" disabled={saving} className="btn-primary px-6 py-3">
        {saving ? 'Sending…' : 'Send question'}
      </button>
    </form>
  )
}
