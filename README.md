# lappal

An interactive audiovisual keyboard inspired by [patatap.com](https://patatap.com). Press a key and a neon animation blooms across the screen with a matching sound — every combination harmonizes, every press looks a little different. Dark, trippy, purple-to-blue.

Built with Vite, React, TypeScript, [p5.js](https://p5js.org) (visuals), and [Tone.js](https://tonejs.github.io) (audio).

## Controls

Click or press any key to start the audio, then play:

| Keys | Sound | Visuals |
| --- | --- | --- |
| `A S D F G H J K L` | C# minor pentatonic, ascending C#3 → B4 | rings, bursts, polygons, circles, rays, blooms, spirals, ripples, shards |
| `Q` | kick | orbiting dots |
| `W` | hat | comet |
| `E` | tom | flower petals |

On phones and tablets a tappable pad grid replaces the keyboard.

## Local development

```sh
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally
```

## Adding a key

Everything about a pad — key, label, color, shape, sound — lives in one entry in
[`src/config/soundMap.ts`](src/config/soundMap.ts). Add one line to `PADS` (reusing any
existing shape) and the keyboard handler and mobile pad grid pick it up automatically.
New shapes are one small class in `src/visuals/shapes/` plus a case in its `index.ts` factory.

## Deploying to Vercel (free)

The app is a static Vite SPA — no config needed; Vercel auto-detects everything.

**Via the dashboard (recommended):**

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click **Add New… → Project**.
3. Import the `lappal` repo. The framework is auto-detected as Vite.
4. Click **Deploy**. The site goes live at `lappal-*.vercel.app` and redeploys automatically on every push to `main`.

**Via the CLI:**

```sh
npm i -g vercel
vercel          # accept the defaults
vercel --prod
```
