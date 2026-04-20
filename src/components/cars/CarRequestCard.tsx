import { motion } from 'framer-motion'
import { Clock, Eye, Gauge, Handshake, MapPin, MessageCircle, Pin, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CarRequest } from '../../types'
import { getUser } from '../../data/mockData'
import { cn, formatCurrency, timeAgo } from '../../lib/utils'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'
import { MatchScore } from '../ui/MatchScore'

interface Props {
  request: CarRequest
  dense?: boolean
  index?: number
}

export function CarRequestCard({ request, dense, index = 0 }: Props) {
  const buyer = getUser(request.buyerId)

  const negLabel =
    request.negotiation === 'firm'
      ? { text: 'Firm price', variant: 'warn' as const }
      : request.negotiation === 'auction'
      ? { text: 'Live auction', variant: 'accent' as const }
      : { text: 'Negotiable', variant: 'brand' as const }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link to={`/request/${request.id}`} className="group block">
        <article
          className={cn(
            'card-hover glass relative overflow-hidden rounded-2xl',
            dense ? 'p-3' : 'p-0',
          )}
        >
          {/* Image block */}
          <div className={cn('relative overflow-hidden', dense ? 'rounded-xl mb-3 h-32' : 'h-52')}>
            <img
              src={request.referenceImage}
              alt={request.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

            {/* Top-left pills */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {request.pinned && (
                <Badge variant="brand" icon={<Pin className="h-3 w-3" />}>
                  Yours
                </Badge>
              )}
              {request.boosted && (
                <Badge variant="accent" icon={<Sparkles className="h-3 w-3" />}>
                  Boosted
                </Badge>
              )}
              {request.urgency === 'high' && (
                <Badge variant="danger" icon={<Zap className="h-3 w-3" />} dot>
                  Hot
                </Badge>
              )}
            </div>

            {/* Match score */}
            {request.matchScore !== undefined && (
              <div className="absolute right-3 top-3">
                <MatchScore score={request.matchScore} size={52} />
              </div>
            )}

            {/* Negotiation mode pill on image */}
            <div className="absolute bottom-3 left-3">
              <Badge variant={negLabel.variant} dot>
                {negLabel.text}
              </Badge>
            </div>
          </div>

          <div className={cn(dense ? '' : 'p-5 pt-4')}>
            <div className="flex items-start gap-3">
              <Avatar name={buyer?.name ?? 'Buyer'} colorClass={buyer?.avatarColor} verified={buyer?.verified} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium text-white truncate">{buyer?.name}</span>
                  {buyer?.verified && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-brand-400">verified</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-ink-400">
                  <MapPin className="h-3 w-3" />
                  <span>{request.location}</span>
                  <span>·</span>
                  <span>{request.radiusMiles}mi</span>
                  <span>·</span>
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo(request.createdAt)}</span>
                </div>
              </div>
            </div>

            <h3 className="mt-3 font-display text-[17px] font-semibold leading-tight text-white line-clamp-2">
              {request.title}
            </h3>

            {/* Price banner */}
            <div className="mt-4 flex items-end justify-between gap-3 rounded-xl bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent p-3.5 ring-1 ring-brand-500/20">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-ink-400">Buyer's target</div>
                <div className="flex items-baseline gap-1 font-display font-semibold">
                  <span className="text-2xl text-gradient-brand">{formatCurrency(request.priceMin, { compact: true })}</span>
                  <span className="text-ink-500 text-sm">–</span>
                  <span className="text-xl text-white">{formatCurrency(request.priceMax, { compact: true })}</span>
                </div>
              </div>
              {request.tradeIn && (
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-ink-400">
                    <Handshake className="h-3 w-3" /> Trade-in
                  </div>
                  <div className="text-xs font-medium text-white">
                    {request.tradeIn.year} {request.tradeIn.make}
                  </div>
                  <div className="text-[11px] text-brand-300">+{formatCurrency(request.tradeIn.value, { compact: true })}</div>
                </div>
              )}
            </div>

            {/* Specs row */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Badge variant="outline">
                {request.spec.yearMin}
                {request.spec.yearMin !== request.spec.yearMax ? `–${request.spec.yearMax}` : ''}
              </Badge>
              <Badge variant="outline">{request.spec.bodyStyle}</Badge>
              {request.spec.transmission !== 'any' && (
                <Badge variant="outline" className="capitalize">
                  {request.spec.transmission}
                </Badge>
              )}
              {request.spec.mileageMax && (
                <Badge variant="outline" icon={<Gauge className="h-3 w-3" />}>
                  ≤ {(request.spec.mileageMax / 1000).toFixed(0)}k mi
                </Badge>
              )}
            </div>

            {/* Footer metrics */}
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-ink-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {request.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" /> {request.offerCount}
                </span>
              </div>
              <span className="font-medium text-brand-400 transition-colors group-hover:text-brand-300">
                Make offer →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
