import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Create a GST Invoice in 60 Seconds',
  description: 'Step-by-step guide to creating a GST-compliant invoice online for Indian freelancers. No accountant, no Excel — done in 60 seconds.',
  alternates: { canonical: '/blog/how-to-create-gst-invoice' },
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">How-to</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink leading-tight">
        How to Create a GST Invoice in 60 Seconds
      </h1>
      <p className="mt-3 mb-10 font-mono text-xs text-faint">June 2026 · 5 min read</p>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          Creating a GST invoice doesn't require an accountant or expensive software. If you're a freelancer or small business owner in India, you can <strong className="text-ink">create a GST invoice in 60 seconds</strong> using QuikBil — and share it directly on WhatsApp to collect payment via UPI.
        </p>
        <p>
          This guide walks you through every step: what a GST invoice must contain, how to fill in the fields correctly, and how to send it to your client.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What is a GST Invoice?</h2>
        <p>
          A GST invoice is a document issued by a GST-registered supplier to the buyer. It records the goods or services sold, their value, and the applicable GST (Goods and Services Tax). Under Indian law, any registered business must issue a GST invoice for every taxable supply above ₹200.
        </p>
        <p>
          For freelancers providing services — design, development, writing, consulting — a GST invoice is required if your annual turnover exceeds ₹20 lakhs (₹10 lakhs in special category states).
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Mandatory fields on every GST invoice</h2>
        <p>The CGST Act specifies the following fields must appear on every GST invoice:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Your business name, address, and GSTIN</strong> (15-digit GST Identification Number)</li>
          <li><strong className="text-ink">Invoice number</strong> — unique and sequential (e.g., INV-2026-001)</li>
          <li><strong className="text-ink">Invoice date</strong></li>
          <li><strong className="text-ink">Client's name and address</strong> — and their GSTIN if they're registered</li>
          <li><strong className="text-ink">Description of services</strong> — what you delivered</li>
          <li><strong className="text-ink">HSN/SAC code</strong> — the service accounting code for your service type</li>
          <li><strong className="text-ink">Taxable amount</strong> — your fee before GST</li>
          <li><strong className="text-ink">GST rate and amount</strong> — split as CGST + SGST (intra-state) or IGST (inter-state)</li>
          <li><strong className="text-ink">Total amount payable</strong></li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Step-by-step: Create a GST invoice on QuikBil</h2>

        <div className="space-y-4">
          {[
            { step: '1', title: 'Sign up free', desc: 'Go to quikbil.com and create a free account with your email. No credit card needed.' },
            { step: '2', title: 'Enter your business details', desc: 'Add your business name, GSTIN, and UPI ID in Settings. QuikBil stamps these on every invoice automatically.' },
            { step: '3', title: 'Click "New Invoice"', desc: 'Fill in your client\'s name, email, and address. Add each service as a line item with amount.' },
            { step: '4', title: 'Select the GST rate', desc: 'Choose 0%, 5%, 12%, 18%, or 28%. QuikBil automatically calculates CGST and SGST (or IGST for inter-state clients) correctly.' },
            { step: '5', title: 'Download or share', desc: 'Download the PDF or tap "Share on WhatsApp." Your UPI payment link is printed on the invoice so the client can pay instantly.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-4 card p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand font-display text-sm font-bold text-cream">{step}</span>
              <div>
                <p className="font-semibold text-ink mb-1">{title}</p>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">GST rates for freelance services in 2026</h2>
        <p>Most freelance services in India are taxed at <strong className="text-ink">18% GST</strong>. Here are the common rates:</p>
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Service type</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">GST rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Web design / development', '18%'],
                ['Graphic design', '18%'],
                ['Content writing / copywriting', '18%'],
                ['Management consulting', '18%'],
                ['Photography / videography', '18%'],
                ['Training / coaching', '18%'],
                ['Export of services (foreign clients)', '0% (LUT)'],
              ].map(([service, rate]) => (
                <tr key={service}>
                  <td className="px-4 py-2.5 text-muted">{service}</td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-ink">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Common mistakes to avoid</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Wrong GST split:</strong> For clients in the same state, split GST as CGST + SGST (half each). For clients in a different state, charge IGST (full rate). QuikBil handles this automatically.</li>
          <li><strong className="text-ink">Missing invoice number:</strong> Invoice numbers must be sequential. Never reuse a number.</li>
          <li><strong className="text-ink">Rounding errors:</strong> GST must be calculated on the exact taxable value, not an approximation.</li>
          <li><strong className="text-ink">Charging GST without registration:</strong> You can only charge GST if you're registered. If you're below the threshold, issue a regular invoice without GST.</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Get paid faster with UPI</h2>
        <p>
          Every invoice generated on QuikBil includes a UPI payment link with your UPI ID pre-filled and the invoice amount. Your client can pay instantly from any UPI app — PhonePe, Google Pay, Paytm, or their bank — without you sending a separate payment request.
        </p>

        <div className="card p-6 bg-brand text-cream mt-8">
          <p className="font-display text-xl font-semibold mb-2">Create your first GST invoice free</p>
          <p className="text-sm text-cream/80 mb-4">Free for your first 5 invoices. No credit card, no setup fees.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Get started — it&apos;s free
          </Link>
        </div>

        <p className="pt-4 text-xs text-faint">
          Related:{' '}
          <Link href="/blog/gst-invoice-format-for-freelancers" className="text-brand hover:underline">GST Invoice Format for Freelancers</Link>
          {' · '}
          <Link href="/blog/cgst-vs-sgst-vs-igst" className="text-brand hover:underline">CGST vs SGST vs IGST</Link>
          {' · '}
          <Link href="/blog/how-to-send-invoice-on-whatsapp" className="text-brand hover:underline">How to Send Invoice on WhatsApp</Link>
        </p>
      </div>
    </main>
  )
}
