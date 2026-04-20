import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  CheckCheck,
  DollarSign,
  Handshake,
  Image as ImageIcon,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Shield,
  Smile,
  Sparkles,
  Video,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar } from '../components/ui/Avatar'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import {
  CURRENT_USER_ID,
  THREAD_MESSAGES,
  getRequest,
  getThread,
  getUser,
} from '../data/mockData'
import type { Message } from '../types'
import { cn, formatCurrency, timeAgo } from '../lib/utils'

export function ChatScreen() {
  const { id = 't-1' } = useParams()
  const thread = getThread(id) ?? getThread('t-1')!
  const messages = THREAD_MESSAGES[thread.id] ?? THREAD_MESSAGES['t-1']
  const other = getUser(thread.buyerId === CURRENT_USER_ID ? thread.sellerId : thread.buyerId)!
  const request = getRequest(thread.requestId)!
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length])

  return (
    <div className="flex h-[calc(100dvh-10.5rem)] flex-col sm:h-[calc(100dvh-11rem)] lg:h-[calc(100dvh-5.5rem)]">
      {/* Header */}
      <div className="glass-strong z-30 flex items-center gap-2 border-b border-white/5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 lg:px-6">
        <Link
          to="/messages"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] text-ink-200 transition-colors hover:bg-white/[0.06]"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <Avatar
          name={other.name}
          colorClass={other.avatarColor}
          verified={other.verified}
          size="md"
          online
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-semibold text-white">{other.name}</span>
            <Shield className="h-3 w-3 text-brand-400" />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-ink-400">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              Online
            </span>
            <span>·</span>
            <span className="text-amber-400">★</span>
            <span className="font-medium text-ink-200">{other.rating}</span>
            <span>·</span>
            <span>{other.deals} deals</span>
          </div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] text-ink-200 transition-colors hover:bg-white/[0.06]">
          <Phone className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] text-ink-200 transition-colors hover:bg-white/[0.06]">
          <Video className="h-4 w-4" />
        </button>
        <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] text-ink-200 transition-colors hover:bg-white/[0.06]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Context pin */}
      <Link
        to={`/request/${request.id}`}
        className="glass mx-4 mt-3 flex items-center gap-3 rounded-xl p-2 pr-4 transition-colors hover:bg-white/[0.06] md:mx-6"
      >
        <img src={request.referenceImage} alt="" className="h-11 w-14 rounded-lg object-cover" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium text-white">{request.title}</div>
          <div className="flex items-center gap-1.5 text-[10px] text-ink-400">
            <span>
              {formatCurrency(request.priceMin, { compact: true })} – {formatCurrency(request.priceMax, { compact: true })}
            </span>
            <span>·</span>
            <span>Open to negotiate</span>
          </div>
        </div>
        <Badge variant="brand" dot>
          Active
        </Badge>
      </Link>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-5 md:px-6">
        {messages.map((m, i) => (
          <MessageBubble key={m.id} message={m} isMe={m.senderId === CURRENT_USER_ID} index={i} />
        ))}
        <TypingIndicator other={other.name} color={other.avatarColor} />
      </div>

      {/* Quick actions + Input */}
      <div className="glass-strong border-t border-white/5 px-4 pb-4 pt-3 md:px-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-300 transition-colors hover:bg-brand-500/15">
            <DollarSign className="h-3 w-3" />
            Send counter
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-ink-200 transition-colors hover:bg-white/[0.06]">
            <Handshake className="h-3 w-3" />
            Accept $31,000
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-ink-200 transition-colors hover:bg-white/[0.06]">
            <Zap className="h-3 w-3" />
            Request test drive
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-ink-200 transition-colors hover:bg-white/[0.06]">
            <Shield className="h-3 w-3" />
            Request Carfax
          </button>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex flex-1 items-end gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors focus-within:border-brand-400/50">
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:text-white">
              <Paperclip className="h-4 w-4" />
            </button>
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:text-white">
              <ImageIcon className="h-4 w-4" />
            </button>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${other.name}…`}
              className="mx-1 max-h-32 min-h-6 flex-1 resize-none bg-transparent text-sm text-white placeholder:text-ink-400 focus:outline-none"
            />
            <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition-colors hover:text-white">
              <Smile className="h-4 w-4" />
            </button>
          </div>
          <Button size="icon" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-ink-500">
          <Sparkles className="h-3 w-3 text-accent-400" />
          <span>
            AI can suggest a response based on market data — <span className="text-accent-400 cursor-pointer hover:underline">try it</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message, isMe, index }: { message: Message; isMe: boolean; index: number }) {
  if (message.kind === 'system') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.03 }}
        className="my-2 flex justify-center"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-1.5 text-[11px] text-ink-300">
          <Sparkles className="h-3 w-3 text-brand-400" />
          <span>{message.text}</span>
        </div>
      </motion.div>
    )
  }

  const sender = getUser(message.senderId)
  const isOffer = message.kind === 'offer' || message.kind === 'counter'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className={cn('flex items-end gap-2', isMe ? 'justify-end' : 'justify-start')}
    >
      {!isMe && sender && (
        <Avatar name={sender.name} colorClass={sender.avatarColor} size="sm" />
      )}
      <div className={cn('max-w-[80%] space-y-1 md:max-w-[65%]', isMe && 'items-end')}>
        {isOffer && (
          <div
            className={cn(
              'rounded-2xl border p-3',
              isMe
                ? 'border-brand-500/40 bg-gradient-to-br from-brand-500/20 to-brand-500/5'
                : 'border-accent-500/40 bg-gradient-to-br from-accent-500/20 to-accent-500/5',
            )}
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider">
              {message.kind === 'offer' ? (
                <>
                  <DollarSign className="h-3 w-3 text-accent-400" />
                  <span className="text-accent-300">Official offer</span>
                </>
              ) : (
                <>
                  <Handshake className="h-3 w-3 text-brand-400" />
                  <span className="text-brand-300">Counter offer</span>
                </>
              )}
            </div>
            <div className="mt-1.5 font-display text-2xl font-bold text-white">
              {formatCurrency(message.offerPrice ?? 0)}
            </div>
            <div className="mt-2 flex items-center gap-2">
              {!isMe && (
                <>
                  <button className="flex-1 rounded-lg bg-brand-500 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-brand-400">
                    Accept
                  </button>
                  <button className="flex-1 rounded-lg border border-white/15 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-white/[0.05]">
                    Counter
                  </button>
                </>
              )}
              {isMe && <span className="text-[10px] text-ink-400">Waiting for response…</span>}
            </div>
          </div>
        )}
        {message.photoUrl && (
          <div className="overflow-hidden rounded-2xl">
            <img src={message.photoUrl} alt="" className="w-full object-cover" />
          </div>
        )}
        {message.text && !isOffer && (
          <div
            className={cn(
              'rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm',
              isMe
                ? 'bg-gradient-brand text-white rounded-br-md'
                : 'glass text-ink-100 rounded-bl-md',
            )}
          >
            {message.text}
          </div>
        )}
        <div className={cn('flex items-center gap-1 px-1 text-[10px] text-ink-500', isMe ? 'justify-end' : 'justify-start')}>
          <span>{timeAgo(message.createdAt)}</span>
          {isMe && (message.read ? <CheckCheck className="h-3 w-3 text-brand-400" /> : <Check className="h-3 w-3" />)}
        </div>
      </div>
    </motion.div>
  )
}

function TypingIndicator({ other, color }: { other: string; color: string }) {
  return (
    <div className="flex items-end gap-2">
      <Avatar name={other} colorClass={color} size="sm" />
      <div className="glass flex items-end gap-1 rounded-2xl rounded-bl-md px-4 py-3">
        {[0, 0.15, 0.3].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-ink-300"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1, delay: d }}
          />
        ))}
      </div>
    </div>
  )
}
