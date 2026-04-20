import { cn } from '../../lib/utils'

interface MatchScoreProps {
  score: number
  size?: number
  className?: string
  showLabel?: boolean
}

export function MatchScore({ score, size = 48, className, showLabel = true }: MatchScoreProps) {
  const radius = (size - 6) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference
  const color = score >= 90 ? '#34d399' : score >= 75 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-semibold tabular-nums text-white leading-none">{score}</span>
        {showLabel && <span className="text-[8px] uppercase tracking-wider text-ink-400 mt-0.5">match</span>}
      </div>
    </div>
  )
}
