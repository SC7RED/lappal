import { PAD_MAP, PADS } from '../config/soundMap'
import type { PadConfig } from '../config/soundMap'
import { soundEngine } from '../audio/soundEngine'
import { visualEngine } from '../visuals/visualEngine'

export interface TriggerPoint {
  x: number
  y: number
}

type TriggerListener = (pad: PadConfig) => void

const listeners = new Set<TriggerListener>()

// Notifies on every successful trigger regardless of input source, so UI like
// the key strip can light up for keyboard, pad, and canvas presses alike.
export function onTrigger(listener: TriggerListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

// The one entry point for every input source (keyboard, pads, key strip,
// canvas): fires the pad's visual and sound together. Sound no-ops until
// audio is unlocked, so visuals are never blocked on init.
export function trigger(keyId: string, at?: TriggerPoint): void {
  const pad = PAD_MAP[keyId]
  if (!pad) return
  visualEngine.trigger(pad, at)
  soundEngine.play(pad.sound)
  for (const listener of listeners) listener(pad)
}

// A canvas press has a place but no key: play a random pad right there.
export function triggerAt(point: TriggerPoint): void {
  const pad = PADS[Math.floor(Math.random() * PADS.length)]
  trigger(pad.key, point)
}
