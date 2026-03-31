import { useRef, useEffect, useState, forwardRef } from 'react'

const Reveal = forwardRef(function Reveal(
  {
    as: Tag = 'div',
    className = '',
    children,
    delay = 0,
    threshold = 0.12,
    rootMargin = '0px 0px -32px 0px',
    once = true,
    soft = false,
    onVisible,
    style,
    ...rest
  },
  forwardedRef
) {
  const localRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const onVisibleRef = useRef(onVisible)
  onVisibleRef.current = onVisible

  const setRef = (node) => {
    localRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  useEffect(() => {
    const el = localRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          onVisibleRef.current?.()
          if (once) obs.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  const mergedClass = [
    'reveal',
    soft && 'reveal--soft',
    visible && 'reveal--visible',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const mergedStyle = {
    ...style,
    ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
  }

  return (
    <Tag ref={setRef} className={mergedClass} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  )
})

export default Reveal
