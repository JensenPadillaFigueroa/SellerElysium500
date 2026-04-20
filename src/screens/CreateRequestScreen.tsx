import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Car, Check, Gavel, Handshake, Info, Lock, MapPin, Rocket, Sparkles, Target, Upload, Zap } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'
import { CAR_IMAGES, POPULAR_MAKES } from '../data/mockData'
import { cn, formatCurrency } from '../lib/utils'

const steps = [
  { id: 1, title: 'Car', icon: Car },
  { id: 2, title: 'Price', icon: Target },
  { id: 3, title: 'Negotiation', icon: Handshake },
  { id: 4, title: 'Details', icon: Sparkles },
]

const bodyStyles = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Hatchback', 'Wagon', 'Convertible']

const negOptions = [
  {
    id: 'open',
    title: 'Open to negotiate',
    sub: 'Sellers can counter, you can counter back',
    icon: Handshake,
    color: 'from-brand-500 to-teal-500',
    popular: true,
  },
  {
    id: 'firm',
    title: 'Firm price',
    sub: 'Take it or leave it — no back & forth',
    icon: Lock,
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'auction',
    title: 'Live auction',
    sub: 'Highest verified offer in 72h wins',
    icon: Gavel,
    color: 'from-accent-500 to-fuchsia-500',
  },
]

