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
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
          <input
            type="text"
            value={profile?.email ?? ''}
            disabled
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
          <input
            name="name"
            type="text"
            defaultValue={profile?.name ?? ''}
            placeholder="Rahul Sharma"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
          <input
            name="business_name"
            type="text"
            defaultValue={profile?.business_name ?? ''}
            placeholder="Sharma Design Studio"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Appears as the sender name on your invoices and PDFs.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">GST Number (GSTIN)</label>
          <input
            name="gst_number"
            type="text"
            defaultValue={profile?.gst_number ?? ''}
            placeholder="27AABCU9603R1ZX"
            maxLength={15}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono uppercase"
          />
          <p className="text-xs text-gray-400 mt-1">15-character GSTIN. Leave blank if not GST registered.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">UPI ID</label>
          <input
            name="upi_id"
            type="text"
            defaultValue={profile?.upi_id ?? ''}
            placeholder="rahul@upi"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">Shown as a payment option on your PDF invoices.</p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">{error}</p>
      )}
      {success && (
        <p className="text-sm text-green-600 bg-green-50 border border-green-100 rounded-lg px-4 py-2">Settings saved successfully.</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </form>
  )
}
