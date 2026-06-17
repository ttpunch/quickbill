import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ensureUserProfile, getUserProfile } from '@/modules/users/actions'
import OnboardingForm from './OnboardingForm'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await ensureUserProfile()
  const profile = await getUserProfile()

  // Already onboarded — straight to the dashboard.
  if (profile?.onboarded_at) redirect('/dashboard')

  return (
    <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
      <div className="reveal relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="grid mx-auto h-12 w-12 place-items-center rounded-2xl bg-brand font-display text-2xl leading-none text-cream">Q</span>
          <p className="kicker mt-4 mb-1">Welcome to QuickBill</p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Set up your business</h1>
          <p className="mt-2 text-sm text-muted">
            This appears on every invoice and PDF you send. You can change it anytime in Settings.
          </p>
        </div>

        <OnboardingForm
          defaultName={profile?.name ?? user.email?.split('@')[0] ?? ''}
        />
      </div>
    </div>
  )
}
