// Single source of truth for canonical URL + marketing copy, shared by
// metadata, sitemap, robots, and JSON-LD structured data.

const rawUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://quickbill.in'

export const SITE = {
  url: rawUrl.replace(/\/$/, ''),
  name: 'QuickBill',
  title: 'QuickBill — GST Invoice Generator for Indian Freelancers',
  tagline: 'GST invoices, drafted in 60 seconds.',
  description:
    'Create GST-compliant invoices in 60 seconds, share them on WhatsApp, and collect payment over UPI — built for Indian freelancers. Free for your first 5 invoices a month.',
  locale: 'en_IN',
  twitter: '@quickbill',
  keywords: [
    'GST invoice generator',
    'invoice maker India',
    'free invoice generator',
    'GST bill format',
    'invoice for freelancers India',
    'UPI invoice',
    'WhatsApp invoice',
    'GST compliant invoice',
  ],
} as const

export const FAQS = [
  {
    q: 'Is QuickBill free to use?',
    a: 'Yes. The free plan lets you create up to 5 GST-compliant invoices per month with PDF download and WhatsApp sharing. Pro is ₹299/month for unlimited invoices and no watermark.',
  },
  {
    q: 'Are the invoices GST-compliant?',
    a: 'Yes. QuickBill auto-calculates CGST and SGST, splits tax correctly, and produces a professional PDF carrying your business name, GSTIN, and logo.',
  },
  {
    q: 'Can clients pay me through the invoice?',
    a: 'Yes. Your UPI ID is printed on every invoice, so clients can pay instantly from any UPI app. You can also share the invoice on WhatsApp in one tap.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. QuickBill runs in your browser. Sign in with your email, fill in the client and line items, pick a GST rate, and your invoice is ready in under a minute.',
  },
] as const
