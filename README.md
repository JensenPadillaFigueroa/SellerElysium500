<div align="center">

<br />

# 🚗 Reverso

### _Flip the car-buying game._

**A reverse marketplace where buyers name their price and verified dealers come to them.**

<br />

[![Status](https://img.shields.io/badge/status-mockup%20v0.9-10b981?style=for-the-badge)](./ROADMAP.md)
[![License](https://img.shields.io/badge/license-MIT-3178C6?style=for-the-badge)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-8b5cf6?style=for-the-badge)](#-contributing)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0080?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide](https://img.shields.io/badge/Lucide-Icons-F56565?style=flat-square)](https://lucide.dev)

<br />

**[🚀 Quick Start](#-quick-start)** ·
**[🗺️ Roadmap](./ROADMAP.md)** ·
**[☁️ Hosting Guide](./docs/HOSTING.md)** ·
**[🔬 Market Research](./docs/COMPETITION.md)**

<br />

**Codename:** `SellerElysium500` · **Product name (proposed):** `Reverso` · **Repo:** [`JensenPadillaFigueroa/SellerElysium500`](https://github.com/JensenPadillaFigueroa/SellerElysium500)

</div>

---

## 📋 Table of Contents

- [What is this?](#-what-is-this)
- [Screens](#-screens)
- [Feature highlights](#-feature-highlights)
- [Tech stack](#-tech-stack)
- [Quick start](#-quick-start)
- [Project structure](#-project-structure)
- [Design system](#-design-system)
- [Responsive & themes](#-responsive--themes)
- [Backend & database](#-backend--database)
- [Deploying](#-deploying)
- [Roadmap](#️-roadmap)
- [Market research](#-market-research)
- [Possible improvements](#-possible-improvements)
- [Naming](#️-naming)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🧭 What is this?

Buying a car sucks. You scroll 10,000 listings, call dealers who refuse to talk price, and pay whatever someone else decides.

**Reverso flips the model.**

```
Traditional marketplace           Reverso (reverse marketplace)
─────────────────────             ─────────────────────────────
Dealer lists inventory      →     Buyer posts a request
Buyer browses 10k listings  →     Dealers send personalized offers
Buyer "asks" about one      →     Buyer counter-offers in-app
Back and forth via phone    →     Close in-app with escrow
```

### How it works in 4 steps

1. **Buyer posts** — make, model, year range, target price, negotiation style (open / firm / auction), optional trade-in.
2. **Sellers come to you** — verified dealers + private sellers submit VIN-matched offers with match scores.
3. **Negotiate in-app** — inline offers, counters, chat, quick actions ("Accept", "Counter", "Request Carfax").
4. **Close** — escrow-backed payment via Stripe Connect (planned), delivery marketplace at checkout.

---

## 🖼️ Screens

> Fully navigable mockup — **[open the preview](http://localhost:5173)** after `npm run dev`. Every screen animates in and out with Framer Motion, responds from iPhone SE (375px) to 4K displays, and supports light + dark themes.

| Route | Screen | Purpose |
|---|---|---|
| `/` | **Home** | Hero, stats, how-it-works, trending requests, CTA |
| `/discover` | **Discover** | Seller view — browse buyer requests, filters, categories, boosted inventory match banner |
| `/create` | **Create Request** | 4-step wizard: car → price → negotiation → details (with live market insight) |
| `/request/:id` | **Request Detail** | Buyer's request, offers, deal-stage tracker, market sparkline, trade-in panel |
| `/messages` | **Messages** | Active negotiations, unread badges, typing indicators, counter-expiry alerts |
| `/chat/:id` | **Chat** | Inline offer bubbles, counter flow, AI quick-actions, verified-seller context pin |
| `/dashboard` | **Dashboard** | Stats, hot alerts, my requests, watchlist, top sellers, 14-day activity graph |
| `/profile` | **Profile** | Trust score (92/100), achievements, verification progress, theme picker, settings |

---

## ✨ Feature highlights

<table>
<tr>
<td>

**🎯 Match Score ring**
Compatibility % between a seller's inventory and a buyer's request, animated SVG.

</td>
<td>

**📈 Deal stage tracker**
Posted → Matching → Negotiating → Pending → Closed, visualized on every request.

</td>
</tr>
<tr>
<td>

**🔨 3 negotiation modes**
_Open_ (counter-friendly) · _Firm_ (take-it-or-leave) · _Live auction_ (72h, highest bid wins).

</td>
<td>

**🤝 Trade-in inline**
Buyers bundle their current car — dealers factor it into the offer up-front.

</td>
</tr>
<tr>
<td>

**🧠 AI counter suggestions**
Contextual negotiation hints based on market data, accept likelihood, seller history.

</td>
<td>

**🚀 Boost**
Pin your request to the top for 48h → 3× visibility to active dealers.

</td>
</tr>
<tr>
<td>

**🛡️ Trust score**
Verified ID + financing + phone + social → prioritized inbox, higher match rate.

</td>
<td>

**💬 Chat-native**
Offers, counters, photos, system events, typing, read receipts — all inline with the negotiation.

</td>
</tr>
<tr>
<td>

**🎨 Light + Dark + System themes**
Premium glassmorphism in dark, crisp airy feel in light. Remembers your pick.

</td>
<td>

**📱 Truly responsive**
iPhone SE → iPad portrait/landscape → laptop → ultrawide 2xl. Tested at 6 breakpoints.

</td>
</tr>
</table>

---

## 🧱 Tech stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | [Vite 8](https://vitejs.dev) + [React 19](https://react.dev) + [TypeScript 5](https://typescriptlang.org) | Fast HMR, zero-config Vite, React Compiler for auto-memo |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) (`@tailwindcss/vite`) | CSS-first `@theme`, `@utility`, 10× less CSS |
| **Motion** | [Framer Motion](https://www.framer.com/motion/) | Shared layout, route transitions, micro-interactions |
| **Icons** | [Lucide React](https://lucide.dev) | 1,300+ tree-shakable SVG icons |
| **Routing** | [React Router v6](https://reactrouter.com) | Nested routes, animated transitions |
| **Fonts** | [Inter](https://rsms.me/inter/) + [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) | UI + display pair |
| **State** | React Context (theme) + URL params | No Redux/Zustand needed yet — keep it simple |

<details>
<summary><b>Why not Next.js?</b></summary>

<br />

Reverso is a single-page app with client-side routing. Vite is faster for development (sub-100ms HMR) and deploys as static assets to any CDN. If we later want SSR/RSC for SEO on listing pages, migrating to Next.js or Remix is a 1-week effort — the components are framework-agnostic.

</details>

<details>
<summary><b>Why Tailwind v4 (not v3)?</b></summary>

<br />

v4's CSS-first approach (`@theme`, `@utility`) makes the theme system 10× cleaner. Dark/light swap is a CSS variable flip instead of a JS class-name toggle. It's 5× faster to build and the config file disappears.

</details>

---

## 🚀 Quick start

```bash
# Clone
git clone https://github.com/JensenPadillaFigueroa/SellerElysium500.git
cd SellerElysium500   # or wherever the repo lands

# Install
npm install

# Run (http://localhost:5173 or next free port)
npm run dev

# Other scripts
npm run build     # production build to /dist
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

**Requires:** Node 20+ · npm 10+ (or pnpm / bun).

---

## 📁 Project structure

```
reverso/
├── docs/
│   ├── HOSTING.md          # DB, hosting, domain, deploy guide
│   └── COMPETITION.md      # Market research, SWOT, competitors
├── public/
│   └── (favicons, static assets)
├── src/
│   ├── components/
│   │   ├── ui/             # Button, Badge, Card, Avatar, Input, PriceTag,
│   │   │                   # MatchScore, ThemeToggle
│   │   ├── layout/         # AppShell, TopBar, Sidebar, BottomNav
│   │   └── cars/           # CarRequestCard, OfferCard
│   ├── screens/            # One file per route
│   │   ├── HomeScreen.tsx
│   │   ├── DiscoverScreen.tsx
│   │   ├── CreateRequestScreen.tsx
│   │   ├── RequestDetailScreen.tsx
│   │   ├── MessagesScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── data/
│   │   └── mockData.ts     # Fake users, requests, offers, threads, messages
│   ├── lib/
│   │   ├── theme.tsx       # ThemeProvider + useTheme hook
│   │   └── utils.ts        # cn, formatCurrency, timeAgo, initials
│   ├── types/
│   │   └── index.ts        # Shared TypeScript types
│   ├── App.tsx             # Router + animated route transitions
│   ├── main.tsx            # Entry point (ThemeProvider wraps everything)
│   └── index.css           # Tailwind v4 @theme + light/dark overrides
├── package.json
├── README.md               # you are here
├── ROADMAP.md              # phased plan from mockup → scale
└── vite.config.ts
```

---

## 🎨 Design system

| Token | Value |
|---|---|
| **Canvas (dark)** | `#06080c` with radial emerald + violet glow |
| **Canvas (light)** | `#f4f6fb` with soft brand glow |
| **Brand gradient** | `emerald-400 → emerald-600 → violet-500` |
| **Display font** | Space Grotesk (semi-bold, tracking-tight) |
| **UI font** | Inter (300–900 weights) |
| **Border radius** | `rounded-2xl` primary, `rounded-3xl` sections |
| **Surfaces** | `glass` (subtle) + `glass-strong` (modals, TopBar) |

**Custom utilities** (in `@c:\Web-Projects\tryout\reverso\src\index.css`):

- `.glass` / `.glass-strong` — translucent surfaces that swap per theme
- `.text-gradient-brand` — emerald-to-violet gradient text
- `.bg-gradient-brand` — button/CTA gradient
- `.grid-lines` — subtle grid backdrop
- `.card-hover` — lift-on-hover with brand shadow
- `.pulse-ring` — animated status indicator
- `.safe-top` / `.safe-bottom` — iOS notch / home-indicator handling

---

## 📱 Responsive & themes

### Breakpoints

| Breakpoint | Width | Layout change |
|---|---|---|
| _base_ | 0–639px | Phone — bottom tab bar + floating post FAB |
| `sm:` | 640px+ | Phones landscape, cards in 2-col where sensible |
| `md:` | 768px+ | iPad portrait — still mobile layout, bigger type |
| `lg:` | 1024px+ | iPad landscape + laptop — **sidebar appears** |
| `xl:` | 1280px+ | Desktop — 3-col feeds, wider sidebar |
| `2xl:` | 1536px+ | Ultrawide — max container `1600px` |

### Themes

<table>
<tr>
<td>

**🌑 Dark (default)**
Deep near-black canvas with radial emerald/violet glows. Glass cards with white/6% borders. Premium feel, matches most modern SaaS.

</td>
<td>

**☀️ Light**
Soft off-white with subtle brand glows. White surfaces with ink borders + layered shadows. Crisp, airy, matches iOS 17 aesthetic.

</td>
<td>

**🖥️ System**
Follows `prefers-color-scheme`. Changes live when the OS toggles.

</td>
</tr>
</table>

Toggle from the **TopBar** (sun/moon icon) or **Profile → Appearance**. Persists in `localStorage`. No flash on reload.

---

## 🔌 Backend & database

The mockup is fully static — every button works visually but nothing persists. The next phase wires real data.

### Recommended stack

| Need | Choice | Free tier | Why |
|---|---|---|---|
| **DB + Auth + Realtime + Storage** | [Supabase](https://supabase.com) | 500 MB DB, 50k MAU, 1 GB storage | One service for 4 needs, it's just Postgres |
| **Transactional email** | [Resend](https://resend.com) | 3k emails/mo | Modern API, React Email templates |
| **Payments / escrow** | [Stripe Connect](https://stripe.com/connect) | — | Industry standard for marketplaces |
| **Error tracking** | [Sentry](https://sentry.io) | 5k errors/mo | Source maps, session replay |
| **Analytics** | [PostHog](https://posthog.com) | 1M events/mo | Self-hostable escape hatch |

**Estimated monthly cost**: `$0` at launch → `~$25/mo` at 1k MAU → `~$120/mo` at 10k MAU.

See **[`docs/HOSTING.md`](./docs/HOSTING.md)** for:
- Full side-by-side comparison of 6 hosting providers, 8 databases, 7 auth services
- Complete Postgres migration with RLS policies (ready to paste)
- Step-by-step deploy walkthrough (Vercel + Supabase + Cloudflare)
- Cost scenarios at 0 / 1k / 10k / 100k MAU
- Compliance checklist

---

## 🚢 Deploying

**TL;DR**: push to GitHub → import to Vercel → done.

```bash
# One-time
git push origin main

# Vercel auto-detects Vite. In its dashboard:
#   Build command:  npm run build
#   Output dir:     dist
#   Env vars:       VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY (when wired)
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJensenPadillaFigueroa%2FSellerElysium500)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JensenPadillaFigueroa/SellerElysium500)

For domain setup, SSL, DNS, and custom infra, see **[`docs/HOSTING.md`](./docs/HOSTING.md#full-deploy-walkthrough-vercel--supabase--cloudflare)**.

---

## 🗺️ Roadmap

| Phase | Focus | Duration | Status |
|---|---|---|---|
| **Phase 0** | Clickable mockup (this repo) | 1 day | ✅ Done |
| **Phase 1** | MVP — auth, DB, real CRUD, matching v0 | 6–8 weeks | 🚧 Next |
| **Phase 2** | Real-time chat, trust, Stripe escrow | 8–12 weeks | ⏳ Planned |
| **Phase 3** | v1.0 — mobile apps, AI layer, live auctions | 3 months | ⏳ Planned |
| **Phase 4** | Scale — financing, insurance, delivery, Spanish | 6+ months | ⏳ Planned |
| **Phase 5** | Moat — ML matching, fraud graph, dealer CRM | 12+ months | 💭 Candidate |

See the full plan → **[`ROADMAP.md`](./ROADMAP.md)**.

---

## 🔬 Market research

**Is Reverso a unique idea?** No — reverse marketplaces exist (Priceline NYOP, Fiverr, CarWow, Motorway). But **no US player owns the mobile-first, buyer-empowered, chat-native experience for both new AND used cars, private AND dealer**.

### Closest competitors

| Who | Where | What | Gap Reverso fills |
|---|---|---|---|
| **CarWow** | UK/EU | Dealers bid on new cars | No US, web-only, no private sellers, no chat |
| **TrueCar** | US | Certified dealer prices | Not truly reverse, dated UX, lead-gen not marketplace |
| **CarsDirect** | US | Multi-quote form | Old-school, email/phone spam, no real-time |
| **Motorway** | UK | Dealers buy your used car (inverse) | Opposite direction, proves model works |
| **Carvana/Vroom** | US | Flat-pricing online | Not reverse, no negotiation, Vroom folded in 2023 |

Full competitor breakdown, SWOT, positioning matrix, and market-size math → **[`docs/COMPETITION.md`](./docs/COMPETITION.md)**.

---

## 💡 Possible improvements

Ranked by impact. Full list with effort estimates in **[`ROADMAP.md`](./ROADMAP.md#possible-improvements-brain-dump-unscheduled)**.

1. **Real-time chat** via Supabase Realtime + push notifications
2. **Stripe Connect escrow** — buyer deposit → seller payout on delivery
3. **Mobile apps** via Expo + NativeWind (share design tokens)
4. **AI counter suggestions** — LLM-powered negotiation coach
5. **VIN scanner** on mobile (camera → auto-fill vehicle)
6. **Pre-approved financing** inline (Affirm / Capital One / LightStream)
7. **Fraud detection** — VIN blacklist (NICB), duplicate-listing check
8. **Spanish localization** (huge US-market tailwind)
9. **Delivery marketplace** (Montway / Sherpa / uShip APIs)
10. **Saved searches** for sellers + push when a match posts
11. **Video walkaround** uploads
12. **Driving-distance** filter (not radius) via Google Maps
13. **Public reviews** after deal close (trust flywheel)
14. **Referral program** — $25 credit per side
15. **White-label** version for dealership groups

---

## 🏷️ Naming

**Current codename**: `SellerElysium500`
**Mockup product name**: `Reverso` _(punchy, bilingual-friendly, memorable)_

### Shortlist for a production launch

| Name | Vibe | Category |
|---|---|---|
| **Reverso** | Direct, bilingual, punchy | reverse + auto |
| **Namer** | Verb-first, "name your price" | action |
| **Callprice** | Describes the action | action |
| **Upbid** | Bids go up to you | inverse |
| **Matchcar** | Match + car | compound |
| **Carwish** | Wishlist → car | noun + wish |
| **Revbid** | Reverse + bid | portmanteau |
| **Wanted** | Strong, simple | action-verb |

Full brainstorm (20+ names), TLD strategy (`.com` vs `.app` vs `.cars`), domain registrar comparison, and trademark-search checklist → **[`docs/HOSTING.md#name-brainstorm--availability-strategy`](./docs/HOSTING.md#name-brainstorm--availability-strategy)**.

---

## 🤝 Contributing

This is a private pre-launch codebase — contributions welcome after Phase 1. For now:

1. **File bugs** as GitHub issues with screenshots + viewport size
2. **Open PRs** against `main` with `npm run lint` clean
3. **Follow the design tokens** — use `bg-white/[0.03]` semantics, not hardcoded colors
4. **Keep it mobile-first** — default styles are phone, breakpoints add up from there
5. **Respect both themes** — test with toggle before pushing

### Development tips

- ESM-only; no CommonJS
- Strict TypeScript — no `any` without a comment explaining why
- Tailwind v4: utilities like `glass`, `card-hover`, `text-gradient-brand` live in `src/index.css`
- Routes animate via Framer Motion `<AnimatePresence mode="wait">` in `App.tsx`

---

## 📜 License

MIT © 2026 Jensen Padilla Figueroa — see [`LICENSE`](./LICENSE).

Free to fork, modify, and ship. A link back is appreciated.

---

## 🙏 Acknowledgments

- **[Unsplash](https://unsplash.com)** — car reference photos (Tesla, Porsche, Toyota, BMW, Ford, Honda)
- **[Lucide](https://lucide.dev)** — icon library (every icon in the UI)
- **[Tailwind Labs](https://tailwindlabs.com)** — shadcn/ui was the inspiration for the primitive shapes
- **[Framer Motion](https://www.framer.com/motion)** — the animation library that makes everything feel smooth
- **[CarWow](https://carwow.co.uk)** & **[Motorway](https://motorway.co.uk)** — for proving the reverse-marketplace category works at scale
- **[Priceline](https://priceline.com)** — the original reverse marketplace (1998), still the mental model

---

<div align="center">

_Made with ☕ and a lot of Framer Motion keyframes._

**[⬆ back to top](#-reverso)**

</div>
