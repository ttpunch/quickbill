import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'QuikBil — GST Invoice Generator for Indian Freelancers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0C5739',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#F3EEE2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#0C5739', fontSize: 34, fontWeight: 700, lineHeight: 1 }}>
              Q
            </span>
          </div>
          <span style={{ color: '#F3EEE2', fontSize: 28, fontWeight: 600, letterSpacing: '-0.5px' }}>
            QuikBil
          </span>
        </div>

        {/* Main copy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              color: '#B9810C',
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'Georgia, serif',
            }}
          >
            GST Invoice Generator
          </div>
          <div
            style={{
              color: '#F3EEE2',
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-2px',
              maxWidth: 900,
            }}
          >
            GST invoices, drafted in 60 seconds.
          </div>
          <div
            style={{
              color: '#A8C5B5',
              fontSize: 24,
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            Free for Indian freelancers · UPI payment links · WhatsApp sharing
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#6BAF8E', fontSize: 18 }}>quikbil.com</span>
          <div
            style={{
              background: '#B9810C',
              color: '#fff',
              fontSize: 18,
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: 100,
            }}
          >
            Free · No credit card
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
