import { getUserSubscription, getPlans, getBillingHistory } from '@/modules/billing/actions'
import BillingClient from './BillingClient'
import SubscriptionControls from './SubscriptionControls'

function formatInr(paise: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(paise / 100)
}

export default async function BillingPage() {
  const [subscription, plans, history] = await Promise.all([
    getUserSubscription(),
    getPlans(),
    getBillingHistory(),
  ])

  const isPro = !!subscription
  const cancelAtPeriodEnd = subscription?.cancel_at_period_end === true
  const periodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Billing</h1>
      <p className="text-sm text-gray-500 mb-8">Manage your QuickBill subscription.</p>

      {/* Current plan */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-semibold tracking-wide mb-1">Current Plan</p>
            <p className="text-lg font-semibold text-gray-900">{isPro ? (subscription?.subscription_plans as { name?: string })?.name ?? 'Pro' : 'Free'}</p>
            {isPro && periodEnd && !cancelAtPeriodEnd && (
              <p className="text-xs text-gray-400 mt-1">Renews {periodEnd}</p>
            )}
            {isPro && periodEnd && cancelAtPeriodEnd && (
              <p className="text-xs text-amber-600 mt-1">Cancels on {periodEnd} — you keep Pro until then</p>
            )}
            {!isPro && (
              <p className="text-xs text-gray-400 mt-1">5 invoices / month · PDF watermark</p>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isPro ? (cancelAtPeriodEnd ? 'bg-amber-50 text-amber-700' : 'bg-indigo-50 text-indigo-700') : 'bg-gray-100 text-gray-500'}`}>
            {isPro ? (cancelAtPeriodEnd ? 'Ending' : 'Active') : 'Free'}
          </span>
        </div>

        {isPro && (
          <div className="mt-5 pt-5 border-t border-gray-50">
            <SubscriptionControls cancelAtPeriodEnd={cancelAtPeriodEnd} periodEnd={periodEnd} />
          </div>
        )}
      </div>

      {!isPro && (
        <>
          <p className="text-sm font-medium text-gray-700 mb-4">Upgrade to Pro</p>
          <BillingClient plans={plans} />
        </>
      )}

      {/* Billing history */}
      {history.length > 0 && (
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-700 mb-4">Billing history</p>
          <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-50">
            {history.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm text-gray-900">{formatInr(p.amount_inr_paise ?? 0)}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}
                    <span className="text-green-600">Paid</span>
                  </p>
                </div>
                <a
                  href={`/api/receipts/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Receipt
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
