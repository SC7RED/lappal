import type p5 from 'p5'
import { BaseAnimation, easeOutQuad } from '../animation'

// Soft watercolor blot: translucent layers swelling at slightly offset centers.
export class Bloom extends BaseAnimation {
  private readonly offsets: Array<{ dx: number; dy: number; scale: number }> = []
  private readonly maxR: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 2000)
    const m = Math.min(p.width, p.height)
    this.maxR = m * p.random(0.12, 0.18)
    const layers = 5
    for (let i = 0; i < layers; i++) {
      this.offsets.push({
        dx: p.random(-0.2, 0.2) * this.maxR,
        dy: p.random(-0.2, 0.2) * this.maxR,
        scale: 0.5 + i * 0.18,
      })
    }
  }

  draw(p: p5): void {
    const swell = easeOutQuad(this.t)
    p.noStroke()
    for (const layer of this.offsets) {
      const r = swell * this.maxR * layer.scale
      p.fill(this.hue, 45, 100, 13 * this.fade)
      p.circle(this.x + layer.dx * swell, this.y + layer.dy * swell, r * 2)
    }
    p.fill(this.hue, 30, 100, 20 * this.fade)
    p.circle(this.x, this.y, swell * this.maxR * 0.5)
  }
}
