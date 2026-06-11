import type p5 from 'p5'
import { BaseAnimation } from '../animation'

interface Shard {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  spin: number
  size: number
}

// Triangular fragments thrown outward, tumbling as they slow and fade.
export class Shards extends BaseAnimation {
  private readonly shards: Shard[] = []

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1500)
    const m = Math.min(p.width, p.height)
    const count = Math.floor(p.random(8, 13))
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * p.TWO_PI + p.random(-0.3, 0.3)
      const speed = (m * p.random(0.2, 0.45)) / 1000
      this.shards.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        rot: p.random(p.TWO_PI),
        spin: p.random(-6, 6) / 1000,
        size: m * p.random(0.012, 0.028),
      })
    }
  }

  protected tick(dt: number): void {
    const friction = Math.pow(0.9965, dt)
    for (const s of this.shards) {
      s.x += s.vx * dt
      s.y += s.vy * dt
      s.vx *= friction
      s.vy *= friction
      s.rot += s.spin * dt
    }
  }

  draw(p: p5): void {
    const alpha = this.fade
    for (const s of this.shards) {
      p.push()
      p.translate(s.x, s.y)
      p.rotate(s.rot)
      p.fill(this.hue, 70, 100, 45 * alpha)
      p.stroke(this.hue, 60, 100, 80 * alpha)
      p.strokeWeight(1.2)
      p.triangle(s.size, 0, -s.size * 0.6, s.size * 0.55, -s.size * 0.6, -s.size * 0.55)
      p.pop()
    }
  }
}
