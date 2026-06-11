import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { PADS } from '../config/soundMap'
import { onTrigger, trigger } from '../interaction/trigger'

interface KeyStripProps {
  onPress: () => void
}

// Always-visible key map along the bottom of the desktop view: shows which
// keys play, lights up on every trigger, and is clickable for mouse users.
// Hidden on touch layouts, where the labeled pad grid serves the same role.
export function KeyStrip({ onPress }: KeyStripProps) {
  const [lit, setLit] = useState<Record<string, boolean>>({})
  const timers = useRef<Record<string, number>>({})

  useEffect(() => {
    const pending = timers.current
    const unsubscribe = onTrigger((pad) => {
      setLit((prev) => ({ ...prev, [pad.key]: true }))
      window.clearTimeout(pending[pad.key])
      pending[pad.key] = window.setTimeout(() => {
        setLit((prev) => ({ ...prev, [pad.key]: false }))
      }, 220)
    })
    return () => {
      unsubscribe()
      for (const id of Object.values(pending)) window.clearTimeout(id)
    }
  }, [])

  return (
    <div className="key-strip" aria-hidden="true">
      {PADS.map((pad) => (
        <button
          key={pad.key}
          type="button"
          tabIndex={-1}
          className={lit[pad.key] ? 'key-chip key-chip-lit' : 'key-chip'}
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
