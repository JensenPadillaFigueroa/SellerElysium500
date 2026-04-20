import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  padded?: boolean
  glass?: boolean
}

export function Card({ children, hover, padded = true, glass = true, className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        glass ? 'glass' : 'bg-ink-900 border border-white/8',
        hover && 'card-hover cursor-pointer',
        padded && 'p-5',
        className,
      )}
    >
      {children}
    </div>
  )
}
