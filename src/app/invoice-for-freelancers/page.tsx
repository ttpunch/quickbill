import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invoice for Freelancers in India — GST Compliant, UPI Ready',
  description: 'The best invoicing tool for Indian freelancers. Create GST invoices in 60 seconds, share on WhatsApp, collect payment via UPI. Free for first 5 invoices.',
  alternates: { canonical: '/invoice-for-freelancers' },
  openGraph: {
    title: 'Invoice for Freelancers — QuikBil',
    description: 'GST-compliant invoices for Indian freelancers. Free, fast, and built for UPI payments.',
  },
}

const professions = [
  { name: 'Web & App Developers', sac: '998314', note: 'Full stack, frontend, backend, mobile' },
  { name: 'UI/UX & Graphic Designers', sac: '998392', note: 'Figma, Illustrator, brand identity' },
  { name: 'Content Writers & Copywriters', sac: '998391', note: 'Blog posts, SEO, ads, email copy' },
  { name: 'Digital Marketing Consultants', sac: '998361', note: 'SEO, PPC, social media, analytics' },
  { name: 'Business & Strategy Consultants', sac: '998311', note: 'Finance, ops, HR, product consulting' },
  { name: 'Photographers & Videographers', sac: '998382', note: 'Corporate, wedding, product shoots' },
  { name: 'Online Trainers & Coaches', sac: '999293', note: 'Skill training, coaching, mentoring' },
]

const painPoints = [
  {
    problem: 'Making invoices in Excel is error-prone',
    solution: 'QuikBil calculates GST, generates the PDF, and formats everything correctly — no formulas needed.',
  },
  {
    problem: 'Clients ask for GST breakdown on invoices',
    solution: 'QuikBil shows CGST + SGST (or IGST) with exact amounts and rates on every invoice.',
  },
  {
    problem: 'Chasing clients for payment is awkward',
    solution: 'Every invoice has a UPI payment link pre-filled with your UPI ID and invoice amount. One tap to pay.',
  },
  {
    problem: 'Sending PDFs via email is slow',
    solution: 'Share your invoice on WhatsApp in one tap. Clients see it instantly and pay within minutes.',
  },
  {
    problem: 'Keeping track of invoice numbers is tedious',
    solution: 'QuikBil assigns sequential invoice numbers automatically. No duplicates, no gaps, GST-compliant.',
  },
]

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="kicker mb-4">Built for Indian freelancers</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink leading-tight max-w-2xl mx-auto">
          The Invoice App Made for Indian Freelancers
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          GST-compliant invoices in 60 seconds. Share on WhatsApp. Collect via UPI. Built for designers, developers, writers, consultants — every Indian freelancer.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="btn-primary inline-block px-10 py-3.5 text-base">
            Create your first invoice free
          </Link>
        </div>
        <p className="mt-4 text-xs text-faint">Free for first 5 invoices · No credit card · Takes 60 seconds</p>
      </section>

      {/* Pain points → solutions */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
            Invoicing headaches, solved
          </h2>
          <div className="space-y-4">
            {painPoints.map(({ problem, solution }) => (
              <div key={problem} className="card p-5 grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-faint uppercase tracking-wider mb-1">Problem</p>
                  <p className="font-medium text-ink">{problem}</p>
                </div>
                <div>
                  <p className="text-xs text-brand uppercase tracking-wider mb-1">QuikBil fixes it</p>
                  <p className="text-sm text-muted">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-4">
          For every type of Indian freelancer
        </h2>
        <p className="text-center text-muted mb-10 text-sm">QuikBil knows the right SAC code and GST rate for your service type.</p>
        <div className="space-y-3">
          {professions.map(({ name, sac, note }) => (
            <div key={name} className="card p-4 flex items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-ink">{name}</p>
                <p className="text-xs text-faint">{note}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-mono text-xs text-brand">{sac}</p>
                <p className="text-xs text-faint">SAC code</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
            Everything a freelancer invoice needs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['GST-compliant PDF', 'All 15 mandatory fields under Rule 46 CGST Rules — GSTIN, SAC, invoice number, place of supply, tax amounts.'],
              ['Automatic CGST/IGST split', 'Select your client\'s state — QuikBil applies CGST+SGST or IGST automatically.'],
              ['UPI payment link', 'Your UPI ID and invoice amount pre-filled. Client taps and pays from any UPI app.'],
              ['WhatsApp share', 'Invoice PDF attached to WhatsApp with a pre-written message — one tap to send.'],
              ['Sequential numbering', 'Invoice numbers auto-assigned in sequence. No duplicates, fully compliant.'],
              ['Free watermark removal', 'First 5 invoices are completely watermark-free — professional-quality PDFs.'],
              ['Client history', 'Save client details once — auto-fill on future invoices in seconds.'],
              ['Proof of payment tracking', 'Mark invoices as paid and track outstanding amounts at a glance.'],
            ].map(([title, desc]) => (
              <div key={title} className="card p-5">
                <p className="font-semibold text-ink mb-1">{title}</p>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">Simple pricing for freelancers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="card p-8 text-center">
            <p className="font-display text-2xl font-semibold text-ink mb-1">Free</p>
            <p className="font-mono text-3xl font-bold text-ink mb-2">₹0</p>
            <p className="text-sm text-muted mb-6">Forever free</p>
            <ul className="space-y-2 text-sm text-muted mb-8">
              <li>5 invoices per month</li>
              <li>PDF download</li>
              <li>WhatsApp share</li>
              <li>UPI payment link</li>
            </ul>
            <Link href="/login" className="btn-primary block py-3">Get started</Link>
          </div>
          <div className="card p-8 text-center border-brand/30 bg-brand/[0.03]">
            <p className="font-display text-2xl font-semibold text-ink mb-1">Pro</p>
            <p className="font-mono text-3xl font-bold text-brand mb-2">₹299<span className="text-base font-normal text-muted">/mo</span></p>
            <p className="text-sm text-muted mb-6">Unlimited invoices</p>
            <ul className="space-y-2 text-sm text-muted mb-8">
              <li>Unlimited invoices</li>
              <li>No watermark</li>
              <li>Client history</li>
              <li>Payment tracking</li>
              <li>Priority support</li>
            </ul>
            <Link href="/login" className="inline-block w-full py-3 rounded-full bg-brand text-cream font-semibold text-sm hover:opacity-90 transition-opacity">Upgrade to Pro</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="font-display text-3xl font-semibold text-cream mb-4">
            Start invoicing like a professional
          </h2>
          <p className="text-cream/80 mb-8">60 seconds to your first GST invoice. Free, no credit card.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold px-12 py-4 rounded-full text-base hover:opacity-90 transition-opacity">
            Create invoice free
          </Link>
        </div>
      </section>

      {/* Internal links */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <p className="text-center text-sm text-faint">
          <Link href="/gst-invoice-generator" className="text-brand hover:underline">GST Invoice Generator</Link>
          {' · '}
          <Link href="/upi-invoice" className="text-brand hover:underline">UPI Invoice</Link>
          {' · '}
          <Link href="/blog" className="text-brand hover:underline">Invoicing Guides</Link>
          {' · '}
          <Link href="/blog/gst-invoice-format-for-freelancers" className="text-brand hover:underline">GST Invoice Format</Link>
        </p>
      </section>
    </main>
  )
}
