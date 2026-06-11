import type { CSSProperties } from 'react'
import { PADS } from '../config/soundMap'
import { trigger } from '../interaction/trigger'

interface PadsProps {
  onPress: () => void
}

// Touch-first pad grid for devices without a keyboard. Rendered always,
// shown/hidden purely via the CSS media query in index.css.
export function Pads({ onPress }: PadsProps) {
  return (
    <div className="pads">
      {PADS.map((pad) => (
        <button
          key={pad.key}
          type="button"
          className="pad"
          style={{ '--pad-hue': pad.hue } as CSSProperties}
          onPointerDown={(e) => {
            e.preventDefault()
            onPress()
            trigger(pad.key)
          }}
        >
          {pad.label}
        </button>
      ))}
    </div>
  )
}
