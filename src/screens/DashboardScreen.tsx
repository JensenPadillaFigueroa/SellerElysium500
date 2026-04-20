import { motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bookmark,
  Car,
  Clock,
  DollarSign,
  Eye,
  Handshake,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CarRequestCard } from '../components/cars/CarRequestCard'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { MatchScore } from '../components/ui/MatchScore'
import { CURRENT_USER_ID, REQUESTS, USERS, getUser } from '../data/mockData'
import { formatCurrency } from '../lib/utils'

const quickStats = [
  { label: 'Active requests', value: '3', delta: '+1 this week', trend: 'up', icon: Car, color: 'text-brand-400' },
  { label: 'Offers received', value: '24', delta: '+7 today', trend: 'up', icon: MessageSquare, color: 'text-accent-400' },
  { label: 'Avg. response time', value: '14m', delta: '-2m faster', trend: 'down', icon: Clock, color: 'text-brand-400' },
  { label: 'Est. savings', value: '$4.2k', delta: 'vs. MSRP', trend: 'up', icon: DollarSign, color: 'text-emerald-300' },
]

const alerts = [
  {
    title: 'Prestige Auto countered at $31,000',
    sub: 'Their offer expires in 2h 14min',
    icon: Handshake,
    variant: 'brand' as const,
    cta: 'Review',
    href: '/chat/t-1',
  },
  {
    title: 'New offer on your Tesla request',
    sub: 'Sunset Motors sent $29,900 · 15 min ago',
    icon: Zap,
    variant: 'accent' as const,
    cta: 'Open',
    href: '/request/r-1',
  },
  {
    title: 'Your request is trending #4',
    sub: 'In the top 5% of Miami EV requests this week',
    icon: TrendingUp,
    variant: 'warn' as const,
    cta: 'Boost more',
    href: '/request/r-1',
  },
]

