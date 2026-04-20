import { forwardRef, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightIcon, label, hint, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-xs font-medium text-ink-300">{label}</label>}
        <div
          className={cn(
            'group relative flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm transition-colors focus-within:border-brand-400/60 focus-within:bg-white/[0.05]',
            error && 'border-red-500/50',
            className,
          )}
        >
          {leftIcon && <span className="shrink-0 text-ink-300">{leftIcon}</span>}
          <input
            ref={ref}
            {...props}
            className="h-11 w-full bg-transparent text-white placeholder:text-ink-400 focus:outline-none"
          />
          {rightIcon && <span className="shrink-0 text-ink-300">{rightIcon}</span>}
        </div>
        {hint && !error && <p className="text-[11px] text-ink-400">{hint}</p>}
        {error && <p className="text-[11px] text-red-400">{error}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-xs font-medium text-ink-300">{label}</label>}
        <textarea
          ref={ref}
          {...props}
          className={cn(
            'w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white placeholder:text-ink-400 transition-colors focus:border-brand-400/60 focus:bg-white/[0.05] focus:outline-none',
            className,
          )}
        />
        {hint && <p className="text-[11px] text-ink-400">{hint}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
