import * as Tone from 'tone'
import type { SoundSpec } from '../config/soundMap'

// All Tone nodes are built lazily inside init(), never at module load: the
// AudioContext can only start from a user gesture, and constructing nodes
// against a suspended context triggers browser autoplay warnings.
class SoundEngine {
  private initPromise: Promise<void> | null = null
  private isReady = false
  private synth: Tone.PolySynth | null = null
  private kick: Tone.MembraneSynth | null = null
  private tom: Tone.MembraneSynth | null = null
  private hat: Tone.NoiseSynth | null = null

  // Must be called from within a user-gesture handler (click/keydown/pointerdown).
  // The cached promise collapses double-clicks and StrictMode re-runs into one build.
  init(): Promise<void> {
    if (!this.initPromise) this.initPromise = this.build()
    return this.initPromise
  }

  get ready(): boolean {
    return this.isReady
  }

  private async build(): Promise<void> {
    await Tone.start()

    // Shared effects bus: everything -> delay -> reverb -> limiter -> out.
    const limiter = new Tone.Limiter(-3).toDestination()
    const reverb = new Tone.Reverb({ decay: 4, wet: 0.35 }).connect(limiter)
    await reverb.ready
    const delay = new Tone.FeedbackDelay('8n.', 0.3).connect(reverb)
    delay.wet.value = 0.18

    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0.2, release: 1.2 },
    }).connect(delay)
    this.synth.maxPolyphony = 16
    this.synth.volume.value = -8

    this.kick = new Tone.MembraneSynth({ pitchDecay: 0.05 }).connect(delay)
    this.kick.volume.value = -2

    this.tom = new Tone.MembraneSynth({ pitchDecay: 0.15 }).connect(delay)
    this.tom.volume.value = -4

    const hatFilter = new Tone.Filter(8000, 'highpass').connect(delay)
    this.hat = new Tone.NoiseSynth({
      envelope: { attack: 0.001, decay: 0.05, sustain: 0 },
    }).connect(hatFilter)
    this.hat.volume.value = -12

    this.isReady = true
  }

  // Silently no-ops until init() resolves, so visuals never wait on audio.
  play(sound: SoundSpec): void {
    if (!this.isReady) return
    const now = Tone.now()
    // Two hits on the same drum within one audio render quantum resolve to an
    // identical start time, which Tone rejects with a throw; drop that hit
    // rather than letting the error escape the input handler.
    try {
      switch (sound.type) {
        case 'note':
          this.synth?.triggerAttackRelease(sound.note, '8n', now)
          break
        case 'kick':
          this.kick?.triggerAttackRelease('C1', '8n', now)
          break
        case 'tom':
          this.tom?.triggerAttackRelease('G2', '8n', now)
          break
        case 'hat':
          this.hat?.triggerAttackRelease('16n', now)
          break
      }
    } catch {
      // simultaneous duplicate trigger — safe to ignore
    }
  }
}

export const soundEngine = new SoundEngine()
