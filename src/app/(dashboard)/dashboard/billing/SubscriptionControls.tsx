'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cancelSubscription, resumeSubscription } from '@/modules/billing/actions'

export default function SubscriptionControls({
  cancelAtPeriodEnd,
  periodEnd,
}: {
  cancelAtPeriodEnd: boolean
  periodEnd: string | null
}) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCancel() {
    setLoading(true)
    setError(null)
    const result = await cancelSubscription()
    if (result?.error) setError(result.error)
    else {
      setConfirming(false)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleResume() {
    setLoading(true)
    setError(null)
    const result = await resumeSubscription()
    if (result?.error) setError(result.error)
    else router.refresh()
    setLoading(false)
  }

  if (cancelAtPeriodEnd) {
    return (
      <div>
        <p className="text-xs text-gray-500 mb-3">
          Your subscription will end on {periodEnd}. Resume to keep Pro and continue billing.
        </p>
        <button
          onClick={handleResume}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Resuming…' : 'Resume subscription'}
        </button>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Cancel subscription
        </button>
      ) : (
        <div>
          <p className="text-sm text-gray-700 mb-3">
            Cancel your subscription? You&apos;ll keep Pro until {periodEnd}, then move to the Free plan.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Cancelling…' : 'Yes, cancel'}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={loading}
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Keep subscription
            </button>
          </div>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  )
}
