import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GST Invoice Tips & Guides for Indian Freelancers',
  description: 'Practical guides on GST invoicing, tax compliance, UPI payments, and growing your freelance business in India.',
  alternates: { canonical: '/blog' },
}

const posts = [
  {
    slug: 'how-to-create-gst-invoice',
    title: 'How to Create a GST Invoice in 60 Seconds',
    description: 'Step-by-step guide to generating a GST-compliant invoice online — no accountant needed.',
    date: 'June 2026',
    readTime: '5 min read',
    tag: 'How-to',
  },
  {
    slug: 'gst-invoice-format-for-freelancers',
    title: 'GST Invoice Format for Freelancers — Complete Guide 2026',
    description: 'Everything a freelancer needs to know about mandatory GST invoice fields, formats, and compliance.',
    date: 'June 2026',
    readTime: '8 min read',
    tag: 'Guide',
  },
  {
    slug: 'cgst-vs-sgst-vs-igst',
    title: 'CGST vs SGST vs IGST — Which Applies to You?',
    description: 'A plain-English explanation of how GST is split between central and state governments on every invoice.',
    date: 'June 2026',
    readTime: '6 min read',
    tag: 'GST Basics',
  },
  {
    slug: 'how-to-send-invoice-on-whatsapp',
    title: 'How to Send Invoice on WhatsApp to Clients',
    description: 'The fastest way to share a GST invoice with your client and collect payment via UPI — all from your phone.',
    date: 'June 2026',
    readTime: '4 min read',
    tag: 'Tips',
  },
  {
    slug: 'free-gst-invoice-templates',
    title: 'Free GST Invoice Templates for Freelancers',
    description: 'Download ready-to-use GST invoice templates or generate one instantly — free, no watermark for your first 5.',
    date: 'June 2026',
    readTime: '5 min read',
    tag: 'Templates',
  },
]

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="kicker mb-2">Resources</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">GST & Invoicing Guides</h1>
      <p className="mt-2 mb-12 text-muted">Practical guides for Indian freelancers on GST, invoicing, and getting paid faster.</p>

      <div className="space-y-6">
        {posts.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block card p-6 hover:border-brand/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <span className="badge bg-brand/10 text-brand text-xs">{post.tag}</span>
              <span className="font-mono text-xs text-faint">{post.date} · {post.readTime}</span>
            </div>
            <h2 className="font-display text-xl font-semibold text-ink group-hover:text-brand transition-colors mb-2">{post.title}</h2>
            <p className="text-sm text-muted leading-relaxed">{post.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-14 card p-8 text-center">
        <p className="font-display text-2xl font-semibold text-ink mb-2">Ready to create your first GST invoice?</p>
        <p className="text-sm text-muted mb-6">Free for your first 5 invoices. No credit card required.</p>
        <Link href="/login" className="btn-primary inline-block px-8 py-3">Start free — takes 60 seconds</Link>
      </div>
    </main>
  )
}
