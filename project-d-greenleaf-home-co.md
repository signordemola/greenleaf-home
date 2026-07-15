# Greenleaf Home Co. — Operations Platform

> A branded operations platform for a residential cleaning company with recurring
> clients, crew scheduling, and subscription management — replacing a six-tool manual
> stack with one system. Her brand. Her operations. Her client experience.

---

## Industry Context

### The US Residential Cleaning Market

The US home services market is worth roughly $842B. Residential cleaning is one of the
largest recurring-revenue segments, driven by dual-income households, aging homeowners,
and the normalisation of outsourcing home maintenance.

The market is dominated by small owner-operated companies (3–15 employees) competing on
reliability, trust, and local reputation. National franchises (Molly Maid, The Maids,
Merry Maids) hold under 15% share — the rest is independent operators.

### The Tool Stack Small Cleaning Companies Run

| Tool                        | Purpose            | Monthly Cost                            |
| --------------------------- | ------------------ | --------------------------------------- |
| Google Forms / Typeform     | Lead intake        | Free–$25                                |
| Google Sheets               | Master schedule    | Free                                    |
| Venmo / Zelle / Cash App    | Client payments    | Free                                    |
| WhatsApp / GroupMe          | Crew communication | Free                                    |
| Wave / QuickBooks           | Bookkeeping        | Free–$30                                |
| Thumbtack / Yelp / Nextdoor | Lead generation    | $50–$200                                |
| **Total**                   |                    | **$50–$255+/mo + 10–15 hrs/week admin** |

None of these tools share data. The schedule lives in a spreadsheet, payments live in
Venmo, and client preferences live in the owner's head. When a client asks "who's coming
Thursday?" the owner checks three apps to answer.

### Why Existing Software Doesn't Close the Gap

**ZenMaid, Jobber, Housecall Pro** each solve part of the problem, but none deliver the
one thing that reduces churn: a branded, persistent **client portal** where homeowners
manage their own plan — see their cleaner, reschedule a visit, pause for vacation, resume
when they're back, rate their last clean — without calling the office.

### How Booking Actually Works

- **Instant quoting wins leads.** 70%+ of consumers expect a same-day response. An instant
  price based on home size, service, and frequency converts at 3–5× a "request a quote" form.
- **Recurring is the business.** 70%+ of revenue at established companies comes from recurring
  plans (weekly, bi-weekly, monthly). One-time cleans are supplementary.
- **The first clean is different.** The initial visit is a higher-rate deep clean; subsequent
  recurring visits are standard cleans at the discounted rate.
- **Crew consistency builds trust.** Clients develop preferences for specific cleaners. The
  best companies track and prioritise those assignments.
- **Reviews drive growth.** Google reviews are the #1 lead source. A review request sent right
  after a completed clean converts at the highest rate.

---

## The Company

|                |                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Company**    | Greenleaf Home Co.                                                                                                                                     |
| **Location**   | Austin, TX (East Austin, Mueller, South Lamar service area)                                                                                            |
| **Owner**      | Maya Torres — former property manager, runs operations off-field                                                                                       |
| **Team**       | Maya + 6 cleaners across 3 two-person crews                                                                                                            |
| **Clients**    | ~45 active recurring + 5–10 one-time per month                                                                                                         |
| **Revenue**    | ~$28K/month                                                                                                                                            |
| **Niche**      | Eco-friendly residential cleaning. Young professionals, families, Airbnb hosts                                                                         |
| **Brand tone** | Warm, reliable, eco-conscious. _"Your home, handled."_                                                                                                 |
| **Problem**    | 10–15 hrs/week on scheduling and coordination. Can't scale past 3 crews without an office manager. Loses leads because quote response takes 4–6 hours. |

### Services & Pricing (Austin TX)

| Service            | 1–2 BR / 1 BA | 3 BR / 2 BA | 4+ BR / 3+ BA |
| ------------------ | ------------- | ----------- | ------------- |
| Standard Clean     | $130          | $170        | $210          |
| Deep Clean         | $220          | $290        | $360          |
| Move-In / Move-Out | $280          | $350        | $430          |

