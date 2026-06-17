export type InvoiceStatus = 'draft' | 'unpaid' | 'paid' | 'overdue'

export interface InvoiceItem {
  id?: string
  description: string
  quantity: number
  rate_paise: number
  amount_paise: number
}

export interface Invoice {
  id: string
  user_id: string
  invoice_number: string
  client_name: string
  client_email: string | null
  client_gstin: string | null
  status: InvoiceStatus
  subtotal_paise: number
  gst_rate: number
  cgst_paise: number
  sgst_paise: number
  total_paise: number
  pdf_url: string | null
  due_date: string | null
  paid_at: string | null
  notes: string | null
  created_at: string
  last_reminder_sent_at?: string | null
  reminder_count?: number
  invoice_items?: InvoiceItem[]
}

export interface User {
  id: string
  email: string
  name: string | null
  business_name: string | null
  gst_number: string | null
  upi_id: string | null
  logo_url: string | null
  invoice_count: number
}

export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  price_inr_paise: number
  interval: 'monthly' | 'yearly'
  invoice_limit: number | null
}
