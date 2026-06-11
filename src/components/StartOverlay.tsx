interface StartOverlayProps {
  visible: boolean
  onBegin: () => void
}

export function StartOverlay({ visible, onBegin }: StartOverlayProps) {
  return (
    <button
      type="button"
      className={visible ? 'overlay' : 'overlay overlay-hidden'}
      onClick={(e) => {
        // Drop focus before aria-hidden lands on this element, otherwise
        // Chrome blocks the attribute and warns about retained focus.
        e.currentTarget.blur()
        onBegin()
      }}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span className="overlay-title">lappal</span>
      <span className="overlay-sub">click or press any key to begin</span>
    </button>
  )
}
