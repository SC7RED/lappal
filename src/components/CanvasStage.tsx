import { useEffect, useRef } from 'react'
import { visualEngine } from '../visuals/visualEngine'

export function CanvasStage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el) visualEngine.mount(el)
    return () => visualEngine.unmount()
  }, [])

  return <div ref={ref} className="canvas-stage" aria-hidden="true" />
}