**Recurring discounts (Standard Clean):** Weekly 15% · Bi-weekly 10% · Monthly 5%.
Example (3 BR): $144.50 / $153 / $161.50 per visit.

**Add-ons (any service):** Inside refrigerator $25 · Inside oven $30 · Interior windows $35 ·
Laundry $20 · Garage sweep $40 · Patio/balcony $30.

_All monetary values stored in cents (USD)._

### Cancellation Policy

| Notice             | Outcome                             |
| ------------------ | ----------------------------------- |
| 48+ hours          | Skip without charge. Slot held.     |
| 24–48 hours        | 50% of service fee                  |
| Under 24 hours     | Full service fee                    |
| Client pauses plan | No charge. Slot held up to 4 weeks. |

---

## Product Scope — v1

v1 delivers the full client-facing loop end to end, plus the owner oversight needed to run
it. The boundaries below are product decisions, not gaps — each deferred item has a clear
home in v2 once the core loop is proven.

### In v1

- **Instant quote + booking.** A single-page wizard (home size → service → frequency →
  add-ons → details) with a live price that updates as selections change. One confirming
  server action creates the client, plan, and generated visits.
- **Client portal.** Persistent, tokenised, no login. Overview, schedule (reschedule / skip
  under the 48-hour policy), plan management (pause / resume / upgrade / cancel), visit
  history with ratings, and editable home-access details.
- **Owner dashboard.** Better Auth login, today's schedule with job-status controls
  (arrived → in progress → completed), KPIs, client list + detail, and plan health.
- **Crew assignment.** Preference-aware auto-assignment at booking, with manual reassignment
  from the dashboard.
- **Four transactional emails** (see below).

### Deferred to v2

Stated plainly so the boundary is intentional:

- **Payments** — card-on-file, auto-charge on completion, receipts, and the billing portal.
  The `Client` model reserves `stripeCustomerId` / `stripePaymentMethodId` for this.
- **Background-job orchestration** — delayed sends, retries, fan-out, and weekly owner
  summaries. v1 fires email from application events plus one daily reminder sweep.
- **Quote caching & rate limiting** — unnecessary at this scale; the quote engine returns
  well under 200ms uncached.
- **Owner configuration** — pricing / add-on / service-area / availability editors. v1 owner
  tooling is oversight, not configuration; these values are seeded.
- **Deep crew management and a drag-and-drop calendar.**

### The Four Emails

The lifecycle set — acquisition, reliability, completion, retention — each fired from an
application event, with the 24-hour reminder handled by a single daily cron sweep. No
separate job platform.

1. **Booking confirmed** — welcome, first-clean summary, portal link. Fired on booking.
2. **Clean reminder (24h)** — tomorrow's time window, crew, access notes. Daily cron sweep.
3. **Clean completed** — "your home is fresh," rate-your-clean + Google review links. Fired
   when the owner marks the visit complete.
4. **Plan cancelled** — no-guilt confirmation with a rebook CTA. Fired on portal cancel.

---

## Tech Stack

### Core

- **Next.js 16** — App Router, Server Components, Server Actions, Route Handlers (auth only)
- **React 19**, **TypeScript** (strict)

> Server Actions are the primary mutation pattern for all UI-triggered operations. The only
> Route Handler is the Better Auth catch-all — everything else is a Server Action or direct
> Prisma access inside a Server Component.

### Data & Validation

- **Prisma 7** — new `prisma-client` generator (ESM, output to `generated/prisma`),
  configured via `prisma.config.ts`
- **PostgreSQL** via **Neon**
- **Driver adapters** — `@prisma/adapter-pg` (app runtime, over `pg`) and
  `@prisma/adapter-neon` (seed, over `@neondatabase/serverless`)
- **Zod** — all input validation, shared between client and server

### Auth

- **Better Auth** — email/password for the single owner (Maya). Type-safe sessions, CSRF,
  cookie handling, native Prisma integration. The client portal needs no auth — access is by
  persistent token.

### UI

- **shadcn/ui** on **Base UI**, **Tailwind CSS v4**
- **Hugeicons** — icon set
- **Framer Motion** + **Lenis** — motion and smooth scroll
- **date-fns** + **date-fns-tz** — all date math (America/Chicago)

