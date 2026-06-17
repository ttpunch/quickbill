import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free GST Invoice Templates for Freelancers in India 2026',
  description: 'Download free GST invoice templates for freelancers — or generate a compliant invoice online in 60 seconds with QuikBil.',
  alternates: { canonical: '/blog/free-gst-invoice-templates' },
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">Templates</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink leading-tight">
        Free GST Invoice Templates for Freelancers in India 2026
      </h1>
      <p className="mt-3 mb-10 font-mono text-xs text-faint">June 2026 · 5 min read</p>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          Every freelancer in India who earns above ₹20 lakhs per year needs to issue a GST-compliant invoice. If you’re looking for <strong className="text-ink">free GST invoice templates</strong>, this page covers what your template must include, common template formats, and the fastest way to generate one online.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What a GST invoice template must include</h2>
        <p>Under Rule 46 of the CGST Rules, every GST invoice for services must contain these fields:</p>

        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Section</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Required fields</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Your details', 'Business name, address, GSTIN'],
                ['Invoice info', 'Invoice number (sequential), invoice date'],
                ['Client details', 'Name, address, GSTIN (if registered)'],
                ['Supply details', 'Place of supply (state)'],
                ['Line items', 'Description, SAC code, quantity, rate, taxable value'],
                ['Tax amounts', 'CGST rate + amount, SGST rate + amount (or IGST)'],
                ['Totals', 'Subtotal, total GST, grand total'],
                ['Payment info', 'Bank details or UPI ID'],
                ['Signature', 'Your name or digital signature'],
              ].map(([section, fields]) => (
                <tr key={section}>
                  <td className="px-4 py-2.5 font-medium text-ink">{section}</td>
                  <td className="px-4 py-2.5 text-muted">{fields}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Types of GST invoice templates for freelancers</h2>

        <div className="space-y-3">
          {[
            {
              title: 'Project-based invoice',
              desc: 'For fixed-price projects — one line item with the total project value. Most common for design, development, and writing projects.',
              example: 'Website redesign — ₹50,000 + 18% GST = ₹59,000',
            },
            {
              title: 'Hourly/retainer invoice',
              desc: 'For time-based billing — multiple line items or a single retainer with hours noted in the description.',
              example: '40 hours @ ₹2,500/hr = ₹1,00,000 + 18% GST',
            },
            {
              title: 'Milestone invoice',
              desc: 'For long projects split into phases — each invoice covers a completed milestone.',
              example: 'Milestone 2: Backend API development — ₹75,000 + GST',
            },
            {
              title: 'Multi-service invoice',
              desc: 'For agencies or freelancers offering multiple services in one bill — separate line items for each.',
              example: 'Design (₹30,000) + Copywriting (₹15,000) = ₹45,000 + GST',
            },
          ].map(({ title, desc, example }) => (
            <div key={title} className="card p-4">
              <p className="font-semibold text-ink mb-1">{title}</p>
              <p className="mb-2">{desc}</p>
              <p className="font-mono text-xs text-brand">{example}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Why most Excel/Word templates fail</h2>
        <p>Free GST invoice templates in Word or Excel have critical problems:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Manual GST calculation:</strong> You have to enter the CGST and SGST amounts yourself — one wrong formula and you’re non-compliant</li>
          <li><strong className="text-ink">No invoice numbering:</strong> Templates don’t track your last invoice number — you must manually ensure sequential numbering</li>
          <li><strong className="text-ink">Wrong CGST/IGST split:</strong> Templates don’t know your client’s state — you have to remember to use IGST for inter-state clients</li>
          <li><strong className="text-ink">No UPI payment link:</strong> You have to add your UPI ID separately and the client still has to type it manually</li>
          <li><strong className="text-ink">Hard to share:</strong> PDF export from Word/Excel often has formatting issues and large file sizes</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">SAC codes to add to your template</h2>
        <p>Your template must include the correct SAC (Service Accounting Code) for your service type. Here are the most common ones:</p>
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Freelance service</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">SAC code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Software / web development', '998314'],
                ['UI/UX / graphic design', '998392'],
                ['Content writing / copywriting', '998391'],
                ['SEO / digital marketing', '998361'],
                ['Business consulting / strategy', '998311'],
                ['Photography / video editing', '998382'],
                ['Online training / coaching', '999293'],
                ['Data analysis / processing', '998313'],
              ].map(([service, sac]) => (
                <tr key={service}>
                  <td className="px-4 py-2.5 text-muted">{service}</td>
                  <td className="px-4 py-2.5 font-mono text-ink">{sac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Generate a GST invoice online — faster than any template</h2>
        <p>
          Instead of filling a template manually, QuikBil generates a GST-compliant invoice in 60 seconds. Enter your client details and service, select the GST rate, and download a pixel-perfect PDF — with the correct CGST/SGST or IGST split calculated automatically.
        </p>
        <p>
          Your first 5 invoices are completely free. No credit card, no account setup — just sign in with Google and start invoicing.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What QuikBil includes that templates don’t</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Automatic CGST + SGST vs IGST split based on your client’s state</li>
          <li>Sequential invoice numbering with no gaps</li>
          <li>UPI payment link pre-filled with exact invoice amount</li>
          <li>WhatsApp share button to send the PDF in one tap</li>
          <li>PDF optimised for mobile (under 500KB)</li>
          <li>All 5 mandatory GST fields pre-validated before PDF generation</li>
        </ul>

        <div className="card p-6 bg-brand text-cream mt-8">
          <p className="font-display text-xl font-semibold mb-2">Skip the template. Create your invoice now — free.</p>
          <p className="text-sm text-cream/80 mb-4">Correct, compliant, shareable in 60 seconds. Free for first 5 invoices.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Create invoice free
          </Link>
        </div>

        <p className="pt-4 text-xs text-faint">
          Related:{' '}
          <Link href="/blog/gst-invoice-format-for-freelancers" className="text-brand hover:underline">GST Invoice Format for Freelancers</Link>
          {' · '}
          <Link href="/gst-invoice-generator" className="text-brand hover:underline">GST Invoice Generator</Link>
          {' · '}
          <Link href="/invoice-for-freelancers" className="text-brand hover:underline">Invoice for Freelancers</Link>
        </p>
      </div>
    </main>
  )
}
