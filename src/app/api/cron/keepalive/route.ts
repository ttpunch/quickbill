import { createServiceClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Pings the database on a schedule so a free-tier Supabase project never hits
// the inactivity pause (which would error the first real visitor). Triggered
// by Vercel Cron (see vercel.ts); Vercel attaches `Authorization: Bearer
// <CRON_SECRET>` when CRON_SECRET is set.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: { code: 'unauthorized', message: 'Invalid cron secret', request_id: crypto.randomUUID() } },
      { status: 401 },
    )
  }

  const supabase = createServiceClient()
  const { error } = await supabase.from('subscription_plans').select('id').limit(1)

  if (error) {
    return NextResponse.json(
      { error: { code: 'keepalive_failed', message: error.message, request_id: crypto.randomUUID() } },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, ranAt: new Date().toISOString() })
}
