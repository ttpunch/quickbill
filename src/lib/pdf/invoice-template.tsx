import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { Invoice } from '@/types'
import { pdf } from './theme'

const styles = StyleSheet.create({
  page: { backgroundColor: pdf.surface, color: pdf.ink, fontFamily: pdf.sans, fontSize: 10, paddingBottom: 64 },
  topbar: { height: 6, backgroundColor: pdf.emerald },
  body: { paddingHorizontal: 44, paddingTop: 30 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  qbox: { width: 26, height: 26, borderRadius: 6, backgroundColor: pdf.emerald, justifyContent: 'center', alignItems: 'center', marginRight: 9 },
  qletter: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 14, color: pdf.cream },
  brandName: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 19, color: pdf.emerald },
  brandKicker: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 1.5, color: pdf.gold, textTransform: 'uppercase', marginTop: 4 },
  metaRight: { alignItems: 'flex-end' },
  metaLabel: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 2, color: pdf.faint, textTransform: 'uppercase' },
  invNumber: { fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 14, color: pdf.ink, marginTop: 3 },
  metaLine: { fontFamily: pdf.mono, fontSize: 8.5, color: pdf.faint, marginTop: 3 },

  rule: { height: 1, backgroundColor: pdf.line, marginBottom: 18 },

  // Bill to
  billTo: { marginBottom: 20 },
  label: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 1.5, color: pdf.gold, textTransform: 'uppercase', marginBottom: 5 },
  clientName: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 14, color: pdf.ink },
  clientSub: { fontFamily: pdf.mono, fontSize: 9, color: pdf.muted, marginTop: 2 },

  // Items table
  tHead: { flexDirection: 'row', backgroundColor: pdf.cream, paddingVertical: 7, paddingHorizontal: 10, borderRadius: 4, marginBottom: 2 },
  tHeadText: { fontFamily: pdf.mono, fontSize: 7.5, letterSpacing: 1, color: pdf.muted, textTransform: 'uppercase' },
  tRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: pdf.line },
  cellDesc: { flex: 3, fontFamily: pdf.sans, fontSize: 9.5, color: pdf.ink },
  cellNum: { fontFamily: pdf.mono, fontSize: 9, color: pdf.muted },
  cellAmt: { fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 9, color: pdf.ink },
  col2: { flex: 1, textAlign: 'right' },
  col3: { flex: 1.6, textAlign: 'right' },
  col4: { flex: 1.6, textAlign: 'right' },

  // Totals
  totals: { marginTop: 18, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', width: 230, marginBottom: 5 },
  tLabel: { fontFamily: pdf.sans, fontSize: 9, color: pdf.muted },
  tVal: { fontFamily: pdf.mono, fontSize: 9, color: pdf.ink },
  grandWrap: { width: 230, marginTop: 6, backgroundColor: pdf.cream, borderRadius: 6, paddingVertical: 9, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  grandLabel: { fontFamily: pdf.display, fontWeight: 'bold', fontSize: 11, color: pdf.ink },
  grandVal: { fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 13, color: pdf.emerald },

  // UPI
  upi: { marginTop: 26, padding: 14, backgroundColor: pdf.goldSoft, borderRadius: 6, borderWidth: 1, borderColor: pdf.goldBorder },
  upiLabel: { fontFamily: pdf.mono, fontWeight: 'bold', fontSize: 7.5, letterSpacing: 1.5, color: pdf.gold, textTransform: 'uppercase', marginBottom: 5 },
  upiVal: { fontFamily: pdf.mono, fontSize: 9.5, color: pdf.ink, marginTop: 2 },

  // Notes
  notes: { marginTop: 22 },
  notesText: { fontFamily: pdf.sans, fontSize: 9, color: pdf.muted, lineHeight: 1.5, marginTop: 2 },

  footer: { position: 'absolute', bottom: 26, left: 44, right: 44, textAlign: 'center', fontFamily: pdf.mono, fontSize: 7.5, color: pdf.faint, letterSpacing: 0.5 },

  watermark: { position: 'absolute', top: '42%', left: 0, right: 0, textAlign: 'center', transform: 'rotate(-45deg)', fontFamily: pdf.display, fontWeight: 'bold', fontSize: 96, color: pdf.emerald, opacity: 0.06 },
})