export function CreateRequestScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [make, setMake] = useState('Tesla')
  const [model, setModel] = useState('Model 3')
  const [bodyStyle, setBodyStyle] = useState('Sedan')
  const [yearMin, setYearMin] = useState(2021)
  const [yearMax, setYearMax] = useState(2023)
  const [priceMin, setPriceMin] = useState(28000)
  const [priceMax, setPriceMax] = useState(34000)
  const [negotiation, setNegotiation] = useState<'open' | 'firm' | 'auction'>('open')
  const [notes, setNotes] = useState(
    'Prefer single-owner, clean Carfax. Willing to close fast — pre-approved financing in hand.',
  )
  const [boost, setBoost] = useState(true)
  const [radius, setRadius] = useState(60)

  const progress = (step / steps.length) * 100

  return (
    <div className="relative px-3 py-5 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.02] text-ink-200 transition-colors hover:bg-white/[0.06]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">
            Step {step} of {steps.length}
          </div>
          <button className="text-sm font-medium text-ink-400 transition-colors hover:text-white">
            Save draft
          </button>
        </div>

        {/* Progress */}
        <div className="mb-8 sm:mb-10">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-5 right-5 top-5 h-0.5 bg-white/8" />
            <div
              className="absolute left-5 top-5 h-0.5 bg-gradient-brand transition-all duration-500"
              style={{ width: `calc(${progress}% - 2.5rem)` }}
            />
            {steps.map((s) => {
              const active = s.id === step
              const done = s.id < step
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                      done && 'border-brand-500 bg-brand-500 text-white',
                      active && 'border-brand-500 bg-ink-950 text-brand-400 ring-4 ring-brand-500/20',
                      !done && !active && 'border-white/10 bg-ink-900 text-ink-400',
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                  </div>
                  <span
                    className={cn(
                      'text-[10px] font-medium sm:text-[11px]',
                      active ? 'text-white' : done ? 'text-brand-400' : 'text-ink-400',
                    )}
                  >
                    {s.title}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    What car are you hunting?
                  </h2>
                  <p className="mt-1 text-sm text-ink-300 sm:text-base">
                    Sellers will see this first. Be specific or broad — your call.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    leftIcon={<Car className="h-4 w-4" />}
                    placeholder="Tesla, BMW, Toyota..."
                  />
                  <Input
                    label="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Model 3, M4, Tacoma..."
                  />
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_MAKES.slice(0, 7).map((m) => (
                    <button
                      key={m.name}
                      onClick={() => setMake(m.name)}
                      className={cn(
                        'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                        make === m.name
                          ? 'border-brand-500/40 bg-brand-500/15 text-white'
                          : 'border-white/8 bg-white/[0.02] text-ink-300 hover:border-white/15',
                      )}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-300">Body style</label>
                  <div className="flex flex-wrap gap-2">
                    {bodyStyles.map((b) => (
                      <button
                        key={b}
                        onClick={() => setBodyStyle(b)}
                        className={cn(
                          'rounded-xl border px-3.5 py-2 text-sm transition-colors',
                          bodyStyle === b
                            ? 'border-brand-500/40 bg-brand-500/15 text-white'
                            : 'border-white/8 bg-white/[0.02] text-ink-300 hover:border-white/15',
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-300">
                    Year range
                    <span className="ml-2 text-ink-500">
                      {yearMin} – {yearMax}
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      value={yearMin}
                      onChange={(e) => setYearMin(+e.target.value)}
                      placeholder="Min year"
                    />
                    <Input
                      type="number"
                      value={yearMax}
                      onChange={(e) => setYearMax(+e.target.value)}
                      placeholder="Max year"
                    />
                  </div>
                </div>

                {/* Reference image upload */}
                <div>
                  <label className="mb-2 block text-xs font-medium text-ink-300">
                    Reference photo (auto-fetched by VIN API)
                  </label>
                  <div className="relative grid h-40 place-items-center overflow-hidden rounded-xl border border-dashed border-white/15 bg-white/[0.02]">
                    <img
                      src={CAR_IMAGES.teslaModel3}
                      alt="Reference"
                      className="absolute inset-0 h-full w-full object-cover opacity-30"
                    />
                    <div className="relative flex flex-col items-center gap-2 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                        <Upload className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Drop photos or let us auto-fill</div>
                        <div className="text-[11px] text-ink-400">We pull stock images from NHTSA + manufacturer</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    What's your price?
                  </h2>
                  <p className="mt-1 text-sm text-ink-300 sm:text-base">
                    Set a range (more offers) or a single number (firm). We'll compare with market data live.
                  </p>
                </div>

                {/* Big price preview */}
                <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-transparent to-accent-500/10 p-4 sm:p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                    Your target range
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-display font-bold">
                    <span className="text-3xl text-gradient-brand sm:text-4xl md:text-5xl">{formatCurrency(priceMin)}</span>
                    <span className="text-ink-400">–</span>
                    <span className="text-2xl text-white sm:text-3xl md:text-4xl">{formatCurrency(priceMax)}</span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="brand" icon={<Info className="h-3 w-3" />}>
                      Market avg {formatCurrency(32900)}
                    </Badge>
                    <Badge variant="accent">You're 4% under average</Badge>
                    <Badge variant="outline">~18 dealers typically respond</Badge>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Minimum"
                    value={priceMin.toLocaleString()}
                    onChange={(e) => setPriceMin(+e.target.value.replace(/\D/g, '') || 0)}
                    leftIcon={<span className="text-ink-400">$</span>}
                    placeholder="0"
                  />
                  <Input
                    label="Maximum"
                    value={priceMax.toLocaleString()}
                    onChange={(e) => setPriceMax(+e.target.value.replace(/\D/g, '') || 0)}
                    leftIcon={<span className="text-ink-400">$</span>}
                    placeholder="0"
                  />
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Include a trade-in</div>
                      <div className="text-xs text-ink-400">Dealers factor this into their offer</div>
                    </div>
                    <button className="flex h-6 w-11 items-center rounded-full bg-brand-500/80 p-0.5">
                      <span className="h-5 w-5 translate-x-5 rounded-full bg-white shadow" />
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <Input label="Year" placeholder="2019" defaultValue="2019" />
                    <Input label="Make / Model" placeholder="Honda Civic" defaultValue="Honda Civic" />
                    <Input label="Trade value" leftIcon={<span className="text-ink-400">$</span>} defaultValue="14,500" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    How do you negotiate?
                  </h2>
                  <p className="mt-1 text-sm text-ink-300 sm:text-base">
                    Pick your style. You can change this anytime before a deal is locked.
                  </p>
                </div>

                <div className="grid gap-3">
                  {negOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setNegotiation(opt.id as typeof negotiation)}
                      className={cn(
                        'group relative flex items-center gap-4 rounded-2xl border p-5 text-left transition-all',
                        negotiation === opt.id
                          ? 'border-brand-500/40 bg-brand-500/5 ring-2 ring-brand-500/20'
                          : 'border-white/8 bg-white/[0.02] hover:border-white/15',
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg',
                          opt.color,
                        )}
                      >
                        <opt.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display text-[17px] font-semibold text-white">{opt.title}</span>
                          {opt.popular && <Badge variant="brand">Most popular</Badge>}
                        </div>
                        <div className="mt-0.5 text-sm text-ink-300">{opt.sub}</div>
                      </div>
                      <div
                        className={cn(
                          'flex h-6 w-6 items-center justify-center rounded-full border-2',
                          negotiation === opt.id
                            ? 'border-brand-500 bg-brand-500 text-white'
                            : 'border-white/15',
                        )}
                      >
                        {negotiation === opt.id && <Check className="h-3 w-3" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-accent-500/20 bg-accent-500/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/20 text-accent-400">
                      <Rocket className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">Boost this request</span>
                        <Badge variant="accent">+3× visibility</Badge>
                      </div>
                      <div className="mt-0.5 text-sm text-ink-300">
                        Pin to top for 48 hours. First 5 requests are free this month.
                      </div>
                    </div>
                    <button
                      onClick={() => setBoost(!boost)}
                      className={cn(
                        'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                        boost ? 'bg-accent-500' : 'bg-white/10',
                      )}
                    >
                      <span
                        className={cn(
                          'h-5 w-5 rounded-full bg-white shadow transition-transform',
                          boost ? 'translate-x-5' : 'translate-x-0',
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
                    Last details.
                  </h2>
                  <p className="mt-1 text-sm text-ink-300 sm:text-base">
                    Tell sellers what matters to you. The more specific, the better your matches.
                  </p>
                </div>

                <Textarea
                  label="Notes to sellers"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Must-have features, deal-breakers, timeline..."
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    label="Location"
                    defaultValue="Miami, FL 33101"
                    leftIcon={<MapPin className="h-4 w-4" />}
                  />
                  <div>
                    <label className="mb-2 block text-xs font-medium text-ink-300">
                      Search radius <span className="text-ink-500">({radius} miles)</span>
                    </label>
                    <div className="flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5">
                      <input
                        type="range"
                        min={10}
                        max={500}
                        step={10}
                        value={radius}
                        onChange={(e) => setRadius(+e.target.value)}
                        className="flex-1 accent-brand-500"
                      />
                      <span className="font-mono text-xs font-semibold text-brand-400">{radius}mi</span>
                    </div>
                  </div>
                </div>

                {/* Summary card */}
                <div className="rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 to-transparent p-5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-brand-400">
                    <Sparkles className="h-3 w-3" /> Your request preview
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-[10px] uppercase text-ink-500">Car</div>
                      <div className="text-sm font-semibold text-white">
                        {yearMin}–{yearMax} {make} {model}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-ink-500">Budget</div>
                      <div className="text-sm font-semibold text-white">
                        {formatCurrency(priceMin, { compact: true })} – {formatCurrency(priceMax, { compact: true })}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-ink-500">Style</div>
                      <div className="text-sm font-semibold text-white capitalize">{negotiation}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-ink-500">Reach</div>
                      <div className="text-sm font-semibold text-white">Miami · {radius}mi</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-sm text-ink-300">
                  <div className="flex gap-3">
                    <Zap className="h-4 w-4 shrink-0 text-brand-400" />
                    <div>
                      Based on similar requests, you'll likely receive your
                      <span className="text-white"> first offer in 12 minutes </span>
                      and <span className="text-white">4–7 total offers</span> in the first 24 hours.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-5">
          <Button
            variant="ghost"
            onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          {step < steps.length ? (
            <Button onClick={() => setStep(step + 1)} rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          ) : (
            <Button onClick={() => navigate('/request/r-1')} rightIcon={<Rocket className="h-4 w-4" />}>
              Publish request
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
