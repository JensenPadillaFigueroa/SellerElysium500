import { motion } from 'framer-motion'
import { Check, ChevronRight, Clock, Gauge, MessageSquare, Palette, Shield, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Offer } from '../../types'
import { getUser } from '../../data/mockData'
import { cn, formatCurrency, timeAgo } from '../../lib/utils'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface Props {
  offer: Offer
  targetMin: number
  targetMax: number
  index?: number
  compact?: boolean
}

export function OfferCard({ offer, targetMin, targetMax, index = 0, compact }: Props) {
  const seller = getUser(offer.sellerId)
  const withinRange = offer.price >= targetMin && offer.price <= targetMax
  const pctOverMax = offer.price > targetMax ? ((offer.price - targetMax) / targetMax) * 100 : 0
  const pctUnderMin = offer.price < targetMin ? ((targetMin - offer.price) / targetMin) * 100 : 0

  const statusStyles: Record<Offer['status'], string> = {
    pending: 'text-brand-400',
    countered: 'text-amber-400',
    accepted: 'text-emerald-300',
    declined: 'text-red-400',
    withdrawn: 'text-ink-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn('glass rounded-2xl overflow-hidden card-hover', compact ? '' : 'p-0')}
    >
      <div className="flex flex-col md:flex-row">
        {/* Vehicle image */}
        <div className="relative h-40 w-full md:h-auto md:w-48 shrink-0 overflow-hidden md:rounded-l-2xl">
          <img src={offer.vehicle.images[0]} alt={offer.vehicle.model} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent md:bg-gradient-to-r" />
          <div className="absolute bottom-2 left-2 right-2 md:bottom-auto md:top-2">
            <Badge variant={withinRange ? 'brand' : 'warn'} dot>
              {withinRange ? 'In range' : offer.price > targetMax ? `+${pctOverMax.toFixed(0)}% over` : `${pctUnderMin.toFixed(0)}% under`}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar name={seller?.name ?? 'Seller'} colorClass={seller?.avatarColor} verified={seller?.verified} size="sm" />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-white truncate">{seller?.name}</span>
                  <Shield className="h-3 w-3 text-brand-400 shrink-0" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-ink-400">
                  <span className="text-amber-400">★</span>
                  <span className="font-medium text-ink-200">{seller?.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span>{seller?.deals} deals</span>
                  <span>·</span>
                  <span>{seller?.location}</span>
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="font-display text-2xl font-semibold text-white leading-none">
                {formatCurrency(offer.price)}
              </div>
              <div className={cn('text-[10px] font-medium uppercase tracking-wider mt-1', statusStyles[offer.status])}>
                {offer.status === 'countered' ? 'Counter pending' : offer.status}
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-white">
                {offer.vehicle.year} {offer.vehicle.make} {offer.vehicle.model} {offer.vehicle.trim}
              </div>
              <span className="text-[10px] text-ink-400 font-mono">VIN ·{offer.vehicle.vin.slice(-6)}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Badge variant="outline" icon={<Gauge className="h-3 w-3" />}>
                {offer.vehicle.mileage.toLocaleString()} mi
              </Badge>
              <Badge variant="outline" icon={<Palette className="h-3 w-3" />}>
                {offer.vehicle.color}
              </Badge>
              {offer.includes.slice(0, 2).map((inc) => (
                <Badge key={inc} variant="brand" icon={<Check className="h-3 w-3" />}>
                  {inc}
                </Badge>
              ))}
              {offer.includes.length > 2 && <Badge variant="ghost">+{offer.includes.length - 2} more</Badge>}
            </div>
          </div>

          <p className="mt-3 text-sm text-ink-200 line-clamp-2">"{offer.message}"</p>

          {/* Counter history bar */}
          {offer.counterHistory && offer.counterHistory.length > 1 && (
            <div className="mt-3 flex items-center gap-1.5">
              {offer.counterHistory.map((c, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div
                    className={cn(
                      'rounded-md px-2 py-1 text-[10px] font-semibold tabular-nums',
                      c.by === 'seller' ? 'bg-accent-500/15 text-accent-300' : 'bg-brand-500/15 text-brand-300',
                    )}
                  >
                    {formatCurrency(c.price, { compact: true })}
                  </div>
                  {i < offer.counterHistory!.length - 1 && <span className="text-ink-500 text-xs">→</span>}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-ink-400">
              <Clock className="h-3 w-3" />
              <span>Expires in {timeAgo(offer.expiresAt).replace(' ago', '')}</span>
              <span>·</span>
              <span>Sent {timeAgo(offer.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" leftIcon={<X className="h-3.5 w-3.5" />}>
                Pass
              </Button>
              <Link to={`/chat/t-1`}>
                <Button size="sm" variant="secondary" leftIcon={<MessageSquare className="h-3.5 w-3.5" />}>
                  Chat
                </Button>
              </Link>
              <Button size="sm" variant="primary" rightIcon={<ChevronRight className="h-3.5 w-3.5" />}>
                Counter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
