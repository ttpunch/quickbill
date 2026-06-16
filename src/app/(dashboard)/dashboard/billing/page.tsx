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
    <div className="reveal max-w-2xl">
      <p className="kicker mb-2">Account</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Billing</h1>
      <p className="mt-1 mb-8 text-sm text-muted">Manage your QuickBill subscription.</p>

      {/* Current plan */}
      <div className={`card mb-6 p-6 ${isPro && !cancelAtPeriodEnd ? 'ring-1 ring-brand/20' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="kicker mb-1.5">Current plan</p>
            <p className="font-display text-2xl font-semibold text-ink">{isPro ? (subscription?.subscription_plans as { name?: string })?.name ?? 'Pro' : 'Free'}</p>
            {isPro && periodEnd && !cancelAtPeriodEnd && (
              <p className="mt-1 font-mono text-xs text-faint">Renews {periodEnd}</p>
            )}
            {isPro && periodEnd && cancelAtPeriodEnd && (
              <p className="mt-1 font-mono text-xs text-unpaid">Cancels {periodEnd} — you keep Pro until then</p>
            )}
            {!isPro && (
              <p className="mt-1 font-mono text-xs text-faint">5 invoices / month · PDF watermark</p>
            )}
          </div>
          <span className={`badge ${isPro ? (cancelAtPeriodEnd ? 'bg-unpaid-soft text-unpaid' : 'bg-brand text-cream') : 'bg-paper-deep text-muted'}`}>
            {isPro ? (cancelAtPeriodEnd ? 'Ending' : 'Active') : 'Free'}
          </span>
        </div>

        {isPro && (
          <div className="mt-5 border-t border-line pt-5">
            <SubscriptionControls cancelAtPeriodEnd={cancelAtPeriodEnd} periodEnd={periodEnd} />
          </div>
        )}
      </div>

      {!isPro && (
        <>
          <p className="kicker mb-4">Upgrade to Pro</p>
          <BillingClient plans={plans} />
        </>
      )}

      {/* Billing history */}
      {history.length > 0 && (
        <div className="mt-8">
          <p className="kicker mb-4">Billing history</p>
          <div className="card divide-y divide-line p-0">
            {history.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="font-mono text-sm font-medium tabular-nums text-ink">{formatInr(p.amount_inr_paise ?? 0)}</p>
                  <p className="font-mono text-xs text-faint">
                    {new Date(p.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}
                    <span className="text-brand">Paid</span>
                  </p>
                </div>
                <a
                  href={`/api/receipts/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-brand transition-colors hover:text-brand-700"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
