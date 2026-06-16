import { getUserProfile } from '@/modules/users/actions'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
  const profile = await getUserProfile()

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Settings</h1>
      <p className="text-sm text-gray-500 mb-8">Your business profile used on all invoices.</p>
      <SettingsForm profile={profile} />
    </div>
  )
}
