import type p5 from 'p5'
import { BaseAnimation } from '../animation'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
}

// Radial spray of glowing dots that decelerate and shrink as they fade.
export class Burst extends BaseAnimation {
  private readonly particles: Particle[] = []

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1500)
    const m = Math.min(p.width, p.height)
    const count = Math.floor(p.random(16, 24))
    for (let i = 0; i < count; i++) {
      const angle = p.random(p.TWO_PI)
      const speed = (m * p.random(0.25, 0.55)) / 1000
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: m * p.random(0.004, 0.012),
        hue: (hue + p.random(-12, 12) + 360) % 360,
      })
    }
  }

  protected tick(dt: number): void {
    const friction = Math.pow(0.997, dt)
    for (const pt of this.particles) {
      pt.x += pt.vx * dt
      pt.y += pt.vy * dt
      pt.vx *= friction
      pt.vy *= friction
    }
  }

  draw(p: p5): void {
    p.noStroke()
    const alpha = 85 * this.fade
    for (const pt of this.particles) {
      const size = pt.size * (0.4 + 0.6 * this.fade)
      p.fill(pt.hue, 60, 100, alpha * 0.3)
      p.circle(pt.x, pt.y, size * 3)
      p.fill(pt.hue, 80, 100, alpha)
      p.circle(pt.x, pt.y, size)
    }
  }
}
