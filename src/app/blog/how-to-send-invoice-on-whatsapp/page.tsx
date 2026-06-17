import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Send Invoice on WhatsApp to Clients',
  description: 'The fastest way to share a GST invoice on WhatsApp and collect payment via UPI — step by step for Indian freelancers.',
  alternates: { canonical: '/blog/how-to-send-invoice-on-whatsapp' },
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">Tips</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink leading-tight">
        How to Send Invoice on WhatsApp to Clients
      </h1>
      <p className="mt-3 mb-10 font-mono text-xs text-faint">June 2026 · 4 min read</p>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          Most Indian freelancers already use WhatsApp to communicate with clients. Sending your <strong className="text-ink">invoice on WhatsApp</strong> is the fastest way to get paid — your client sees it immediately, and with a UPI link on the invoice, they can pay in seconds without even switching apps. Here’s exactly how to do it.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Why WhatsApp is the best invoice delivery method in India</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Instant delivery</strong> — no spam folder, no email delay</li>
          <li><strong className="text-ink">High open rate</strong> — WhatsApp messages are read within minutes vs hours for email</li>
          <li><strong className="text-ink">Easy payment</strong> — clients tap your UPI link directly from WhatsApp</li>
          <li><strong className="text-ink">Familiar interface</strong> — clients are comfortable in WhatsApp, less friction than a portal</li>
          <li><strong className="text-ink">Proof of delivery</strong> — blue ticks confirm the client received and read your invoice</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Step-by-step: Send a GST invoice on WhatsApp</h2>

        <div className="space-y-4">
          {[
            {
              step: '1',
              title: 'Create your invoice on QuikBil',
              desc: 'Go to quikbil.com, click "New Invoice," fill in your client details and service items. Select the correct GST rate — QuikBil calculates CGST/SGST or IGST automatically.',
            },
            {
              step: '2',
              title: 'Add your UPI ID in Settings',
              desc: 'Go to Settings → add your UPI ID (e.g. yourname@upi or your phone number@paytm). QuikBil prints a UPI payment link on every invoice with the exact amount pre-filled.',
            },
            {
              step: '3',
              title: 'Tap "Share on WhatsApp"',
              desc: 'After generating your invoice, tap the WhatsApp share button. QuikBil opens WhatsApp with the PDF attached and a pre-written message. Select your client\'s chat and send.',
            },
            {
              step: '4',
              title: 'Client pays via UPI',
              desc: 'Your client opens the PDF, taps the UPI link, and pays from PhonePe, Google Pay, Paytm, or their bank app. The exact amount is pre-filled — no chance of wrong amounts.',
            },
            {
              step: '5',
              title: 'Get a payment notification',
              desc: 'You receive a UPI credit notification instantly. Mark the invoice as paid in QuikBil to keep your records clean.',
            },
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

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What the UPI payment link looks like</h2>
        <p>QuikBil generates a UPI deep link in this format:</p>
        <div className="card p-4 font-mono text-xs text-ink bg-paper-deep overflow-x-auto">
          upi://pay?pa=yourname@upi&amp;pn=Your+Business&amp;am=29500&amp;cu=INR&amp;tn=Invoice+QB-2026-001
        </div>
        <p>When a client taps this link, their UPI app opens with your UPI ID, your business name, and the exact invoice amount (₹29,500 in this example) pre-filled. They just enter their PIN and pay.</p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">WhatsApp message template to send with your invoice</h2>
        <p>Here’s a professional message template you can customise:</p>
        <div className="card p-4 bg-paper-deep text-ink space-y-2">
          <p>Hi [Client Name],</p>
          <p>Please find the invoice for [Project Name] attached.</p>
          <p><strong>Invoice:</strong> QB-2026-001<br /><strong>Amount:</strong> ₹29,500 (incl. 18% GST)<br /><strong>Due date:</strong> 25 June 2026</p>
          <p>You can pay directly via UPI using the link on the invoice, or transfer to [your UPI ID].</p>
          <p>Let me know if you have any questions. Thank you!</p>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Tips to get paid faster via WhatsApp</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Send the invoice the same day you complete the work</strong> — payment probability drops significantly after 48 hours</li>
          <li><strong className="text-ink">Follow up with a reminder after 3 days</strong> — a short, polite WhatsApp message is less intrusive than email</li>
          <li><strong className="text-ink">Add a due date on every invoice</strong> — clients pay faster when there’s a specific date</li>
          <li><strong className="text-ink">Keep the PDF under 5MB</strong> — large PDFs don’t open on older phones; QuikBil optimises PDF size automatically</li>
          <li><strong className="text-ink">Use a professional business name</strong> — it appears on the UPI payment screen, which builds client trust</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Is it legal to send a GST invoice on WhatsApp?</h2>
        <p>
          Yes, completely. A GST invoice can be issued electronically — as a PDF via WhatsApp, email, or any digital channel. The GST law does not require physical delivery. The only requirement is that the invoice contains all mandatory fields and is issued within the time limit.
        </p>

        <div className="card p-6 bg-brand text-cream mt-8">
          <p className="font-display text-xl font-semibold mb-2">Create your invoice and share on WhatsApp — in 60 seconds</p>
          <p className="text-sm text-cream/80 mb-4">Free for your first 5 invoices. UPI payment link included on every invoice.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Start free
          </Link>
        </div>

        <p className="pt-4 text-xs text-faint">
          Related:{' '}
          <Link href="/blog/how-to-create-gst-invoice" className="text-brand hover:underline">How to Create a GST Invoice in 60 Seconds</Link>
          {' · '}
          <Link href="/upi-invoice" className="text-brand hover:underline">UPI Invoice</Link>
          {' · '}
          <Link href="/invoice-for-freelancers" className="text-brand hover:underline">Invoice for Freelancers</Link>
        </p>
      </div>
    </main>
  )
}
