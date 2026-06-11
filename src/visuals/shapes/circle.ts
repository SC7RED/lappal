import type p5 from 'p5'
import { BaseAnimation, easeOutBack } from '../animation'

// A filled disc that pops in with overshoot, then holds and melts away.
export class Circle extends BaseAnimation {
  private readonly maxR: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1300)
    this.maxR = Math.min(p.width, p.height) * p.random(0.1, 0.16)
  }

  draw(p: p5): void {
    const grow = Math.min(this.t / 0.35, 1)
    const r = easeOutBack(grow) * this.maxR
    const alpha = this.fade
    p.noStroke()
    p.fill(this.hue, 55, 100, 10 * alpha)
    p.circle(this.x, this.y, r * 2.6)
    p.fill(this.hue, 70, 100, 26 * alpha)
    p.circle(this.x, this.y, r * 2)
    p.noFill()
    p.strokeWeight(2.2)
    p.stroke(this.hue, 75, 100, 85 * alpha)
    p.circle(this.x, this.y, r * 2)
  }
}
