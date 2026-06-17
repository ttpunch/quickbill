import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CGST vs SGST vs IGST — Which Applies to You?',
  description: 'Confused by CGST, SGST, and IGST? This plain-English guide explains the difference and tells you exactly which tax to charge on your freelance invoice.',
  alternates: { canonical: '/blog/cgst-vs-sgst-vs-igst' },
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">GST Basics</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink leading-tight">
        CGST vs SGST vs IGST — Which Applies to You?
      </h1>
      <p className="mt-3 mb-10 font-mono text-xs text-faint">June 2026 · 6 min read</p>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          When you create a GST invoice in India, you need to decide whether to charge <strong className="text-ink">CGST + SGST</strong> or <strong className="text-ink">IGST</strong>. The answer depends on one thing: whether your client is in the same state as you or a different state. This guide explains the difference in plain English and tells you exactly what to put on your invoice.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">The short answer</h2>
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Client location</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Tax to charge</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Example (18% GST)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr>
                <td className="px-4 py-2.5 text-muted">Same state as you</td>
                <td className="px-4 py-2.5 font-semibold text-ink">CGST + SGST</td>
                <td className="px-4 py-2.5 font-mono text-brand">9% + 9% = 18%</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted">Different state</td>
                <td className="px-4 py-2.5 font-semibold text-ink">IGST</td>
                <td className="px-4 py-2.5 font-mono text-brand">18% IGST</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted">Outside India (export)</td>
                <td className="px-4 py-2.5 font-semibold text-ink">0% (LUT required)</td>
                <td className="px-4 py-2.5 font-mono text-brand">₹0 GST</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What is CGST?</h2>
        <p>
          <strong className="text-ink">CGST (Central Goods and Services Tax)</strong> is the portion of GST collected by the Central Government. It applies on intra-state transactions — when you and your client are both in the same state. The rate is always half of the total GST rate.
        </p>
        <p>
          Example: You're a freelancer in Maharashtra billing a client in Maharashtra at 18% GST. You charge <strong className="text-ink">9% CGST</strong> (goes to Central Government) + 9% SGST (goes to Maharashtra Government).
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What is SGST?</h2>
        <p>
          <strong className="text-ink">SGST (State Goods and Services Tax)</strong> is the state government's share of GST. It always applies alongside CGST for same-state transactions. The SGST rate equals the CGST rate.
        </p>
        <p>
          Each state has its own SGST Act (Maharashtra GST Act, Karnataka GST Act, etc.), but the rates are uniform across India.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">What is IGST?</h2>
        <p>
          <strong className="text-ink">IGST (Integrated Goods and Services Tax)</strong> applies on inter-state transactions — when you and your client are in different states. It's collected entirely by the Central Government and then shared with the destination state.
        </p>
        <p>
          The IGST rate equals the total GST rate (CGST + SGST combined). So 18% GST becomes 18% IGST — not 9+9.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Real-world examples for freelancers</h2>

        <div className="space-y-3">
          {[
            {
              scenario: 'Designer in Bengaluru (Karnataka) → Client in Bengaluru (Karnataka)',
              tax: 'CGST 9% + SGST (Karnataka) 9% = 18%',
              reason: 'Same state → intra-state → CGST + SGST',
            },
            {
              scenario: 'Developer in Mumbai (Maharashtra) → Client in Delhi',
              tax: 'IGST 18%',
              reason: 'Different states → inter-state → IGST',
            },
            {
              scenario: 'Writer in Chennai (Tamil Nadu) → US-based company',
              tax: '0% GST (export of services)',
              reason: 'Outside India → zero-rated → need LUT from GST portal',
            },
            {
              scenario: 'Consultant in Hyderabad (Telangana) → Client in Hyderabad',
              tax: 'CGST 9% + SGST (Telangana) 9%',
              reason: 'Same city, same state → CGST + SGST',
            },
          ].map(({ scenario, tax, reason }) => (
            <div key={scenario} className="card p-4">
              <p className="font-medium text-ink mb-1">{scenario}</p>
              <p className="font-mono text-xs text-brand mb-1">{tax}</p>
              <p className="text-xs text-faint">{reason}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">How to determine "place of supply" for services</h2>
        <p>
          For services, the <strong className="text-ink">place of supply</strong> is generally the location of the service recipient (your client). If your client is a registered business, use their GSTIN state. If they're an individual (unregistered), use the state where the service is actually performed or consumed.
        </p>
        <p>
          Special cases: for online services to individuals, the place of supply is the recipient's location. For services relating to immovable property, it's where the property is located.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Input Tax Credit (ITC) implications</h2>
        <p>
          Your client can claim Input Tax Credit on the GST you charge — but only on the correct type. If you charge CGST + SGST but it should have been IGST, your client cannot claim ITC correctly. This is why getting the split right matters beyond just compliance.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Exporting services to foreign clients</h2>
        <p>
          If you invoice foreign clients (US, UK, Europe, etc.) for services, your supply is an <strong className="text-ink">export of services</strong> and is zero-rated. You don't charge GST. But you must:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>File a <strong className="text-ink">Letter of Undertaking (LUT)</strong> on the GST portal each financial year</li>
          <li>Receive payment in foreign currency through banking channels</li>
          <li>Mention "Export of Services under LUT — IGST NIL" on your invoice</li>
        </ul>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">QuikBil handles all of this automatically</h2>
        <p>
          When you create an invoice on QuikBil, you select your client's state. QuikBil automatically applies CGST + SGST for same-state clients and IGST for inter-state clients — no manual calculation needed.
        </p>

        <div className="card p-6 bg-brand text-cream mt-8">
          <p className="font-display text-xl font-semibold mb-2">Stop worrying about CGST, SGST, IGST</p>
          <p className="text-sm text-cream/80 mb-4">QuikBil calculates the right tax split automatically. Free for first 5 invoices.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Create invoice free
          </Link>
        </div>

        <p className="pt-4 text-xs text-faint">
          Related:{' '}
          <Link href="/blog/gst-invoice-format-for-freelancers" className="text-brand hover:underline">GST Invoice Format for Freelancers</Link>
          {' · '}
          <Link href="/blog/how-to-create-gst-invoice" className="text-brand hover:underline">How to Create a GST Invoice</Link>
          {' · '}
          <Link href="/gst-invoice-generator" className="text-brand hover:underline">GST Invoice Generator</Link>
        </p>
      </div>
    </main>
  )
}
