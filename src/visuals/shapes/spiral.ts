import type p5 from 'p5'
import { BaseAnimation, easeOutCubic, glowStroke } from '../animation'

// Two Archimedean spiral arms unwinding from the center while slowly turning.
export class Spiral extends BaseAnimation {
  private readonly maxR: number
  private readonly turns: number
  private readonly spin: number
  private readonly baseRot: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1900)
    this.maxR = Math.min(p.width, p.height) * p.random(0.16, 0.24)
    this.turns = p.random(2, 3)
    this.spin = p.random(0.5, 1) * (p.random() < 0.5 ? -1 : 1)
    this.baseRot = p.random(p.TWO_PI)
  }

  private arm(p: p5, rotOffset: number): void {
    const maxAngle = easeOutCubic(this.t) * this.turns * p.TWO_PI
    const rot = this.baseRot + rotOffset + (this.spin * this.age) / 1000
    const steps = 50
    p.beginShape()
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * maxAngle
      const r = (angle / (this.turns * p.TWO_PI)) * this.maxR
      p.vertex(this.x + Math.cos(angle + rot) * r, this.y + Math.sin(angle + rot) * r)
    }
    p.endShape()
  }

  draw(p: p5): void {
    glowStroke(p, this.hue, 75 * this.fade, 2, () => {
      this.arm(p, 0)
      this.arm(p, p.PI)
    })
  }
}
