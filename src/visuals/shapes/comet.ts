import type p5 from 'p5'
import { BaseAnimation } from '../animation'

// A bright head sweeping along a circular arc, dragging a fading trail.
export class Comet extends BaseAnimation {
  private readonly cx: number
  private readonly cy: number
  private readonly radius: number
  private readonly omega: number
  private readonly startAngle: number
  private readonly headSize: number
  private readonly trail: Array<{ x: number; y: number }> = []

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1700)
    const m = Math.min(p.width, p.height)
    this.radius = m * p.random(0.12, 0.25)
    this.omega = (p.random(2, 3.5) * (p.random() < 0.5 ? -1 : 1)) / 1000
    this.startAngle = p.random(p.TWO_PI)
    this.headSize = m * p.random(0.012, 0.018)
    // The spawn point sits ON the arc; the orbit center is offset from it.
    this.cx = x - Math.cos(this.startAngle) * this.radius
    this.cy = y - Math.sin(this.startAngle) * this.radius
  }

  private headAt(age: number): { x: number; y: number } {
    const angle = this.startAngle + this.omega * age
    return {
      x: this.cx + Math.cos(angle) * this.radius,
      y: this.cy + Math.sin(angle) * this.radius,
    }
  }

  protected tick(_dt: number): void {
    this.trail.push(this.headAt(this.age))
    if (this.trail.length > 22) this.trail.shift()
  }

  draw(p: p5): void {
    p.noStroke()
    for (let i = 0; i < this.trail.length; i++) {
      const k = i / this.trail.length
      const pt = this.trail[i]
      p.fill(this.hue, 70, 100, 45 * k * this.fade)
      p.circle(pt.x, pt.y, this.headSize * (0.2 + 0.8 * k))
    }
    const head = this.headAt(this.age)
    p.fill(this.hue, 60, 100, 30 * this.fade)
    p.circle(head.x, head.y, this.headSize * 2.8)
    p.fill(this.hue, 25, 100, 95 * this.fade)
    p.circle(head.x, head.y, this.headSize)
  }
}
