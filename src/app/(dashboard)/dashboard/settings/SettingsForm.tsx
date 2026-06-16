'use client'

import { useState } from 'react'
import { updateUserProfile } from '@/modules/users/actions'

interface Profile {
  name?: string | null
  business_name?: string | null
  gst_number?: string | null
  upi_id?: string | null
  email?: string
}

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await updateUserProfile(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="card space-y-5 p-6">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Email</label>
          <input
            type="text"
            value={profile?.email ?? ''}
            disabled
            className="field cursor-not-allowed bg-paper-deep/60 font-mono text-faint"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Your name</label>
          <input name="name" type="text" defaultValue={profile?.name ?? ''} placeholder="Rahul Sharma" className="field" />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Business name</label>
          <input name="business_name" type="text" defaultValue={profile?.business_name ?? ''} placeholder="Sharma Design Studio" className="field" />
          <p className="mt-1.5 text-xs text-faint">Appears as the sender name on your invoices and PDFs.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">GST number (GSTIN)</label>
          <input name="gst_number" type="text" defaultValue={profile?.gst_number ?? ''} placeholder="27AABCU9603R1ZX" maxLength={15} className="field font-mono uppercase" />
          <p className="mt-1.5 text-xs text-faint">15-character GSTIN. Leave blank if not GST registered.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">UPI ID</label>
          <input name="upi_id" type="text" defaultValue={profile?.upi_id ?? ''} placeholder="rahul@upi" className="field font-mono" />
          <p className="mt-1.5 text-xs text-faint">Shown as a payment option on your PDF invoices.</p>
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-overdue/20 bg-danger-soft px-4 py-2.5 text-sm text-danger">{error}</p>
      )}
      {success && (
        <p className="rounded-xl border border-brand/15 bg-paid-soft px-4 py-2.5 text-sm text-paid">Settings saved successfully.</p>
      )}

      <button type="submit" disabled={saving} className="btn-primary px-6 py-3">
        {saving ? 'Saving…' : 'Save settings'}
      </button>
    </form>
  )
}
