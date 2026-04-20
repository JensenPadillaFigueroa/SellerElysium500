import { motion } from 'framer-motion'
import {
  Award,
  Bell,
  Car,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Edit3,
  Globe,
  HelpCircle,
  LogOut,
  MapPin,
  Monitor,
  Moon,
  Shield,
  Sparkles,
  Star,
  Sun,
  Wallet,
  Zap,
} from 'lucide-react'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { CURRENT_USER_ID, getUser } from '../data/mockData'
import { useTheme, type Theme } from '../lib/theme'
import { cn } from '../lib/utils'

const achievements = [
  { icon: Award, title: 'Early adopter', color: 'from-amber-400 to-orange-500' },
  { icon: Shield, title: 'Verified ID', color: 'from-brand-400 to-teal-500' },
  { icon: Zap, title: 'Fast closer', color: 'from-accent-400 to-fuchsia-500' },
  { icon: Star, title: '5-star buyer', color: 'from-yellow-300 to-amber-500' },
]

const settings = [
  {
    group: 'Account',
    items: [
      { icon: Shield, label: 'Verification & trust', hint: 'ID, income, Carfax integration', badge: 'Verified' },
      { icon: Wallet, label: 'Payment & escrow', hint: '•• 4291 · Stripe connected' },
      { icon: CreditCard, label: 'Financing', hint: 'Pre-approved up to $48,000' },
      { icon: MapPin, label: 'Locations', hint: '3 saved addresses' },
    ],
  },
  {
    group: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', hint: 'Push · Email · SMS' },
      { icon: Globe, label: 'Region & currency', hint: 'US · USD' },
      { icon: Sparkles, label: 'AI assistant', hint: 'Smart counters on · negotiation tips on' },
    ],
  },
  {
    group: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help center', hint: 'FAQ, contact, disputes' },
      { icon: LogOut, label: 'Sign out', hint: '' },
    ],
  },
]

const themeOptions: { id: Theme | 'system'; label: string; icon: typeof Sun; hint: string }[] = [
  { id: 'light', label: 'Light', icon: Sun, hint: 'Bright & airy' },
  { id: 'dark', label: 'Dark', icon: Moon, hint: 'Easy on the eyes' },
  { id: 'system', label: 'System', icon: Monitor, hint: 'Follow OS' },
]

export function ProfileScreen() {
  const me = getUser(CURRENT_USER_ID)!
  const { theme, setTheme } = useTheme()

  const onPick = (id: Theme | 'system') => {
    if (id === 'system') {
      try {
        window.localStorage.removeItem('reverso-theme')
      } catch {
        /* ignore */
      }
      const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches
      setTheme(prefersLight ? 'light' : 'dark')
    } else {
      setTheme(id)
    }
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-ink-900 via-ink-900/60 to-ink-950 p-6 md:p-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-brand-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-[200px] w-[200px] rounded-full bg-accent-500/20 blur-[80px]" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="relative">
                <Avatar name={me.name} colorClass={me.avatarColor} size="xl" />
                <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 ring-4 ring-ink-950">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {me.name}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="brand" icon={<Check className="h-3 w-3" />}>
                    Verified buyer
                  </Badge>
                  <Badge variant="accent" icon={<Sparkles className="h-3 w-3" />}>
                    Pro member
                  </Badge>
                  <span className="text-[11px] text-ink-400">
                    {me.handle} · {me.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" leftIcon={<Edit3 className="h-4 w-4" />}>
                Edit profile
              </Button>
              <Button variant="glass">Share</Button>
            </div>
          </div>

          {/* Stats row */}
          <div className="relative mt-6 grid grid-cols-2 gap-3 border-t border-white/5 pt-6 md:grid-cols-4 md:gap-6">
            <Stat label="Successful deals" value={me.deals.toString()} icon={CheckCircle2} />
            <Stat label="Buyer rating" value={`${me.rating} ★`} icon={Star} color="text-amber-400" />
            <Stat label="Total saved" value="$12.4k" icon={Wallet} color="text-brand-400" />
            <Stat label="Member since" value="Jun 2024" icon={Sparkles} />
          </div>
        </motion.div>

        {/* Achievements */}
        <section className="mt-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
            Achievements
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass flex items-center gap-3 rounded-2xl p-4 card-hover"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${a.color} text-white shadow-lg`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{a.title}</div>
                  <div className="text-[10px] text-ink-400">Unlocked</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust score */}
        <section className="mt-6 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> Trust score
              </div>
              <h3 className="mt-1 font-display text-xl font-bold text-white">Excellent · 92/100</h3>
              <p className="mt-0.5 text-sm text-ink-300">
                Top 8% of buyers. Sellers prioritize your offers.
              </p>
            </div>
            <div className="font-display text-5xl font-bold text-gradient-brand">92</div>
          </div>
          <div className="mt-4 space-y-2.5">
            {[
              { label: 'Identity verified', done: true },
              { label: 'Financing pre-approved', done: true },
              { label: 'Phone + email confirmed', done: true },
              { label: 'Social proof (LinkedIn)', done: false, hint: '+3 points' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    item.done ? 'bg-brand-500/20 text-brand-400' : 'border border-white/15 bg-white/[0.02] text-ink-500'
                  }`}
                >
                  {item.done ? <Check className="h-3 w-3" strokeWidth={3} /> : <Sparkles className="h-3 w-3" />}
                </div>
                <span className={`flex-1 text-sm ${item.done ? 'text-white' : 'text-ink-300'}`}>{item.label}</span>
                {!item.done && (
                  <button className="text-[11px] font-semibold text-accent-400 hover:text-accent-300">
                    {item.hint} →
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Appearance */}
        <section className="mt-6">
          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
            Appearance
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            {themeOptions.map((opt) => {
              const active = opt.id === theme || (opt.id === 'system' && false)
              return (
                <button
                  key={opt.id}
                  onClick={() => onPick(opt.id)}
                  className={cn(
                    'group relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all',
                    active
                      ? 'border-brand-500/40 bg-brand-500/5 ring-2 ring-brand-500/20'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl transition-colors',
                      opt.id === 'light' && 'bg-gradient-to-br from-amber-300 to-orange-500 text-white shadow-lg',
                      opt.id === 'dark' && 'bg-gradient-to-br from-indigo-500 to-violet-700 text-white shadow-lg',
                      opt.id === 'system' && 'bg-white/[0.06] text-ink-200',
                    )}
                  >
                    <opt.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{opt.label}</div>
                    <div className="text-[10.5px] text-ink-400">{opt.hint}</div>
                  </div>
                  {active && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Settings groups */}
        <section className="mt-6 space-y-5">
          {settings.map((g) => (
            <div key={g.group}>
              <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">
                {g.group}
              </div>
              <div className="mt-2 glass overflow-hidden rounded-2xl">
                {g.items.map((item, i) => (
                  <button
                    key={item.label}
                    className={`flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-white/[0.03] ${
                      i < g.items.length - 1 ? 'border-b border-white/5' : ''
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-ink-200">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      {item.hint && <div className="truncate text-[11px] text-ink-400">{item.hint}</div>}
                    </div>
                    {'badge' in item && item.badge && (
                      <Badge variant="brand" dot>
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronRight className="h-4 w-4 text-ink-500" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <div className="mt-10 text-center text-[11px] text-ink-500">
          Reverso · v0.9.2 · Made with care in Miami
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, icon: Icon, color = 'text-white' }: { label: string; value: string; icon: typeof Car; color?: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-400">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={`mt-1 font-display text-xl font-bold md:text-2xl ${color}`}>{value}</div>
    </div>
  )
}
