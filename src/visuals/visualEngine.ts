import p5 from 'p5'
import type { PadConfig } from '../config/soundMap'
import type { Animation } from './animation'
import { createAnimation } from './shapes'
import { BG_BRI, BG_HUE, BG_SAT, TRAIL_ALPHA, driftHue } from './palette'

const MAX_ANIMATIONS = 48
const MAX_DT = 50

// Owns the single p5 instance for the app's lifetime. React components stay
// thin: CanvasStage mounts/unmounts it, and any input source fires trigger().
class VisualEngine {
  private p: p5 | null = null
  private animations: Animation[] = []

  mount(container: HTMLElement): void {
    if (this.p) return
    this.p = new p5(this.sketch, container)
  }

  unmount(): void {
    this.p?.remove()
    this.p = null
    this.animations = []
  }

  trigger(pad: PadConfig): void {
    const p = this.p
    if (!p) return
    const x = p.random(p.width * 0.15, p.width * 0.85)
    const y = p.random(p.height * 0.18, p.height * 0.82)
    this.animations.push(createAnimation(pad, p, x, y, driftHue(p, pad.hue)))
    if (this.animations.length > MAX_ANIMATIONS) this.animations.shift()
  }

  private sketch = (p: p5): void => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight)
      p.colorMode(p.HSB, 360, 100, 100, 100)
      p.background(BG_HUE, BG_SAT, BG_BRI)
    }

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      p.background(BG_HUE, BG_SAT, BG_BRI)
    }

    p.draw = () => {
      p.blendMode(p.BLEND)
      p.background(BG_HUE, BG_SAT, BG_BRI, TRAIL_ALPHA)
      p.blendMode(p.ADD)
      const dt = Math.min(p.deltaTime, MAX_DT)
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
