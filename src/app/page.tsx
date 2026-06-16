import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const features = [
  { title: 'GST-compliant PDFs', desc: 'Auto-calculates CGST + SGST. Clean, professional PDFs carrying your business name, GSTIN, and logo.' },
  { title: 'Share via WhatsApp', desc: 'One tap sends the invoice to your client with a personalised message. No more copy-pasting.' },
  { title: 'Collect via UPI', desc: 'Your UPI ID is printed on every invoice. Clients pay instantly from any UPI app.' },
  { title: 'Email to clients', desc: 'Send a polished email with the invoice details straight to your client\'s inbox.' },
  { title: 'Invoice history', desc: 'Track paid and unpaid invoices, mark payments received, and see total earnings at a glance.' },
  { title: '60-second creation', desc: 'Fill the client, add line items, pick a GST rate — everything else is calculated for you.' },
]

const testimonials = [
  { name: 'Priya M.', role: 'UI/UX Designer · Pune', quote: 'I used to spend an hour building invoices in Excel. QuickBill gets it done in under a minute.' },
  { name: 'Arjun K.', role: 'Freelance Developer · Bangalore', quote: 'The WhatsApp share is brilliant. My clients love getting the invoice directly on WhatsApp.' },
  { name: 'Meera S.', role: 'Content Writer · Mumbai', quote: 'Finally a tool that handles GST properly. CGST and SGST auto-split — no more manual errors.' },
]

