import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Car,
  Check,
  CheckCircle2,
  Clock,
  DollarSign,
  Eye,
  Gauge,
  Handshake,
  Info,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Palette,
  Pause,
  Pencil,
  Share2,
  Shield,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { OfferCard } from '../components/cars/OfferCard'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { MatchScore } from '../components/ui/MatchScore'
import { getOffersForRequest, getRequest, getUser } from '../data/mockData'
import { cn, formatCurrency, timeAgo } from '../lib/utils'

const dealStages = [
  { id: 'posted', label: 'Posted', icon: Sparkles },
  { id: 'matching', label: 'Matching', icon: Zap },
  { id: 'negotiating', label: 'Negotiating', icon: Handshake },
  { id: 'pending', label: 'Deal pending', icon: Shield },
  { id: 'closed', label: 'Closed', icon: CheckCircle2 },
]

export function RequestDetailScreen() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = getRequest(id ?? 'r-1')

  if (!request) {
    return (
      <div className="flex h-96 items-center justify-center text-ink-300">
        Request not found.
      </div>
    )
  }

  const buyer = getUser(request.buyerId)
  const offers = getOffersForRequest(request.id)
  const stageIndex = request.status === 'active' ? 1 : request.status === 'negotiating' ? 2 : request.status === 'deal-pending' ? 3 : 4

  const stats = [
    { label: 'Views', value: request.views.toLocaleString(), icon: Eye, trend: '+32%' },
    { label: 'Offers', value: offers.length + request.offerCount, icon: MessageSquare, trend: '+2 today' },
    { label: 'Best offer', value: formatCurrency(Math.min(...offers.map((o) => o.price))), icon: TrendingDown, trend: 'in range' },
    { label: 'Avg offer', value: formatCurrency(Math.round(offers.reduce((s, o) => s + o.price, 0) / offers.length || request.priceMax)), icon: DollarSign, trend: '+3% over' },
  ]

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-56 w-full overflow-hidden sm:h-64 md:h-80 lg:h-96">
        <img src={request.referenceImage} alt={request.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between p-3 sm:p-4 md:p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass-strong text-white transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-xl glass-strong text-white transition-colors hover:bg-white/10">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl glass-strong text-white transition-colors hover:bg-white/10">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="-mt-24 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative z-10 grid gap-5 sm:gap-6 lg:grid-cols-[1.6fr_1fr]">
            {/* Main column */}
            <div className="space-y-6">
              {/* Title card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-2xl p-4 sm:p-5 md:p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {request.urgency === 'high' && (
                    <Badge variant="danger" icon={<Zap className="h-3 w-3" />} dot>
                      Hot request
                    </Badge>
                  )}
                  {request.boosted && (
                    <Badge variant="accent" icon={<Sparkles className="h-3 w-3" />}>
                      Boosted
                    </Badge>
                  )}
                  <Badge variant={request.negotiation === 'firm' ? 'warn' : request.negotiation === 'auction' ? 'accent' : 'brand'} dot>
                    {request.negotiation === 'firm' ? 'Firm price' : request.negotiation === 'auction' ? 'Live auction' : 'Open to negotiate'}
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-ink-400">
                    <Clock className="h-3 w-3" />
                    {timeAgo(request.createdAt)} · expires {timeAgo(request.expiresAt).replace('ago', 'from now')}
                  </span>
                </div>

                <h1 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">
                  {request.title}
                </h1>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={buyer?.name ?? 'Buyer'}
                      colorClass={buyer?.avatarColor}
                      verified={buyer?.verified}
                      size="lg"
                      online
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-white">{buyer?.name}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">verified</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-ink-400">
                        <span className="text-amber-400">★</span>
                        <span className="font-medium text-ink-200">{buyer?.rating}</span>
                        <span>·</span>
                        <span>{buyer?.deals} completed deals</span>
                        <span>·</span>
                        <MapPin className="h-3 w-3" />
                        <span>{request.location}</span>
                      </div>
                    </div>
                  </div>
                  {request.matchScore !== undefined && (
                    <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2">
                      <MatchScore score={request.matchScore} size={44} showLabel={false} />
                      <div>
                        <div className="text-[11px] text-ink-400">Your inventory match</div>
                        <div className="text-sm font-semibold text-white">{request.matchScore}% compatibility</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Spec grid */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-5 sm:grid-cols-4">
                  <Spec icon={Car} label="Years" value={`${request.spec.yearMin}–${request.spec.yearMax}`} />
                  <Spec icon={Palette} label="Colors" value={request.spec.color ?? 'Any'} />
                  <Spec icon={Gauge} label="Max miles" value={request.spec.mileageMax ? `${(request.spec.mileageMax / 1000).toFixed(0)}k` : 'Any'} />
                  <Spec icon={Zap} label="Fuel" value={request.spec.fuel === 'any' ? 'Any' : request.spec.fuel} capitalize />
                </div>

                {request.notes && (
                  <div className="mt-5 rounded-xl bg-white/[0.02] p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                      Buyer's notes
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-200">"{request.notes}"</p>
                  </div>
                )}

                {request.spec.features && (
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                      Must-have features
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {request.spec.features.map((f) => (
                        <Badge key={f} variant="outline" icon={<Check className="h-3 w-3 text-brand-400" />}>
                          {f}
                        </Badge>
                      ))}
                      {request.spec.trims?.map((t) => (
                        <Badge key={t} variant="brand">{t}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Deal progress */}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                      Deal progress
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-white">
                      You're at stage {stageIndex + 1} of 5
                    </div>
                  </div>
                  <Badge variant="brand">On track</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {dealStages.map((stage, i) => {
                    const active = i === stageIndex
                    const done = i < stageIndex
                    return (
                      <div key={stage.id} className="flex flex-1 flex-col items-center">
                        <div className="flex w-full items-center">
                          {i > 0 && (
                            <div
                              className={cn(
                                'h-0.5 flex-1',
                                i <= stageIndex ? 'bg-gradient-brand' : 'bg-white/8',
                              )}
                            />
                          )}
                          <div
                            className={cn(
                              'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all',
                              done && 'border-brand-500 bg-brand-500 text-white',
                              active && 'border-brand-500 bg-ink-950 text-brand-400 ring-4 ring-brand-500/20',
                              !done && !active && 'border-white/10 bg-ink-900 text-ink-500',
                            )}
                          >
                            <stage.icon className="h-3.5 w-3.5" />
                          </div>
                          {i < dealStages.length - 1 && (
                            <div
                              className={cn(
                                'h-0.5 flex-1',
                                i < stageIndex ? 'bg-gradient-brand' : 'bg-white/8',
                              )}
                            />
                          )}
                        </div>
                        <span
                          className={cn(
                            'mt-1.5 text-[10px] font-medium',
                            active ? 'text-white' : done ? 'text-brand-400' : 'text-ink-500',
                          )}
                        >
                          {stage.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Offers list */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                      {offers.length} offers from verified sellers
                    </h2>
                    <p className="text-xs text-ink-400">
                      Sorted by price · all within your {request.radiusMiles}mi radius
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-400">
                    <TrendingUp className="h-3.5 w-3.5 text-brand-400" />
                    <span>2 new in last hour</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {offers.map((o, i) => (
                    <OfferCard key={o.id} offer={o} targetMin={request.priceMin} targetMax={request.priceMax} index={i} />
                  ))}
                </div>
              </div>
            </div>

            {/* Side column */}
            <div className="space-y-5">
              {/* Price panel */}
              <div className="sticky top-[calc(4rem+1rem)] space-y-5">
                <div className="glass-strong relative overflow-hidden rounded-2xl p-5">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" />
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-400">
                    Your target
                  </div>
                  <div className="mt-2 flex items-baseline gap-1 font-display font-bold">
                    <span className="text-3xl text-gradient-brand">{formatCurrency(request.priceMin)}</span>
                    <span className="text-ink-500">–</span>
                    <span className="text-2xl text-white">{formatCurrency(request.priceMax)}</span>
                  </div>

                  {request.tradeIn && (
                    <div className="mt-4 rounded-xl bg-brand-500/10 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-brand-400">
                        <Handshake className="h-3 w-3" /> Trade-in included
                      </div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-sm text-white">
                          {request.tradeIn.year} {request.tradeIn.make} {request.tradeIn.model}
                        </span>
                        <span className="font-display text-base font-semibold text-brand-300">
                          +{formatCurrency(request.tradeIn.value)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to="/chat/t-1">
                      <Button className="w-full" leftIcon={<MessageSquare className="h-4 w-4" />}>
                        Send offer
                      </Button>
                    </Link>
                    <Button variant="secondary" leftIcon={<Pencil className="h-4 w-4" />}>
                      Edit
                    </Button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Button variant="ghost" size="sm" leftIcon={<Pause className="h-3.5 w-3.5" />}>
                      Pause
                    </Button>
                    <Button variant="ghost" size="sm" leftIcon={<Share2 className="h-3.5 w-3.5" />}>
                      Share
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="glass rounded-2xl p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                    Performance
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {stats.map((s) => (
                      <div key={s.label} className="rounded-xl bg-white/[0.02] p-3">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase text-ink-400">
                          <s.icon className="h-3 w-3" />
                          {s.label}
                        </div>
                        <div className="mt-1 font-display text-lg font-bold text-white">{s.value}</div>
                        <div className="text-[10px] text-brand-400">{s.trend}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market insight */}
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
                    <Info className="h-3 w-3" /> Market insight
                  </div>
                  <div className="mt-2 text-sm text-ink-200">
                    <span className="font-semibold text-white">{request.spec.make} {request.spec.model}</span> prices
                    have dropped <span className="text-brand-400 font-semibold">3.2%</span> in the last 30 days.
                    Your current range is well-positioned.
                  </div>
                  <div className="mt-4 flex h-12 items-end gap-1">
                    {[40, 52, 48, 55, 62, 58, 70, 65, 72, 60, 58, 55].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-gradient-to-t from-brand-500/40 to-brand-400/80"
                        style={{ height: `${v}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Spec({ icon: Icon, label, value, capitalize }: { icon: typeof Car; label: string; value: string; capitalize?: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-400">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={cn('mt-1 text-sm font-semibold text-white', capitalize && 'capitalize')}>{value}</div>
    </div>
  )
}
