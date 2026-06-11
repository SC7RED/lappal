import type p5 from 'p5'
import { BaseAnimation, easeOutQuad, glowStroke } from '../animation'

// Flattened ellipses spreading like rings on water seen at an angle.
export class Ripple extends BaseAnimation {
  private readonly maxW: number
  private readonly squash: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1700)
    this.maxW = Math.min(p.width, p.height) * p.random(0.26, 0.36)
    this.squash = p.random(0.36, 0.48)
  }

  draw(p: p5): void {
    for (let i = 0; i < 3; i++) {
      const local = Math.min(Math.max(this.t * 1.4 - i * 0.18, 0), 1)
      if (local <= 0) continue
      const w = easeOutQuad(local) * this.maxW * (1 - i * 0.12)
      const h = w * (this.squash + i * 0.05)
      glowStroke(p, this.hue, 65 * this.fade * (1 - i * 0.2), 1.6, () => {
        p.ellipse(this.x, this.y + i * h * 0.08, w * 2, h * 2)
      })
    }
  }
}
