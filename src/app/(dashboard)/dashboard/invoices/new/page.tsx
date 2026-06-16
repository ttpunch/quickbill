'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createInvoice } from '@/modules/invoices/actions'
import { calcGst, formatInr } from '@/modules/invoices/schema'

interface LineItem {
  description: string
  quantity: string
  rate: string
}

const GST_RATES = [0, 5, 12, 18, 28]

export default function NewInvoicePage() {
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
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">New Invoice</h1>
        <p className="text-sm text-gray-500 mt-1">Create a GST-compliant invoice in seconds</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Client details */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Client Details</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Client Name *</label>
              <input
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Acme Pvt Ltd"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Client Email</label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="client@example.com"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Client GSTIN</label>
              <input
                value={clientGstin}
                onChange={(e) => setClientGstin(e.target.value.toUpperCase())}
                placeholder="22AAAAA0000A1Z5"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Line items */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-700 mb-4">Items</h2>
          <div className="space-y-3">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 px-1">
              <span className="col-span-6">Description</span>
              <span className="col-span-2">Qty</span>
              <span className="col-span-3">Rate (₹)</span>
              <span className="col-span-1"></span>
            </div>

            {items.map((item, i) => {
              const amt = Math.round((parseFloat(item.quantity) || 0) * Math.round((parseFloat(item.rate) || 0) * 100))
              return (
                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    required
                    value={item.description}
                    onChange={(e) => updateItem(i, 'description', e.target.value)}
                    placeholder="Web design services"
                    className="col-span-6 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => updateItem(i, 'quantity', e.target.value)}
                    className="col-span-2 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="col-span-3 relative">
                    <span className="absolute left-3 top-2 text-sm text-gray-400">₹</span>
                    <input
                      required
                      type="number"
                      min="1"
                      step="1"
                      value={item.rate}
                      onChange={(e) => updateItem(i, 'rate', e.target.value)}
                      placeholder="5000"
                      className="w-full pl-7 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={items.length === 1}
                    className="col-span-1 flex items-center justify-center text-gray-300 hover:text-red-400 disabled:opacity-20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {amt > 0 && (
                    <div className="col-span-12 text-right text-xs text-gray-400 -mt-1 pr-7">
                      = {formatInr(amt)}
                    </div>
                  )}
                </div>
              )
            })}

            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add item
            </button>
          </div>
        </div>

        {/* GST + totals */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">GST</h2>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(Number(e.target.value))}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {GST_RATES.map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatInr(subtotalPaise)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>CGST ({gstRate / 2}%)</span>
              <span>{formatInr(cgst)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>SGST ({gstRate / 2}%)</span>
              <span>{formatInr(sgst)}</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100 text-base">
              <span>Total</span>
              <span>{formatInr(total)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Payment terms, bank details, thank you note..."
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || subtotalPaise === 0}
            className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Creating...' : 'Create Invoice'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard')}
            className="px-5 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
