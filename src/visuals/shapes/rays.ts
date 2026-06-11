import type p5 from 'p5'
import { BaseAnimation, easeOutCubic, glowStroke } from '../animation'

// Line segments radiating from a point, detaching and flying outward.
export class Rays extends BaseAnimation {
  private readonly angles: number[] = []
  private readonly lengths: number[] = []
  private readonly maxR: number
  private readonly spin: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1400)
    const m = Math.min(p.width, p.height)
    this.maxR = m * p.random(0.24, 0.34)
    this.spin = p.random(-0.4, 0.4)
    const count = Math.floor(p.random(9, 14))
    for (let i = 0; i < count; i++) {
      this.angles.push((i / count) * p.TWO_PI + p.random(-0.12, 0.12))
      this.lengths.push(m * p.random(0.05, 0.12))
    }
  }

  draw(p: p5): void {
    const inner = easeOutCubic(this.t) * this.maxR
    const rot = (this.spin * this.age) / 1000
    glowStroke(p, this.hue, 80 * this.fade, 2, () => {
      for (let i = 0; i < this.angles.length; i++) {
        const a = this.angles[i] + rot
        const outer = inner + this.lengths[i] * (1 - this.t)
        p.line(
          this.x + Math.cos(a) * inner,
          this.y + Math.sin(a) * inner,
          this.x + Math.cos(a) * outer,
          this.y + Math.sin(a) * outer,
        )
      }
    })
  }
}
