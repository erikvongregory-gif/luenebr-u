import { ArrowRight } from 'lucide-react'

export function FlowButton({
  as: Component = 'button',
  className = '',
  text,
  children,
  type,
  ...props
}) {
  const isNativeButton = Component === 'button'
  const content = children ?? text ?? 'Modern Button'
  const finalType = isNativeButton ? type ?? 'button' : undefined

  return (
    <Component className={`flow-btn ${className}`.trim()} type={finalType} {...props}>
      <span className="flow-btn__text">{content}</span>
      <ArrowRight className="flow-btn__arrow" aria-hidden />
      <span className="flow-btn__circle" aria-hidden />
    </Component>
  )
}

