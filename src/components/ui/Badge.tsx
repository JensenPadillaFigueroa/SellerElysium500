import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'brand' | 'accent' | 'warn' | 'danger' | 'outline' | 'ghost'

interface BadgeProps {
  children: ReactNode
  variant?: Variant
  icon?: ReactNode
  className?: string
  dot?: boolean
}

const variants: Record<Variant, string> = {
  default: 'bg-white/[0.06] text-ink-100 border border-white/10',
  brand: 'bg-brand-500/15 text-brand-300 border border-brand-500/30',
  accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/30',
  warn: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  danger: 'bg-red-500/15 text-red-300 border border-red-500/30',
  outline: 'border border-white/12 text-ink-200',
  ghost: 'text-ink-300',
}

export function Badge({ children, variant = 'default', icon, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight',
        variants[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'brand' && 'bg-brand-400',
            variant === 'accent' && 'bg-accent-400',
            variant === 'warn' && 'bg-amber-400',
            variant === 'danger' && 'bg-red-400',
            (variant === 'default' || variant === 'outline' || variant === 'ghost') && 'bg-ink-300',
          )}
        />
      )}
      {icon}
      {children}
    </span>
  )
}
