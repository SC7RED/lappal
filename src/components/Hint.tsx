interface HintProps {
  active: boolean
}

// Corner reminder of the playable keys; flashes up once the overlay clears,
// then fades away on its own. Hidden on touch devices (the pads are labeled).
export function Hint({ active }: HintProps) {
  return (
    <div className={active ? 'hint hint-active' : 'hint'} aria-hidden="true">
      a s d f g h j k l &middot; q w e
    </div>
  )
}
