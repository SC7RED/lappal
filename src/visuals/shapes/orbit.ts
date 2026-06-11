import type p5 from 'p5'
import { BaseAnimation, easeOutCubic } from '../animation'

// Dots circling an invisible center while spiraling outward, with ghost trails.
export class Orbit extends BaseAnimation {
  private readonly count: number
  private readonly omega: number
  private readonly phases: number[] = []
  private readonly radiusScales: number[] = []
  private readonly dotSize: number
  private readonly maxR: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1800)
    const m = Math.min(p.width, p.height)
    this.maxR = m * p.random(0.14, 0.2)
    this.dotSize = m * p.random(0.008, 0.012)
    this.omega = (p.random(1.8, 3) * (p.random() < 0.5 ? -1 : 1)) / 1000
    this.count = Math.floor(p.random(7, 11))
    for (let i = 0; i < this.count; i++) {
      this.phases.push((i / this.count) * p.TWO_PI + p.random(-0.2, 0.2))
      this.radiusScales.push(p.random(0.55, 1))
    }
  }

  draw(p: p5): void {
    const grow = easeOutCubic(this.t)
    p.noStroke()
    for (let i = 0; i < this.count; i++) {
      const r = grow * this.maxR * this.radiusScales[i]
      const angle = this.phases[i] + this.omega * this.age
      for (let ghost = 3; ghost >= 0; ghost--) {
        const a = angle - ghost * 0.16 * Math.sign(this.omega)
        const alpha = 85 * this.fade * Math.pow(0.5, ghost)
        const size = this.dotSize * (1 - ghost * 0.18)
        p.fill(this.hue, 75, 100, alpha * 0.35)
        p.circle(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r, size * 2.6)
        p.fill(this.hue, 55, 100, alpha)
        p.circle(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r, size)
      }
    }
  }
}
