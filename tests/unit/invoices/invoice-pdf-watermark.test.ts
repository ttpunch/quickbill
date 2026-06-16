import { describe, it, expect } from 'vitest'
import type { ReactElement } from 'react'
import { InvoicePDF } from '@/lib/pdf/invoice-template'
import type { Invoice } from '@/types'

const invoice: Invoice = {
  id: 'inv-1',
  user_id: 'user-1',
  invoice_number: 'INV-2026-001',
  client_name: 'Acme Pvt Ltd',
  client_email: null,
  client_gstin: null,
  status: 'unpaid',
  subtotal_paise: 1_000_000,
  gst_rate: 18,
  cgst_paise: 90_000,
  sgst_paise: 90_000,
  total_paise: 1_180_000,
  pdf_url: null,
  due_date: null,
  paid_at: null,
  notes: null,
  created_at: '2026-06-16T00:00:00.000Z',
  invoice_items: [
    { description: 'Consulting', quantity: 1, rate_paise: 1_000_000, amount_paise: 1_000_000 },
  ],
}

// Walk a react-pdf element tree and collect every node's resolved style(s).
function collectStyles(node: unknown, out: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (node == null || typeof node !== 'object') return out
  const el = node as ReactElement<{ style?: unknown; children?: unknown }>
  const style = el.props?.style
  if (style) {
    for (const s of Array.isArray(style) ? style : [style]) {
      if (s && typeof s === 'object') out.push(s as Record<string, unknown>)
    }
  }
  const children = el.props?.children
  if (Array.isArray(children)) children.forEach((c) => collectStyles(c, out))
  else if (children) collectStyles(children, out)
  return out
}

// The diagonal watermark is the only element rendered with a rotate transform.
function hasWatermark(element: unknown): boolean {
  return collectStyles(element).some(
    (s) => typeof s.transform === 'string' && s.transform.includes('rotate'),
  )
}

describe('InvoicePDF watermark', () => {
  it('renders the watermark when showWatermark is true (free plan)', () => {
    const el = InvoicePDF({ invoice, showWatermark: true })
    expect(hasWatermark(el)).toBe(true)
  })

  it('omits the watermark when showWatermark is false (Pro plan)', () => {
    const el = InvoicePDF({ invoice, showWatermark: false })
    expect(hasWatermark(el)).toBe(false)
  })

  it('omits the watermark by default', () => {
    const el = InvoicePDF({ invoice })
    expect(hasWatermark(el)).toBe(false)
  })
})
