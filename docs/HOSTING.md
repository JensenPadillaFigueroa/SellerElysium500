<div align="center">

# Hosting, Database & Domain

### Low-cost recipe to take Reverso from localhost to the internet

![Month 1 cost](https://img.shields.io/badge/month_1-%240-10b981?style=flat-square)
![First 1k users](https://img.shields.io/badge/first_1k_users-~%2412/yr-10b981?style=flat-square)
![Scale to 10k MAU](https://img.shields.io/badge/10k_MAU-~%2425--60%2Fmo-f59e0b?style=flat-square)

</div>

---

## TL;DR — Recommended stack

| Layer | Pick | Why | Cost (launch → 10k MAU) |
|---|---|---|---|
| **Frontend** | [Vercel](https://vercel.com) Hobby | Zero-config for Vite/React, instant preview URLs, edge CDN included | $0 → $20/mo |
| **DB + Auth + Storage + Realtime** | [Supabase](https://supabase.com) | One service replaces 4, generous free tier, open-source escape hatch | $0 → $25/mo |
| **Transactional email** | [Resend](https://resend.com) | 3k emails/mo free, React Email templates | $0 → $20/mo |
| **Error tracking** | [Sentry](https://sentry.io) Dev | 5k errors/mo free | $0 → $26/mo |
| **Analytics** | [PostHog](https://posthog.com) cloud | 1M events/mo free | $0 → $0 (unless heavy) |
| **Images** | Supabase Storage → [Cloudflare R2](https://www.cloudflare.com/products/r2/) at scale | R2 has zero egress fees | $0 → $5/mo |
| **Domain** | [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) | At-cost pricing, no markup | ~$9–12/yr |
| **DNS + CDN + DDoS** | Cloudflare | Free tier is absurdly generous | $0 |
| **Status page** | [instatus.com](https://instatus.com) | Free plan is fine | $0 |

**Estimated all-in cost:**
- **Launch (first 3 months, <100 users):** `$0/mo` + ~$12/yr for domain
- **Growth (1k MAU):** `$0–10/mo`
- **Scale (10k MAU):** `$25–60/mo`
- **Heavy scale (100k MAU):** $300–600/mo — at that point you're making revenue

---

## Frontend hosting — comparison

| Provider | Free tier | Paid tier | Build time | Edge functions | DX | Our pick |
|---|---|---|---|---|---|---|
| **Vercel** | 100 GB bandwidth, unlimited sites | $20/user/mo Pro | Fast | ✅ | 🥇 | **Primary** |
| **Netlify** | 100 GB, 300 build-min/mo | $19/mo Pro | Fast | ✅ | 🥈 | Backup |
| **Cloudflare Pages** | Unlimited bandwidth 🤯 | $20/mo Pro | Fast | ✅ Workers | 🥈 | If bandwidth heavy |
| **Render** | 100 GB | $0 static, $7 web svc | Medium | ❌ | ✅ | OK |
| **Railway** | $5 credit/mo | Pay-as-go | Medium | ❌ | ✅ | Full-stack |
| **GitHub Pages** | Unlimited | $0 | Slow | ❌ | ❌ | Static only |

**Why Vercel wins for Reverso**: first-party Vite support, instant preview URLs per PR (critical when iterating design), zero-config Speed Insights, seamless Analytics integration. The $20/mo Pro tier only matters once you're monetizing.

---

## Database — comparison

| Provider | Free tier | Type | Realtime | Auth | Storage | Pricing after free |
|---|---|---|---|---|---|---|
| **Supabase** | 500 MB DB, 50k MAU, 1 GB storage, 2 GB egress | Postgres | ✅ native | ✅ | ✅ | $25/mo Pro (8 GB DB, 100k MAU) |
| **Neon** | 0.5 GB, 100 compute-hrs | Postgres serverless | ❌ | ❌ | ❌ | $19/mo Launch |
| **Turso** | 500 DBs, 9 GB | libSQL (SQLite) edge | ❌ | ❌ | ❌ | $29/mo Scaler |
| **PlanetScale** | _(free tier discontinued)_ | MySQL | ❌ | ❌ | ❌ | $39/mo Scaler |
| **MongoDB Atlas** | M0 shared 512 MB | Document | ❌ native | ❌ | ❌ | $57/mo M10 |
| **CockroachDB** | 10 GB, 50M requests | Postgres-compatible | ❌ | ❌ | ❌ | Pay-per-use |
| **Firebase Firestore** | 1 GB, 50k reads/day | Document | ✅ | ✅ | ✅ | Pay-per-use (can spike) |
| **Xata** | 15 GB | Postgres + search | ❌ | ❌ | ❌ | $29/mo Pro |

**Why Supabase wins for Reverso**: we need `auth + relational data + realtime chat + file uploads` — doing that as 4 separate services is painful. Supabase is the only free tier that bundles all 4. Escape hatch: it's just Postgres, so migration is trivial if needed.

**If you want to stay serverless-serverless**: Neon (DB) + Clerk (auth) + Uploadthing (storage) + Pusher (realtime) — but that's 4 bills and more glue code.

---

## Auth — comparison

| Provider | Free tier | Providers | Our take |
|---|---|---|---|
| **Supabase Auth** | 50k MAU | Email, magic link, OAuth (Google/Apple/GitHub/…), phone OTP | 🥇 Default |
| **Clerk** | 10k MAU | Email, social, passkeys, orgs, MFA | Great UX, pricier at scale ($25/mo after) |
| **Auth.js** (NextAuth) | Unlimited, self-host | All | Free but you own the ops |
| **Lucia** | Unlimited, self-host | All | Minimal, server-agnostic |
| **Firebase Auth** | Free | All Google-y | Only if on Firebase already |
| **Magic** | 1k MAU | Magic link, social | Solid UX |

**For Reverso**: Supabase Auth because it's already in the stack. Add **Twilio Verify** ($0.05/verification) for phone OTP in the trust flow.

---

## Real-time chat — comparison

| Option | Free tier | Pricing | Pros | Cons |
|---|---|---|---|---|
| **Supabase Realtime** | 200 concurrent, 2M msg/mo | Included | In-stack, SQL-driven | Not purpose-built for chat |
| **Pusher Channels** | 100 conn, 200k msg/day | $49/mo | Dead simple | Cost scales fast |
| **Ably** | 3M msg/mo, 200 peak | $29/mo | Super reliable | Overkill early |
| **Liveblocks** | 100 MAU, 20 rooms | $20/mo | Presence, collaboration built-in | Not chat-first |
| **Socket.io self-hosted** | Free | Server cost | Full control | You own the ops |
| **Centrifugo** | Free, self-host | Server cost | Open-source, fast | Setup required |

**For Reverso**: Supabase Realtime on Postgres changes + a `messages` table → free out of the gate, zero extra infra.

---

## Image / media storage — comparison

| Provider | Free tier | Egress | Best for |
|---|---|---|---|
| **Supabase Storage** | 1 GB | 2 GB/mo | Launch phase |
| **Cloudflare R2** | 10 GB free | **$0 egress** 🎉 | High-traffic image CDN |
| **Cloudinary** | 25 GB, 25 GB bandwidth | Included | Image transforms / CDN |
| **Uploadthing** | 2 GB | Included | Drop-in React uploader |
| **AWS S3** | 5 GB (12mo) | $0.09/GB egress | Ecosystem |
| **Bunny Storage** | $0.01/GB/mo | $0.005/GB | Cheapest at scale |

**Upgrade trigger**: when Supabase storage exceeds ~10 GB or egress exceeds 50 GB/mo, migrate images to **R2** (free 10 GB + $0 egress saves a fortune).

---

## Domain registrar — comparison

| Registrar | `.com` renewal | Transparent pricing | WHOIS privacy | Notes |
|---|---|---|---|---|
| **Cloudflare Registrar** | ~$9.77/yr | ✅ at-cost | ✅ free | 🥇 Our pick — no upsells |
| **Porkbun** | $9.73/yr first, $11.94 after | ✅ | ✅ free | Clean UI |
| **Namecheap** | ~$13.98/yr | ⚠️ upsells | ✅ free first year | Popular default |
| **Google Domains** | _(sold to Squarespace in 2023)_ | - | - | RIP |
| **Squarespace Domains** | $20/yr | ❌ | Included | Overpriced |
| **GoDaddy** | ~$20/yr + upsells | ❌ | Extra cost | Avoid |
| **Hover** | ~$17/yr | ✅ | ✅ free | Nice UX |
| **Dynadot** | ~$10/yr | ✅ | ✅ free | Budget option |

**Pro TLDs for an auto marketplace**:

| TLD | Typical price | Vibe |
|---|---|---|
| `.com` | $10 | Default, always get it |
| `.app` | $14 | Forces HTTPS, modern |
| `.cars` | $80–2,000 | Category match, premium |
| `.auto` | $2,500+ | Very expensive, avoid |
| `.io` | $35 | Tech-y but increasingly dated |
| `.co` | $25 | Good fallback if .com is taken |
| `.dev` | $15 | Forces HTTPS, dev-focused |
| `.deals` | $35 | Thematic fit |

---

## Name brainstorm & availability strategy

> Current codename: **`SellerElysium500`**
> Product name in mockup: **`Reverso`**

### Shortlist (vibe + fit)

| Name | Vibe | Category | Availability hunt |
|---|---|---|---|
| **Reverso** | Direct, bilingual, punchy | reverse + auto | Check `reverso.app`, `reverso.cars`, `getreverso.com` |
| **Namer** | Verb-first, "name your price" | action | `namer.cars`, `namer.app` |
| **Callprice** | What you do on the app | action | `callprice.com`, `callprice.app` |
| **OfferMe** | Passive, buyer-centric | action | `offerme.cars`, `offr.me` |
| **Bidwise** | Smart auction feel | action + auction | `bidwise.cars` |
| **Dealio** | Playful, trustworthy | deal + diminutive | Likely taken, try `dealio.app` |
| **Carwish** | Wishlist → car | noun + wish | `carwish.com`, `carwish.app` |
| **Wanted** | Simple, strong | action-verb | `wantedauto.com`, `getwanted.app` |
| **Priceback** | Reverse action | verb | `priceback.co`, `priceback.cars` |
| **Upbid** | Bid goes to you | inverse | `upbid.cars`, `upbid.app` |
| **Matchcar** | Match + car | compound | `matchcar.com`, `matchcar.app` |
| **Heycar** | Friendly | greeting + noun | **Taken** (German marketplace) |
| **Cartap** | Mobile-first, tappable | compound | `cartap.app` |
| **Carbids** | Literal | compound | `carbids.com` (likely taken), `getcarbids.com` |
| **Revbid** | Reverse + bid | portmanteau | `revbid.com`, `revbid.app` |
| **Autocall** | Call your terms | compound | `autocall.app`, `autocall.deals` |
| **Sellerverse** | Expands `SellerElysium500` codename | compound | `sellerverse.com` |

### Strategy to pick a name

1. **Generate 20+ candidates** (done above — expand freely).
2. **`.com` check first** via [Namecheap](https://www.namecheap.com/domains/domain-name-search/) or [Instant Domain Search](https://instantdomainsearch.com/).
3. **USPTO trademark search** ([tmsearch.uspto.gov](https://tmsearch.uspto.gov/)) — avoid filing fees later.
4. **EUIPO + WIPO** if you'll expand to EU/global.
5. **Social handles** on Namechk or Instantusername.
6. **Gut check**: say it out loud 10 times, spell it to a stranger on the phone, Google it.

### Quick-vs-right rule

- **Quick**: grab `.app` or `.cars` of the codename `SellerElysium500` for prototype ($15/yr) — so you have `sellerelysium500.app` while deciding.
- **Right**: park the shortlist on Cloudflare Registrar (all are <$12/yr), pick the one that clears TM after customer interviews.

---

## Full deploy walkthrough (Vercel + Supabase + Cloudflare)

### 1. Supabase setup

```bash
# sign up: https://supabase.com
# create project, copy: SUPABASE_URL + SUPABASE_ANON_KEY + SERVICE_ROLE_KEY
```

Install CLI + apply schema:

```bash
npm i -D supabase
npx supabase login
npx supabase link --project-ref <your-ref>
npx supabase db push   # applies migrations in supabase/migrations/
```

### 2. Env vars

Create `.env.local`:

```bash
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
# server-side only (never expose to Vite client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_xxx
STRIPE_SECRET_KEY=sk_live_xxx
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 3. Vercel deploy

```bash
# Option A: one-click
# Push to GitHub, then import at https://vercel.com/new

# Option B: CLI
npm i -g vercel
vercel --prod
```

In the Vercel dashboard, add all `VITE_*` env vars + build command `npm run build` + output dir `dist`.

### 4. Custom domain on Cloudflare

1. Buy domain at Cloudflare Registrar (~$10/yr).
2. Domain's nameservers are already Cloudflare — skip DNS migration.
3. In Vercel → project → Domains → Add Domain → `reverso.cars`.
4. Vercel gives you 2 CNAMEs → add them as records in Cloudflare.
5. In Cloudflare → SSL/TLS → mode: `Full (strict)`.
6. Wait 5 minutes. Site live with free SSL, free DDoS, free CDN.

### 5. Monitoring setup

```bash
npm i @sentry/react @sentry/vite-plugin
npm i posthog-js
```

Add to `src/main.tsx`:

```ts
import * as Sentry from '@sentry/react'
import posthog from 'posthog-js'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
})

posthog.init(import.meta.env.VITE_POSTHOG_KEY, { api_host: 'https://app.posthog.com' })
```

---

## Database schema (first migration)

> Drop this in `supabase/migrations/0001_init.sql`. Tweak as you go.

```sql
-- =============================================================
-- USERS + PROFILES
-- Supabase Auth manages auth.users. Profiles is our extension.
-- =============================================================
create type user_role as enum ('buyer', 'seller', 'both');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'buyer',
  handle text unique,
  display_name text not null,
  avatar_color text default 'from-emerald-400 to-teal-600',
  avatar_url text,
  verified boolean default false,
  phone text,
  location text,
  rating numeric(3,2) default 5.0,
  deals_count int default 0,
  trust_score int default 0,
  created_at timestamptz default now()
);

-- =============================================================
-- REQUESTS — what buyers want
-- =============================================================
create type negotiation_mode as enum ('open', 'firm', 'auction');
create type request_status as enum ('active', 'negotiating', 'deal-pending', 'closed', 'expired');
create type urgency_level as enum ('low', 'medium', 'high');

create table car_requests (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  make text not null,
  model text,
  body_style text,
  year_min int, year_max int,
  mileage_max int,
  transmission text check (transmission in ('any','auto','manual')),
  fuel text check (fuel in ('any','gas','diesel','hybrid','electric')),
  color text,
  features text[] default '{}',
  trims text[] default '{}',
  price_min int not null,
  price_max int not null,
  negotiation negotiation_mode not null default 'open',
  status request_status not null default 'active',
  urgency urgency_level default 'medium',
  location text,
  radius_miles int default 50,
  boosted boolean default false,
  pinned boolean default false,
  reference_image text,
  notes text,
  views int default 0,
  offer_count int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '30 days')
);
create index idx_requests_status_location on car_requests(status, location);
create index idx_requests_make_model on car_requests(make, model);

-- Trade-ins (1:1 with a request, optional)
create table trade_ins (
  request_id uuid primary key references car_requests(id) on delete cascade,
  year int,
  make text,
  model text,
  mileage int,
  vin text,
  value int
);

-- =============================================================
-- OFFERS — what sellers send
-- =============================================================
create type offer_status as enum ('pending', 'countered', 'accepted', 'declined', 'withdrawn');

create table offers (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references car_requests(id) on delete cascade,
  seller_id uuid not null references profiles(id) on delete cascade,
  price int not null,
  message text,
  vehicle jsonb not null, -- { year, make, model, trim, vin, mileage, color, images[] }
  includes text[] default '{}',
  status offer_status not null default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '48 hours'),
  unique (request_id, seller_id) -- one offer per seller per request
);
create index idx_offers_request on offers(request_id, status);

-- Counter history
create table offer_counters (
  id uuid primary key default gen_random_uuid(),
  offer_id uuid not null references offers(id) on delete cascade,
  by text not null check (by in ('buyer','seller')),
  price int not null,
  message text,
  created_at timestamptz default now()
);

-- =============================================================
-- CHAT THREADS (one per buyer↔seller on a request)
-- =============================================================
create table threads (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references car_requests(id) on delete cascade,
  buyer_id uuid not null references profiles(id),
  seller_id uuid not null references profiles(id),
  pinned boolean default false,
  last_message_at timestamptz default now(),
  unread_buyer int default 0,
  unread_seller int default 0,
  created_at timestamptz default now(),
  unique (request_id, buyer_id, seller_id)
);

create type message_kind as enum ('text','offer','counter','photo','system');

create table messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references threads(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  kind message_kind not null default 'text',
  text text,
  offer_price int,
  photo_url text,
  read boolean default false,
  created_at timestamptz default now()
);
create index idx_messages_thread_created on messages(thread_id, created_at desc);

-- =============================================================
-- WATCHLIST, NOTIFICATIONS
-- =============================================================
create table watchlist (
  user_id uuid references profiles(id) on delete cascade,
  request_id uuid references car_requests(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, request_id)
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null,
  payload jsonb,
  read boolean default false,
  created_at timestamptz default now()
);
create index idx_notifications_user on notifications(user_id, read, created_at desc);

-- =============================================================
-- ROW-LEVEL SECURITY (the fun part)
-- =============================================================
alter table profiles enable row level security;
alter table car_requests enable row level security;
alter table trade_ins enable row level security;
alter table offers enable row level security;
alter table offer_counters enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table watchlist enable row level security;
alter table notifications enable row level security;

-- Profiles: anyone can read (public-ish), user updates own
create policy "profiles_read_all" on profiles for select using (true);
create policy "profiles_update_self" on profiles for update using (auth.uid() = id);

-- Requests: anyone can see active, buyers manage own
create policy "requests_read_active" on car_requests for select
  using (status != 'expired');
create policy "requests_insert_own" on car_requests for insert
  with check (auth.uid() = buyer_id);
create policy "requests_update_own" on car_requests for update
  using (auth.uid() = buyer_id);

-- Offers: buyer sees offers on their request, seller sees own
create policy "offers_read_parties" on offers for select
  using (
    auth.uid() = seller_id
    or auth.uid() in (select buyer_id from car_requests where id = request_id)
  );
create policy "offers_insert_seller" on offers for insert
  with check (auth.uid() = seller_id);
create policy "offers_update_parties" on offers for update
  using (
    auth.uid() = seller_id
    or auth.uid() in (select buyer_id from car_requests where id = request_id)
  );

-- Threads + messages: only the 2 parties
create policy "threads_parties" on threads for all
  using (auth.uid() in (buyer_id, seller_id));
create policy "messages_parties" on messages for all
  using (
    auth.uid() in (
      select buyer_id from threads where id = thread_id
      union
      select seller_id from threads where id = thread_id
    )
  );

-- Watchlist + notifications: self only
create policy "watchlist_self" on watchlist for all using (auth.uid() = user_id);
create policy "notif_self" on notifications for all using (auth.uid() = user_id);
```

---

## Cost scenarios

### Scenario A — Just you testing (0 users)

| Item | Cost |
|---|---|
| Vercel Hobby | $0 |
| Supabase Free | $0 |
| Cloudflare domain | $10/yr |
| Resend Free | $0 |
| Sentry Dev | $0 |
| **Total** | **$10/yr** |

### Scenario B — Real beta (1,000 MAU)

| Item | Cost |
|---|---|
| Vercel Hobby | $0 |
| Supabase Free or Pro | $0 or $25/mo |
| Domain | $10/yr |
| Resend Free | $0 |
| Twilio SMS verify (~$0.05 × 1k) | ~$50 one-off |
| Sentry Dev | $0 |
| PostHog Free | $0 |
| **Total** | **~$0–30/mo** |

### Scenario C — Traction (10,000 MAU, 500 deals/mo)

| Item | Cost |
|---|---|
| Vercel Pro | $20/mo |
| Supabase Pro | $25/mo |
| Resend Pro | $20/mo |
| Sentry Team | $26/mo |
| Cloudflare R2 (50 GB) | $0.75/mo |
| Stripe fees (2.9% + 30¢ × payments) | variable |
| Twilio verify | ~$25/mo |
| **Total infra** | **~$120/mo** |

At 500 deals/mo × 0.5% platform fee × $30k avg car = **$75,000 gross** → infra is <0.2% of revenue. Healthy.

### Scenario D — Scale (100,000 MAU)

| Item | Cost |
|---|---|
| Vercel Enterprise | negotiable, ~$500/mo |
| Supabase Team | $599/mo |
| Sentry Business | $80/mo |
| CDN (R2) | ~$30/mo |
| Email (Resend or SES) | $80/mo |
| Twilio verify | ~$250/mo |
| **Total infra** | **~$1,500/mo** |

At this scale, infrastructure is a rounding error if the marketplace takes any meaningful cut.

---

## Third-party APIs we'll eventually want

| API | Purpose | Free tier | Pricing |
|---|---|---|---|
| **NHTSA Vehicle API** | VIN decoder, make/model lookup | Unlimited | Free |
| **Unsplash API** | Stock reference photos | 50 req/hr | Free |
| **Marketcheck** | Pricing, listings data | 1k req/mo | from $99/mo |
| **CarsXE** | VIN history, specs, auction data | Limited | Pay-per-call |
| **CarFax** / **AutoCheck** | Vehicle history reports | — | Per-report |
| **Stripe Connect** | Escrow / payouts | — | 2.9% + 30¢ + 0.25% Connect |
| **Stripe Identity** | ID verification | — | $1.50/verification |
| **Twilio Verify** | Phone OTP | — | $0.05/verification |
| **Google Maps** | Geocoding, distance | $200 credit/mo | Pay-per-call |
| **Mapbox** | Maps | 50k loads/mo | Pay-per-call |

---

## Compliance checklist (before charging $1)

- [ ] Privacy policy + terms of service (use [Termly](https://termly.io) free generator)
- [ ] GDPR-style cookie banner (only if EU traffic)
- [ ] CCPA "Do Not Sell" link (if >$25M revenue / 100k CA residents — not on day 1)
- [ ] Stripe AML/KYC onboarding for dealer accounts
- [ ] SOC 2 only matters if B2B enterprise — skip for now
- [ ] Data retention policy (Supabase: auto-delete `expired` requests after 90 days)

---

See also: [`../README.md`](../README.md) · [`../ROADMAP.md`](../ROADMAP.md) · [`./COMPETITION.md`](./COMPETITION.md)