export function DashboardScreen() {
  const me = getUser(CURRENT_USER_ID)!
  const myRequests = REQUESTS.filter((r) => r.buyerId === CURRENT_USER_ID)
  const watchlist = REQUESTS.filter((r) => r.buyerId !== CURRENT_USER_ID).slice(0, 3)

  return (
    <div className="px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      {/* Welcome */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar name={me.name} colorClass={me.avatarColor} verified={me.verified} size="lg" className="sm:hidden" />
          <Avatar name={me.name} colorClass={me.avatarColor} verified={me.verified} size="xl" className="hidden sm:inline-flex" />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
              Welcome back
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Hi, {me.name.split(' ')[0]} 👋
            </h1>
            <p className="text-sm text-ink-300">
              You have <span className="font-medium text-white">2 new offers</span> and{' '}
              <span className="font-medium text-white">1 counter to review</span>.
            </p>
          </div>
        </div>
        <Link to="/create">
          <Button size="lg" leftIcon={<Plus className="h-[18px] w-[18px]" />}>
            New request
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 md:grid-cols-4">
        {quickStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass card-hover rounded-2xl p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] ${s.color}`}>
                <s.icon className="h-[18px] w-[18px]" />
              </div>
              {s.trend === 'up' ? (
                <span className="flex items-center gap-0.5 text-[11px] font-medium text-brand-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {s.delta}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-[11px] font-medium text-brand-400">
                  <ArrowDownRight className="h-3 w-3" />
                  {s.delta}
                </span>
              )}
            </div>
            <div className="mt-4 font-display text-3xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-ink-400">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:mt-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Main column */}
        <div className="space-y-8">
          {/* Alerts */}
          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-accent-400 flex items-center gap-1.5">
                  <Bell className="h-3 w-3" /> Action required
                </div>
                <h2 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
                  Hot alerts
                </h2>
              </div>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <div className="space-y-2.5">
              {alerts.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass card-hover flex items-center gap-4 rounded-2xl p-4"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      a.variant === 'brand'
                        ? 'bg-brand-500/15 text-brand-400'
                        : a.variant === 'accent'
                        ? 'bg-accent-500/15 text-accent-400'
                        : 'bg-amber-500/15 text-amber-400'
                    }`}
                  >
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-white">{a.title}</div>
                    <div className="text-xs text-ink-400">{a.sub}</div>
                  </div>
                  <Link to={a.href}>
                    <Button size="sm" variant={a.variant === 'accent' ? 'primary' : 'secondary'}>
                      {a.cta}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* My requests */}
          <section>
            <div className="mb-3 flex items-end justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                  <Car className="h-3 w-3" /> Your requests
                </div>
                <h2 className="mt-1 font-display text-xl font-bold text-white md:text-2xl">
                  Live and pulling offers
                </h2>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {myRequests.map((r, i) => (
                <CarRequestCard key={r.id} request={r} index={i} />
              ))}
              <Link
                to="/create"
                className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/10 p-6 text-center transition-colors hover:border-brand-500/40 hover:bg-brand-500/5 sm:min-h-[200px] sm:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-white">Post another request</div>
                  <div className="text-xs text-ink-400">Buyers can run up to 5 at once</div>
                </div>
              </Link>
            </div>
          </section>

          {/* Activity graph */}
          <section className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                  Offer activity · last 14 days
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-white">24 offers received</h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-ink-300">
                  <span className="h-2 w-2 rounded-full bg-brand-400" /> In range
                </span>
                <span className="flex items-center gap-1 text-ink-300">
                  <span className="h-2 w-2 rounded-full bg-accent-400" /> Above
                </span>
              </div>
            </div>
            <div className="mt-5 flex h-32 items-end gap-2">
              {[
                [24, 10],
                [32, 18],
                [18, 8],
                [45, 25],
                [60, 30],
                [40, 22],
                [55, 35],
                [72, 42],
                [48, 28],
                [65, 38],
                [80, 50],
                [58, 30],
                [70, 45],
                [85, 55],
              ].map(([a, b], i) => (
                <div key={i} className="flex flex-1 flex-col-reverse gap-0.5">
                  <div className="rounded bg-gradient-to-t from-brand-500 to-brand-400" style={{ height: `${a}%` }} />
                  <div className="rounded bg-gradient-to-t from-accent-500/80 to-accent-400" style={{ height: `${b}%` }} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Side column */}
        <div className="space-y-6">
          {/* Watchlist */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                <Bookmark className="h-3 w-3" /> Watchlist
              </div>
              <span className="text-[11px] text-ink-400">{watchlist.length} saved</span>
            </div>
            <div className="mt-3 space-y-3">
              {watchlist.map((r) => (
                <Link
                  key={r.id}
                  to={`/request/${r.id}`}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.02] p-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <img src={r.referenceImage} alt="" className="h-12 w-14 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">
                      {r.spec.yearMin} {r.spec.make} {r.spec.model}
                    </div>
                    <div className="text-[11px] text-ink-400">
                      {formatCurrency(r.priceMin, { compact: true })}–{formatCurrency(r.priceMax, { compact: true })} ·{' '}
                      {r.offerCount} offers
                    </div>
                  </div>
                  <MatchScore score={r.matchScore ?? 80} size={34} showLabel={false} />
                </Link>
              ))}
            </div>
          </div>

          {/* Top sellers */}
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
              <Sparkles className="h-3 w-3" /> Top matched sellers
            </div>
            <div className="mt-3 space-y-3">
              {USERS.filter((u) => u.role === 'seller').map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar name={s.name} colorClass={s.avatarColor} verified={s.verified} size="md" />
                    <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950 font-mono text-[9px] font-bold text-brand-400 ring-1 ring-white/10">
                      {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{s.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-ink-400">
                      <span className="text-amber-400">★</span>
                      <span>{s.rating}</span>
                      <span>·</span>
                      <span>{s.deals} deals</span>
                    </div>
                  </div>
                  <Badge variant="brand">Online</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Engagement card */}
          <div className="relative overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-br from-accent-500/10 to-transparent p-5">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-500/20 blur-[60px]" />
            <div className="relative">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-accent-400">
                <Eye className="h-3 w-3" /> Engagement boost
              </div>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                Get 3× more offers
              </h3>
              <p className="mt-1 text-xs text-ink-300">
                Verify your identity and add a financing pre-approval to boost trust with sellers.
              </p>
              <Button variant="secondary" size="sm" className="mt-4 w-full">
                Start verification →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
