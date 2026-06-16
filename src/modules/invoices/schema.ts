import { z } from 'zod'

export const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().positive('Quantity must be positive'),
  rate_paise: z.number().int().positive('Rate must be positive'),
})

export const createInvoiceSchema = z.object({
  client_name: z.string().min(1, 'Client name is required'),
  client_email: z.string().email('Invalid email').optional().or(z.literal('')),
  client_gstin: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format')
    .optional()
    .or(z.literal('')),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  gst_rate: z.number().refine((v) => [0, 5, 12, 18, 28].includes(v), 'Invalid GST rate'),
  due_date: z.string().optional().or(z.literal('')),
  notes: z.string().optional().or(z.literal('')),
})

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>

// Pure GST calculation — all values in paise, integers only
export function calcGst(subtotalPaise: number, gstRate: number) {
  const cgst = Math.floor((subtotalPaise * gstRate) / 100 / 2)
  const sgst = Math.floor((subtotalPaise * gstRate) / 100 / 2)
  const total = subtotalPaise + cgst + sgst
  return { cgst, sgst, total }
}

export function formatInr(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(paise / 100)
}
