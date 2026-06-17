import { Html, Head, Body, Container, Text, Heading, Hr, Section, Row, Column } from '@react-email/components'
import type { Invoice } from '@/types'

function formatInr(paise: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(paise / 100)
}

export function InvoiceEmail({
  invoice,
  businessName,
  upiId,
  reminder = false,
}: {
  invoice: Invoice
  businessName?: string | null
  upiId?: string | null
  reminder?: boolean
}) {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f9fafb', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '40px auto', backgroundColor: '#ffffff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          {/* Header */}
          <Section style={{ backgroundColor: '#4f46e5', padding: '24px 32px' }}>
            <Heading style={{ color: '#ffffff', margin: 0, fontSize: 22 }}>
              {businessName || 'QuickBill'}
            </Heading>
            <Text style={{ color: '#c7d2fe', margin: '4px 0 0', fontSize: 13 }}>
              {reminder ? 'Payment Reminder' : 'GST Invoice'}
            </Text>
          </Section>

          {/* Body */}
          <Section style={{ padding: '28px 32px' }}>
            <Text style={{ fontSize: 15, color: '#374151', marginTop: 0 }}>
              Hi {invoice.client_name},
            </Text>
            <Text style={{ fontSize: 14, color: '#6b7280' }}>
              {reminder ? (
                <>This is a friendly reminder that invoice <strong style={{ color: '#1f2937' }}>{invoice.invoice_number}</strong> from {businessName || 'QuickBill'} is still pending payment.</>
              ) : (
                <>Please find your invoice <strong style={{ color: '#1f2937' }}>{invoice.invoice_number}</strong> from {businessName || 'QuickBill'}.</>
              )}
            </Text>

            {/* Amount box */}
            <Section style={{ backgroundColor: '#f5f3ff', borderRadius: 8, padding: '16px 20px', margin: '20px 0' }}>
              <Text style={{ margin: 0, fontSize: 13, color: '#7c3aed', fontWeight: 600 }}>AMOUNT DUE</Text>
              <Text style={{ margin: '6px 0 0', fontSize: 28, fontWeight: 700, color: '#4c1d95' }}>
                {formatInr(invoice.total_paise)}
              </Text>
              {invoice.due_date && (
                <Text style={{ margin: '4px 0 0', fontSize: 12, color: '#8b5cf6' }}>
                  Due: {new Date(invoice.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>
              )}
            </Section>

            {/* Line items */}
            <Section style={{ margin: '20px 0' }}>
              <Row style={{ borderBottom: '2px solid #f3f4f6', paddingBottom: 8, marginBottom: 8 }}>
                <Column style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>Description</Column>
                <Column style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' as const }}>Amount</Column>
              </Row>
              {(invoice.invoice_items ?? []).map((item, i) => (
                <Row key={i} style={{ paddingBottom: 8 }}>
                  <Column style={{ fontSize: 13, color: '#374151' }}>{item.description} × {item.quantity}</Column>
                  <Column style={{ fontSize: 13, color: '#374151', textAlign: 'right' as const }}>{formatInr(item.amount_paise)}</Column>
                </Row>
              ))}
              <Hr style={{ margin: '12px 0', borderColor: '#e5e7eb' }} />
              <Row>
                <Column style={{ fontSize: 12, color: '#6b7280' }}>Subtotal</Column>
                <Column style={{ fontSize: 12, color: '#6b7280', textAlign: 'right' as const }}>{formatInr(invoice.subtotal_paise)}</Column>
              </Row>
              <Row>
                <Column style={{ fontSize: 12, color: '#6b7280' }}>CGST ({invoice.gst_rate / 2}%)</Column>
                <Column style={{ fontSize: 12, color: '#6b7280', textAlign: 'right' as const }}>{formatInr(invoice.cgst_paise)}</Column>
              </Row>
              <Row>
                <Column style={{ fontSize: 12, color: '#6b7280' }}>SGST ({invoice.gst_rate / 2}%)</Column>
                <Column style={{ fontSize: 12, color: '#6b7280', textAlign: 'right' as const }}>{formatInr(invoice.sgst_paise)}</Column>
              </Row>
              <Row style={{ marginTop: 8 }}>
                <Column style={{ fontSize: 15, color: '#111827', fontWeight: 700 }}>Total</Column>
                <Column style={{ fontSize: 15, color: '#111827', fontWeight: 700, textAlign: 'right' as const }}>{formatInr(invoice.total_paise)}</Column>
              </Row>
            </Section>

            {/* UPI */}
            {upiId && (
              <Section style={{ backgroundColor: '#ecfdf5', borderRadius: 8, padding: '14px 18px', margin: '20px 0' }}>
                <Text style={{ margin: 0, fontSize: 12, color: '#065f46', fontWeight: 600 }}>PAY VIA UPI</Text>
                <Text style={{ margin: '4px 0 0', fontSize: 13, color: '#047857' }}>UPI ID: <strong>{upiId}</strong></Text>
                <Text style={{ margin: '2px 0 0', fontSize: 12, color: '#065f46' }}>Amount: {formatInr(invoice.total_paise)}</Text>
              </Section>
            )}

            {invoice.notes && (
              <Text style={{ fontSize: 13, color: '#6b7280', fontStyle: 'italic' }}>
                Note: {invoice.notes}
              </Text>
            )}
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: '#f9fafb', padding: '16px 32px', borderTop: '1px solid #e5e7eb' }}>
            <Text style={{ margin: 0, fontSize: 12, color: '#9ca3af', textAlign: 'center' as const }}>
              Generated by QuickBill · quickbill.in
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
