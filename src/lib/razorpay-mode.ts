// Single source of truth for whether billing is live.
//
// We derive the mode from the Razorpay key prefix itself — no separate flag to
// keep in sync. Razorpay keys are `rzp_live_…` in production and `rzp_test_…`
// in test mode. Anything that is NOT an explicit live key (test key, missing
// key, misconfiguration) is treated as "not live", so upgrades stay disabled
// until real live keys are in place.
//
// To go live: set NEXT_PUBLIC_RAZORPAY_KEY_ID (and the matching secret +
// webhook secret) to the `rzp_live_…` values in Vercel. The "launching soon"
// UI then disappears on its own — no code change, no redeploy of source.
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ''

export const isRazorpayLiveMode = keyId.startsWith('rzp_live_')
export const isRazorpayTestMode = !isRazorpayLiveMode
