import { useEffect, useRef } from 'react'
import { visualEngine } from '../visuals/visualEngine'
import type { TriggerPoint } from '../interaction/trigger'

interface CanvasStageProps {
  onPress: (point: TriggerPoint) => void
}

export function CanvasStage({ onPress }: CanvasStageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (el) visualEngine.mount(el)
    return () => visualEngine.unmount()
  }, [])

  return (
    <div
      ref={ref}
      className="canvas-stage"
      aria-hidden="true"
      onPointerDown={(e) => onPress({ x: e.clientX, y: e.clientY })}
    />
  )
}
