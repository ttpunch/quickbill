import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free GST Invoice Generator for Indian Freelancers — QuikBil',
  description: 'Generate a GST-compliant invoice online in 60 seconds. Correct CGST/SGST split, UPI payment link, WhatsApp share. Free for first 5 invoices.',
  alternates: { canonical: '/gst-invoice-generator' },
  openGraph: {
    title: 'Free GST Invoice Generator — QuikBil',
    description: 'Create a GST-compliant PDF invoice online in 60 seconds. Free for Indian freelancers.',
  },
}

const features = [
  {
    icon: '⚡',
    title: 'Done in 60 seconds',
    desc: 'Fill in your client details, add your service, select GST rate — download your PDF.',
  },
  {
    icon: '🧮',
    title: 'Correct GST every time',
    desc: 'CGST + SGST for same-state clients, IGST for inter-state. Calculated automatically — no mistakes.',
  },
  {
    icon: '📲',
    title: 'UPI payment link included',
    desc: 'Every invoice has your UPI ID pre-filled with the exact amount. Client pays in one tap.',
  },
  {
    icon: '💬',
    title: 'WhatsApp share in one tap',
    desc: 'Open WhatsApp with your PDF attached and a pre-written message — straight from the invoice.',
  },
  {
    icon: '📄',
    title: 'GST-compliant PDF',
    desc: 'All mandatory fields: GSTIN, SAC code, invoice number, place of supply, CGST/SGST amounts.',
  },
  {
    icon: '🔢',
    title: 'Automatic numbering',
    desc: 'Sequential invoice numbers tracked for you — no gaps, no duplicates, GST-compliant.',
  },
]

const faqs = [
  {
    q: 'Is this GST invoice generator free?',
    a: 'Yes — your first 5 invoices are completely free. After that, upgrade to Pro for ₹299/month for unlimited invoices.',
  },
  {
    q: 'Does it calculate CGST and SGST automatically?',
    a: 'Yes. When you select your client\'s state, QuikBil applies CGST + SGST for same-state clients and IGST for inter-state clients automatically.',
  },
  {
    q: 'What SAC codes are supported?',
    a: 'All service SAC codes are supported. QuikBil includes the most common codes for software development, design, content writing, consulting, photography, and more.',
  },
  {
    q: 'Can I use this without a GSTIN?',
    a: 'If you\'re below the GST threshold (₹20 lakhs/year), you can issue a regular invoice without GST. QuikBil supports both GST and non-GST invoices.',
  },
  {
    q: 'Can I share the invoice on WhatsApp?',
    a: 'Yes — every invoice has a "Share on WhatsApp" button that opens WhatsApp with the PDF attached and a ready-to-send message.',
  },
  {
    q: 'Is the invoice PDF accepted by clients for ITC claims?',
    a: 'Yes. QuikBil generates fully compliant tax invoices under Section 31 of the CGST Act. Your B2B clients can use them to claim Input Tax Credit.',
  },
]

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="kicker mb-4">Free Tool</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink leading-tight max-w-2xl mx-auto">
          GST Invoice Generator for Indian Freelancers
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Create a GST-compliant PDF invoice in 60 seconds. Correct CGST/SGST split, UPI payment link, WhatsApp share. No Excel, no accountant.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="btn-primary inline-block px-10 py-3.5 text-base">
            Create invoice free
          </Link>
          <Link href="/blog/how-to-create-gst-invoice" className="inline-block px-10 py-3.5 text-base text-muted border border-line rounded-full hover:border-brand/50 transition-colors">
            How it works
          </Link>
        </div>
        <p className="mt-4 text-xs text-faint">Free for first 5 invoices · No credit card</p>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
          Everything your GST invoice needs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="card p-6">
              <p className="text-2xl mb-3">{icon}</p>
              <p className="font-semibold text-ink mb-2">{title}</p>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
            How to generate a GST invoice in 60 seconds
          </h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Sign up free', desc: 'Create your account at quikbil.com — sign in with Google, no password needed.' },
              { step: '2', title: 'Set up your profile', desc: 'Add your business name, GSTIN, and UPI ID once. QuikBil stamps these on every invoice automatically.' },
              { step: '3', title: 'Click "New Invoice"', desc: 'Enter your client\'s name and address. Add your service as a line item. Select the GST rate (usually 18% for most services).' },
              { step: '4', title: 'QuikBil calculates everything', desc: 'CGST + SGST or IGST is calculated based on your client\'s state. Invoice number is auto-assigned sequentially.' },
              { step: '5', title: 'Download PDF or share on WhatsApp', desc: 'Tap "Share on WhatsApp" to open WhatsApp with your invoice attached. Or download the PDF and email it.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 card p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display text-base font-bold text-cream">{step}</span>
                <div>
                  <p className="font-semibold text-ink mb-1">{title}</p>
                  <p className="text-sm text-muted">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST calculation example */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-4">
          Example: 18% GST invoice for ₹50,000
        </h2>
        <p className="text-center text-muted mb-8">Same-state client (CGST + SGST) vs inter-state client (IGST)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="card p-6">
            <p className="font-semibold text-ink mb-4">Same-state client</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span className="text-muted">Service fee</span><span className="text-ink">₹50,000</span></div>
              <div className="flex justify-between"><span className="text-muted">CGST @ 9%</span><span className="text-ink">₹4,500</span></div>
              <div className="flex justify-between"><span className="text-muted">SGST @ 9%</span><span className="text-ink">₹4,500</span></div>
              <div className="flex justify-between border-t border-line pt-2"><span className="font-semibold text-ink">Total</span><span className="font-semibold text-brand">₹59,000</span></div>
            </div>
          </div>
          <div className="card p-6">
            <p className="font-semibold text-ink mb-4">Inter-state client</p>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span className="text-muted">Service fee</span><span className="text-ink">₹50,000</span></div>
              <div className="flex justify-between"><span className="text-muted">IGST @ 18%</span><span className="text-ink">₹9,000</span></div>
              <div className="flex justify-between border-t border-line pt-2"><span className="font-semibold text-ink">Total</span><span className="font-semibold text-brand">₹59,000</span></div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-faint mt-4">QuikBil selects the correct split automatically based on the state you enter for your client.</p>
      </section>

      {/* FAQ */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="card p-5">
                <p className="font-semibold text-ink mb-2">{q}</p>
                <p className="text-sm text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink mb-4">
          Generate your first GST invoice now
        </h2>
        <p className="text-muted mb-8">Free for first 5 invoices. No credit card. Takes 60 seconds.</p>
        <Link href="/login" className="btn-primary inline-block px-12 py-4 text-base">
          Start free
        </Link>
        <p className="mt-6 text-xs text-faint">
          Questions?{' '}
          <Link href="/blog" className="text-brand hover:underline">Read our guides</Link>
          {' or '}
          <Link href="/blog/how-to-create-gst-invoice" className="text-brand hover:underline">learn how it works</Link>
        </p>
      </section>
    </main>
  )
}
