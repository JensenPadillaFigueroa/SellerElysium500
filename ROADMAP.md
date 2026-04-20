<div align="center">

# Reverso — Roadmap

### From clickable mockup → production marketplace

![Phase](https://img.shields.io/badge/current_phase-0_mockup-10b981?style=flat-square)
![Target](https://img.shields.io/badge/next-MVP_with_real_data-8b5cf6?style=flat-square)

</div>

---

## Legend

- `✅ Done` · already shipped in the mockup
- `🚧 Next` · active / next up
- `⏳ Planned` · scoped but not started
- `💭 Idea` · candidate, needs validation

Rough ranges assume one full-time engineer. Halve them with two.

---

## Phase 0 — Mockup ✅

**Goal**: Prove the UX concept. No real data, no auth, no backend.

- ✅ React + Vite + TypeScript scaffold
- ✅ Tailwind v4 design system (dark + light + system themes)
- ✅ 8 screens: Home, Discover, Create Request, Request Detail, Messages, Chat, Dashboard, Profile
- ✅ 12+ reusable UI primitives (Button, Badge, Card, Avatar, Input, Textarea, PriceTag, MatchScore, ThemeToggle…)
- ✅ Fake data layer (8 users, 8 requests, 3 offers, 3 chat threads with history)
- ✅ Framer Motion transitions, micro-interactions
- ✅ Fully responsive: iPhone SE → iPad → desktop → ultrawide 2xl
- ✅ Glassmorphism, grid-lines, gradient brand identity

**Duration so far**: 1 day (mockup sprint)

---

## Phase 1 — MVP with real data 🚧

> _6–8 weeks · goal: one real end-to-end request → offer → chat → accept_

### Backend foundation
- [ ] Supabase project (Postgres + Auth + Storage + Realtime)
- [ ] Schema migration (see [`docs/HOSTING.md`](./docs/HOSTING.md#database-schema))
- [ ] Row-level security policies (buyers see own requests, sellers see matching requests, both see their threads)
- [ ] Seed data script (mirror current `mockData.ts`)

### Auth
- [ ] Email + magic link (Supabase Auth)
- [ ] Google / Apple OAuth
- [ ] Role picker on signup (buyer / seller / both)
- [ ] Profile creation flow

### Core flows — real CRUD
- [ ] Create request (wizard wired to DB)
- [ ] Seller discover feed (server-side pagination + filters)
- [ ] Submit offer
- [ ] Counter offer (history tracked)
- [ ] Accept / decline / withdraw
- [ ] Status transitions enforced server-side

### Matching v0
- [ ] Simple rule-based: year range ∩ make ∩ model ∩ price range ∩ radius
- [ ] Server computes `matchScore` from rules (vs. hardcoded)

### Notifications
- [ ] Email via Resend (free 3k/mo) for: new offer, counter, accept
- [ ] In-app notification center

**Stack cost** at this phase: **$0/mo** (Supabase free + Vercel hobby + Resend free)

---

## Phase 2 — Real negotiations ⏳

> _8–12 weeks · goal: 100 real users, closed 10 deals_

### Chat
- [ ] Supabase Realtime channels per thread
- [ ] Typing indicators (ephemeral pubsub)
- [ ] Read receipts
- [ ] Push notifications (web push + FCM for mobile later)
- [ ] Image attachments via Supabase Storage

### Verification & trust
- [ ] Phone OTP (Twilio Verify free tier → ~$0.05/verification)
- [ ] ID verification (Stripe Identity or Persona — pay-per-verification)
- [ ] Computed trust score (ID + phone + deals completed + ratings)
- [ ] Sellers: dealer-license upload + manual review
- [ ] Public buyer/seller reviews after deal close

### Payments (escrow)
- [ ] Stripe Connect standard accounts for sellers
- [ ] Buyer deposit on offer acceptance (refundable in 24h)
- [ ] Release to seller on delivery confirmation
- [ ] Platform fee: 0.5–1% of transaction or flat $99–199

### Smart discovery
- [ ] Saved searches for sellers ("alert me when matches post")
- [ ] Boost payments (Stripe one-off — $9.99 for 48h boost)

**Stack cost** at this phase: **$10–30/mo** (Supabase Pro if exceeded + Twilio credits + domain)

---

## Phase 3 — v1.0 — Mobile apps + AI ⏳

> _3 months · goal: public launch, 1,000 MAU_

### Mobile apps
- [ ] Expo + React Native Reanimated
- [ ] Shared design system (reuse Tailwind tokens via NativeWind)
- [ ] Native push notifications
- [ ] Camera for VIN scanning
- [ ] App Store + Play Store submission
- [ ] Deep links (universal links on iOS, app links on Android)

### AI layer
- [ ] Counter-offer suggestions (OpenAI / Anthropic API) — "based on market, 2% below is 72% likely to accept"
- [ ] Auto-summarize long chat history
- [ ] Spam / fraud pre-filter on messages
- [ ] VIN decoder (NHTSA free API) + auto-populate vehicle details
- [ ] Auto-fetch reference images (Unsplash API / manufacturer CDN)

### Live auction mode
- [ ] WebSocket-powered bid board
- [ ] 72h countdown + auto-extensions (anti-sniping)
- [ ] Highest verified bidder auto-wins

### Market intelligence
- [ ] Price history sparkline on Request Detail (already in mockup — needs real data)
- [ ] Integration with Marketcheck or CarsXE for MSRP + market value

**Stack cost**: **$30–120/mo** (scales with MAU + AI API usage)

---

## Phase 4 — Scale & monetize ⏳

> _6+ months · goal: 10k MAU, break-even_

- [ ] Financing partners (Affirm / Capital One Auto / LightStream APIs) — 2–5% referral fee
- [ ] Insurance bundling (Root / Lemonade / Metromile) — referral fee per bind
- [ ] Delivery / transport marketplace (integrate Montway, Sherpa, uShip)
- [ ] Extended warranty offers at checkout
- [ ] Dealer CRM integrations (vAuto, Dealertrack, CDK) — inventory auto-sync
- [ ] Multi-language (Spanish first — huge US market)
- [ ] Referral program ($25 credit per side)
- [ ] Premium seller tier (higher visibility, priority inbox — $99/mo)

---

## Phase 5 — Moat & defensibility 💭

> _12+ months_

- [ ] **ML-trained match scoring** — train on accepted offers to personalize recommendations
- [ ] **Fraud detection** — VIN blacklist integration (NICB), duplicate-listing detection, rug-pull heuristics
- [ ] **Dynamic negotiation hints** — "dealers like you accept 3% under ask on Tuesdays"
- [ ] **Trust graph** — deals completed + reciprocal reviews form a PageRank-style score
- [ ] **Private seller certification program** (paid home inspection via marketplace)
- [ ] **Carbon savings badges** for EVs, tied to tax-credit eligibility (US)
- [ ] **White-label for dealerships** (self-hosted reverse inbox)
- [ ] **Data product** — anonymized pricing trends sold to analysts / OEMs

---

## Possible improvements (brain-dump, unscheduled)

Ranked by gut-feel impact:

| # | Improvement | Impact | Effort |
|---|---|---|---|
| 1 | Real-time chat + push notifications | 🔥🔥🔥 | M |
| 2 | Stripe escrow | 🔥🔥🔥 | M |
| 3 | VIN scanner (camera) on mobile | 🔥🔥 | S |
| 4 | AI counter suggestions | 🔥🔥 | S |
| 5 | Mobile apps via Expo | 🔥🔥🔥 | L |
| 6 | Pre-approved financing inline | 🔥🔥 | M |
| 7 | Video walkaround uploads | 🔥 | M |
| 8 | Driving-distance (not radius) | 🔥 | S |
| 9 | A/B test negotiation modes | 🔥 | S |
| 10 | Saved searches + alerts | 🔥🔥 | S |
| 11 | Dark-pattern prevention (cooling-off after acceptance) | 🔥 | S |
| 12 | Fraud / VIN blacklist check | 🔥🔥 | M |
| 13 | Seller inventory CSV/VIN import | 🔥🔥 | S |
| 14 | Public reviews after deal close | 🔥🔥 | S |
| 15 | Referral program | 🔥 | S |
| 16 | Spanish localization (i18n) | 🔥🔥 | M |
| 17 | PWA with offline support | 🔥 | S |
| 18 | Test drive scheduling inline | 🔥 | M |
| 19 | Delivery marketplace integration | 🔥🔥 | L |
| 20 | White-label for dealers | 🔥 | L |

_Legend: S = days · M = weeks · L = months_

---

## What we'd cut if rushed

If launch deadline is tight, drop these from Phase 1–2:

- Live auction mode → defer to v1.0
- AI suggestions → defer to v1.0
- Video uploads → defer to v1.0
- Trust graph ML → defer to v1.0
- Multi-language → defer to Phase 4

**Minimum lovable launch** = Phase 1 done + push notifications + Stripe escrow = ~12 weeks of focused work.

---

## Definition of Done (per feature)

Before calling anything "shipped" post-MVP:

1. Unit tests for business logic (Vitest)
2. Integration test for the happy path (Playwright)
3. Loading / error / empty states
4. Responsive on iPhone SE → 4K
5. Light + dark + system themes
6. Accessible (keyboard nav + screen reader labels)
7. Analytics events wired (PostHog free tier)
8. Sentry error capture (free 5k events/mo)

---

See also: [`README.md`](./README.md) · [`docs/HOSTING.md`](./docs/HOSTING.md) · [`docs/COMPETITION.md`](./docs/COMPETITION.md)
