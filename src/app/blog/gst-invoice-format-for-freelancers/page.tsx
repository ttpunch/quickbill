import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GST Invoice Format for Freelancers — Complete Guide 2026',
  description: 'Learn the exact GST invoice format required for Indian freelancers in 2026 — mandatory fields, SAC codes, GST rates, and downloadable PDF.',
  alternates: { canonical: '/blog/gst-invoice-format-for-freelancers' },
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">Guide</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink leading-tight">
        GST Invoice Format for Freelancers — Complete Guide 2026
      </h1>
      <p className="mt-3 mb-10 font-mono text-xs text-faint">June 2026 · 8 min read</p>

      <div className="space-y-6 text-sm leading-relaxed text-muted">
        <p>
          The <strong className="text-ink">GST invoice format for freelancers</strong> in India has specific requirements under the CGST Act 2017. Whether you’re a designer, developer, writer, or consultant, you must issue a GST-compliant invoice for every client billing if you’re registered under GST. This complete guide covers every field, common SAC codes, and how to generate your invoice in under a minute.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Who needs to issue a GST invoice?</h2>
        <p>You must register for GST and issue GST invoices if your annual service income exceeds:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">₹20 lakhs</strong> — for most states</li>
          <li><strong className="text-ink">₹10 lakhs</strong> — for special category states (Manipur, Mizoram, Nagaland, Tripura)</li>
          <li><strong className="text-ink">Any amount</strong> — if you provide services to clients outside India (export of services), even if turnover is below the threshold</li>
        </ul>
        <p>Below these limits, you can issue a regular bill of supply without GST.</p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Mandatory fields in a GST invoice format</h2>
        <p>Rule 46 of the CGST Rules 2017 mandates the following on every tax invoice:</p>

        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Field</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Supplier name', 'Your registered business name'],
                ['Supplier address', 'Registered address under GST'],
                ['GSTIN', 'Your 15-digit GST Identification Number'],
                ['Invoice number', 'Unique sequential number (e.g. QB-2026-001)'],
                ['Invoice date', 'Date of issue'],
                ['Recipient name & address', 'Client\'s billing name and address'],
                ['Recipient GSTIN', 'Client\'s GSTIN (if registered)'],
                ['Place of supply', 'State where service is delivered'],
                ['SAC code', 'Service Accounting Code for your service'],
                ['Description of service', 'Clear description of work done'],
                ['Taxable value', 'Your fee before GST'],
                ['GST rate', 'Applicable rate (5%, 12%, 18%, or 28%)'],
                ['CGST / SGST or IGST', 'Tax amount split correctly'],
                ['Total amount', 'Taxable value + GST'],
                ['Signature', 'Physical or digital signature'],
              ].map(([field, detail]) => (
                <tr key={field}>
                  <td className="px-4 py-2.5 font-medium text-ink">{field}</td>
                  <td className="px-4 py-2.5 text-muted">{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">SAC codes for common freelance services</h2>
        <p>The SAC (Service Accounting Code) identifies the type of service for GST classification. Use the correct SAC on your invoice:</p>
        <div className="card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="bg-paper-deep">
              <tr>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">Service</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">SAC code</th>
                <th className="px-4 py-2.5 text-left font-semibold text-ink">GST rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['Web / software development', '998314', '18%'],
                ['Graphic / UI design', '998392', '18%'],
                ['Content writing', '998391', '18%'],
                ['Digital marketing', '998361', '18%'],
                ['Business consulting', '998311', '18%'],
                ['Photography', '998382', '18%'],
                ['Video production', '998392', '18%'],
                ['Training / e-learning', '999293', '18%'],
                ['Data entry / processing', '998313', '18%'],
              ].map(([service, sac, rate]) => (
                <tr key={service}>
                  <td className="px-4 py-2.5 text-muted">{service}</td>
                  <td className="px-4 py-2.5 font-mono text-ink">{sac}</td>
                  <td className="px-4 py-2.5 font-mono font-semibold text-brand">{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">CGST + SGST vs IGST — which to use?</h2>
        <p>The GST split depends on the location of your client:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong className="text-ink">Same state client:</strong> Split GST as CGST (half) + SGST (half). E.g., 18% GST = 9% CGST + 9% SGST.</li>
          <li><strong className="text-ink">Different state client:</strong> Charge IGST at the full rate. E.g., 18% IGST.</li>
          <li><strong className="text-ink">Foreign client (export):</strong> Zero-rated (0% GST) — you must have a Letter of Undertaking (LUT) filed with GST portal.</li>
        </ul>
        <p>QuikBil automatically applies the right split based on the state you select for your client.</p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Invoice numbering rules</h2>
        <p>GST rules require invoice numbers to be:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Unique within a financial year (April to March)</li>
          <li>Sequential — no gaps allowed</li>
          <li>Not more than 16 characters</li>
          <li>Can include letters, numbers, and hyphens (e.g., QB-2026-001)</li>
        </ul>
        <p>Never reuse an invoice number or skip numbers. If you void an invoice, mark it cancelled — do not delete it.</p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Time limit for issuing a GST invoice</h2>
        <p>
          For services, you must issue the invoice within <strong className="text-ink">30 days</strong> of the date of supply (i.e., completion of service or receipt of payment, whichever is earlier). Banking and financial services have a 45-day limit.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Digital vs physical GST invoice</h2>
        <p>
          A GST invoice can be issued digitally — as a PDF sent by email or WhatsApp. There is no requirement to print it. The invoice must include a digital signature or the supplier’s name printed in lieu of a signature.
        </p>

        <h2 className="font-display text-2xl font-semibold text-ink pt-4">Generate your GST invoice in 60 seconds</h2>
        <p>
          QuikBil generates GST-compliant invoices automatically. Enter your client details, add your service line items, select the GST rate, and download your PDF — all in under a minute. Your GSTIN, invoice number, and correct CGST/SGST split are calculated for you.
        </p>

        <div className="card p-6 bg-brand text-cream mt-8">
          <p className="font-display text-xl font-semibold mb-2">Create a GST invoice now — free</p>
          <p className="text-sm text-cream/80 mb-4">Correct format guaranteed. Free for your first 5 invoices.</p>
          <Link href="/login" className="inline-block bg-cream text-brand font-semibold text-sm px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity">
            Generate my invoice
          </Link>
        </div>

        <p className="pt-4 text-xs text-faint">
          Related:{' '}
          <Link href="/blog/how-to-create-gst-invoice" className="text-brand hover:underline">How to Create a GST Invoice in 60 Seconds</Link>
          {' · '}
          <Link href="/blog/cgst-vs-sgst-vs-igst" className="text-brand hover:underline">CGST vs SGST vs IGST</Link>
          {' · '}
          <Link href="/gst-invoice-generator" className="text-brand hover:underline">GST Invoice Generator</Link>
        </p>
      </div>
    </main>
  )
}
