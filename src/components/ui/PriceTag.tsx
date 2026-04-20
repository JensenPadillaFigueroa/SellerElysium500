import { cn, formatCurrency } from '../../lib/utils'

interface PriceTagProps {
  min: number
  max: number
  mode?: 'firm' | 'open' | 'auction'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function PriceTag({ min, max, mode = 'open', size = 'md', className }: PriceTagProps) {
  const textSize = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-xl'
  const labelSize = size === 'lg' ? 'text-xs' : 'text-[10px]'
  const sameValue = min === max

  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <div className={cn('flex items-baseline gap-1 font-display font-semibold tracking-tight', textSize)}>
        <span className="text-gradient-brand">{formatCurrency(min, { compact: size === 'sm' })}</span>
        {!sameValue && (
          <>
            <span className="text-ink-400 text-sm">–</span>
            <span className="text-white">{formatCurrency(max, { compact: size === 'sm' })}</span>
          </>
        )}
      </div>
      <span className={cn('uppercase tracking-[0.15em] font-semibold', labelSize, mode === 'firm' ? 'text-amber-400' : mode === 'auction' ? 'text-accent-400' : 'text-brand-400')}>
        {mode === 'firm' ? 'Firm price' : mode === 'auction' ? 'Live auction' : 'Open to negotiate'}
      </span>
    </div>
  )
}
