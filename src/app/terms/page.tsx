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
        <p className="mt-2 mb-10 font-mono text-xs text-faint">Last updated · 19 June 2026</p>

        {/*
          ⚖️ LAWYER REVIEW RECOMMENDED before relying on this page.
          Sections 8 (liability) and 11 (governing law) in particular should be
          checked by a lawyer — limitation-of-liability is only enforceable to the
          extent local law allows.
        */}

        <div className="max-w-none space-y-7 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Service</h2>
            <p>QuickBill (the &ldquo;Service&rdquo;, at quikbil.com) is an online GST invoice generation service for Indian freelancers and small businesses, operated by <span className="font-medium text-ink">Vinod Kumar, sole proprietor trading as QuikBil</span> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an account or using the Service, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. Eligibility</h2>
            <p>You must be at least 18 years old and, where you use the Service on behalf of a business, authorised to act for that business.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Free Plan</h2>
            <p>The Service is currently in a beta period. During the beta, the free plan is offered without invoice limits so we can learn how the Service is used. Outside the beta, the free plan allows up to 5 invoices per month, and free-plan invoices may include a QuickBill watermark. We reserve the right to change free plan limits with reasonable notice.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Paid Plans</h2>
            <p>Paid (&ldquo;Pro&rdquo;) plans are not yet active during the beta, and no payments are being collected. When Pro launches, it will be billed monthly or annually, subscriptions will auto-renew unless cancelled, and the applicable pricing and refund terms will be shown at the point of purchase. {/* ⚖️ LAWYER REVIEW: recurring-payment / auto-renewal disclosures (incl. RBI e-mandate rules) should be confirmed before enabling live billing. */}</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. GST &amp; Tax Accuracy</h2>
            <p>QuickBill calculates GST based on the rates and details you select and enter. You are solely responsible for ensuring that the GST rate, GSTIN, place of supply, and other invoice details are correct for your services. QuickBill is a software tool, not a tax advisor, and we are not responsible for any tax, penalty, or compliance consequence arising from invoices you generate. Please verify your invoices and consult a qualified professional where needed.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Acceptable Use</h2>
            <p>You may not use QuickBill to generate fraudulent invoices, evade taxes, misrepresent GST numbers, or for any unlawful purpose. Accounts found in violation may be suspended or terminated without refund.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">7. Your Content &amp; Our Software</h2>
            <p>You retain ownership of the data you enter (your business details, invoices, and client information). You grant us permission to process that data solely to operate the Service for you. We retain all rights in the QuickBill software, brand, and design.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">8. Disclaimers &amp; Limitation of Liability</h2>
            <p>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind. To the maximum extent permitted by applicable law, we are not liable for any indirect, incidental, or consequential losses, or for losses arising from errors in generated invoices or from your use of the Service. Nothing in these terms limits any liability that cannot be limited under applicable law. {/* ⚖️ LAWYER REVIEW: enforceability of liability caps varies — confirm wording and any statutory minimums. */}</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">9. Changes to These Terms</h2>
            <p>We may update these terms from time to time. Material changes will be reflected by the &ldquo;Last updated&rdquo; date above. Continued use of the Service after changes take effect constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">10. Termination</h2>
            <p>You may stop using the Service and request deletion of your account at any time. We may suspend or terminate access if these terms are breached.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">11. Governing Law</h2>
            <p>These terms are governed by the laws of India, and disputes are subject to the courts of <span className="font-medium text-ink">Haridwar, India</span>.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">12. Contact</h2>
            <p>Questions: <a href="mailto:hello@quikbil.com" className="font-medium text-brand hover:text-brand-700">hello@quikbil.com</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
