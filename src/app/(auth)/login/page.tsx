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

  async function handleGoogle() {
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    // On success the browser is redirected to Google, so we only reach here on error.
    if (error) setError(error.message)
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
            <>
              <button
                type="button"
                onClick={handleGoogle}
                className="btn-ghost w-full py-2.5"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                </svg>
                Continue with Google
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-line" />
                <span className="font-mono text-xs text-faint">or</span>
                <div className="h-px flex-1 bg-line" />
              </div>

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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
