import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UPI Invoice — Create & Send GST Invoices with UPI Payment Link',
  description: 'Create invoices with a UPI payment link for instant payment collection. Share on WhatsApp. Free for Indian freelancers. No credit card.',
  alternates: { canonical: '/upi-invoice' },
  openGraph: {
    title: 'UPI Invoice — QuikBil',
    description: 'Invoice with a UPI payment link. Clients pay in one tap from PhonePe, Google Pay, Paytm, or any UPI app.',
  },
}

const upiApps = [
  { name: 'PhonePe', color: '#5f259f' },
  { name: 'Google Pay', color: '#1a73e8' },
  { name: 'Paytm', color: '#00B9F1' },
  { name: 'BHIM', color: '#00518C' },
  { name: 'Amazon Pay', color: '#FF9900' },
  { name: 'Bank apps', color: '#0C5739' },
]

const howItWorks = [
  {
    step: '1',
    title: 'Add your UPI ID',
    desc: 'Go to Settings and add your UPI ID (e.g. yourname@upi or 9876543210@paytm). Takes 30 seconds.',
  },
  {
    step: '2',
    title: 'Create your invoice',
    desc: 'Fill in your client details and service. QuikBil calculates GST automatically.',
  },
  {
    step: '3',
    title: 'UPI link is auto-generated',
    desc: 'QuikBil generates a UPI deep link with your UPI ID and the exact invoice amount pre-filled.',
  },
  {
    step: '4',
    title: 'Share on WhatsApp',
    desc: 'Send the PDF to your client on WhatsApp. They tap the UPI link and pay instantly.',
  },
  {
    step: '5',
    title: 'Get notified instantly',
    desc: 'You receive a UPI credit notification the moment your client pays. Mark invoice as paid.',
  },
]

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="kicker mb-4">Instant payment collection</p>
        <h1 className="font-display text-5xl font-semibold tracking-tight text-ink leading-tight max-w-2xl mx-auto">
          Invoices with UPI Payment Links for Instant Collection
        </h1>
        <p className="mt-5 text-lg text-muted max-w-xl mx-auto leading-relaxed">
          Create a GST invoice with your UPI ID pre-filled. Share on WhatsApp. Your client taps to pay from PhonePe, Google Pay, Paytm, or any UPI app — in seconds.
        </p>
        <div className="mt-8">
          <Link href="/login" className="btn-primary inline-block px-12 py-4 text-base">
            Create UPI invoice free
          </Link>
        </div>
        <p className="mt-4 text-xs text-faint">Free for first 5 invoices · Works with all UPI apps</p>
      </section>

      {/* UPI apps */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="text-center text-sm text-muted mb-6">Your clients can pay from any UPI app</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {upiApps.map(({ name }) => (
            <span key={name} className="card px-5 py-2.5 text-sm font-medium text-ink">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* What is UPI invoice */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-8">
            What is a UPI invoice?
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-muted">
            <p>
              A UPI invoice is a regular GST invoice that includes a <strong className="text-ink">UPI payment link</strong> — a clickable link that opens your client’s UPI app with your payment details pre-filled. Instead of your client having to search for your UPI ID and enter the amount manually, they just tap a link.
            </p>
            <p>
              The link follows this format:
            </p>
            <div className="card p-4 font-mono text-xs text-ink bg-paper overflow-x-auto">
              upi://pay?pa=<span className="text-brand">yourname@upi</span>&amp;pn=<span className="text-brand">Your+Business</span>&amp;am=<span className="text-brand">59000</span>&amp;cu=INR&amp;tn=Invoice+QB-2026-001
            </div>
            <p>
              When your client taps this link, their preferred UPI app opens with your UPI ID, your business name, and the exact invoice amount pre-filled. They enter their UPI PIN and the payment arrives in your bank account within seconds.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
          How QuikBil UPI invoicing works
        </h2>
        <div className="space-y-4">
          {howItWorks.map(({ step, title, desc }) => (
            <div key={step} className="flex gap-5 card p-5">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display text-base font-bold text-cream">{step}</span>
              <div>
                <p className="font-semibold text-ink mb-1">{title}</p>
                <p className="text-sm text-muted">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why UPI invoicing */}
      <section className="bg-paper-deep border-y border-line py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-semibold text-ink text-center mb-10">
            Why Indian freelancers use UPI invoices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                title: 'Instant settlement',
                desc: 'UPI payments settle in your bank account within seconds. No 2-3 day wait like bank transfers.',
              },
              {
                title: 'Zero transaction fees',
                desc: 'UPI is free for both payer and receiver. Unlike cards or net banking, there are no MDR charges.',
              },
              {
                title: 'No typing errors',
                desc: 'Your UPI ID and amount are pre-filled. Clients can\'t accidentally send the wrong amount.',
              },
              {
                title: 'Works for any amount',
                desc: 'From ₹500 to ₹2 lakh per transaction. Higher limits available on some bank apps.',
              },
              {
                title: 'Familiar for Indian clients',
                desc: '95% of Indian smartphone users have at least one UPI app. No learning curve for your clients.',
              },
              {
                title: 'Immediate payment confirmation',
                desc: 'Both you and your client get instant notifications. No waiting to "confirm if payment received."',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="card p-5">
                <p className="font-semibold text-ink mb-2">{title}</p>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPI + WhatsApp combination */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold text-ink text-center mb-6">
          The WhatsApp + UPI combination
        </h2>
        <div className="card p-8">
          <p className="text-sm text-muted leading-relaxed mb-5">
            The fastest way to get paid as an Indian freelancer is to send your invoice on WhatsApp (where your client is already active) with a UPI link (which requires zero setup on their end). QuikBil combines both into a single workflow:
          </p>
          <div className="space-y-3">
            {[
              'You tap "Share on WhatsApp" on your invoice',
              'WhatsApp opens with the PDF attached and a message drafted',
              'You select your client and hit send',
              'Client taps the UPI link in the PDF',
              'Payment arrives in your bank in seconds',
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand text-xs font-bold">{i + 1}</span>
                <p className="text-sm text-muted">{step}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-brand font-semibold mt-5">Average time from invoice send to payment received: under 5 minutes.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand py-20 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="font-display text-3xl font-semibold text-cream mb-4">
            Send your first UPI invoice today
          </h2>
          <p className="text-cream/80 mb-8">Free for first 5 invoices. Takes 60 seconds. Works with all UPI apps.</p>
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
          <Link href="/invoice-for-freelancers" className="text-brand hover:underline">Invoice for Freelancers</Link>
          {' · '}
          <Link href="/blog/how-to-send-invoice-on-whatsapp" className="text-brand hover:underline">How to Send Invoice on WhatsApp</Link>
          {' · '}
          <Link href="/blog" className="text-brand hover:underline">GST Guides</Link>
        </p>
      </section>
    </main>
  )
}
