import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  framework: 'nextjs',
  crons: [
    // Daily ping so a free-tier Supabase project never hits the 7-day
    // inactivity pause. Guarded by CRON_SECRET (see the route handler).
    { path: '/api/cron/keepalive', schedule: '0 6 * * *' },
  ],
}
