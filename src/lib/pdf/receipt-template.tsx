import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { pdf } from './theme'

const styles = StyleSheet.create({
  page: { backgroundColor: pdf.surface, color: pdf.ink, fontFamily: pdf.sans, fontSize: 10, paddingBottom: 60 },
  topbar: { height: 6, backgroundColor: pdf.emerald },
  body: { paddingHorizontal: 44, paddingTop: 30 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  qbox: { width: 26, height: 26, borderRadius: 6, backgroundColor: pdf.emerald, justifyContent: 'center', alignItems: 'center', marginRight: 9 },
  qletter: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 14, color: pdf.cream },
  brandName: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 19, color: pdf.emerald },
  brandSub: { fontFamily: pdf.mono, fontSize: 8, color: pdf.muted, marginTop: 2 },
  metaRight: { alignItems: 'flex-end' },
  metaLabel: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 2, color: pdf.faint, textTransform: 'uppercase' },
  receiptTitle: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 15, color: pdf.ink, marginTop: 3 },
  metaLine: { fontFamily: pdf.mono, fontSize: 8.5, color: pdf.faint, marginTop: 3 },

  rule: { height: 1, backgroundColor: pdf.line, marginBottom: 18 },

  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 22 },
  section: { flex: 1 },
  label: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 1.5, color: pdf.gold, textTransform: 'uppercase', marginBottom: 5 },
  sectionValue: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 12, color: pdf.ink },
  sectionSub: { fontFamily: pdf.mono, fontSize: 9, color: pdf.muted, marginTop: 2 },

  tHead: { flexDirection: 'row', backgroundColor: pdf.cream, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 4, marginBottom: 2 },
  tHeadText: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 1, color: pdf.muted, textTransform: 'uppercase' },
  tRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: pdf.line },
  cellDesc: { flex: 4, fontFamily: pdf.sans, fontSize: 9.5, color: pdf.ink },
  cellAmt: { flex: 1.6, textAlign: 'right', fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 9, color: pdf.ink },

  totals: { marginTop: 18, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 240, marginBottom: 5 },
  tLabel: { fontFamily: pdf.sans, fontSize: 9, color: pdf.muted },
  tVal: { fontFamily: pdf.mono, fontSize: 9, color: pdf.ink },
  grandWrap: { width: 240, marginTop: 6, backgroundColor: pdf.cream, borderRadius: 6, paddingVertical: 9, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grandLabel: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 11, color: pdf.ink },
  grandVal: { fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 13, color: pdf.emerald },

  stamp: { marginTop: 28, alignSelf: 'flex-start', borderWidth: 2, borderColor: pdf.emerald, borderRadius: 6, paddingVertical: 6, paddingHorizontal: 16, transform: 'rotate(-7deg)' },
  stampText: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 16, letterSpacing: 3, color: pdf.emerald },

  footer: { position: 'absolute', bottom: 26, left: 44, right: 44, textAlign: 'center', fontFamily: pdf.mono, fontSize: 7.5, color: pdf.faint, letterSpacing: 0.5 },
})

function formatInr(paise: number) {
  return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
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
        <View style={styles.topbar} fixed />

        <View style={styles.body}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.brandRow}>
                <View style={styles.qbox}><Text style={styles.qletter}>Q</Text></View>
                <Text style={styles.brandName}>QuickBill</Text>
              </View>
              <Text style={styles.brandSub}>QuickBill Technologies</Text>
              <Text style={styles.brandSub}>GSTIN: 27AAAAA0000A1Z5</Text>
              <Text style={styles.brandSub}>support@quikbil.com</Text>
            </View>
            <View style={styles.metaRight}>
              <Text style={styles.metaLabel}>Receipt</Text>
              <Text style={styles.receiptTitle}>Payment Receipt</Text>
              <Text style={styles.metaLine}>No: {receipt.receiptNumber}</Text>
              <Text style={styles.metaLine}>Date: {receipt.date}</Text>
            </View>
          </View>

          <View style={styles.rule} />

          {/* Billed to + reference */}
          <View style={styles.row}>
            <View style={styles.section}>
              <Text style={styles.label}>Billed To</Text>
              <Text style={styles.sectionValue}>{receipt.customerBusiness || receipt.customerName || receipt.customerEmail}</Text>
              <Text style={styles.sectionSub}>{receipt.customerEmail}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Payment Reference</Text>
              <Text style={styles.sectionSub}>Razorpay</Text>
              <Text style={styles.sectionSub}>{receipt.paymentId}</Text>
            </View>
          </View>

          {/* Line item */}
          <View style={styles.tHead}>
            <Text style={[styles.tHeadText, styles.cellDesc]}>Description</Text>
            <Text style={[styles.tHeadText, { flex: 1.6, textAlign: 'right' }]}>Amount</Text>
          </View>
          <View style={styles.tRow}>
            <Text style={styles.cellDesc}>QuickBill {receipt.planName} subscription</Text>
            <Text style={styles.cellAmt}>{formatInr(taxable)}</Text>
          </View>

          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.tLabel}>Taxable value</Text>
              <Text style={styles.tVal}>{formatInr(taxable)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tLabel}>IGST (18%)</Text>
              <Text style={styles.tVal}>{formatInr(gst)}</Text>
            </View>
            <View style={styles.grandWrap}>
              <Text style={styles.grandLabel}>Total Paid</Text>
              <Text style={styles.grandVal}>{formatInr(receipt.totalPaise)}</Text>
            </View>
          </View>

          {/* Paid stamp */}
          <View style={styles.stamp}>
            <Text style={styles.stampText}>PAID</Text>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          This is a computer-generated receipt and does not require a signature. · QuickBill · quikbil.com
        </Text>
      </Page>
    </Document>
  )
}
