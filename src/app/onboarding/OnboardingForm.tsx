'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from '@/modules/users/actions'

export default function OnboardingForm({ defaultName }: { defaultName: string }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const result = await completeOnboarding(new FormData(e.currentTarget))

    if (result?.error) {
      setError(result.error)
      setSaving(false)
    } else {
      router.replace('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5 p-7">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Business name *</label>
        <input
          name="business_name"
          type="text"
          required
          defaultValue={defaultName}
          placeholder="Sharma Design Studio"
          className="field"
          autoFocus
        />
        <p className="mt-1.5 text-xs text-faint">Shown as the sender on your invoices.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">GST number (GSTIN)</label>
        <input
          name="gst_number"
          type="text"
          maxLength={15}
          placeholder="27AABCU9603R1ZX"
          className="field font-mono uppercase"
        />
        <p className="mt-1.5 text-xs text-faint">Optional. Leave blank if not GST registered.</p>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">UPI ID</label>
        <input
          name="upi_id"
          type="text"
          placeholder="rahul@upi"
          className="field font-mono"
        />
        <p className="mt-1.5 text-xs text-faint">Optional. Printed on invoices so clients can pay you instantly.</p>
      </div>

      {error && (
        <p className="rounded-xl border border-overdue/20 bg-danger-soft px-4 py-2.5 text-sm text-danger">{error}</p>
      )}

      <button type="submit" disabled={saving} className="btn-primary w-full py-3">
        {saving ? 'Setting up…' : 'Start creating invoices →'}
      </button>
    </form>
  )
}
