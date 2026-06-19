-- ============================================================================
-- ONE-TIME "GO LIVE" RESET  —  run this manually when switching Razorpay from
-- test mode to live mode (i.e. when you paste rzp_live_… keys into Vercel).
--
-- Do NOT keep this in supabase/migrations/ — it is not a schema migration and
-- must only ever be run intentionally, once.
--
-- WHY: During the beta the free tier is uncapped (see src/modules/invoices/
-- actions.ts — the cap is skipped while Razorpay is in test mode). `invoice_count`
-- is a cumulative lifetime counter that is never reset, so by go-live many users
-- will have counts well above the free limit of 5. Without this reset, every
-- active beta user would be instantly hard-blocked from creating invoices the
-- moment live keys are configured. Resetting gives everyone a fresh allowance
-- and a fair upgrade prompt.
--
-- HOW: paste into the Supabase SQL editor and run it AFTER you have switched
-- the Razorpay env vars to live keys and redeployed.
-- ============================================================================

UPDATE public.users
SET invoice_count = 0,
    updated_at    = now()
WHERE deleted_at IS NULL;

-- Optional sanity check (run separately): everyone should be back to 0.
-- SELECT id, email, invoice_count FROM public.users ORDER BY created_at;
