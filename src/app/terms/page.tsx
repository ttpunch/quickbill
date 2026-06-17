import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing your use of QuickBill — plans, billing, GST accuracy, and acceptable use.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-6">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand font-display text-base leading-none text-cream">Q</span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink">QuickBill</span>
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-6 py-14">
        <p className="kicker mb-2">Legal</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Terms of Service</h1>
        <p className="mt-2 mb-10 font-mono text-xs text-faint">Last updated · June 2026</p>

        <div className="max-w-none space-y-7 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Service</h2>
            <p>QuickBill provides an online GST invoice generation service for Indian freelancers and small businesses. By using QuickBill, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. Free Plan</h2>
            <p>The free plan allows up to 5 invoices per month. Invoices generated on the free plan include a QuickBill watermark. We reserve the right to change free plan limits with 30 days notice.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Paid Plans</h2>
            <p>Pro plans are billed monthly or annually. Subscriptions auto-renew unless cancelled. Refunds are available within 7 days of purchase if no invoices have been generated on the paid plan.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. GST Accuracy</h2>
            <p>QuickBill calculates GST based on rates you select. You are responsible for verifying that the correct GST rate applies to your services. QuickBill is not a tax advisor.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Acceptable Use</h2>
            <p>QuickBill may not be used to generate fraudulent invoices, evade taxes, or misrepresent GST numbers. Accounts found in violation will be terminated without refund.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Limitation of Liability</h2>
            <p>QuickBill is provided as-is. We are not liable for any losses arising from use of the service, including errors in generated invoices.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">7. Contact</h2>
            <p>Questions: <a href="mailto:hello@quikbil.com" className="font-medium text-brand hover:text-brand-700">hello@quikbil.com</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