### Email

- **Resend** + **React Email** — typed, component-based templates for the four emails

### Utilities

- Portal tokens via `crypto.randomBytes(16).toString("base64url")`

---

## Folder Structure

```
greenleaf-home/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    # Landing — hero, services, trust, CTA
│   │   └── book/page.tsx               # Single-page booking wizard
│   ├── (portal)/
│   │   └── my/[token]/
│   │       ├── page.tsx                # Overview: plan, next clean, cleaner
│   │       ├── schedule/page.tsx       # Upcoming visits — reschedule / skip
│   │       ├── plan/page.tsx           # Pause / resume / upgrade / cancel
│   │       ├── history/page.tsx        # Past cleans + ratings
│   │       ├── home/page.tsx           # Access notes, alarm, pets
│   │       ├── error.tsx · loading.tsx
│   │       └── layout.tsx
│   ├── (admin)/
│   │   ├── login/page.tsx
│   │   └── (app)/
│   │       ├── dashboard/page.tsx      # Today's schedule + KPIs
│   │       ├── clients/page.tsx        # Client list + detail
│   │       ├── plans/page.tsx          # Plan health
│   │       └── error.tsx · loading.tsx · layout.tsx
│   └── api/auth/[...all]/route.ts      # Better Auth catch-all
│
├── actions/                           # Server Actions ('use server')
│   ├── booking.actions.ts             # createBooking
│   ├── portal.actions.ts              # reschedule, skip, rate, updateHomeAccess
│   ├── plan.actions.ts                # pause, resume, upgrade, cancel
│   ├── client.actions.ts
│   ├── owner.actions.ts               # markJobStatus, reassignCrew
│   └── auth.actions.ts                # login, logout
│
├── lib/
│   ├── prisma.ts                      # Prisma client singleton (adapter-pg)
│   ├── auth.ts · auth-client.ts       # Better Auth instances
│   ├── dal.ts · dal/                  # getSession, requireOwner + data access
│   ├── quote.ts                       # Quote engine (single source of truth)
│   ├── scheduling.ts · visit-dates.ts # Visit generation
│   ├── plan.ts                        # Plan state machine
│   ├── assignment.ts                  # Preference-aware crew assignment
│   ├── tokens.ts · booking-constants.ts · utils.ts
│   └── portal-data.ts · dashboard.ts · client.ts · visit.ts
│
├── schemas/                           # Zod: booking, portal, plan, client, owner, auth
├── types/                             # action-result, booking, …
├── components/                        # ui, booking, portal, dashboard, site, providers
├── emails/                            # 4 React Email templates
└── prisma/
    ├── schema.prisma
    ├── prisma.config.ts
    └── seed.ts
```

---

## Database Schema

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Better Auth models (User, Session, Account, Verification) are generated
// per Better Auth's Prisma schema and omitted here for brevity.

// ─── Service Configuration ────────────────────────────────────────────────────