function formatInr(paise: number) {
  return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function InvoicePDF({ invoice, businessName, upiId, showWatermark = false }: {
  invoice: Invoice
  businessName?: string | null
  upiId?: string | null
  showWatermark?: boolean
}) {
  const date = new Date(invoice.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Free-plan watermark — rendered first so page content paints on top */}
        {showWatermark && <Text style={styles.watermark} fixed>QuickBill</Text>}

        <View style={styles.topbar} fixed />

        <View style={styles.body}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <View style={styles.brandRow}>
                <View style={styles.qbox}><Text style={styles.qletter}>Q</Text></View>
                <Text style={styles.brandName}>{businessName || 'QuickBill'}</Text>
              </View>
              <Text style={styles.brandKicker}>GST Invoice</Text>
            </View>
            <View style={styles.metaRight}>
              <Text style={styles.metaLabel}>Invoice</Text>
              <Text style={styles.invNumber}>{invoice.invoice_number}</Text>
              <Text style={styles.metaLine}>Date: {date}</Text>
              {invoice.due_date && (
                <Text style={styles.metaLine}>
                  Due: {new Date(invoice.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.rule} />

          {/* Bill to */}
          <View style={styles.billTo}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.clientName}>{invoice.client_name}</Text>
            {invoice.client_email && <Text style={styles.clientSub}>{invoice.client_email}</Text>}
            {invoice.client_gstin && <Text style={styles.clientSub}>GSTIN: {invoice.client_gstin}</Text>}
          </View>

          {/* Items table */}
          <View style={styles.tHead}>
            <Text style={[styles.tHeadText, styles.cellDesc]}>Description</Text>
            <Text style={[styles.tHeadText, styles.col2]}>Qty</Text>
            <Text style={[styles.tHeadText, styles.col3]}>Rate</Text>
            <Text style={[styles.tHeadText, styles.col4]}>Amount</Text>
          </View>
          {(invoice.invoice_items ?? []).map((item, i) => (
            <View key={i} style={styles.tRow}>
              <Text style={styles.cellDesc}>{item.description}</Text>
              <Text style={[styles.cellNum, styles.col2]}>{item.quantity}</Text>
              <Text style={[styles.cellNum, styles.col3]}>{formatInr(item.rate_paise)}</Text>
              <Text style={[styles.cellAmt, styles.col4]}>{formatInr(item.amount_paise)}</Text>
            </View>
          ))}

          {/* Totals */}
          <View style={styles.totals}>
            <View style={styles.totalRow}>
              <Text style={styles.tLabel}>Subtotal</Text>
              <Text style={styles.tVal}>{formatInr(invoice.subtotal_paise)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tLabel}>CGST ({invoice.gst_rate / 2}%)</Text>
              <Text style={styles.tVal}>{formatInr(invoice.cgst_paise)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.tLabel}>SGST ({invoice.gst_rate / 2}%)</Text>
              <Text style={styles.tVal}>{formatInr(invoice.sgst_paise)}</Text>
            </View>
            <View style={styles.grandWrap}>
              <Text style={styles.grandLabel}>Total</Text>
              <Text style={styles.grandVal}>{formatInr(invoice.total_paise)}</Text>
            </View>
          </View>

          {/* UPI payment */}
          {upiId && (
            <View style={styles.upi}>
              <Text style={styles.upiLabel}>Pay via UPI</Text>
              <Text style={styles.upiVal}>UPI ID: {upiId}</Text>
              <Text style={styles.upiVal}>Amount: {formatInr(invoice.total_paise)}</Text>
            </View>
          )}

          {/* Notes */}
          {invoice.notes && (
            <View style={styles.notes}>
              <Text style={styles.label}>Notes</Text>
              <Text style={styles.notesText}>{invoice.notes}</Text>
            </View>
          )}
        </View>

        <Text style={styles.footer} fixed>Generated by QuickBill · quikbil.com</Text>
      </Page>
    </Document>
  )
}
