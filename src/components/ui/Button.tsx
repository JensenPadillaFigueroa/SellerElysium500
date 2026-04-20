import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'glass'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-tight rounded-xl transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-brand text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:brightness-110',
  secondary: 'bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.1]',
  ghost: 'text-ink-200 hover:bg-white/[0.05]',
  outline: 'border border-white/15 text-white hover:bg-white/[0.05]',
  danger: 'bg-red-500/90 text-white hover:bg-red-500',
  glass: 'glass-strong text-white hover:bg-white/[0.08]',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px]',
  icon: 'h-10 w-10',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', size = 'md', leftIcon, rightIcon, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    )
  },
)
Button.displayName = 'Button'
