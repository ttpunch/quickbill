import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', color: '#1a1a1a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28 },
  brandName: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: '#4f46e5' },
  brandSub: { fontSize: 9, color: '#888', marginTop: 2 },
  receiptMeta: { alignItems: 'flex-end' },
  receiptTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold' },
  metaLabel: { fontSize: 8, color: '#888', marginTop: 4 },
  divider: { borderBottom: '1 solid #e5e7eb', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  section: { flex: 1 },
  sectionLabel: { fontSize: 8, color: '#888', marginBottom: 4, textTransform: 'uppercase' },
  sectionValue: { fontSize: 10, fontFamily: 'Helvetica-Bold' },
  sectionSub: { fontSize: 9, color: '#555', marginTop: 2 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f9fafb', padding: '6 8' },
  tableHeaderText: { fontSize: 8, color: '#888', fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
  tableRow: { flexDirection: 'row', padding: '8', borderBottom: '1 solid #f3f4f6' },
  tableCell: { fontSize: 9, color: '#374151' },
  col1: { flex: 4 },
  col2: { flex: 1.5, textAlign: 'right' },
  totals: { marginTop: 16, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4, width: 220 },
  totalLabel: { flex: 1, fontSize: 9, color: '#555' },
  totalValue: { fontSize: 9, color: '#374151', textAlign: 'right', minWidth: 90 },
  totalDivider: { borderBottom: '1 solid #e5e7eb', width: 220, marginVertical: 6 },
  grandTotal: { flexDirection: 'row', justifyContent: 'flex-end', width: 220 },
  grandTotalLabel: { flex: 1, fontSize: 11, fontFamily: 'Helvetica-Bold' },
  grandTotalValue: { fontSize: 11, fontFamily: 'Helvetica-Bold', textAlign: 'right', minWidth: 90 },
  paidBadge: { marginTop: 24, padding: '8 14', backgroundColor: '#ecfdf5', borderRadius: 4, alignSelf: 'flex-start' },
  paidText: { fontSize: 10, color: '#047857', fontFamily: 'Helvetica-Bold' },
  footer: { position: 'absolute', bottom: 24, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#aaa' },
})

function formatInr(paise: number) {
  return 'INR ' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export interface ReceiptData {
  receiptNumber: string
  date: string
  planName: string
  totalPaise: number
  paymentId: string
  customerEmail: string
  customerName?: string | null
  customerBusiness?: string | null
}

export function ReceiptPDF({ receipt }: { receipt: ReceiptData }) {
  // Subscription price is GST-inclusive. SaaS attracts 18% GST (treated as IGST
  // for a pan-India digital service).
  const taxable = Math.round(receipt.totalPaise / 1.18)
  const gst = receipt.totalPaise - taxable

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>QuickBill</Text>
            <Text style={styles.brandSub}>QuickBill Technologies</Text>
            <Text style={styles.brandSub}>GSTIN: 27AAAAA0000A1Z5</Text>
            <Text style={styles.brandSub}>support@quickbill.in</Text>
          </View>
          <View style={styles.receiptMeta}>
            <Text style={styles.receiptTitle}>PAYMENT RECEIPT</Text>
            <Text style={styles.metaLabel}>Receipt No: {receipt.receiptNumber}</Text>
            <Text style={styles.metaLabel}>Date: {receipt.date}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Billed To</Text>
            <Text style={styles.sectionValue}>{receipt.customerBusiness || receipt.customerName || receipt.customerEmail}</Text>
            <Text style={styles.sectionSub}>{receipt.customerEmail}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Payment Reference</Text>
            <Text style={styles.sectionSub}>Razorpay: {receipt.paymentId}</Text>
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.col1]}>Description</Text>
          <Text style={[styles.tableHeaderText, styles.col2]}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>QuickBill {receipt.planName} subscription</Text>
          <Text style={[styles.tableCell, styles.col2]}>{formatInr(taxable)}</Text>
        </View>

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Taxable value</Text>
            <Text style={styles.totalValue}>{formatInr(taxable)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>IGST (18%)</Text>
            <Text style={styles.totalValue}>{formatInr(gst)}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total Paid</Text>
            <Text style={styles.grandTotalValue}>{formatInr(receipt.totalPaise)}</Text>
          </View>
        </View>

        <View style={styles.paidBadge}>
          <Text style={styles.paidText}>PAID</Text>
        </View>

        <Text style={styles.footer}>
          This is a computer-generated receipt and does not require a signature. QuickBill · quickbill.in
        </Text>
      </Page>
    </Document>
  )
}
