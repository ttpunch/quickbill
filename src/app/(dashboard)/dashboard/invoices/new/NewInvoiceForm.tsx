'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createInvoice } from '@/modules/invoices/actions'
import { calcGst, formatInr } from '@/modules/invoices/schema'
import type { Client } from '@/modules/clients/actions'

interface LineItem {
  description: string
  quantity: string
  rate: string
}

const GST_RATES = [0, 5, 12, 18, 28]

export default function NewInvoiceForm({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientGstin, setClientGstin] = useState('')
  const [gstRate, setGstRate] = useState(18)
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<LineItem[]>([
    { description: '', quantity: '1', rate: '' },
  ])

  function pickClient(id: string) {
    const c = clients.find((c) => c.id === id)
    if (!c) {
      setClientName('')
      setClientEmail('')
      setClientGstin('')
      return
    }
    setClientName(c.name)
    setClientEmail(c.email ?? '')
    setClientGstin(c.gstin ?? '')
  }

  function updateItem(index: number, field: keyof LineItem, value: string) {
    setItems((prev) => prev.map((item, i) => i === index ? { ...item, [field]: value } : item))
  }

  function addItem() {
    setItems((prev) => [...prev, { description: '', quantity: '1', rate: '' }])
  }

  function removeItem(index: number) {
    if (items.length === 1) return
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  // Live totals calculation
  const subtotalPaise = items.reduce((sum, item) => {
    const qty = parseFloat(item.quantity) || 0
    const rate = Math.round((parseFloat(item.rate) || 0) * 100)
    return sum + Math.round(qty * rate)
  }, 0)

  const { cgst, sgst, total } = calcGst(subtotalPaise, gstRate)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const payload = {
      client_name: clientName,
      client_email: clientEmail,
      client_gstin: clientGstin,
      gst_rate: gstRate,
      due_date: dueDate,
      notes,
      items: items.map((item) => ({
        description: item.description,
        quantity: parseFloat(item.quantity) || 1,
        rate_paise: Math.round((parseFloat(item.rate) || 0) * 100),
      })),
    }

    const result = await createInvoice(payload)

    if ('error' in result) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="reveal max-w-3xl">
      <div className="mb-7">
        <p className="kicker mb-2">New entry</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">New Invoice</h1>
        <p className="mt-1 text-sm text-muted">Create a GST-compliant invoice in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Client details */}
        <div className="card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Client details</h2>

          {clients.length > 0 && (
            <div className="mb-4">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Saved clients</label>
              <select
                defaultValue=""
                onChange={(e) => pickClient(e.target.value)}
                className="field font-sans"
              >
                <option value="">+ New client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-faint">Pick a saved client to autofill, or enter a new one below.</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Client name *</label>
              <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Acme Pvt Ltd" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Client email</label>
              <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@example.com" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Client GSTIN</label>
              <input value={clientGstin} onChange={(e) => setClientGstin(e.target.value.toUpperCase())} placeholder="22AAAAA0000A1Z5" className="field font-mono" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Due date</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="field" />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="card p-6">
          <h2 className="mb-4 font-display text-base font-semibold text-ink">Items</h2>
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
              <span className="col-span-6">Description</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-3">Rate (₹)</span>
              <span className="col-span-1"></span>
            </div>

            {items.map((item, i) => {
              const amt = Math.round((parseFloat(item.quantity) || 0) * Math.round((parseFloat(item.rate) || 0) * 100))
              return (
                <div key={i} className="grid grid-cols-12 items-center gap-2">
                  <input required value={item.description} onChange={(e) => updateItem(i, 'description', e.target.value)} placeholder="Web design services" className="field col-span-6" />
                  <input required type="number" min="0.01" step="0.01" value={item.quantity} onChange={(e) => updateItem(i, 'quantity', e.target.value)} className="field col-span-2 font-mono" />
                  <div className="relative col-span-3">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-faint">₹</span>
                    <input required type="number" min="1" step="1" value={item.rate} onChange={(e) => updateItem(i, 'rate', e.target.value)} placeholder="5000" className="field pl-7 font-mono" />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={items.length === 1}
                    className="col-span-1 flex items-center justify-center text-faint transition-colors hover:text-danger disabled:opacity-20"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {amt > 0 && (
                    <div className="col-span-12 -mt-1 pr-7 text-right font-mono text-xs text-faint">
                      = {formatInr(amt)}
                    </div>
                  )}
                </div>
              )
            })}

            <button
              type="button"
              onClick={addItem}
              className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add item
            </button>
          </div>
        </div>

        {/* GST + totals */}
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-ink">GST</h2>
            <select value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} className="field w-auto py-1.5 font-mono">
              {GST_RATES.map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-ink">{formatInr(subtotalPaise)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>CGST ({gstRate / 2}%)</span>
              <span className="font-mono tabular-nums">{formatInr(cgst)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>SGST ({gstRate / 2}%)</span>
              <span className="font-mono tabular-nums">{formatInr(sgst)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-line pt-3">
              <span className="font-display text-base font-semibold text-ink">Total</span>
              <span className="font-mono text-lg font-semibold tabular-nums text-brand">{formatInr(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card p-6">
          <label className="mb-2 block font-display text-base font-semibold text-ink">Notes <span className="font-sans text-xs font-normal text-faint">(optional)</span></label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Payment terms, bank details, thank you note…"
            className="field resize-none"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-overdue/20 bg-danger-soft px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button type="submit" disabled={loading || subtotalPaise === 0} className="btn-primary px-6 py-3">
            {loading ? 'Creating…' : 'Create Invoice'}
          </button>
          <button type="button" onClick={() => router.push('/dashboard')} className="btn-ghost px-6 py-3">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
