import { motion } from 'framer-motion'
import { Check, MessageSquare, Pin, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { CURRENT_USER_ID, THREADS, getRequest, getUser } from '../data/mockData'
import { cn, formatCurrency, timeAgo } from '../lib/utils'

export function MessagesScreen() {
  return (
    <div className="px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> Negotiations
            </div>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              Messages
            </h1>
            <p className="mt-1 text-sm text-ink-300">
              <span className="font-medium text-white">{THREADS.reduce((n, t) => n + t.unread, 0)} unread</span> ·{' '}
              {THREADS.length} active negotiations
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="group relative flex h-10 w-64 items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-3.5">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                placeholder="Search conversations..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-ink-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Smart insight banner */}
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-500/10 to-transparent p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white">
              Counter from Prestige Auto is expiring in 2h 14min
            </div>
            <div className="text-xs text-ink-400">Their $31,000 offer is the best in range — don't lose it.</div>
          </div>
          <Link
            to="/chat/t-1"
            className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-400"
          >
            Respond
          </Link>
        </div>

        {/* Thread list */}
        <div className="mt-6 space-y-2">
          {THREADS.map((t, i) => {
            const other = getUser(t.buyerId === CURRENT_USER_ID ? t.sellerId : t.buyerId)
            const request = getRequest(t.requestId)
            const mine = t.lastMessage.senderId === CURRENT_USER_ID
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/chat/${t.id}`}
                  className={cn(
                    'group flex items-center gap-4 rounded-2xl border p-4 transition-all',
                    t.unread > 0
                      ? 'border-brand-500/20 bg-brand-500/5 hover:border-brand-500/40'
                      : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]',
                  )}
                >
                  <Avatar
                    name={other?.name ?? ''}
                    colorClass={other?.avatarColor}
                    verified={other?.verified}
                    size="lg"
                    online={t.unread > 0}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold text-white">{other?.name}</span>
                      {t.pinned && <Pin className="h-3 w-3 text-brand-400" />}
                      <span className="text-[10px] text-ink-500">·</span>
                      <span className="truncate text-[11px] text-ink-400">on "{request?.title.slice(0, 32)}…"</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm">
                      {t.typing ? (
                        <span className="flex items-center gap-1 text-brand-400">
                          <TypingDots />
                          <span className="text-[11px] italic">typing…</span>
                        </span>
                      ) : (
                        <>
                          {mine && <Check className="h-3 w-3 text-ink-500" />}
                          {t.lastMessage.kind === 'offer' && (
                            <Badge variant="brand" className="!px-1.5 !py-0 !text-[10px]">
                              OFFER {formatCurrency(t.lastMessage.offerPrice ?? 0, { compact: true })}
                            </Badge>
                          )}
                          {t.lastMessage.kind === 'counter' && (
                            <Badge variant="warn" className="!px-1.5 !py-0 !text-[10px]">
                              COUNTER {formatCurrency(t.lastMessage.offerPrice ?? 0, { compact: true })}
                            </Badge>
                          )}
                          <span className={cn('truncate', t.unread > 0 ? 'text-white font-medium' : 'text-ink-400')}>
                            {t.lastMessage.text ?? '📸 Sent photos'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-[10.5px] text-ink-400">{timeAgo(t.lastMessage.createdAt)}</span>
                    {t.unread > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-brand px-1.5 text-[10px] font-bold text-white">
                        {t.unread}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex h-3 items-end gap-0.5">
      {[0, 0.15, 0.3].map((d) => (
        <motion.span
          key={d}
          className="h-1.5 w-1.5 rounded-full bg-brand-400"
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: d }}
        />
      ))}
    </span>
  )
}
