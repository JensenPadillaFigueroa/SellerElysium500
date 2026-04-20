import { cn, initials } from '../../lib/utils'

interface AvatarProps {
  name: string
  colorClass?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  verified?: boolean
  online?: boolean
  className?: string
}

const sizeMap = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
}

export function Avatar({ name, colorClass = 'from-emerald-400 to-teal-600', size = 'md', verified, online, className }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-1 ring-white/10 shadow-lg shadow-black/30',
          sizeMap[size],
          colorClass,
        )}
      >
        {initials(name)}
      </div>
      {verified && (
        <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-500 ring-2 ring-ink-950">
          <svg viewBox="0 0 10 10" className="h-2 w-2 text-white" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M2 5.2l2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      {online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-400 ring-2 ring-ink-950 pulse-ring" />}
    </div>
  )
}