model ServiceType {
  id           String   @id @default(cuid())
  slug         String   @unique          // "standard-clean"
  name         String
  description  String?
  displayOrder Int      @default(0)
  isActive     Boolean  @default(true)
  tiers        PricingTier[]
  plans        Plan[]
  visits       Visit[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model PricingTier {
  id            String      @id @default(cuid())
  serviceType   ServiceType @relation(fields: [serviceTypeId], references: [id])
  serviceTypeId String
  label         String                   // "1–2 BR / 1 BA"
  bedrooms      Int
  bathrooms     Int
  basePrice     Int                      // cents
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@unique([serviceTypeId, bedrooms, bathrooms])
}

model AddOn {
  id           String   @id @default(cuid())
  slug         String   @unique
  name         String
  price        Int                       // cents
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model FrequencyDiscount {
  id         String        @id @default(cuid())
  frequency  PlanFrequency @unique
  percentage Int                         // 15 = 15% off
  createdAt  DateTime      @default(now())
  updatedAt  DateTime      @updatedAt
}

// ─── Clients ──────────────────────────────────────────────────────────────────

model Client {
  id                    String   @id @default(cuid())
  email                 String   @unique
  name                  String
  phone                 String
  portalToken           String   @unique  // persistent portal URL

  // Reserved for v2 billing
  stripeCustomerId      String?  @unique
  stripePaymentMethodId String?

  // Home
  address               String
  city                  String   @default("Austin")
  state                 String   @default("TX")
  zipCode               String
  bedrooms              Int
  bathrooms             Int
  squareFeet            Int?

  // Access
  accessNotes           String?
  alarmCode             String?
  petInfo               String?

  // Preferences
  preferredCleanerId    String?
  preferredCleaner      Cleaner? @relation("PreferredCleaner", fields: [preferredCleanerId], references: [id])

  plans                 Plan[]
  visits                Visit[]
  ratings               Rating[]
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

// ─── Plans (Subscription Management) ──────────────────────────────────────────

model Plan {
  id              String        @id @default(cuid())
  client          Client        @relation(fields: [clientId], references: [id])
  clientId        String
  serviceType     ServiceType   @relation(fields: [serviceTypeId], references: [id])
  serviceTypeId   String
  frequency       PlanFrequency
  status          PlanStatus    @default(ACTIVE)

  // Pricing snapshot (locked at creation)
  basePrice       Int
  discountPct     Int
  recurringPrice  Int

  addOnSlugs      String[]
  addOnTotal      Int          @default(0)

  // Schedule
  preferredDay    Int                    // 0=Sun..6=Sat
  timeWindow      String       @default("morning")
  startDate       DateTime
  nextVisitDate   DateTime?

  assignedCrewId  String?
  assignedCrew    Crew?        @relation(fields: [assignedCrewId], references: [id])

  pausedAt        DateTime?
  resumeDate      DateTime?

  visits          Visit[]
  cancelledAt     DateTime?
  cancellationReason String?

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
}

enum PlanFrequency { WEEKLY BIWEEKLY MONTHLY ONE_TIME }
enum PlanStatus    { ACTIVE PAUSED CANCELLED }

// ─── Visits ───────────────────────────────────────────────────────────────────

model Visit {
  id             String       @id @default(cuid())
  plan           Plan?        @relation(fields: [planId], references: [id])
  planId         String?
  client         Client       @relation(fields: [clientId], references: [id])
  clientId       String
  serviceType    ServiceType  @relation(fields: [serviceTypeId], references: [id])
  serviceTypeId  String
  crew           Crew?        @relation(fields: [crewId], references: [id])
  crewId         String?

  scheduledDate  DateTime     @db.Date
  timeWindow     String       @default("morning")
  status         VisitStatus  @default(SCHEDULED)

  servicePrice   Int
  addOnSlugs     String[]
  addOnTotal     Int          @default(0)
  totalPrice     Int

  paymentStatus  PaymentStatus @default(PENDING)  // reserved for v2
  paidAt         DateTime?

  arrivedAt      DateTime?
  completedAt    DateTime?

  rating         Rating?
  ownerNotes     String?
  skipReason     String?

  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}

enum VisitStatus   { SCHEDULED CONFIRMED IN_PROGRESS COMPLETED SKIPPED CANCELLED }
enum PaymentStatus { PENDING CHARGED FAILED REFUNDED WAIVED }

// ─── Crew ─────────────────────────────────────────────────────────────────────

model Crew {
  id        String    @id @default(cuid())
  name      String
  isActive  Boolean   @default(true)
  cleaners  Cleaner[]
  plans     Plan[]
  visits    Visit[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Cleaner {
  id          String   @id @default(cuid())
  name        String
  phone       String?
  photoUrl    String?
  crew        Crew     @relation(fields: [crewId], references: [id])
  crewId      String
  isActive    Boolean  @default(true)
  preferredBy Client[] @relation("PreferredCleaner")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// ─── Ratings ──────────────────────────────────────────────────────────────────

model Rating {
  id        String   @id @default(cuid())
  visit     Visit    @relation(fields: [visitId], references: [id])
  visitId   String   @unique
  client    Client   @relation(fields: [clientId], references: [id])
  clientId  String
  score     Int                          // 1–5
  comment   String?
  createdAt DateTime @default(now())
}

// ─── Operations Config ────────────────────────────────────────────────────────

model ServiceArea {
  id        String   @id @default(cuid())
  zipCode   String   @unique
  name      String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

model BlockedDate {
  id        String   @id @default(cuid())
  date      DateTime @db.Date
  reason    String?
  createdAt DateTime @default(now())
}

model CrewAvailability {
  id        String  @id @default(cuid())
  crewId    String
  dayOfWeek Int                          // 0=Sun..6=Sat
  startTime String                       // "08:00"
  endTime   String                       // "17:00"
  isActive  Boolean @default(true)
  maxJobs   Int     @default(4)

  @@unique([crewId, dayOfWeek])
}
```

---

## Environment Variables

```bash
# Database (Neon)
DATABASE_URL="postgresql://...-pooler.../neondb?sslmode=require"

# Auth
BETTER_AUTH_SECRET="..."                 # 32+ char random
BETTER_AUTH_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="Greenleaf Home Co. <hello@greenleafhome.co>"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

> **Local note:** on machines with broken IPv6, Neon's host resolves to unreachable AAAA
> records and Node hangs on connect. Force IPv4 with
> `NODE_OPTIONS="--dns-result-order=ipv4first --no-network-family-autoselection"`.

---

## Build Plan

### Phase 0 — Setup

- [ ] Next.js 16 + TypeScript (strict) + Tailwind v4 + App Router
- [ ] Install: `prisma @prisma/client @prisma/adapter-pg @prisma/adapter-neon pg @neondatabase/serverless zod better-auth resend @react-email/components date-fns date-fns-tz`
- [ ] shadcn/ui on Base UI; Hugeicons; Framer Motion; Lenis
- [ ] `prisma.config.ts` (schema path, `migrations.seed`, datasource)
- [ ] Folder structure: `actions/`, `components/{booking,portal,dashboard,site,ui}`, `lib/`, `schemas/`, `types/`, `emails/`
- [ ] Prettier + ESLint; Husky + lint-staged
- [ ] Owner auth guard in `proxy.ts` (redirect unauthenticated from `(admin)/` — not the sole boundary; Server Actions re-verify)

### Phase 1 — Data

- [ ] `schema.prisma` (above) + Better Auth models
- [ ] `prisma migrate dev --name init`
- [ ] `seed.ts`: 3 services + tiers, 6 add-ons, 3 frequency discounts, 8 service-area zips,
      3 crews / 6 cleaners, crew availability (Mon–Fri 8–17, max 4/day), 2 blocked dates,
      8 clients, 6 plans (mix of frequencies plus one paused, one cancelled), 30+ visits
      (completed w/ ratings, scheduled, one skipped), 15 ratings
- [ ] `prisma db seed`; `lib/prisma.ts` singleton (adapter-pg)

### Phase 2 — Core Logic

- [ ] `lib/quote.ts` — `calculateQuote(service, size, frequency, addons)` → tier lookup,
      discount, add-on totals, first-visit (deep-clean) pricing, monthly estimate. The **only**
      place prices are computed.
- [ ] `lib/scheduling.ts` + `lib/visit-dates.ts` — `generateVisits(plan, count)`: respect
      frequency + preferred day, skip blocked dates, 8 weeks ahead. The **only** place visits
      are created.
- [ ] `lib/plan.ts` — state machine: `pausePlan` / `resumePlan` / `upgradePlan` / `cancelPlan`
      (delete or regenerate future visits). The **only** place plan status changes.
- [ ] `lib/assignment.ts` — `assignCrew(plan)`: preferred cleaner's crew first, else most
      available crew on the preferred day; `reassignVisit`.
- [ ] `lib/tokens.ts`, `lib/auth.ts` / `auth-client.ts`, `lib/dal.ts` (`getSession`,
      `requireOwner`, `import "server-only"`), `lib/utils.ts` (`formatCurrency`, US date
      formatters, `cn`)

### Phase 3 — Schemas & Types

- [ ] `schemas/`: booking, portal (reschedule / skip / rate / home-access), plan, client, owner, auth
- [ ] `types/`: action-result, booking, and domain types as needed

### Phase 4 — Booking (Public)

- [ ] `(public)/page.tsx` — landing: hero, services, how-it-works, why-Greenleaf, service
      area, testimonials, FAQ, footer
- [ ] `(public)/book/page.tsx` — single-page wizard (`BookingWizard`, local state): home size
      → service + add-ons → frequency → details, with a live `InstantQuoteDisplay`
- [ ] `createBooking` server action: validate (Zod), recompute the quote server-side, upsert
      client + generate portal token, create plan + visits, assign crew, send **booking-confirmed**

### Phase 5 — Client Portal

- [ ] `(portal)/my/[token]/` — overview, schedule, plan, history, home + `error` / `loading`
- [ ] Actions: `rescheduleVisit`, `skipVisit` (48-hour policy), `rateVisit` (idempotent),
      `pausePlan` / `resumePlan` / `upgradePlan` / `cancelPlan`, `updateHomeAccess`
- [ ] `revalidatePath()` after each mutation; **plan-cancelled** email on cancel

### Phase 6 — Owner Dashboard + Emails

- [ ] `(admin)/login` (Better Auth) + `(admin)/(app)/` dashboard, clients (+detail), plans
- [ ] `markJobStatus` (arrived → in progress → completed; **clean-completed** email on
      complete), `reassignCrew`
- [ ] KPIs: active plans, monthly revenue, avg rating, crew utilisation
- [ ] Emails (React Email + Resend): booking-confirmed, clean-reminder-24h, clean-completed,
      plan-cancelled
- [ ] Daily cron sweep sends the 24-hour reminders

### Phase 7 — Polish

- [ ] Mobile-responsive booking flow + portal
- [ ] All four emails render (`email dev`)
- [ ] E2E pass: booking → portal (pause / reschedule / rate) → owner dashboard
- [ ] `README.md`: stack, setup, env, seed, walkthrough

---

## Engineering Principles

**1. Single source of truth — one function per business rule.**
Pricing lives only in `calculateQuote()`. Visit generation lives only in `generateVisits()`.
Plan transitions live only in `lib/plan.ts`. If you write pricing, visit-creation, or
plan-state logic anywhere else, extract it.

**2. Validate twice — client and server.**
Zod schemas are shared. The client validates for UX; the Server Action re-validates for
safety. Never trust the client.

**3. Server Actions return structured results, not thrown errors.**
`{ ok: true, data }` or `{ ok: false, error, issues }`. The only throw is a redirect.

**4. The security boundary is the DAL, not the proxy.**
`proxy.ts` redirects for UX. Every owner Server Action calls `requireOwner()` independently.
`lib/dal.ts`, `lib/auth.ts`, and `lib/prisma.ts` are `import "server-only"`.

**5. `revalidatePath()` after every mutation** so Server Components re-render with fresh data.

**6. Dates stored UTC, displayed in `America/Chicago`.**
Convert only at the display layer with `date-fns-tz`. The server decides "today"/"tomorrow".

**7. Money in cents.** All monetary columns are `Int`; `formatCurrency()` renders `$X.XX`.

**8. Idempotency on repeatable mutations.** Ratings check for an existing record before
insert; the pattern extends to v2 charges and email sends.

**9. Error and loading boundaries per route segment.**
`error.tsx` shows a branded state with retry; `loading.tsx` gives streaming UI.

**10. Portal tokens are permanent.** They live for the lifetime of the client relationship.
No client login.

---

## Case Study (Demola Studio)

- **Before:** Maya's six-tool stack — Google Forms, Sheets, WhatsApp, Venmo, Wave — and
  10–15 hrs/week of manual coordination.
- **Diagnosis:** slow lead response, no client self-service, everything in the owner's head.
- **Build:** instant quoting, subscription plans, a branded self-service client portal,
  preference-aware crew assignment, a rating loop, and an owner oversight dashboard.
- **Result:** leads get an instant price 24/7, clients manage their own plans, crews get a
  clear schedule, and Maya trades coordination time for oversight.
