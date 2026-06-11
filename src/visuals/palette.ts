import type p5 from 'p5'

// Background paint in HSB: near-black with a deep purple tint.
export const BG_HUE = 268
export const BG_SAT = 60
export const BG_BRI = 5

// Alpha of the background wash each frame; low values leave soft motion trails.
export const TRAIL_ALPHA = 24

// Slightly different hue on every press so repeated keys never look static.
export function driftHue(p: p5, hue: number, range = 16): number {
  return (hue + p.random(-range, range) + 360) % 360
}
