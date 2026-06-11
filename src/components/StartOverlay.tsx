interface StartOverlayProps {
  visible: boolean
  onBegin: () => void
}

export function StartOverlay({ visible, onBegin }: StartOverlayProps) {
  return (
    <button
      type="button"
      className={visible ? 'overlay' : 'overlay overlay-hidden'}
      onClick={onBegin}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="overlay-title">lappal</span>
      <span className="overlay-sub">click or press any key to begin</span>
    </button>
  )
}
