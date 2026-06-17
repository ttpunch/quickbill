import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#0C5739',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: '#F3EEE2',
            fontSize: 20,
            fontWeight: 700,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          Q
        </span>
      </div>
    ),
    { ...size },
  )
}
