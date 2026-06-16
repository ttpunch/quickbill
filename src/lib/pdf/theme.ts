import { Font } from '@react-pdf/renderer'
import path from 'path'

// Theme fonts bundled with the repo (src/lib/pdf/fonts) so PDF rendering has
// no runtime network dependency. Registered once on first import.
const fontDir = path.join(process.cwd(), 'src', 'lib', 'pdf', 'fonts')
const f = (file: string) => path.join(fontDir, file)

let registered = false
function registerPdfFonts() {
  if (registered) return
  registered = true

  Font.register({
    family: 'Fraunces',
    fonts: [
      { src: f('Fraunces-400.ttf'), fontWeight: 'normal' },
      { src: f('Fraunces-600.ttf'), fontWeight: 'bold' },
    ],
  })
  Font.register({
    family: 'HankenGrotesk',
    fonts: [
      { src: f('HankenGrotesk-400.ttf'), fontWeight: 'normal' },
      { src: f('HankenGrotesk-600.ttf'), fontWeight: 'bold' },
    ],
  })
  Font.register({
    family: 'IBMPlexMono',
    fonts: [
      { src: f('IBMPlexMono-400.ttf'), fontWeight: 'normal' },
      { src: f('IBMPlexMono-600.ttf'), fontWeight: 'bold' },
    ],
  })

  // Keep words intact — invoice fields and amounts should never hyphenate.
  Font.registerHyphenationCallback((word) => [word])
}

registerPdfFonts()

// "Modern Ledger" palette, tuned for print (light ink load, theme accents).
export const pdf = {
  surface: '#FDFBF6',
  cream: '#F3EEE2',
  ink: '#1A221D',
  muted: '#586057',
  faint: '#8C948A',
  line: '#E2DAC7',
  emerald: '#0C5739',
  emeraldDeep: '#094129',
  gold: '#B9810C',
  goldBorder: '#E7D49A',
  goldSoft: '#F4EBCD',
  paidSoft: '#E0EBE1',

  display: 'Fraunces',
  sans: 'HankenGrotesk',
  mono: 'IBMPlexMono',
} as const
