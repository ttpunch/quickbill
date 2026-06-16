import { getUserProfile } from '@/modules/users/actions'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const profile = await getUserProfile()

  return (
    <div className="reveal max-w-xl">
      <p className="kicker mb-2">Your business</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">Settings</h1>
      <p className="mt-1 mb-8 text-sm text-muted">Your business profile, used on every invoice.</p>
      <SettingsForm profile={profile} />
    </div>
  )
}
