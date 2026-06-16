# QuickBill

## What this is
A GST invoice generator for Indian freelancers. Freelancers fill a form, get a
GST-compliant PDF, share it via WhatsApp, and collect payment via UPI. Subscription
billing at ₹299/mo via Razorpay. Free tier limited to 5 invoices/month.

## Tech stack (exact versions)
- Framework: Next.js 16 App Router
- Language: TypeScript 5 (strict mode — no 'any')
- Database + Auth: Supabase (Postgres + Auth + Storage)
- API: tRPC v11
- Payments: Razorpay
- PDF: @react-pdf/renderer
- Email: Resend
- UI: Tailwind CSS v4 + shadcn/ui
- Hosting: Vercel

## Project structure
src/app/              Next.js pages and API routes
src/components/       React components
  ui/                 shadcn/ui base components — DO NOT EDIT THESE FILES
  invoice/            invoice feature components
  billing/            billing feature components
  layout/             sidebar, header
src/lib/              singleton clients (supabase, razorpay, resend, trpc)
src/modules/          domain logic — no UI imports here
src/emails/           React Email templates
src/types/            shared TypeScript types

## Coding rules (follow on every response)
- Money is ALWAYS integers: paise for INR. Never floats. 100 paise = ₹1
- GST split: cgst_paise = sgst_paise = Math.floor(subtotal_paise * gst_rate / 100 / 2)
- UUIDs for all primary keys
- All timestamps UTC as TIMESTAMPTZ
- Soft deletes only: deleted_at column, never hard-delete user data
- ALL Razorpay webhooks MUST verify HMAC SHA256 before processing — no exceptions
- DPDP compliance: log data mutations to audit_logs table
- Free plan: block invoice.create if user invoice_count >= 5 — enforce server-side
- Error responses always: { error: { code, message, request_id } }
- Never use 'any' — use 'unknown' and narrow it
- Zod validation on all inputs, both client and server side
- Do not modify files outside the scope of the request

## Business rules (never violate)
- Never store raw card numbers, CVV, or UPI PINs
- Never skip Razorpay webhook signature verification
- Free plan: 5 invoices/month max — enforce server-side in invoice.create action
- UPI payment link format: upi://pay?pa=[user.upi_id]&pn=[user.business_name]&am=[total_rupees]&cu=INR
- Money display: always Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

## Local dev commands
npm run dev           # start at http://localhost:3000
npm run build         # production build
npm run typecheck     # tsc --noEmit
npm run lint          # eslint
npm test              # vitest unit tests
