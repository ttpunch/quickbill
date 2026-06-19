import { getMyQuestions } from '@/modules/questions/actions'
import HelpForm from './HelpForm'

const statusColors: Record<string, string> = {
  open: 'bg-unpaid-soft text-unpaid',
  answered: 'bg-paid-soft text-paid',
  closed: 'bg-paper-deep text-muted',
}

export default async function HelpPage() {
  const questions = await getMyQuestions()

  return (
    <div className="reveal max-w-2xl">
      <p className="kicker mb-2">Support</p>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">Help &amp; questions</h1>
      <p className="mt-1 mb-8 text-sm text-muted">Ask us anything about GST, invoices, or your account. We reply over email.</p>

      <HelpForm />

      {questions.length > 0 && (
        <div className="mt-10">
          <p className="kicker mb-4">Your questions</p>
          <div className="card divide-y divide-line p-0">
            {questions.map((q) => (
              <div key={q.id} className="px-5 py-4">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <p className="font-medium text-ink">{q.subject || 'Question'}</p>
                  <span className={`badge ${statusColors[q.status] ?? statusColors.open}`}>{q.status}</span>
                </div>
                <p className="text-sm text-muted">{q.message}</p>
                <p className="mt-2 font-mono text-xs text-faint">
                  {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
