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
        <p className="mb-3 text-xs text-muted">
          Your subscription will end on {periodEnd}. Resume to keep Pro and continue billing.
        </p>
        <button onClick={handleResume} disabled={loading} className="btn-primary">
          {loading ? 'Resuming…' : 'Resume subscription'}
        </button>
        {error && <p className="mt-2 text-xs text-danger">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      {!confirming ? (
        <button
          onClick={() => setConfirming(true)}
          className="text-sm text-muted transition-colors hover:text-danger"
        >
          Cancel subscription
        </button>
      ) : (
        <div>
          <p className="mb-3 text-sm text-ink">
            Cancel your subscription? You&apos;ll keep Pro until {periodEnd}, then move to the Free plan.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-danger px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Cancelling…' : 'Yes, cancel'}
            </button>
            <button onClick={() => setConfirming(false)} disabled={loading} className="btn-ghost">
              Keep subscription
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-danger">{error}</p>}
        </div>
      )}
    </div>
  )
}
