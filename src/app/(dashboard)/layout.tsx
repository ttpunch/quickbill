import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import { ensureUserProfile, getUserProfile } from '@/modules/users/actions'
import { getUserSubscription } from '@/modules/billing/actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  await ensureUserProfile()

  // First-login gate — send users to onboarding until they set up their business.
  const profile = await getUserProfile()
  if (!profile?.onboarded_at) redirect('/onboarding')

  // Same "Pro" definition the billing page uses — active + unexpired sub.
  const subscription = await getUserSubscription()

  return (
    <div className="flex h-screen flex-col bg-paper lg:flex-row">
      <Sidebar userEmail={user.email ?? ''} isPro={!!subscription} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-10 sm:py-8">
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
