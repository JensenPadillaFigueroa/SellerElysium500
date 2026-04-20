import { Compass, Home, MessageSquare, Plus, Settings, Sparkles, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { THREADS } from '../../data/mockData'

const nav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/messages', label: 'Messages', icon: MessageSquare, badgeKey: 'messages' },
  { to: '/dashboard', label: 'Dashboard', icon: Sparkles },
  { to: '/profile', label: 'Profile', icon: User },
]

export function Sidebar() {
  const unread = THREADS.reduce((n, t) => n + t.unread, 0)

  return (
    <aside className="sticky top-0 hidden h-dvh w-[240px] shrink-0 flex-col border-r border-white/5 bg-ink-950/40 p-5 lg:flex xl:w-[260px]">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-1">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-lg shadow-brand-500/30">
          <span className="font-display text-xl font-bold text-white">R</span>
          <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-accent-400 ring-2 ring-ink-950" />
        </div>
        <div>
          <div className="font-display text-[18px] font-bold tracking-tight text-white leading-none">Reverso</div>
          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400 mt-0.5">reverse marketplace</div>
        </div>
      </div>

      {/* Primary CTA */}
      <NavLink
        to="/create"
        className="mt-6 group flex items-center gap-3 rounded-xl bg-gradient-brand p-3 text-white shadow-lg shadow-brand-500/25 transition-all hover:brightness-110"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
          <Plus className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold">Post a request</div>
          <div className="text-[11px] text-white/80">Let dealers bid for you</div>
        </div>
      </NavLink>

      {/* Nav */}
      <nav className="mt-6 flex flex-col gap-1">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group relative flex h-11 items-center gap-3 rounded-xl px-3 text-[14px] font-medium transition-colors',
                isActive
                  ? 'bg-white/[0.06] text-white'
                  : 'text-ink-300 hover:bg-white/[0.03] hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-brand-400" />
                )}
                <item.icon className={cn('h-[18px] w-[18px]', isActive && 'text-brand-400')} />
                <span className="flex-1">{item.label}</span>
                {item.badgeKey === 'messages' && unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-[10px] font-semibold text-white">
                    {unread}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Trending */}
      <div className="mt-8 flex-1">
        <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Trending now</div>
        <div className="mt-3 space-y-1">
          {[
            { name: 'Tesla Model 3', count: '412 requests' },
            { name: 'Toyota Tacoma', count: '298 requests' },
            { name: 'BMW M3 / M4', count: '187 requests' },
            { name: 'Ford Bronco', count: '146 requests' },
          ].map((t, i) => (
            <button
              key={t.name}
              className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition-colors hover:bg-white/[0.03]"
            >
              <div>
                <div className="text-[13px] font-medium text-white">{t.name}</div>
                <div className="text-[10.5px] text-ink-400">{t.count}</div>
              </div>
              <span className="font-mono text-[10px] font-semibold text-brand-400">#{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-white/[0.03] hover:text-white">
        <Settings className="h-[18px] w-[18px]" />
        <span>Settings</span>
      </button>
    </aside>
  )
}
