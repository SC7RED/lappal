import type p5 from 'p5'
import type { PadConfig } from '../../config/soundMap'
import type { Animation } from '../animation'
import { Rings } from './rings'
import { Burst } from './burst'
import { Polygon } from './polygon'
import { Circle } from './circle'
import { Rays } from './rays'
import { Bloom } from './bloom'
import { Spiral } from './spiral'
import { Ripple } from './ripple'
import { Shards } from './shards'
import { Orbit } from './orbit'
import { Comet } from './comet'
import { Petals } from './petals'

export function createAnimation(
  pad: PadConfig,
  p: p5,
  x: number,
  y: number,
  hue: number,
): Animation {
  switch (pad.shape) {
    case 'rings':
      return new Rings(p, x, y, hue)
    case 'burst':
      return new Burst(p, x, y, hue)
    case 'polygon':
      return new Polygon(p, x, y, hue)
    case 'circle':
      return new Circle(p, x, y, hue)
    case 'rays':
      return new Rays(p, x, y, hue)
    case 'bloom':
      return new Bloom(p, x, y, hue)
    case 'spiral':
      return new Spiral(p, x, y, hue)
    case 'ripple':
      return new Ripple(p, x, y, hue)
    case 'shards':
      return new Shards(p, x, y, hue)
    case 'orbit':
      return new Orbit(p, x, y, hue)
    case 'comet':
      return new Comet(p, x, y, hue)
    case 'petals':
      return new Petals(p, x, y, hue)
  }
}
