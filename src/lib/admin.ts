// Admin access is granted by an email allowlist, configured via the
// ADMIN_EMAILS env var (comma-separated, case-insensitive). No DB role column
// is involved, so adding/removing an admin is a Vercel env change + redeploy.
//
// Example: ADMIN_EMAILS="vinod418@gmail.com,ops@quikbil.com"

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false
  return adminEmails().includes(email.toLowerCase())
}
