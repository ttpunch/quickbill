import { describe, it, expect } from 'vitest'
import { calcGst } from '@/modules/invoices/schema'

describe('calcGst', () => {
  it('18% GST on ₹10,000 → CGST = SGST = ₹900', () => {
    const { cgst, sgst, total } = calcGst(1_000_000, 18)
    expect(cgst).toBe(90_000)
    expect(sgst).toBe(90_000)
    expect(total).toBe(1_180_000)
  })

  it('0% GST → no tax', () => {
    const { cgst, sgst, total } = calcGst(500_000, 0)
    expect(cgst).toBe(0)
    expect(sgst).toBe(0)
    expect(total).toBe(500_000)
  })

  it('5% GST splits into 2.5% each', () => {
    const { cgst, sgst } = calcGst(1_000_000, 5)
    expect(cgst).toBe(25_000)
    expect(sgst).toBe(25_000)
  })

  it('12% GST on ₹1,000 → CGST = SGST = ₹60', () => {
    const { cgst, sgst, total } = calcGst(100_000, 12)
    expect(cgst).toBe(6_000)
    expect(sgst).toBe(6_000)
    expect(total).toBe(112_000)
  })

  it('floors fractional paise — never rounds up', () => {
    // ₹101 at 18% → 18.18 paise GST → floor to 9 each
    const { cgst, sgst } = calcGst(10_100, 18)
    expect(cgst).toBe(909)
    expect(sgst).toBe(909)
  })

  it('28% GST on ₹5,000', () => {
    const { cgst, sgst, total } = calcGst(500_000, 28)
    expect(cgst).toBe(70_000)
    expect(sgst).toBe(70_000)
    expect(total).toBe(640_000)
  })
})
