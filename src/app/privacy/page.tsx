import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How QuickBill collects, uses, and protects your data, including DPDP Act 2023 compliance.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
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
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Privacy Policy</h1>
        <p className="mt-2 mb-10 font-mono text-xs text-faint">Last updated · June 2026</p>

        <div className="max-w-none space-y-7 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Information We Collect</h2>
            <p>We collect your email address for authentication, and business information you voluntarily provide (business name, GSTIN, UPI ID). We also collect invoice data you create on QuickBill.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. How We Use Your Information</h2>
            <p>Your data is used solely to provide the QuickBill service — generating invoices and enabling you to share them with your clients. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. Data Storage</h2>
            <p>Data is stored securely on Supabase (hosted on AWS in ap-south-1, Mumbai). All data is encrypted in transit and at rest.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. DPDP Act Compliance</h2>
            <p>QuickBill complies with the Digital Personal Data Protection Act 2023. You may request a copy of your data or request deletion by emailing privacy@quickbill.in.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Cookies</h2>
            <p>We use only essential cookies for authentication. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Contact</h2>
            <p>Privacy questions: <a href="mailto:privacy@quickbill.in" className="font-medium text-brand hover:text-brand-700">privacy@quickbill.in</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
