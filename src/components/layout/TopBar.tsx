import { Bell, Plus, Search, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { USERS, CURRENT_USER_ID } from '../../data/mockData'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'

export function TopBar() {
  const me = USERS.find((u) => u.id === CURRENT_USER_ID)!
  const location = useLocation()
  const isDiscover = location.pathname === '/discover' || location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl safe-top">
      <div className="flex h-14 items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 lg:px-6">
        {/* Mobile + tablet logo (hidden on desktop where Sidebar shows full brand) */}
        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand shadow-lg shadow-brand-500/30">
            <span className="font-display text-lg font-bold text-white">R</span>
          </div>
          <span className="hidden font-display text-lg font-semibold tracking-tight text-white xs:inline sm:inline">
            Reverso
          </span>
        </Link>

        {/* Search (desktop only — sidebar devices) */}
        <div className="hidden flex-1 lg:flex">
          <div className="group relative flex h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 transition-colors focus-within:border-brand-400/60 focus-within:bg-white/[0.05]">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              placeholder="Search makes, models, or buyers…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-ink-400 focus:outline-none"
            />
            <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-ink-400 xl:inline-block">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Tablet search icon button */}
        <button className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-ink-200 transition-colors hover:bg-white/[0.06] sm:h-10 sm:w-10 lg:hidden">
          <Search className="h-[18px] w-[18px]" />
        </button>

        <div className="hidden flex-1 lg:hidden" />

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isDiscover && (
            <Link to="/create" className="hidden lg:block">
              <Button variant="primary" size="md" leftIcon={<Plus className="h-4 w-4" />}>
                Post a request
              </Button>
            </Link>
          )}
          <ThemeToggle size="sm" className="sm:hidden" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <button className="relative hidden h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-ink-200 transition-colors hover:bg-white/[0.06] sm:inline-flex sm:h-10 sm:w-10">
            <Sparkles className="h-[18px] w-[18px]" />
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-accent-400" />
          </button>
          <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-ink-200 transition-colors hover:bg-white/[0.06] sm:h-10 sm:w-10">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-brand-400 pulse-ring" />
          </button>
          <Link to="/profile" className="ml-0.5 sm:ml-1">
            <Avatar name={me.name} colorClass={me.avatarColor} verified={me.verified} size="sm" className="sm:hidden" />
            <Avatar name={me.name} colorClass={me.avatarColor} verified={me.verified} size="md" className="hidden sm:inline-flex" />
          </Link>
        </div>
      </div>
    </header>
  )
}
