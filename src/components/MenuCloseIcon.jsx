export function MenuCloseIcon({ open, size = 28, className = '' }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={`${className} ${open ? 'is-open' : ''}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <line className="nav-burger-icon__line nav-burger-icon__line--top" x1="10" y1="12" x2="30" y2="12" />
      <line className="nav-burger-icon__line nav-burger-icon__line--middle" x1="10" y1="20" x2="30" y2="20" />
      <line className="nav-burger-icon__line nav-burger-icon__line--bottom" x1="10" y1="28" x2="30" y2="28" />
    </svg>
  )
}

