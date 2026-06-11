import { useEffect } from 'react'
import { PAD_MAP } from '../config/soundMap'
import { trigger } from './trigger'

export function useKeyboard(onAnyKey: () => void): void {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Held keys fire once; browser shortcuts (ctrl+r etc.) pass through.
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      onAnyKey()
      const id = e.key.toLowerCase()
      if (PAD_MAP[id]) {
        e.preventDefault()
        trigger(id)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onAnyKey])
}
