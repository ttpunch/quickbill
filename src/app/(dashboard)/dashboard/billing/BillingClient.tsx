'use client'

import { useState } from 'react'
import { createSubscriptionOrder, activateSubscriptionAfterPayment } from '@/modules/billing/actions'

interface Plan {
  id: string
  name: string
  slug: string
  price_inr_paise: number
  interval: string
  invoice_limit: number | null
}

function formatInr(paise: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(paise / 100)
}

export default function BillingClient({ plans }: { plans: Plan[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleUpgrade(planId: string) {
    setLoading(planId)
    setError(null)

    const result = await createSubscriptionOrder(planId)

    if ('error' in result) {
      setError(result.error ?? 'Payment setup failed.')
      setLoading(null)
      return
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!keyId) {
      setError('Razorpay not configured. Add keys to .env.local.')
      setLoading(null)
      return
    }

    // Load Razorpay script dynamically
    if (!document.getElementById('rzp-script')) {
      const script = document.createElement('script')
      script.id = 'rzp-script'
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
      await new Promise(resolve => { script.onload = resolve })
    }

    const options = {
      key: keyId,
      amount: result.amount,
      currency: 'INR',
      name: 'QuickBill',
      description: result.planName,
      order_id: result.orderId,
      handler: async (response: {
        razorpay_order_id: string
        razorpay_payment_id: string
        razorpay_signature: string
      }) => {
        console.log('Razorpay handler fired', response)
        const activation = await activateSubscriptionAfterPayment({
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySignature: response.razorpay_signature,
          planId: result.planId,
        })

        console.log('Activation result', activation)

        if (activation?.error) {
          setError(`Activation failed: ${activation.error}`)
        } else {
          window.location.reload()
        }
      },
      prefill: {},
      theme: { color: '#0c5739' },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
    setLoading(null)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {plans.filter(p => p.slug !== 'free').map(plan => (
        <div key={plan.id} className={`card flex flex-col p-6 ${plan.interval === 'yearly' ? 'ring-1 ring-gold/40' : ''}`}>
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="font-display text-lg font-semibold text-ink">{plan.name}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-faint">{plan.interval}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl font-semibold text-brand">{formatInr(plan.price_inr_paise)}</p>
              <p className="font-mono text-xs text-faint">/{plan.interval === 'yearly' ? 'yr' : 'mo'}</p>
            </div>
          </div>

          <ul className="mb-6 flex-1 space-y-2">
            {['Unlimited invoices', 'No watermark on PDFs', 'UPI payment links', 'Email invoices to clients'].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted">
                <svg className="h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                {f}
              </li>
            ))}
            {plan.interval === 'yearly' && (
              <li className="flex items-center gap-2 text-sm font-semibold text-gold">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Save ₹1,090 vs monthly
              </li>
            )}
          </ul>

          <button
            onClick={() => handleUpgrade(plan.id)}
            disabled={loading === plan.id}
            className="btn-primary w-full py-2.5"
          >
            {loading === plan.id ? 'Opening payment…' : `Upgrade to ${plan.name}`}
          </button>
        </div>
      ))}

      {error && (
        <div className="col-span-full rounded-xl border border-overdue/20 bg-danger-soft px-4 py-2.5 text-sm text-danger">
          {error}
        </div>
      )}
    </div>
  )
}
