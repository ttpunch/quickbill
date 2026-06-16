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
      theme: { color: '#4f46e5' },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new (window as any).Razorpay(options)
    rzp.open()
    setLoading(null)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {plans.filter(p => p.slug !== 'free').map(plan => (
        <div key={plan.id} className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-gray-900">{plan.name}</p>
              <p className="text-xs text-gray-400 capitalize">{plan.interval}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-indigo-600">{formatInr(plan.price_inr_paise)}</p>
              <p className="text-xs text-gray-400">/{plan.interval === 'yearly' ? 'yr' : 'mo'}</p>
            </div>
          </div>

          <ul className="space-y-1.5 mb-5 flex-1">
            <li className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="text-green-500">✓</span> Unlimited invoices
            </li>
            <li className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="text-green-500">✓</span> No watermark on PDFs
            </li>
            <li className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="text-green-500">✓</span> UPI payment links
            </li>
            <li className="text-xs text-gray-600 flex items-center gap-1.5">
              <span className="text-green-500">✓</span> Email invoices to clients
            </li>
            {plan.interval === 'yearly' && (
              <li className="text-xs text-indigo-600 flex items-center gap-1.5 font-medium">
                <span>🎉</span> Save ₹1,090 vs monthly
              </li>
            )}
          </ul>

          <button
            onClick={() => handleUpgrade(plan.id)}
            disabled={loading === plan.id}
            className="w-full py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading === plan.id ? 'Opening payment…' : `Upgrade to ${plan.name}`}
          </button>
        </div>
      ))}

      {error && (
        <div className="col-span-full text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
    </div>
  )
}
