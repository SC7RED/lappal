import type p5 from 'p5'
import { BaseAnimation, easeOutCubic, glowStroke } from '../animation'

// Concentric circles expanding outward with a staggered launch per ring.
export class Rings extends BaseAnimation {
  private readonly maxR: number
  private readonly count: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1600)
    const m = Math.min(p.width, p.height)
    this.maxR = m * p.random(0.22, 0.34)
    this.count = Math.floor(p.random(3, 5))
  }

  draw(p: p5): void {
    for (let i = 0; i < this.count; i++) {
      const local = Math.min(Math.max(this.t * 1.35 - i * 0.12, 0), 1)
      if (local <= 0) continue
      const r = easeOutCubic(local) * this.maxR * (1 - i * 0.16)
      glowStroke(p, this.hue, 80 * this.fade, 2.4, () => {
        p.circle(this.x, this.y, r * 2)
      })
    }
  }
}
