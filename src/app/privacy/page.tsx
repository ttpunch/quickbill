import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">QuickBill</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">1. Information We Collect</h2>
            <p>We collect your email address for authentication, and business information you voluntarily provide (business name, GSTIN, UPI ID). We also collect invoice data you create on QuickBill.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p>Your data is used solely to provide the QuickBill service — generating invoices and enabling you to share them with your clients. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">3. Data Storage</h2>
            <p>Data is stored securely on Supabase (hosted on AWS in ap-south-1, Mumbai). All data is encrypted in transit and at rest.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">4. DPDP Act Compliance</h2>
            <p>QuickBill complies with the Digital Personal Data Protection Act 2023. You may request a copy of your data or request deletion by emailing privacy@quickbill.in.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">5. Cookies</h2>
            <p>We use only essential cookies for authentication. We do not use tracking or advertising cookies.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">6. Contact</h2>
            <p>Privacy questions: <a href="mailto:privacy@quickbill.in" className="text-indigo-600">privacy@quickbill.in</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
