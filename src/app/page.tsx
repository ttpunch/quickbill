import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600 tracking-tight">QuickBill</span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">Log in</Link>
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
          Free plan · No credit card required
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
          GST invoices in{' '}
          <span className="text-indigo-600">60 seconds</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
          Create professional GST-compliant invoices, share via WhatsApp, and collect payment via UPI — built for Indian freelancers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors text-sm">
            Create your first invoice →
          </Link>
          <a href="#pricing" className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm">
            See pricing
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">Free forever · 5 invoices/month · No credit card</p>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-10">Everything you need</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '📄', title: 'GST-compliant PDFs', desc: 'Auto-calculates CGST + SGST. Clean professional PDF with your business name, GSTIN, and logo.' },
              { icon: '💬', title: 'Share via WhatsApp', desc: 'One tap sends the invoice to your client with a personalised message. No more copy-pasting.' },
              { icon: '💸', title: 'Collect via UPI', desc: 'Your UPI ID is printed on every invoice. Clients can pay instantly from any UPI app.' },
              { icon: '📧', title: 'Email invoices', desc: 'Send a professional email with invoice details directly to your client\'s inbox.' },
              { icon: '📊', title: 'Invoice history', desc: 'Track paid and unpaid invoices. Mark payments received. See your total earnings at a glance.' },
              { icon: '⚡', title: '60-second creation', desc: 'Fill client name, add line items, choose GST rate — everything else is calculated for you.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 mb-8">Trusted by freelancers across India</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Priya M.', role: 'UI/UX Designer, Pune', quote: 'I used to spend an hour creating invoices in Excel. QuickBill gets it done in under a minute.' },
              { name: 'Arjun K.', role: 'Freelance Developer, Bangalore', quote: 'The WhatsApp share feature is brilliant. My clients love getting the invoice directly on WhatsApp.' },
              { name: 'Meera S.', role: 'Content Writer, Mumbai', quote: 'Finally a tool that handles GST properly. CGST and SGST auto-calculated — no more manual errors.' },
            ].map(t => (
              <div key={t.name} className="text-left bg-gray-50 rounded-xl p-5 border border-gray-100">
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Simple pricing</h2>
          <p className="text-sm text-gray-400 text-center mb-10">Start free. Upgrade when you need more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'Free', price: '₹0', period: 'forever', features: ['5 invoices / month', 'PDF download', 'WhatsApp share', 'QuickBill watermark'], cta: 'Get started free', highlight: false },
              { name: 'Pro Monthly', price: '₹299', period: '/month', features: ['Unlimited invoices', 'No watermark', 'Email to clients', 'UPI payment links', 'Priority support'], cta: 'Start Pro', highlight: true },
              { name: 'Pro Annual', price: '₹2,499', period: '/year', features: ['Everything in Pro', 'Save ₹1,089/year', '2 months free'], cta: 'Start Annual', highlight: false },
            ].map(p => (
              <div key={p.name} className={`rounded-xl p-6 border ${p.highlight ? 'border-indigo-200 bg-indigo-50 ring-2 ring-indigo-500 ring-offset-2' : 'border-gray-100 bg-white'}`}>
                <p className="font-semibold text-gray-900 mb-1">{p.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-bold ${p.highlight ? 'text-indigo-600' : 'text-gray-900'}`}>{p.price}</span>
                  <span className="text-xs text-gray-400">{p.period}</span>
                </div>
                <ul className="mt-4 mb-6 space-y-2">
                  {p.features.map(f => (
                    <li key={f} className="text-xs text-gray-600 flex items-center gap-1.5">
                      <span className="text-green-500 font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/login" className={`block text-center py-2 rounded-lg text-sm font-medium transition-colors ${p.highlight ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-14">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to send your first invoice?</h2>
          <p className="text-indigo-200 text-sm mb-6">Join thousands of Indian freelancers using QuickBill.</p>
          <Link href="/login" className="inline-block px-6 py-3 bg-white text-indigo-600 font-semibold text-sm rounded-xl hover:bg-indigo-50 transition-colors">
            Create invoice for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm font-bold text-indigo-600">QuickBill</span>
          <p className="text-xs text-gray-400">© 2026 QuickBill. GST Invoice Generator for Indian Freelancers.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
