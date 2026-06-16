# QuickBill — Local Setup

Get QuickBill running on a new machine (e.g. switching between Windows and Mac).

## 1. Clone & install

```bash
git clone https://github.com/ttpunch/quickbill.git
cd quickbill
npm install
```

## 2. Environment variables

`.env.local` is **not** committed (it holds secrets). Create it in the project root
and fill in the values from your password manager / secure note:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=invoices@quickbill.in

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> All three services (Supabase, Razorpay, Resend) are cloud-hosted, so every machine
> talks to the same backend — no data migration needed when you switch computers.

## 3. Run

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm test           # vitest unit tests
```

## 4. Razorpay webhooks (local testing)

Razorpay needs a public HTTPS URL, so tunnel localhost with ngrok.

**Install:**
- macOS: `brew install ngrok`
- Windows: `winget install ngrok` or download from ngrok.com

**Authenticate once per machine:**
```bash
ngrok config add-authtoken YOUR_NGROK_TOKEN
```

**Run alongside the dev server (separate terminal):**
```bash
ngrok http 3000
```

Copy the `https://xxxx.ngrok-free.app` URL it prints, then:

1. **Razorpay Dashboard → Settings → Webhooks** — set the URL to
   `https://xxxx.ngrok-free.app/api/razorpay/webhook`, events `payment.captured`
   and `subscription.cancelled`. The secret must match `RAZORPAY_WEBHOOK_SECRET`.
2. **`next.config.ts`** — add the ngrok host to `allowedDevOrigins`:
   ```ts
   allowedDevOrigins: ['xxxx.ngrok-free.dev'],
   ```
   Restart `npm run dev` after editing.

> The free ngrok URL changes every restart — update both places each session.
> In production (Vercel) this is unnecessary; the Vercel URL is already HTTPS.

### Razorpay test payments (Test Mode)
- Indian test card: `5267 3181 8797 5449`, any future expiry, CVV `123`, OTP `1234`
- Or UPI: `success@razorpay` (succeeds) / `failure@razorpay` (fails)
- Note: `4111 1111 1111 1111` is blocked in test mode (international card)

## 5. Database (Supabase)

The schema already exists in the shared Supabase project — nothing to run on a new
machine. If you ever need to inspect or change it, use the Supabase dashboard SQL
editor. Migrations live in `supabase/migrations/`.

> Heads-up: the live schema differs from `0003_full_clean.sql`. The application code
> is aligned to the **live** schema. Do not run `0003_full_clean.sql` against the live
> database — it would drop and rebuild tables with column names the code no longer uses.

## 6. Switching machines (Windows ↔ Mac)

```bash
# before you stop on machine A
git add -A && git commit -m "..." && git push

# when you start on machine B
git pull
```

`.env.local` stays local to each machine — it never syncs through git.

## Project layout

```
src/app/              Next.js pages & API routes
  (auth)/             login
  (dashboard)/        app pages (invoices, billing, settings)
  api/                PDF, receipts, razorpay webhook routes
src/components/       React components (invoice, layout)
src/modules/          domain logic (invoices, billing, users) — server actions
src/lib/              supabase clients, PDF templates
src/emails/           React Email templates
supabase/migrations/  SQL migrations
tests/                vitest unit tests
```

See `CLAUDE.md` for coding rules and business logic constraints.
