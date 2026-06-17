import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#0C5739',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#F3EEE2',
            fontSize: 110,
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          Q
        </span>
      </div>
    ),
    { ...size },
  )
}