const plans = [
  { name: 'Free', price: '₹0', period: 'forever', features: ['5 invoices / month', 'PDF download', 'WhatsApp share', 'QuickBill watermark'], cta: 'Get started free', highlight: false },
  { name: 'Pro Monthly', price: '₹299', period: '/month', features: ['Unlimited invoices', 'No watermark', 'Email to clients', 'UPI payment links', 'Priority support'], cta: 'Start Pro', highlight: true },
  { name: 'Pro Annual', price: '₹2,499', period: '/year', features: ['Everything in Pro', 'Save ₹1,089 a year', '2 months free'], cta: 'Start Annual', highlight: false },
]

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand text-cream font-display text-base leading-none">Q</span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">QuickBill</span>
    </span>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-30 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Wordmark />
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-sm font-medium text-muted transition-colors hover:text-ink">Log in</Link>
            <Link href="/login" className="btn-primary">Get started free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Ledger ruling motif */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{ backgroundImage: 'linear-gradient(var(--color-line) 1px, transparent 1px)', backgroundSize: '100% 2.4rem', maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 75%)' }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div>
            <p className="kicker reveal mb-5" style={{ animationDelay: '0ms' }}>For Indian freelancers · No card needed</p>
            <h1 className="reveal font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl" style={{ animationDelay: '80ms' }}>
              GST invoices,<br />drafted in{' '}
              <span className="marker">60 seconds</span>.
            </h1>
            <p className="reveal mt-6 max-w-md text-lg leading-relaxed text-muted" style={{ animationDelay: '160ms' }}>
              Create GST-compliant invoices, share them on WhatsApp, and collect payment over UPI — all from one calm, precise ledger.
            </p>
            <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
              <Link href="/login" className="btn-primary px-6 py-3 text-[0.95rem]">Create your first invoice →</Link>
              <a href="#pricing" className="btn-ghost px-6 py-3 text-[0.95rem]">See pricing</a>
            </div>
            <p className="reveal mt-5 font-mono text-xs text-faint" style={{ animationDelay: '320ms' }}>
              Free forever · 5 invoices / month · no credit card
            </p>
          </div>

          {/* Floating invoice mockup */}
          <div className="reveal relative hidden lg:block" style={{ animationDelay: '300ms' }}>
            <div className="card relative ml-auto max-w-sm -rotate-2 p-6 transition-transform duration-500 hover:rotate-0">
              <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden rounded-[1.25rem]">
                <span className="font-display text-6xl font-semibold text-brand/[0.05] -rotate-[24deg]">QuickBill</span>
              </div>
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-lg font-semibold text-brand">Sharma Studio</p>
                    <p className="text-xs text-faint">GST Invoice</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm font-medium text-ink">INV-2026-014</p>
                    <span className="badge mt-1.5 bg-paid-soft text-paid">● Paid</span>
                  </div>
                </div>
                <div className="my-5 h-px bg-line" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted"><span>Brand identity design</span><span className="font-mono text-ink">₹40,000</span></div>
                  <div className="flex justify-between text-muted"><span>Landing page</span><span className="font-mono text-ink">₹25,000</span></div>
                </div>
                <div className="my-4 h-px bg-line" />
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted"><span>CGST (9%)</span><span className="font-mono">₹5,850</span></div>
                  <div className="flex justify-between text-muted"><span>SGST (9%)</span><span className="font-mono">₹5,850</span></div>
                  <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
                    <span className="font-display text-base font-semibold text-ink">Total</span>
                    <span className="font-mono text-lg font-semibold text-brand">₹76,700</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl px-4 py-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-soft text-gold">₹</span>
              <div>
                <p className="font-mono text-sm font-semibold text-ink">UPI · instant</p>
                <p className="text-xs text-faint">paid in seconds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-6 sm:grid-cols-4">
          {[
            { k: '60s', v: 'to a finished invoice' },
            { k: '5', v: 'GST rates, auto-split' },
            { k: '0', v: 'spreadsheets needed' },
            { k: 'UPI', v: 'paid on every PDF' },
          ].map((s) => (
            <div key={s.v} className="px-4 py-7 text-center">
              <p className="font-display text-3xl font-semibold text-brand">{s.k}</p>
              <p className="mt-1 text-xs text-muted">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features — editorial ledger list */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-xl">
          <p className="kicker mb-3">Everything you need</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A complete billing desk, without the bloat.
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="group bg-surface p-7 transition-colors hover:bg-cream">
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-line bg-surface/60 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="kicker mb-10 text-center">Trusted across India</p>
          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="card flex flex-col p-6">
                <span className="font-display text-4xl leading-none text-gold">&ldquo;</span>
                <blockquote className="-mt-2 flex-1 text-sm leading-relaxed text-ink">{t.quote}</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="font-mono text-xs text-faint">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="kicker mb-3">Simple pricing</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Start free. Upgrade when you grow.</h2>
        </div>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`card relative flex flex-col p-6 ${p.highlight ? 'ring-2 ring-gold' : ''}`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-widest text-cream">
                  Most popular
                </span>
              )}
              <p className="font-display text-lg font-semibold text-ink">{p.name}</p>
              <div className="mt-1 flex items-baseline gap-1">
                <span className={`font-display text-4xl font-semibold ${p.highlight ? 'text-brand' : 'text-ink'}`}>{p.price}</span>
                <span className="text-xs text-faint">{p.period}</span>
              </div>
              <ul className="mt-5 mb-7 flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/login" className={p.highlight ? 'btn-primary w-full py-2.5' : 'btn-ghost w-full py-2.5'}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="relative overflow-hidden bg-brand">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, var(--color-gold) 0, transparent 45%), radial-gradient(circle at 85% 80%, #2f8a63 0, transparent 50%)' }} />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl font-semibold text-cream sm:text-4xl">Ready to send your first invoice?</h2>
          <p className="mx-auto mt-3 max-w-md text-brand-soft">Join thousands of Indian freelancers billing the calm way.</p>
          <Link href="/login" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 text-sm font-semibold text-brand transition-transform hover:-translate-y-0.5">
            Create invoice for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <Wordmark />
          <p className="font-mono text-xs text-faint">© 2026 QuickBill · GST invoicing for India</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-xs text-muted transition-colors hover:text-ink">Privacy</Link>
            <Link href="/terms" className="text-xs text-muted transition-colors hover:text-ink">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
