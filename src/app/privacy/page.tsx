import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How QuickBill collects, uses, and protects your data, including handling in line with the DPDP Act 2023.',
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
        <p className="mt-2 mb-10 font-mono text-xs text-faint">Last updated · 19 June 2026</p>

        {/*
          ⚖️ LAWYER REVIEW RECOMMENDED before relying on this page.
          This draft is written to be ACCURATE to what the app actually does;
          it is not a guarantee of full DPDP compliance.
        */}

        <div className="max-w-none space-y-7 text-sm leading-relaxed text-muted">
          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">1. Who We Are</h2>
            <p>QuickBill (the &ldquo;Service&rdquo;, available at quikbil.com) is operated by <span className="font-medium text-ink">Vinod Kumar, sole proprietor trading as QuikBil</span> (&ldquo;we&rdquo;, &ldquo;us&rdquo;). For the purposes of the Digital Personal Data Protection Act 2023 (&ldquo;DPDP Act&rdquo;), we act as the data fiduciary for the personal data described below. You can reach us at <a href="mailto:privacy@quikbil.com" className="font-medium text-brand hover:text-brand-700">privacy@quikbil.com</a>.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">2. Information We Collect</h2>
            <ul className="ml-4 list-disc space-y-1.5">
              <li><span className="font-medium text-ink">Account data:</span> your email address, used to sign you in.</li>
              <li><span className="font-medium text-ink">Profile data you provide:</span> your name, business name, GSTIN, and UPI ID.</li>
              <li><span className="font-medium text-ink">Invoice &amp; client data you enter:</span> invoices you create and the client details on them (such as client name, email, and GSTIN).</li>
              <li><span className="font-medium text-ink">Support messages:</span> the subject and content of questions you submit to us through the app.</li>
              <li><span className="font-medium text-ink">Technical &amp; activity data:</span> records of key actions on your account (an audit log), which may include your IP address, plus basic usage and device information collected for security and analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">3. How We Use Your Information</h2>
            <p>We use your data to provide and operate the Service — generating invoices, letting you share them and collect payment, responding to your support requests, sending you transactional emails (such as payment reminders), keeping the Service secure and preventing misuse, understanding how the Service is used so we can improve it, and meeting our legal obligations. <span className="font-medium text-ink">We do not sell your personal data.</span></p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">4. Analytics &amp; Cookies</h2>
            <p>We use strictly necessary cookies to keep you signed in. We also use privacy-friendly product analytics (Vercel Web Analytics and Speed Insights) to understand aggregate usage, and — where enabled — Google Analytics, which sets analytics cookies to measure traffic. We do not use advertising cookies and we do not sell or share your data for advertising. {/* ⚖️ LAWYER REVIEW: if you later add any non-essential cookies, a cookie-consent banner may be required. */}</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">5. Who We Share Data With</h2>
            <p>We share data only with service providers who process it on our behalf to run the Service, under their respective terms:</p>
            <ul className="ml-4 mt-1.5 list-disc space-y-1.5">
              <li><span className="font-medium text-ink">Supabase</span> — database, authentication, and storage (hosted on AWS, Mumbai region).</li>
              <li><span className="font-medium text-ink">Resend</span> — sending transactional email.</li>
              <li><span className="font-medium text-ink">Razorpay</span> — payment processing (when paid plans are active). We never receive or store your card details.</li>
              <li><span className="font-medium text-ink">Vercel</span> — hosting and product analytics.</li>
              <li><span className="font-medium text-ink">Google</span> — website analytics, where enabled.</li>
            </ul>
            <p className="mt-2">We may also disclose data where required by law.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">6. Data Storage &amp; Security</h2>
            <p>Data is stored on Supabase (hosted on AWS in ap-south-1, Mumbai) and is encrypted in transit and at rest. We restrict internal access to account data to what is needed to operate the Service and respond to support requests.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">7. Data Retention</h2>
            <p>We keep your data for as long as your account is active. When you request deletion, we remove or anonymise your personal data, except where we are required to retain certain records (for example, tax or payment records) for a period required by law.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">8. Your Rights (DPDP Act 2023)</h2>
            <p>We aim to handle your personal data in line with the DPDP Act 2023. Subject to that Act, you may request access to a copy of your data, correction of inaccurate data, and erasure of your data, and you may raise a grievance about how we handle it. To exercise any of these, email <a href="mailto:privacy@quikbil.com" className="font-medium text-brand hover:text-brand-700">privacy@quikbil.com</a> and we will respond within a reasonable time. {/* ⚖️ LAWYER REVIEW: DPDP may require naming a Grievance Officer / Consent Manager and specific response timelines once the rules are fully in force. */}</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">9. Children</h2>
            <p>The Service is intended for users aged 18 and over and is not directed at children.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">10. Changes to This Policy</h2>
            <p>We may update this policy from time to time. Material changes will be reflected by the &ldquo;Last updated&rdquo; date above, and where appropriate we will notify you.</p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-lg font-semibold text-ink">11. Contact</h2>
            <p>Privacy questions or requests: <a href="mailto:privacy@quikbil.com" className="font-medium text-brand hover:text-brand-700">privacy@quikbil.com</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
