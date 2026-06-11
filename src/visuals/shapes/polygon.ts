import type p5 from 'p5'
import { BaseAnimation, easeOutCubic, glowStroke } from '../animation'

// Two nested regular polygon outlines scaling up while counter-rotating.
export class Polygon extends BaseAnimation {
  private readonly sides: number
  private readonly maxR: number
  private readonly spin: number
  private readonly baseRot: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1800)
    this.sides = Math.floor(p.random(5, 8))
    this.maxR = Math.min(p.width, p.height) * p.random(0.14, 0.22)
    this.spin = p.random(0.8, 1.6) * (p.random() < 0.5 ? -1 : 1)
    this.baseRot = p.random(p.TWO_PI)
  }

  private outline(p: p5, r: number, rot: number): void {
    p.beginShape()
    for (let i = 0; i < this.sides; i++) {
      const a = rot + (i / this.sides) * p.TWO_PI
      p.vertex(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r)
    }
    p.endShape(p.CLOSE)
  }

  draw(p: p5): void {
    const r = easeOutCubic(this.t) * this.maxR
    const rot = this.baseRot + (this.spin * this.age) / 1000
    const alpha = 75 * this.fade
    glowStroke(p, this.hue, alpha, 2.2, () => {
      this.outline(p, r, rot)
    })
    glowStroke(p, this.hue, alpha * 0.7, 1.6, () => {
      this.outline(p, r * 0.62, -rot * 1.3)
    })
  }
}
