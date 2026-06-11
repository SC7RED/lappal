import type p5 from 'p5'

export interface Animation {
  update(dt: number): void
  draw(p: p5): void
  isDead(): boolean
}

export function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5)
}

export function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

// Shared lifecycle for every shape: tracks age against a fixed lifespan and
// exposes eased progress/fade. Subclasses implement draw() and may override
// tick() for physics. All motion is dt-scaled (milliseconds).
export abstract class BaseAnimation implements Animation {
  protected readonly x: number
  protected readonly y: number
  protected readonly hue: number
  protected readonly life: number
  protected age = 0

  constructor(x: number, y: number, hue: number, life: number) {
    this.x = x
    this.y = y
    this.hue = hue
    this.life = life
  }

  update(dt: number): void {
    this.age += dt
    this.tick(dt)
  }

  protected tick(_dt: number): void {}

  // Progress 0..1 over the animation's life.
  protected get t(): number {
    return Math.min(this.age / this.life, 1)
  }

  // Gentle at first, accelerating toward zero at the end of life.
  protected get fade(): number {
    return 1 - this.t * this.t
  }

  isDead(): boolean {
    return this.age >= this.life
  }

  abstract draw(p: p5): void
}

// Layered-additive glow: the same path drawn three times, wide and faint to
// tight and bright. Cheap compared to canvas shadowBlur, which gaussian-blurs
// on the CPU per draw call.
export function glowStroke(
  p: p5,
  hue: number,
  alpha: number,
  weight: number,
  drawPath: () => void,
): void {
  p.noFill()
  const passes: Array<[number, number]> = [
    [weight * 3, alpha * 0.25],
    [weight * 1.6, alpha * 0.55],
    [weight, alpha],
  ]
  for (const [w, a] of passes) {
    p.strokeWeight(w)
    p.stroke(hue, 75, 100, a)
    drawPath()
  }
}
