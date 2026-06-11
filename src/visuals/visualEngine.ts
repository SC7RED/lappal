import p5 from 'p5'
import type { PadConfig } from '../config/soundMap'
import type { Animation } from './animation'
import { createAnimation } from './shapes'
import { IdleField } from './idle'
import { BG_BRI, BG_HUE, BG_SAT, TRAIL_ALPHA, driftHue } from './palette'

const MAX_ANIMATIONS = 48
const MAX_DT = 50

// Owns the single p5 instance for the app's lifetime. React components stay
// thin: CanvasStage mounts/unmounts it, and any input source fires trigger().
class VisualEngine {
  private p: p5 | null = null
  private animations: Animation[] = []
  private idle: IdleField | null = null

  mount(container: HTMLElement): void {
    if (this.p) return
    this.p = new p5(this.sketch, container)
  }

  unmount(): void {
    this.p?.remove()
    this.p = null
    this.animations = []
    this.idle = null
  }

  trigger(pad: PadConfig, at?: { x: number; y: number }): void {
    const p = this.p
    // p5 defers setup() to the window load event, so the canvas may not exist
    // yet even though the instance does; shapes built then would be zero-sized.
    if (!p || p.width === 0) return
    const x = at?.x ?? p.random(p.width * 0.15, p.width * 0.85)
    const y = at?.y ?? p.random(p.height * 0.18, p.height * 0.82)
    this.animations.push(createAnimation(pad, p, x, y, driftHue(p, pad.hue)))
    if (this.animations.length > MAX_ANIMATIONS) this.animations.shift()
  }

  private sketch = (p: p5): void => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.colorMode(p.HSB, 360, 100, 100, 100)
      p.background(BG_HUE, BG_SAT, BG_BRI)
      this.idle = new IdleField(p)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      p.background(BG_HUE, BG_SAT, BG_BRI)
      // Reseed so dots cover the new area instead of clustering in the old one.
      this.idle = new IdleField(p)
    }

    p.draw = () => {
      p.blendMode(p.BLEND)
      p.background(BG_HUE, BG_SAT, BG_BRI, TRAIL_ALPHA)
      p.blendMode(p.ADD)
      const dt = Math.min(p.deltaTime, MAX_DT)
      this.idle?.updateAndDraw(p, dt)
      for (const animation of this.animations) {
        animation.update(dt)
        animation.draw(p)
      }
      this.animations = this.animations.filter((animation) => !animation.isDead())
      p.blendMode(p.BLEND)
    }
  }
}

export const visualEngine = new VisualEngine()
