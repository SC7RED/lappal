import { useCallback, useState } from 'react'
import { CanvasStage } from './components/CanvasStage'
import { StartOverlay } from './components/StartOverlay'
import { soundEngine } from './audio/soundEngine'
import { useKeyboard } from './interaction/useKeyboard'

function App() {
  const [interacted, setInteracted] = useState(false)

  // Runs synchronously inside the first gesture (click or keydown), which is
  // the only place the browser allows the AudioContext to start.
  const begin = useCallback(() => {
    soundEngine.init()
    setInteracted(true)
  }, [])

  useKeyboard(begin)

  return (
    <>
      <CanvasStage />
      <StartOverlay visible={!interacted} onBegin={begin} />
    </>
  )
}

export default App
