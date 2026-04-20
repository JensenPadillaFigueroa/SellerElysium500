import { motion } from 'framer-motion'
import { ArrowRight, Car, CheckCircle2, ChevronRight, Clock, DollarSign, MessageCircle, Plus, ShieldCheck, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CarRequestCard } from '../components/cars/CarRequestCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { POPULAR_MAKES, REQUESTS } from '../data/mockData'

const steps = [
  {
    icon: Target,
    title: 'Name your car + your price',
    text: "Post what you want, what you'll pay, and whether you negotiate.",
    color: 'from-brand-400 to-brand-600',
  },
  {
    icon: Zap,
    title: 'Dealers race to match',
    text: 'Verified sellers send offers within minutes, not weeks.',
    color: 'from-accent-400 to-accent-600',
  },
  {
    icon: MessageCircle,
    title: 'Chat, counter, close',
    text: 'Negotiate in-app, lock the deal, and drive away.',
    color: 'from-amber-400 to-orange-500',
  },
]

const stats = [
  { label: 'Active buyers', value: '48.2k', icon: Car },
  { label: 'Avg. time to first offer', value: '14 min', icon: Clock },
  { label: 'Avg. savings off MSRP', value: '11.3%', icon: DollarSign },
  { label: 'Deals closed this month', value: '3,214', icon: CheckCircle2 },
]

export function HomeScreen() {
  const featured = REQUESTS.slice(0, 6)

  return (
    <div className="px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-ink-900 via-ink-900/60 to-ink-950 p-5 sm:p-7 md:p-10 lg:p-12 xl:p-14">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-[340px] w-[340px] rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-[280px] w-[280px] rounded-full bg-accent-500/20 blur-[100px]" />

        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          <div>
            <Badge variant="brand" icon={<Sparkles className="h-3 w-3" />} className="mb-5">
              Reverse auto marketplace · Beta
            </Badge>
            <h1 className="font-display text-[clamp(2rem,7vw,2.75rem)] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[56px] xl:text-7xl">
              Stop browsing.
              <br />
              <span className="text-gradient-brand">Start naming</span> your price.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
              Post the car you want and the price you'll pay. Verified dealers and private sellers come to
              <em className="not-italic text-white"> you </em>
              with offers — negotiate, counter, and close without scrolling through 10,000 listings.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/create">
                <Button size="lg" leftIcon={<Plus className="h-[18px] w-[18px]" />}>
                  Post a request — free
                </Button>
              </Link>
              <Link to="/discover">
                <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  I'm a seller
                </Button>
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-ink-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-400" /> Escrow-backed payments
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-400" /> Verified dealers only
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-brand-400" /> Offers in minutes
              </span>
            </div>
          </div>

          {/* Hero card preview (desktop only) */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rotate-[-2deg]">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-brand opacity-30 blur-2xl" />
              <CarRequestCard request={featured[0]} />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute right-0 top-10 w-64 rotate-[4deg]"
            >
              <div className="glass-strong rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20">
                    <Zap className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-xs text-ink-300">New offer</div>
                    <div className="text-sm font-semibold text-white">Prestige Auto</div>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-gradient-brand">$31,500</span>
                  <span className="text-xs text-ink-400">·2022 Model 3 LR</span>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5">
                  <div className="h-full w-[85%] rounded-full bg-gradient-brand" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="relative mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/5 pt-6 sm:gap-3 sm:pt-8 md:mt-10 md:grid-cols-4 md:gap-6 lg:mt-12">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-brand-400">
                <s.icon className="h-[18px] w-[18px]" />
              </div>
              <div>
                <div className="font-display text-xl font-bold text-white md:text-2xl">{s.value}</div>
                <div className="text-[11px] text-ink-400">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mt-8 sm:mt-10 md:mt-14 xl:mt-16">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">How it works</div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Car shopping, flipped.
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass card-hover rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <span className="font-display text-5xl font-bold text-white/5">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending feed */}
      <section className="mt-8 sm:mt-10 md:mt-14 xl:mt-16">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Trending requests
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Buyers who want it now.
            </h2>
          </div>
          <Link to="/discover">
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
              See all
            </Button>
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-3">
          {featured.map((r, i) => (
            <CarRequestCard key={r.id} request={r} index={i} />
          ))}
        </div>
      </section>

      {/* Popular makes */}
      <section className="mt-8 sm:mt-10 md:mt-14 xl:mt-16">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">Hot categories</div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            Most-requested makes this week.
          </h2>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {POPULAR_MAKES.map((m) => (
            <button
              key={m.name}
              className="group flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm transition-colors hover:border-brand-500/30 hover:bg-brand-500/5"
            >
              <Car className="h-3.5 w-3.5 text-brand-400" />
              <span className="font-medium text-white">{m.name}</span>
              <span className="text-[11px] text-ink-400 group-hover:text-brand-300">
                {m.count.toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mt-10 overflow-hidden rounded-3xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-ink-900 to-accent-500/10 p-6 sm:p-8 md:p-12 lg:mt-14 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-brand-500/20 blur-[100px]" />
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-[40px]">
              Ready to flip the car-buying game?
            </h2>
            <p className="mt-3 text-ink-200 md:text-lg">
              Join 48,000+ buyers making dealers come to them. It takes 90 seconds to post.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/create">
                <Button size="lg" leftIcon={<Plus className="h-[18px] w-[18px]" />}>
                  Post your first request
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="glass">Explore dashboard</Button>
              </Link>
            </div>
          </div>
          <div className="hidden items-center justify-end lg:flex">
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]"
                >
                  <Car className="h-5 w-5 text-ink-400" style={{ opacity: 0.3 + (i % 3) * 0.25 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
