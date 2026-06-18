import { getAdminQuestions } from '@/modules/admin/actions'
import Link from 'next/link'

const statusColors: Record<string, string> = {
  open: 'bg-unpaid-soft text-unpaid',
  answered: 'bg-paid-soft text-paid',
  closed: 'bg-paper-deep text-muted',
}

function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default async function AdminQuestionsPage() {
  const questions = await getAdminQuestions()
  const openCount = questions.filter((q) => q.status === 'open').length

  return (
    <div className="reveal">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Questions</h1>
        <p className="font-mono text-xs text-faint">{openCount} open · {questions.length} total</p>
      </div>

      {questions.length === 0 ? (
        <div className="card px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ink">No questions yet</p>
          <p className="mt-1 text-sm text-muted">Submissions from the in-app Help page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="card p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{q.subject || 'Question'}</p>
                  {q.user && (
                    <Link href={`/admin/users/${q.user.id}`} className="font-mono text-xs text-brand hover:underline">
                      {q.user.business_name || q.user.email}
                    </Link>
                  )}
                </div>
                <span className={`badge ${statusColors[q.status] ?? statusColors.open}`}>{q.status}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted">{q.message}</p>
              <p className="mt-3 font-mono text-xs text-faint">{fmtDateTime(q.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
