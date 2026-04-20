import { Compass, Home, MessageSquare, Plus, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/utils'
import { THREADS } from '../../data/mockData'

const items = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/discover', label: 'Discover', icon: Compass },
  { to: '/create', label: 'Post', icon: Plus, highlight: true },
  { to: '/messages', label: 'Chat', icon: MessageSquare, badge: true },
  { to: '/profile', label: 'Me', icon: User },
]

export function BottomNav() {
  const unread = THREADS.reduce((n, t) => n + t.unread, 0)

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md px-3 pb-3 safe-bottom sm:max-w-lg lg:hidden">
      <div className="glass-strong flex items-center justify-around rounded-2xl border border-white/10 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-2 transition-colors',
                item.highlight && !isActive && 'text-white',
                isActive && !item.highlight && 'text-white',
                !isActive && !item.highlight && 'text-ink-400',
              )
            }
          >
            {({ isActive }) => (
              <>
                {item.highlight ? (
                  <div className="-mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand shadow-lg shadow-brand-500/40 ring-4 ring-ink-950">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <item.icon className={cn('h-[20px] w-[20px]', isActive && 'text-brand-400')} />
                      {item.badge && unread > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[9px] font-bold text-white">
                          {unread}
                        </span>
                      )}
                    </div>
                    <span className={cn('text-[10px] font-medium', isActive && 'text-white')}>{item.label}</span>
                  </>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
