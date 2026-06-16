import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Invoice } from '@/types'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  brandName: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#4f46e5' },
  brandSub: { fontSize: 9, color: '#888', marginTop: 2 },
  invoiceMeta: { alignItems: 'flex-end' },
  invoiceNumber: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#1a1a1a' },
  metaLabel: { fontSize: 8, color: '#888', marginTop: 4 },
  divider: { borderBottom: '1 solid #e5e7eb', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  section: { flex: 1 },
  sectionLabel: { fontSize: 8, color: '#888', marginBottom: 4, textTransform: 'uppercase' },
  sectionValue: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  sectionSub: { fontSize: 9, color: '#555', marginTop: 2 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f9fafb', padding: '6 8', marginBottom: 2 },
  tableHeaderText: { fontSize: 8, color: '#888', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', padding: '6 8', borderBottom: '1 solid #f3f4f6' },
  tableCell: { fontSize: 9, color: '#374151' },
  col1: { flex: 3 },
  col2: { flex: 1, textAlign: 'right' },
  col3: { flex: 1.5, textAlign: 'right' },
  col4: { flex: 1.5, textAlign: 'right' },
  totals: { marginTop: 16, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4, width: 200 },
  totalLabel: { flex: 1, fontSize: 9, color: '#555' },
  totalValue: { fontSize: 9, color: '#374151', textAlign: 'right', minWidth: 80 },
  totalDivider: { borderBottom: '1 solid #e5e7eb', width: 200, marginVertical: 6 },
  grandTotal: { flexDirection: 'row', justifyContent: 'flex-end', width: 200 },
  grandTotalLabel: { flex: 1, fontSize: 11, fontFamily: 'Helvetica-Bold' },
  grandTotalValue: { fontSize: 11, fontFamily: 'Helvetica-Bold', textAlign: 'right', minWidth: 80 },
  upiBox: { marginTop: 28, padding: 12, backgroundColor: '#f5f3ff', borderRadius: 4 },
  upiLabel: { fontSize: 8, color: '#6d28d9', fontFamily: 'Helvetica-Bold', marginBottom: 3 },
  upiValue: { fontSize: 9, color: '#4c1d95' },
  notes: { marginTop: 20 },
  notesLabel: { fontSize: 8, color: '#888', marginBottom: 3 },
  notesValue: { fontSize: 9, color: '#555' },
  footer: { position: 'absolute', bottom: 24, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#aaa' },
})

function formatInr(paise: number) {
  return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function InvoicePDF({ invoice, businessName, upiId }: {
  invoice: Invoice
  businessName?: string | null
  upiId?: string | null
}) {
  const date = new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>{businessName || 'QuickBill'}</Text>
            <Text style={styles.brandSub}>GST Invoice</Text>
          </View>
          <View style={styles.invoiceMeta}>
            <Text style={styles.invoiceNumber}>{invoice.invoice_number}</Text>
            <Text style={styles.metaLabel}>Date: {date}</Text>
            {invoice.due_date && (
              <Text style={styles.metaLabel}>
                Due: {new Date(invoice.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Bill to */}
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.sectionValue}>{invoice.client_name}</Text>
            {invoice.client_email && <Text style={styles.sectionSub}>{invoice.client_email}</Text>}
            {invoice.client_gstin && <Text style={styles.sectionSub}>GSTIN: {invoice.client_gstin}</Text>}
          </View>
        </View>

        {/* Items table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.col1]}>Description</Text>
          <Text style={[styles.tableHeaderText, styles.col2]}>Qty</Text>
          <Text style={[styles.tableHeaderText, styles.col3]}>Rate</Text>
          <Text style={[styles.tableHeaderText, styles.col4]}>Amount</Text>
        </View>
        {(invoice.invoice_items ?? []).map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.col1]}>{item.description}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.quantity}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{formatInr(item.rate_paise)}</Text>
            <Text style={[styles.tableCell, styles.col4]}>{formatInr(item.amount_paise)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatInr(invoice.subtotal_paise)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>CGST ({invoice.gst_rate / 2}%)</Text>
            <Text style={styles.totalValue}>{formatInr(invoice.cgst_paise)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>SGST ({invoice.gst_rate / 2}%)</Text>
            <Text style={styles.totalValue}>{formatInr(invoice.sgst_paise)}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>{formatInr(invoice.total_paise)}</Text>
          </View>
        </View>

        {/* UPI payment */}
        {upiId && (
          <View style={styles.upiBox}>
            <Text style={styles.upiLabel}>Pay via UPI</Text>
            <Text style={styles.upiValue}>UPI ID: {upiId}</Text>
            <Text style={styles.upiValue}>Amount: {formatInr(invoice.total_paise)}</Text>
          </View>
        )}

        {/* Notes */}
        {invoice.notes && (
          <View style={styles.notes}>
            <Text style={styles.notesLabel}>Notes</Text>
            <Text style={styles.notesValue}>{invoice.notes}</Text>
          </View>
        )}

        <Text style={styles.footer}>Generated by QuickBill · quickbill.in</Text>
      </Page>
    </Document>
  )
}
