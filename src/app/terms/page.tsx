import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="text-xl font-bold text-indigo-600">QuickBill</Link>
        </div>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">1. Service</h2>
            <p>QuickBill provides an online GST invoice generation service for Indian freelancers and small businesses. By using QuickBill, you agree to these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">2. Free Plan</h2>
            <p>The free plan allows up to 5 invoices per month. Invoices generated on the free plan include a QuickBill watermark. We reserve the right to change free plan limits with 30 days notice.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">3. Paid Plans</h2>
            <p>Pro plans are billed monthly or annually. Subscriptions auto-renew unless cancelled. Refunds are available within 7 days of purchase if no invoices have been generated on the paid plan.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">4. GST Accuracy</h2>
            <p>QuickBill calculates GST based on rates you select. You are responsible for verifying that the correct GST rate applies to your services. QuickBill is not a tax advisor.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">5. Acceptable Use</h2>
            <p>QuickBill may not be used to generate fraudulent invoices, evade taxes, or misrepresent GST numbers. Accounts found in violation will be terminated without refund.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
            <p>QuickBill is provided as-is. We are not liable for any losses arising from use of the service, including errors in generated invoices.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-2">7. Contact</h2>
            <p>Questions: <a href="mailto:hello@quickbill.in" className="text-indigo-600">hello@quickbill.in</a></p>
          </section>
        </div>
      </main>
    </div>
  )
}
