# lappal

A patatap-inspired audiovisual keyboard: pressing keys (or tapping pads on touch
devices) fires a neon p5.js animation and a Tone.js sound simultaneously.
Stack: Vite + React 19 + TypeScript, p5 1.x (instance mode), Tone.js 15. Plain CSS,
no router, no state library.

## Architecture

- `src/config/soundMap.ts` — the single source of truth. One `PADS` entry per key:
  `{ key, label, hue, shape, sound }`. Adding a pad is one line here; everything else
  (keyboard handler, mobile pad grid, visuals, audio) derives from it.
- `src/visuals/visualEngine.ts` — plain TS singleton owning the one p5 instance
  (instance mode). `mount(el)` / `unmount()` from React, `trigger(pad)` from input.
  Draw loop: BLEND-mode low-alpha background wash (motion trails), then ADD-mode
  shapes (neon glow). Canvas color mode is HSB(360, 100, 100, 100) — **alpha max is 100**.
- `src/visuals/shapes/` — one ~50-line class per shape implementing
  `{ update(dt), draw(p), isDead() }` via `BaseAnimation`; registered in the
  `index.ts` factory. All motion is dt-scaled (milliseconds), never per-frame.
- `src/audio/soundEngine.ts` — lazy Tone singleton. **No Tone node may be constructed
  at module load**; everything builds inside `init()`, which must be called from a
  user-gesture handler (autoplay policy). `play()` no-ops until ready.
- `src/interaction/trigger.ts` — the one shared entry point both keyboard and pads call.
- React components stay thin; engines hold all state.

## Rules

- Keep the config-driven pattern: never hardcode a key/color/note outside `soundMap.ts`.
- Performance caps are deliberate: max 48 concurrent animations, bounded particle
  counts, clamped `deltaTime`. Don't remove them.
- StrictMode stays on; `visualEngine.mount()` is idempotent and `init()` is
  promise-guarded for that reason.
- Plain CSS in `src/index.css` only — no CSS frameworks or libraries.
- Verify with `npm run build` (type-check + build) and `npm run lint` before committing.

## Git

- Small, logical commits with short lowercase plain-language messages
  (e.g. `add touch pad grid for mobile`).
- **Never add Co-Authored-By lines, "Generated with" footers, or any other AI
  attribution to commits, PRs, or code comments.**
