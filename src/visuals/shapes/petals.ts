import type p5 from 'p5'
import { BaseAnimation, easeOutBack } from '../animation'

// A flower rosette of elongated petals blooming open and slowly turning.
export class Petals extends BaseAnimation {
  private readonly count: number
  private readonly maxR: number
  private readonly spin: number
  private readonly baseRot: number

  constructor(p: p5, x: number, y: number, hue: number) {
    super(x, y, hue, 1900)
    this.count = Math.floor(p.random(5, 9))
    this.maxR = Math.min(p.width, p.height) * p.random(0.1, 0.16)
    this.spin = p.random(0.4, 0.9) * (p.random() < 0.5 ? -1 : 1)
    this.baseRot = p.random(p.TWO_PI)
  }

  private rosette(p: p5, scale: number, rot: number, alpha: number): void {
    const len = this.maxR * scale
    const wid = len * 0.42
    p.push()
    p.translate(this.x, this.y)
    p.rotate(rot)
    for (let i = 0; i < this.count; i++) {
      p.push()
      p.rotate((i / this.count) * p.TWO_PI)
      p.translate(len * 0.55, 0)
      p.fill(this.hue, 60, 100, 28 * alpha)
      p.stroke(this.hue, 70, 100, 60 * alpha)
      p.strokeWeight(1.4)
      p.ellipse(0, 0, len, wid)
      p.pop()
    }
    p.pop()
  }

  draw(p: p5): void {
    const open = easeOutBack(Math.min(this.t / 0.45, 1))
    const rot = this.baseRot + (this.spin * this.age) / 1000
    this.rosette(p, open, rot, this.fade)
    this.rosette(p, open * 0.55, -rot * 1.4 + p.PI / this.count, this.fade * 0.8)
  }
}
