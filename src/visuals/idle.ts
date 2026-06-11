import type p5 from 'p5'

interface IdleDot {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  hue: number
  phase: number
}

const DOT_COUNT = 40

// Faint twinkling dots drifting across the screen so the canvas is never
// dead while no key is pressed. Dots wrap at the edges.
export class IdleField {
  private readonly dots: IdleDot[] = []

  constructor(p: p5) {
    for (let i = 0; i < DOT_COUNT; i++) {
      this.dots.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.012, 0.012),
        vy: p.random(-0.012, 0.012),
        size: p.random(1.5, 3.5),
        hue: p.random(190, 320),
        phase: p.random(p.TWO_PI),
      })
    }
  }

  updateAndDraw(p: p5, dt: number): void {
    p.noStroke()
    for (const dot of this.dots) {
      dot.x = (dot.x + dot.vx * dt + p.width) % p.width
      dot.y = (dot.y + dot.vy * dt + p.height) % p.height
      const twinkle = 0.5 + 0.5 * Math.sin(dot.phase + p.millis() / 1600)
      p.fill(dot.hue, 50, 90, 6 + 10 * twinkle)
      p.circle(dot.x, dot.y, dot.size * (1.6 + twinkle))
    }
  }
}
