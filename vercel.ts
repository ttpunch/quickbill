import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  framework: 'nextjs',
  crons: [
    // Daily ping so a free-tier Supabase project never hits the 7-day
    // inactivity pause. Guarded by CRON_SECRET (see the route handler).
    { path: '/api/cron/keepalive', schedule: '0 6 * * *' },
    // Daily payment reminders for overdue unpaid invoices. Guarded by
    // CRON_SECRET. Runs at 9am UTC (~2:30pm IST).
    { path: '/api/cron/reminders', schedule: '0 9 * * *' },
  ],
}
