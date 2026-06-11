import { useEffect } from 'react'
import { PAD_MAP } from '../config/soundMap'
import { trigger } from './trigger'

export function useKeyboard(onAnyKey: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Held keys fire once; browser shortcuts (ctrl+r etc.) pass through.
      // Escape is excluded because it never grants the user activation the
      // AudioContext needs — letting it through would dismiss the overlay
      // while audio stays locked.
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey || e.key === 'Escape') return
      onAnyKey()
      // Prefer the physical key (works on non-Latin layouts), fall back to
      // the produced character (covers remapped layouts like AZERTY).
      const code = e.code.startsWith('Key') ? e.code.slice(3).toLowerCase() : ''
      const id = PAD_MAP[code] ? code : e.key.toLowerCase()
      if (PAD_MAP[id]) {
        e.preventDefault()
        trigger(id)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onAnyKey])
}
