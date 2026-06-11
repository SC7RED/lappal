import { useCallback, useState } from 'react'
import { CanvasStage } from './components/CanvasStage'
import { KeyStrip } from './components/KeyStrip'
import { Pads } from './components/Pads'
import { StartOverlay } from './components/StartOverlay'
import { soundEngine } from './audio/soundEngine'
import { triggerAt } from './interaction/trigger'
import type { TriggerPoint } from './interaction/trigger'
import { useKeyboard } from './interaction/useKeyboard'

function App() {
  const [interacted, setInteracted] = useState(false)

  // Runs synchronously inside the first gesture (click or keydown), which is
  // the only place the browser allows the AudioContext to start.
  const begin = useCallback(() => {
    soundEngine.init()
    setInteracted(true)
  }, [])

  const pressCanvas = useCallback(
    (point: TriggerPoint) => {
      begin()
      triggerAt(point)
    },
    [begin],
  )

  useKeyboard(begin)

  return (
    <>
      <CanvasStage onPress={pressCanvas} />
      <Pads onPress={begin} />
      <KeyStrip onPress={begin} />
      <StartOverlay visible={!interacted} onBegin={begin} />
    </>
  )
}

export default App
