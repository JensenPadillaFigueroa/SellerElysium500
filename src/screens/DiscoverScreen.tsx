import { motion } from 'framer-motion'
import { ArrowUpDown, Flame, Grid3x3, List, MapPin, Search, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { CarRequestCard } from '../components/cars/CarRequestCard'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { REQUESTS } from '../data/mockData'
import { cn } from '../lib/utils'

const categories = [
  { key: 'all', label: 'All', count: REQUESTS.length },
  { key: 'hot', label: 'Hot now', count: 12, icon: Flame },
  { key: 'ev', label: 'Electric', count: 48 },
  { key: 'suv', label: 'SUV & Trucks', count: 156 },
  { key: 'sport', label: 'Sports', count: 34 },
  { key: 'luxury', label: 'Luxury', count: 89 },
  { key: 'firm', label: 'Firm price', count: 23 },
  { key: 'auction', label: 'Auctions', count: 7 },
]

const sorts = ['Best match', 'Newest', 'Highest budget', 'Closing soon', 'Most offers']

export function DiscoverScreen() {
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('Best match')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = cat === 'hot' ? REQUESTS.filter((r) => r.urgency === 'high' || r.boosted) : REQUESTS

  return (
    <div className="px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <Sparkles className="h-3 w-3" /> Seller view
            </div>
          </div>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[42px]">
            Discover buyers looking for you.
          </h1>
          <p className="mt-1 text-ink-300">
            <span className="font-medium text-white">{filtered.length}</span> active requests · sorted by{' '}
            <span className="text-brand-400">{sort}</span>
          </p>
        </div>

        {/* Search on mobile + tablet */}
        <div className="group relative flex h-11 items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 lg:hidden">
          <Search className="h-4 w-4 text-ink-400" />
          <input
            placeholder="Search makes, models..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-ink-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <div className="flex items-center gap-2 whitespace-nowrap pb-1">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCat(c.key)}
              className={cn(
                'group flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors',
                cat === c.key
                  ? 'border-brand-500/40 bg-brand-500/15 text-white'
                  : 'border-white/8 bg-white/[0.02] text-ink-300 hover:border-white/15 hover:bg-white/[0.04]',
              )}
            >
              {c.icon && <c.icon className={cn('h-3.5 w-3.5', cat === c.key && 'text-brand-400')} />}
              {c.label}
              <span className={cn('text-[11px]', cat === c.key ? 'text-brand-300' : 'text-ink-500')}>
                {c.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters & controls */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="ghost" leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}>
            Filters
          </Button>
          <div className="h-5 w-px bg-white/10" />
          <Badge variant="outline" icon={<MapPin className="h-3 w-3" />}>
            Miami + 100mi
          </Badge>
          <Badge variant="outline">$20k – $150k</Badge>
          <Badge variant="outline">2020 → 2024</Badge>
          <Badge variant="ghost" className="text-ink-400">
            + Add filter
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-8 appearance-none rounded-lg border border-white/8 bg-white/[0.03] pl-7 pr-7 text-xs font-medium text-white focus:outline-none"
            >
              {sorts.map((s) => (
                <option key={s} className="bg-ink-900">
                  {s}
                </option>
              ))}
            </select>
            <ArrowUpDown className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-400" />
          </div>
          <div className="flex items-center rounded-lg border border-white/8 bg-white/[0.03] p-0.5">
            <button
              onClick={() => setView('grid')}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                view === 'grid' ? 'bg-white/10 text-white' : 'text-ink-400',
              )}
            >
              <Grid3x3 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-md transition-colors',
                view === 'list' ? 'bg-white/10 text-white' : 'text-ink-400',
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Smart suggestions banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-accent-500/20 bg-gradient-to-r from-accent-500/10 via-transparent to-transparent p-4 md:p-5"
      >
        <div className="hidden h-12 w-12 items-center justify-center rounded-xl bg-accent-500/20 text-accent-400 md:flex">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white">
            Your inventory matches 14 active buyers right now
          </div>
          <div className="text-xs text-ink-300">
            Sunset Motors — upload your VIN list to auto-match and boost visibility by 3×
          </div>
        </div>
        <Button size="sm" variant="secondary">
          Connect inventory
        </Button>
      </motion.div>

      {/* Feed */}
      <div
        className={cn(
          'mt-6 grid gap-4 sm:gap-5',
          view === 'grid' ? 'sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3' : 'grid-cols-1',
        )}
      >
        {filtered.map((r, i) => (
          <CarRequestCard key={r.id} request={r} index={i} />
        ))}
      </div>

      {/* Load more */}
      <div className="mt-10 flex justify-center">
        <Button variant="secondary" size="lg">Load 24 more requests</Button>
      </div>
    </div>
  )
}
