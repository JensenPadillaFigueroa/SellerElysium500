import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../lib/theme'
import { cn } from '../../lib/utils'

interface Props {
  size?: 'sm' | 'md'
  className?: string
}

export function ThemeToggle({ size = 'md', className }: Props) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  const dims =
    size === 'sm'
      ? 'h-9 w-9'
      : 'h-10 w-10'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] text-ink-200 transition-all hover:bg-white/[0.06]',
        dims,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: 12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-[18px] w-[18px] text-brand-300" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: 12, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-[18px] w-[18px] text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}
