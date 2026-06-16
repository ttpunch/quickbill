'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ backgroundImage: 'linear-gradient(var(--color-line) 1px, transparent 1px)', backgroundSize: '100% 2.4rem', maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 70%)' }}
      />
      <div className="reveal relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="grid mx-auto h-12 w-12 place-items-center rounded-2xl bg-brand font-display text-2xl leading-none text-cream">Q</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink">QuickBill</h1>
          <p className="mt-1 text-sm text-muted">GST invoices for Indian freelancers</p>
        </div>

        <div className="card p-8">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-paid-soft">
                <svg className="h-6 w-6 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display text-lg font-semibold text-ink">Check your email</p>
              <p className="mt-1 text-sm text-muted">
                We sent a magic link to <span className="font-medium text-ink">{email}</span>
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-5 text-sm font-medium text-brand transition-colors hover:text-brand-700"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  suppressHydrationWarning
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field"
                />
              </div>

              {error && (
                <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>
              )}

              <button type="submit" disabled={loading || !email} className="btn-primary w-full py-2.5">
                {loading ? 'Sending…' : 'Send magic link'}
              </button>

              <p className="text-center font-mono text-xs text-faint">
                No password needed — we&apos;ll email you a sign-in link.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
