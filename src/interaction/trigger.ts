import { PAD_MAP } from '../config/soundMap'
import { soundEngine } from '../audio/soundEngine'
import { visualEngine } from '../visuals/visualEngine'

// The one entry point for every input source (keyboard, touch pads): fires
// the pad's visual and sound together. Sound no-ops until audio is unlocked,
// so visuals are never blocked on init.
export function trigger(keyId: string): void {
  const pad = PAD_MAP[keyId]
  if (!pad) return
  visualEngine.trigger(pad)
  soundEngine.play(pad.sound)
}
