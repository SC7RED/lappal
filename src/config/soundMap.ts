export type ShapeKind =
  | 'rings'
  | 'burst'
  | 'polygon'
  | 'circle'
  | 'rays'
  | 'bloom'
  | 'spiral'
  | 'ripple'
  | 'shards'
  | 'orbit'
  | 'comet'
  | 'petals'

export type SoundSpec =
  | { type: 'note'; note: string }
  | { type: 'kick' }
  | { type: 'hat' }
  | { type: 'tom' }

export interface PadConfig {
  key: string
  label: string
  hue: number
  shape: ShapeKind
  sound: SoundSpec
}

// One entry per pad: keyboard key, display label, base hue (neon band 180-330),
// visual shape, and sound. Melodic keys climb C# minor pentatonic left to right;
// q/w/e are percussion. Adding a pad is one line here.
export const PADS: PadConfig[] = [
  { key: 'a', label: 'A', hue: 270, shape: 'rings', sound: { type: 'note', note: 'C#3' } },
  { key: 's', label: 'S', hue: 200, shape: 'burst', sound: { type: 'note', note: 'E3' } },
  { key: 'd', label: 'D', hue: 300, shape: 'polygon', sound: { type: 'note', note: 'F#3' } },
  { key: 'f', label: 'F', hue: 230, shape: 'circle', sound: { type: 'note', note: 'G#3' } },
  { key: 'g', label: 'G', hue: 185, shape: 'rays', sound: { type: 'note', note: 'B3' } },
  { key: 'h', label: 'H', hue: 285, shape: 'bloom', sound: { type: 'note', note: 'C#4' } },
  { key: 'j', label: 'J', hue: 215, shape: 'spiral', sound: { type: 'note', note: 'E4' } },
  { key: 'k', label: 'K', hue: 320, shape: 'ripple', sound: { type: 'note', note: 'G#4' } },
  { key: 'l', label: 'L', hue: 250, shape: 'shards', sound: { type: 'note', note: 'B4' } },
  { key: 'q', label: 'Q', hue: 265, shape: 'orbit', sound: { type: 'kick' } },
  { key: 'w', label: 'W', hue: 195, shape: 'comet', sound: { type: 'hat' } },
  { key: 'e', label: 'E', hue: 310, shape: 'petals', sound: { type: 'tom' } },
]

export const PAD_MAP: Record<string, PadConfig> = Object.fromEntries(
  PADS.map((pad) => [pad.key, pad]),
)
