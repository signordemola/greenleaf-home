# Project C — Greenleaf Home Co.
## Demola Studio Portfolio · Premium Tier Demo

> **What this proves:** A custom-built operations platform for a residential cleaning
> company with recurring clients, crew scheduling, and subscription management —
> replacing a 6-tool manual stack with one branded system. No ZenMaid. No Jobber.
> Her brand. Her operations. Her client experience.

---

## Industry Context — What You Need to Know

### The US Residential Cleaning Market (2026)

The US home services market is valued at approximately $842 billion in 2026. Residential
cleaning is one of the largest recurring-revenue segments, driven by dual-income households,
aging homeowners, and the continued normalisation of outsourcing home maintenance.

The market is dominated by small owner-operated companies (3–15 employees) who compete
on reliability, trust, and local reputation. National franchises (Molly Maid, The Maids,
Merry Maids) hold less than 15% market share — the rest is independent operators.

### The Real Tool Stack Small Cleaning Companies Run

| Tool | Purpose | Monthly Cost |
|---|---|---|
| Google Forms / Typeform | Lead intake | Free–$25 |
| Google Sheets / Excel | Master schedule | Free |
| Venmo / Zelle / Cash App | Client payments | Free (no invoicing) |
| Square Invoices / Wave | Occasional invoicing | Free–2.9% |
| WhatsApp / GroupMe | Crew communication | Free |
| Wave / QuickBooks | Bookkeeping | Free–$30 |
| Thumbtack / Yelp / Nextdoor | Lead generation | $50–$200 |
| **Total** | | **$50–$255+ / month + 10–15 hrs/week admin** |

None of these tools share data. The schedule lives in a spreadsheet. Payments live in
Venmo. Client preferences live in the owner's head. When a client asks "who's coming
Thursday?" the owner checks three apps to answer.

### Why Existing Software Doesn't Solve This

**ZenMaid** ($49–$149/mo): Purpose-built for cleaning but has a weak mobile app,
no real client portal, rigid recurring scheduling (can't handle "first and third Friday"),
and no subscription pause/resume. Admin tasks require desktop.

**Jobber** ($39–$249/mo): Polished UI but generalist — built for HVAC, plumbing, and
landscaping too. No room-by-room checklists. Per-user pricing grows expensive with crews.
Client-facing experience is a minimal widget, not a branded portal.

**Housecall Pro** ($49–$199/mo): Strong automation but complex navigation. Advanced
features gated behind expensive tiers. No native cleaning-specific workflows.

**The gap no tool closes:** A branded, persistent **client portal** where homeowners
manage their own cleaning plan — see their cleaner, reschedule a visit, pause for vacation,
resume when they're back, rate their last clean — all without calling the office.

### How the Booking Process Actually Works (Industry Standard)

**Instant quoting wins leads.** 70%+ of consumers expect a same-day response. Companies
that provide an instant price based on home size, service type, and frequency convert at
3–5× the rate of "request a quote" forms.

**Recurring is the business.** 70%+ of revenue for established cleaning companies comes
from recurring plans (weekly, bi-weekly, monthly). One-time deep cleans and move-in/outs
are supplementary.

**The first clean is always different.** The initial visit is a "deep clean" or "initial clean"
at a higher rate. Subsequent recurring visits are standard cleans at the discounted recurring
rate. The system must handle this first-visit pricing automatically.

**Crew assignment matters.** Clients develop preferences for specific cleaners. Consistency
builds trust and reduces churn. The best companies track cleaner-client preferences and
prioritise preferred assignments.

**Payment is card-on-file.** Unlike beauty/wellness (deposit at booking) or photography
(split payment), cleaning operates on a **card-on-file auto-charge model**. The client's
card is charged after each completed clean. No invoicing. No chasing payments.

**Review requests drive growth.** Google reviews are the #1 lead source for local cleaning
companies. A review request sent 2 hours after each completed clean — when the client
walks into a fresh house — converts at the highest rate.

---

## Fictional Studio

| | |
|---|---|
| **Company** | Greenleaf Home Co. |
| **Location** | Austin, TX (East Austin, Mueller, South Lamar service area) |
| **Founded** | 2023 — 3 years in business |
| **Owner** | Maya Torres — former property manager, runs operations off-field |
| **Team** | Maya (owner) + 6 cleaners across 3 two-person crews |
| **Clients** | ~45 active recurring + 5–10 one-time per month |
| **Revenue** | ~$28K/month ($336K annualised) |
| **Niche** | Eco-friendly residential cleaning. Young professionals, families, Airbnb hosts |
| **Brand tone** | Warm, reliable, eco-conscious. *"Your home, handled."* |
| **Current flow** | Google Form → Google Sheets schedule → WhatsApp group for crews → Venmo/Zelle payments → Wave bookkeeping → manual everything |
| **Problem** | 10–15 hrs/week on scheduling, payments, and WhatsApp coordination. Can't scale past 3 crews without hiring an office manager. Losing leads because quote response takes 4–6 hours. |

### Services & Pricing (Austin TX Market, 2026)

| Service | 1–2 BR / 1 BA | 3 BR / 2 BA | 4+ BR / 3+ BA |
|---|---|---|---|
| Standard Clean | $130 | $170 | $210 |
| Deep Clean | $220 | $290 | $360 |
| Move-In / Move-Out | $280 | $350 | $430 |

**Recurring discounts (applied to Standard Clean):**

| Frequency | Discount | Example (3 BR) |
|---|---|---|
| Weekly | 15% off | $144.50/visit |
| Bi-weekly | 10% off | $153/visit |
| Monthly | 5% off | $161.50/visit |

**Add-ons (any service):**

| Add-on | Price |
|---|---|
| Inside refrigerator | $25 |
| Inside oven | $30 |
| Interior windows | $35 |
| Laundry (wash + fold, 1 load) | $20 |
| Garage sweep | $40 |
| Patio / balcony | $30 |

*All values stored in cents (USD). Stripe's native unit.*

### Cancellation Policy (US Residential Standard)

| Notice | Outcome |
|---|---|
| 48+ hours | Skip without charge. Slot held. |
| 24–48 hours | 50% of service fee charged |
| Under 24 hours | Full service fee charged |
| Lockout (no access) | Full service fee charged |
| Client pauses plan | No charge. Slot held for up to 4 weeks. |

---

## Tech Stack

### Core Framework
- **Next.js 16** — App Router, Server Components, Server Actions, Route Handlers (webhooks only)
- **React 19**
- **TypeScript** — strict mode

> **Server Actions** are the primary mutation pattern for all UI-triggered operations
> (forms, buttons, plan management). Route Handlers are reserved strictly for external
> callers: Stripe webhooks, Inngest handler, and the public quote API (which needs
> raw HTTP caching headers).

> Next.js is chosen over TanStack Start because this project needs a public-facing
> booking page with SEO (Maya's website replacement), a client portal, AND an owner
> dashboard. Next.js App Router handles all three route groups cleanly with shared
> auth middleware. Deployed on Vercel free tier.

### Data & Validation
- **Prisma** — ORM, schema-first, migrations
- **PostgreSQL** — via **Neon** (free tier: 0.5 GB storage, autosuspend after 5 min)
- **Zod** — all input validation, form schemas, API payloads

### Caching & Rate Limiting
- **Upstash Redis** (free tier: 10K commands/day) — session tokens, rate limiting on
  booking endpoints, caching availability lookups
- **@upstash/redis** — serverless Redis client
- **@upstash/ratelimit** — sliding window rate limiter for public endpoints

### Background Jobs
- **Inngest** (free tier: 5K runs/month) — replaces Vercel Cron for all async work:
  post-clean emails, review requests, payment reminders, plan renewal processing
- **inngest** — client SDK for defining and triggering functions

> Why Inngest over Vercel Cron: Cron is limited to 1 job/day on Vercel Hobby.
> Inngest provides event-driven functions with retries, delays, and fan-out — all
> on the free tier. A single "clean.completed" event can trigger the post-clean email,
> the review request (delayed 2 hours), and the cleaner performance update in parallel.

### Client State & Fetching
- **TanStack Query v5** — server state for client-side data fetching (instant quote, portal data)
- **Zustand** — booking wizard state (multi-step quote flow)

### UI
- **shadcn/ui** — base component library
- **Tailwind CSS v4**
- **Radix UI** — via shadcn (Dialog, Select, Calendar, Tabs, etc.)
- **Lucide React** — icons
- **date-fns** + **date-fns-tz** — all date/time calculations (America/Chicago timezone)

### Payments
- **Stripe** — card-on-file, auto-charge after clean, subscription-style recurring billing
- **@stripe/stripe-js** — client-side Stripe.js
- **@stripe/react-stripe-js** — Elements wrapper for card setup

> Stripe is used in "save card + charge later" mode, not subscriptions API.
> Cleaning jobs have variable pricing (add-ons change per visit), so we use
> PaymentIntents with saved PaymentMethods rather than fixed Stripe Subscriptions.

### Email
- **Resend** (free tier: 100 emails/day, 3K/month) — transactional email delivery
- **React Email + @react-email/components** — typed, component-based email templates

### Auth (Owner dashboard only)
- **Better Auth** — TypeScript-first, open-source auth library
- **@better-auth/prisma** — Prisma adapter for Better Auth
- Single owner: email/password login (Maya). Better Auth handles session, cookies,
  CSRF protection. No external service cost.

> Better Auth is chosen over iron-session (deprecated patterns in Next.js 16)
> and Clerk (paid). It provides type-safe sessions, built-in CSRF protection,
> and works natively with Prisma + the Next.js 16 `proxy.ts` pattern.

### Utilities
- **nanoid** — token generation (booking tokens, client portal tokens)

### Dev Tools
- **ESLint + Prettier**
- **Husky + lint-staged** — pre-commit hooks
- **dotenv-cli** — environment management

### Free Tier Summary

| Service | Free Tier Limit | Expected Usage |
|---|---|---|
| **Vercel** | 100K edge requests, 100K function invocations | Well within |
| **Neon** | 0.5 GB storage, 190 compute hours/month | ~50MB data |
| **Upstash Redis** | 10K commands/day | ~500/day |
| **Inngest** | 5K runs/month | ~800/month |
| **Resend** | 100 emails/day, 3K/month | ~300/month |
| **Stripe** | No monthly fee (test mode) | Test mode only |
| **Better Auth** | Open source, self-hosted | No cost |

---

## Folder Structure

```
greenleaf-home-co/
├── app/
│   │
│   ├── (public)/                            # Public-facing — SEO landing + booking
│   │   ├── layout.tsx                      # Greenleaf branding shell
│   │   ├── page.tsx                        # Landing page — hero, services, trust signals, CTA
│   │   ├── book/
│   │   │   ├── page.tsx                    # Step 1: home details (bedrooms, bathrooms, sq ft)
│   │   │   ├── services/
│   │   │   │   └── page.tsx               # Step 2: service type + frequency + add-ons
│   │   │   ├── schedule/
│   │   │   │   └── page.tsx               # Step 3: pick preferred start date
│   │   │   ├── details/
│   │   │   │   └── page.tsx               # Step 4: contact info + home access notes
│   │   │   ├── review/
│   │   │   │   └── page.tsx               # Step 5: summary + save card (Stripe Setup Intent)
│   │   │   └── confirmed/
│   │   │       └── page.tsx               # Booking confirmed — portal link
│   │   └── privacy/
│   │       └── page.tsx                    # Privacy policy (CCPA compliance)
│   │
│   ├── (portal)/                            # Client self-service portal (tokenised)
│   │   ├── layout.tsx                      # Portal branding shell + auth guard
│   │   └── my/
│   │       └── [token]/
│   │           ├── page.tsx               # Dashboard: plan summary, next clean, cleaner info
│   │           ├── schedule/
│   │           │   └── page.tsx           # Upcoming cleans list, reschedule/skip individual visits
│   │           ├── plan/
│   │           │   └── page.tsx           # Plan management: pause, resume, upgrade, cancel
│   │           ├── history/
│   │           │   └── page.tsx           # Past cleans, receipts, ratings given
│   │           ├── home/
│   │           │   └── page.tsx           # Home details: access notes, alarm codes, pet info
│   │           └── billing/
│   │               └── page.tsx           # Payment method, billing history, update card
│   │
│   ├── (owner)/                             # Maya's private dashboard
│   │   ├── layout.tsx                      # Sidebar nav, auth guard
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx                   # Today's schedule, week view, KPIs
│   │   ├── schedule/
│   │   │   └── page.tsx                   # Full calendar — all crews, all jobs, drag-reassign
│   │   ├── clients/
│   │   │   ├── page.tsx                   # Client list, search, filter by plan status
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Client detail: plan, home, history, notes, ratings
│   │   ├── crew/
│   │   │   ├── page.tsx                   # Crew list, utilisation, performance
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Cleaner detail: schedule, ratings, client assignments
│   │   ├── plans/
│   │   │   └── page.tsx                   # All active plans, churn risk, revenue by type
│   │   └── settings/
│   │       ├── page.tsx                   # General settings
│   │       ├── services/
│   │       │   └── page.tsx               # Service pricing, add-on pricing, discount rates
│   │       └── availability/
│   │   │   │   └── page.tsx               # Service area zip codes, crew working hours, blocked dates
│   │
│   ├── actions/                             # Server Actions — all UI-triggered mutations
│   │   ├── booking.actions.ts              # 'use server': createBooking, confirmBooking
│   │   ├── quote.actions.ts               # 'use server': getInstantQuote (cached)
│   │   ├── portal.actions.ts              # 'use server': rescheduleVisit, skipVisit, rateVisit
│   │   ├── plan.actions.ts                # 'use server': pausePlan, resumePlan, upgradePlan, cancelPlan
│   │   ├── client.actions.ts              # 'use server': updateHomeAccess, updateBilling
│   │   ├── owner.actions.ts               # 'use server': markJobStatus, reassignCrew, updateNotes
│   │   ├── crew.actions.ts                # 'use server': updateCleaner
│   │   ├── settings.actions.ts            # 'use server': updatePricing, updateAddOns, manageArea
│   │   └── auth.actions.ts                # 'use server': login, logout (via Better Auth)
│   │
│   ├── api/                                 # Route Handlers — ONLY for external callers
│   │   ├── auth/
│   │   │   └── [...all]/
│   │   │       └── route.ts               # Better Auth catch-all handler
│   │   ├── stripe/
│   │   │   └── webhook/
│   │   │       └── route.ts               # POST: Stripe webhook (external caller)
│   │   └── inngest/
│   │       └── route.ts                    # POST: Inngest webhook handler (external caller)
│   │
│   ├── proxy.ts                             # Next.js 16 proxy (formerly middleware.ts)
│   │                                        # Auth guard: redirect unauthenticated from (owner)/ routes
│   │                                        # NOT the security boundary — Server Actions verify session too
│   │
├── inngest/
│   ├── client.ts                           # Inngest client instance
│   ├── functions/
│   │   ├── post-clean-email.ts            # Triggered on "clean.completed"
│   │   ├── review-request.ts              # Delayed 2hrs after clean.completed
│   │   ├── clean-reminder.ts              # 24hrs before scheduled clean
│   │   ├── payment-charge.ts              # Charge card-on-file after clean completed
│   │   ├── payment-failed-followup.ts     # If charge fails, notify owner + client
│   │   ├── plan-pause-expiry.ts           # After 4 weeks paused, notify client
│   │   └── weekly-owner-summary.ts        # Monday morning KPI email to Maya
│
├── components/
│   ├── ui/                                 # shadcn/ui — do not edit manually
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── separator.tsx
│   │   ├── toast.tsx
│   │   └── progress.tsx
│   │
│   ├── booking/                            # Public booking flow components
│   │   ├── home-size-form.tsx             # Bedrooms, bathrooms, sq ft selector
│   │   ├── service-type-picker.tsx        # Standard / Deep / Move-in-out cards
│   │   ├── frequency-selector.tsx         # Weekly / bi-weekly / monthly / one-time
│   │   ├── addon-checklist.tsx            # Add-on toggles with running total
│   │   ├── instant-quote-display.tsx      # Live price calculation display
│   │   ├── date-preference-picker.tsx     # Preferred start date + day preference
│   │   ├── contact-form.tsx               # Name, email, phone, home address
│   │   ├── home-access-form.tsx           # Entry method, alarm code, pet info, notes
│   │   ├── booking-summary.tsx            # Full summary before card save
│   │   ├── stripe-card-setup.tsx          # Stripe Elements — SetupIntent for card-on-file
│   │   ├── booking-confirmed.tsx          # Confirmed state with portal link
│   │   └── booking-progress.tsx           # Step indicator (1 of 5)
│   │
│   ├── portal/                             # Client portal components
│   │   ├── portal-nav.tsx                 # Portal sidebar/tab navigation
│   │   ├── plan-summary-card.tsx          # Current plan: frequency, price, next clean
│   │   ├── next-clean-card.tsx            # Next visit details: date, time window, cleaner
│   │   ├── cleaner-profile-card.tsx       # Assigned cleaner: name, photo, rating
│   │   ├── upcoming-cleans-list.tsx       # List of scheduled visits with skip/reschedule
│   │   ├── reschedule-picker.tsx          # Pick new date for a specific visit
│   │   ├── plan-controls.tsx             # Pause / resume / upgrade / cancel buttons
│   │   ├── pause-plan-dialog.tsx          # Confirm pause, show resume date
│   │   ├── upgrade-plan-dialog.tsx        # Change frequency or add regular add-ons
│   │   ├── clean-history-list.tsx         # Past cleans with rating + receipt
│   │   ├── rating-form.tsx               # 1–5 star + optional comment
│   │   ├── home-details-form.tsx          # Edit access notes, alarm, pets
│   │   ├── billing-card.tsx              # Current card on file, update button
│   │   └── receipt-row.tsx               # Single payment receipt row
│   │
│   ├── dashboard/                          # Owner dashboard components
│   │   ├── today-schedule.tsx             # Today's jobs by crew with status
│   │   ├── week-calendar.tsx             # 7-day view, all crews, colour-coded
│   │   ├── kpi-cards.tsx                 # Revenue, active plans, churn rate, crew util
│   │   ├── client-table.tsx              # Sortable client list with plan status
│   │   ├── client-detail-panel.tsx       # Full client record with plan + home + history
│   │   ├── crew-table.tsx                # Crew list with utilisation + avg rating
│   │   ├── cleaner-detail-panel.tsx      # Cleaner schedule, ratings, client assignments
│   │   ├── plan-health-table.tsx         # Active plans, paused plans, at-risk (low ratings)
│   │   ├── job-status-controls.tsx       # Mark arrived / in progress / completed
│   │   ├── assign-crew-dialog.tsx        # Reassign a job to a different crew
│   │   └── revenue-by-plan-chart.tsx     # Revenue breakdown by plan frequency
│   │
│   └── shared/
│       ├── greenleaf-logo.tsx
│       ├── page-shell.tsx
│       ├── owner-shell.tsx
│       └── error-state.tsx
│
├── hooks/
│   ├── use-booking-wizard.ts              # Zustand: multi-step booking state
│   ├── use-quote.ts                       # TanStack Query: live instant quote (client-side interactive)
│   └── use-stripe-setup.ts                # Stripe SetupIntent client helpers
│   # NOTE: Most data fetching happens in Server Components (not hooks).
│   # Portal pages, dashboard pages, etc. fetch data directly on the server.
│   # TanStack Query is only used where client-side interactivity requires it
│   # (live quote calculator, Stripe setup flow).
│
├── lib/
│   ├── db.ts                              # Prisma client singleton (globalThis pattern)
│   ├── stripe.ts                          # Stripe server client
│   ├── stripe-client.ts                   # Stripe browser client (loadStripe)
│   ├── resend.ts                          # Resend client
│   ├── redis.ts                           # Upstash Redis client
│   ├── ratelimit.ts                       # Upstash rate limiter config
│   ├── auth.ts                            # Better Auth server instance (createAuth config)
│   ├── auth-client.ts                     # Better Auth client instance (for client components)
│   ├── dal.ts                             # Data Access Layer: requireOwner(), getSession() — server-only
│   │                                       # Defense-in-depth: every Server Action calls dal functions
│   │                                       # NOT just proxy.ts
│   ├── quote.ts                           # Quote calculation engine (core business logic)
│   ├── scheduling.ts                      # Visit generation from plan rules
│   ├── plan.ts                            # Plan state machine (active/paused/cancelled)
│   ├── assignment.ts                      # Crew assignment logic (preference-aware)
│   ├── tokens.ts                          # nanoid portal token generation
│   └── utils.ts                           # cn(), formatCurrency (USD), formatDate (US)
│
├── schemas/
│   ├── booking.schema.ts                  # Zod: full booking flow payloads
│   ├── quote.schema.ts                    # Zod: quote request (home size, service, frequency)
│   ├── portal.schema.ts                   # Zod: portal actions (reschedule, skip, pause, rate)
│   ├── plan.schema.ts                     # Zod: plan mutations (pause, resume, upgrade, cancel)
│   ├── client.schema.ts                   # Zod: client details, home access
│   ├── crew.schema.ts                     # Zod: crew assignment, cleaner update
│   ├── settings.schema.ts                # Zod: service pricing, area, availability
│   └── auth.schema.ts                     # Zod: login form
│
├── types/
│   ├── booking.ts                         # BookingStep enum, BookingState, QuoteResult
│   ├── plan.ts                            # Plan, PlanStatus, PlanFrequency, PlanHistory
│   ├── visit.ts                           # Visit, VisitStatus, VisitWithCrew
│   ├── client.ts                          # Client, ClientWithPlan, HomeDetails
│   ├── crew.ts                            # Cleaner, Crew, CrewAssignment, CrewMetrics
│   ├── service.ts                         # ServiceType, AddOn, PricingTier
│   └── dashboard.ts                       # DashboardKPIs, ScheduleDay, RevenueBreakdown
│
├── emails/
│   ├── booking-confirmed.tsx              # Welcome + portal link + first clean details
│   ├── clean-reminder-24h.tsx             # Tomorrow's clean: time window, cleaner name, access
│   ├── clean-completed.tsx                # Clean done, card charged, rate your clean link
│   ├── review-request.tsx                 # 2hrs post-clean: "How was your clean?" + Google link
│   ├── plan-paused.tsx                    # Plan paused confirmation + resume date
│   ├── plan-resumed.tsx                   # Plan resumed + next clean date
│   ├── plan-cancelled.tsx                 # Cancellation confirmation + rebook CTA
│   ├── payment-receipt.tsx                # Payment charged, amount, next clean date
│   ├── payment-failed.tsx                 # Card declined, update card link
│   ├── visit-rescheduled.tsx              # Rescheduled confirmation with new date
│   ├── visit-skipped.tsx                  # Skip confirmation, next clean still on schedule
│   └── owner-weekly-summary.tsx           # Monday summary: revenue, new clients, churn, crew perf
│
└── prisma/
    ├── schema.prisma
    └── seed.ts                            # Seed: services, pricing, crews, demo clients + plans
```

---

## Database Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Service Configuration ────────────────────────────────────────────────────

model ServiceType {
  id           String   @id @default(cuid())
  slug         String   @unique          // "standard-clean"
  name         String                    // "Standard Clean"
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
  bedrooms      Int                      // max bedrooms for this tier
  bathrooms     Int                      // max bathrooms for this tier
  basePrice     Int                      // cents: 13000 = $130.00
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@unique([serviceTypeId, bedrooms, bathrooms])
}

model AddOn {
  id           String   @id @default(cuid())
  slug         String   @unique          // "inside-fridge"
  name         String                    // "Inside Refrigerator"
  price        Int                       // cents: 2500 = $25.00
  isActive     Boolean  @default(true)
  displayOrder Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model FrequencyDiscount {
  id         String   @id @default(cuid())
  frequency  PlanFrequency @unique
  percentage Int                        // 15 = 15% off
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

// ─── Clients ──────────────────────────────────────────────────────────────────

model Client {
  id                    String   @id @default(cuid())
  email                 String   @unique
  name                  String
  phone                 String
  portalToken           String   @unique  // nanoid — persistent portal URL
  stripeCustomerId      String?  @unique
  stripePaymentMethodId String?           // saved card-on-file

  // Home details
  address               String
  city                  String   @default("Austin")
  state                 String   @default("TX")
  zipCode               String
  bedrooms              Int
  bathrooms             Int
  squareFeet            Int?

  // Home access
  entryMethod           String?           // "lockbox", "garage code", "will be home", "hidden key"
  accessNotes           String?           // "Lockbox code: 4521. Side gate."
  alarmCode             String?
  petInfo               String?           // "2 dogs — friendly, keep in backyard"

  // Preferences
  preferredCleanerId    String?
  preferredCleaner      Cleaner?  @relation("PreferredCleaner", fields: [preferredCleanerId], references: [id])
  specialInstructions   String?           // "Please use unscented products"

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

  // Pricing snapshot (locked at plan creation)
  basePrice       Int                    // cents — tier price at time of booking
  discountPct     Int                    // discount percentage applied
  recurringPrice  Int                    // cents — basePrice * (1 - discountPct/100)

  // Add-ons included in every visit
  addOnSlugs      String[]              // ["inside-fridge", "laundry"]
  addOnTotal      Int          @default(0) // cents — sum of recurring add-on prices

  // Schedule
  preferredDay    Int                    // 0=Sun..6=Sat — client's preferred day
  timeWindow      String       @default("morning") // "morning" | "afternoon"
  startDate       DateTime               // when the plan starts
  nextVisitDate   DateTime?              // next scheduled visit

  // Crew
  assignedCrewId  String?
  assignedCrew    Crew?         @relation(fields: [assignedCrewId], references: [id])

  // Pause tracking
  pausedAt        DateTime?
  resumeDate      DateTime?              // auto-resume date (max 4 weeks)

  // History
  visits          Visit[]
  cancelledAt     DateTime?
  cancellationReason String?

  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum PlanFrequency {
  WEEKLY
  BIWEEKLY
  MONTHLY
  ONE_TIME
}

enum PlanStatus {
  ACTIVE
  PAUSED
  CANCELLED
}

// ─── Visits (Individual Cleans) ───────────────────────────────────────────────

model Visit {
  id                    String       @id @default(cuid())
  plan                  Plan?        @relation(fields: [planId], references: [id])
  planId                String?
  client                Client       @relation(fields: [clientId], references: [id])
  clientId              String
  serviceType           ServiceType  @relation(fields: [serviceTypeId], references: [id])
  serviceTypeId         String
  crew                  Crew?        @relation(fields: [crewId], references: [id])
  crewId                String?

  scheduledDate         DateTime     @db.Date
  timeWindow            String       @default("morning") // "morning" | "afternoon"
  status                VisitStatus  @default(SCHEDULED)

  // Pricing (per-visit, may include one-time add-ons)
  servicePrice          Int                    // cents
  addOnSlugs            String[]
  addOnTotal            Int          @default(0)
  totalPrice            Int                    // servicePrice + addOnTotal

  // Payment
  stripePaymentIntentId String?      @unique
  paymentStatus         PaymentStatus @default(PENDING)
  paidAt                DateTime?

  // Execution
  arrivedAt             DateTime?
  completedAt           DateTime?

  // Feedback
  rating                Rating?

  // Notes
  ownerNotes            String?
  skipReason            String?

  createdAt             DateTime     @default(now())
  updatedAt             DateTime     @updatedAt
}

enum VisitStatus {
  SCHEDULED
  CONFIRMED         // 24hr reminder sent
  IN_PROGRESS       // crew checked in
  COMPLETED         // crew checked out
  SKIPPED           // client skipped this visit
  CANCELLED         // visit cancelled (with fee logic)
}

enum PaymentStatus {
  PENDING
  CHARGED
  FAILED
  REFUNDED
  WAIVED             // skipped with 48hr+ notice
}

// ─── Crew ─────────────────────────────────────────────────────────────────────

model Crew {
  id        String    @id @default(cuid())
  name      String                       // "Crew A", "Crew B", "Crew C"
  isActive  Boolean   @default(true)
  cleaners  Cleaner[]
  plans     Plan[]
  visits    Visit[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Cleaner {
  id             String   @id @default(cuid())
  name           String
  phone          String?
  photoUrl       String?
  crew           Crew     @relation(fields: [crewId], references: [id])
  crewId         String
  isActive       Boolean  @default(true)
  preferredBy    Client[] @relation("PreferredCleaner")
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
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

// ─── Service Area ─────────────────────────────────────────────────────────────

model ServiceArea {
  id        String   @id @default(cuid())
  zipCode   String   @unique
  name      String?                      // "East Austin", "Mueller", "South Lamar"
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

// ─── Blocked Dates ────────────────────────────────────────────────────────────

model BlockedDate {
  id        String   @id @default(cuid())
  date      DateTime @db.Date
  reason    String?                      // "Thanksgiving", "Team training day"
  createdAt DateTime @default(now())
}

// ─── Crew Availability ────────────────────────────────────────────────────────

model CrewAvailability {
  id        String   @id @default(cuid())
  crewId    String
  dayOfWeek Int                          // 0=Sun..6=Sat
  startTime String                       // "08:00"
  endTime   String                       // "17:00"
  isActive  Boolean  @default(true)
  maxJobs   Int      @default(4)         // max visits per day for this crew

  @@unique([crewId, dayOfWeek])
}
```

---

## Environment Variables

```bash
# .env.local

# Database (Neon — free tier)
DATABASE_URL="postgresql://..."

# Stripe (test mode — no monthly cost)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Resend (free tier: 100/day, 3K/month)
RESEND_API_KEY="re_..."
EMAIL_FROM="Greenleaf Home Co. <hello@greenleafhome.co>"

# Upstash Redis (free tier: 10K commands/day)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Inngest (free tier: 5K runs/month)
INNGEST_EVENT_KEY="..."
INNGEST_SIGNING_KEY="..."

# Owner auth
OWNER_PASSWORD_HASH="..."           # bcrypt hash
SESSION_SECRET="..."                # 32+ char random string

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

---

## Build Checklist

### Phase 0 — Project Setup

- [ ] Initialise Next.js 15 app with TypeScript and App Router
  ```bash
  npx create-next-app@latest greenleaf-home-co --typescript --tailwind --app --src-dir=false
  ```
- [ ] Install core dependencies
  ```bash
  pnpm add prisma @prisma/client zod @tanstack/react-query zustand
  pnpm add stripe @stripe/stripe-js @stripe/react-stripe-js
  pnpm add resend @react-email/components react-email
  pnpm add better-auth @better-auth/prisma nanoid date-fns date-fns-tz lucide-react
  pnpm add @upstash/redis @upstash/ratelimit
  pnpm add inngest
  pnpm add -D @types/node
  ```
- [ ] Initialise shadcn/ui
  ```bash
  npx shadcn@latest init
  ```
- [ ] Add shadcn components
  ```bash
  npx shadcn@latest add button card input label select form dialog badge
  npx shadcn@latest add separator toast calendar tabs slider progress
  ```
- [ ] Initialise Prisma
  ```bash
  pnpm prisma init
  ```
- [ ] Create folder structure: `app/actions`, `components/booking`, `components/portal`,
  `components/dashboard`, `components/shared`, `hooks`, `lib`, `schemas`, `types`, `emails`,
  `inngest/functions`
- [ ] Create `.env.local` from variables above
- [ ] Set up Prettier + ESLint config
- [ ] Set up Husky + lint-staged
- [ ] Set up `proxy.ts` (Next.js 16 — formerly middleware.ts)
  - [ ] Auth guard: redirect unauthenticated users from `(owner)/*` to login
  - [ ] NOT the sole security boundary — all Server Actions verify session independently
- [ ] Set up Inngest client (`inngest/client.ts`)
  ```typescript
  import { Inngest } from "inngest"
  export const inngest = new Inngest({ id: "greenleaf-home-co" })
  ```

---

### Phase 1 — Database

- [ ] Write `prisma/schema.prisma` (full schema above)
- [ ] Run first migration
  ```bash
  pnpm prisma migrate dev --name init
  ```
- [ ] Write `prisma/seed.ts`
  - [ ] Seed 3 service types: Standard Clean, Deep Clean, Move-In/Move-Out
  - [ ] Seed pricing tiers per service type (3 tiers each: 1-2BR, 3BR, 4+BR)
  - [ ] Seed 6 add-ons: fridge, oven, windows, laundry, garage, patio
  - [ ] Seed 3 frequency discounts: weekly (15%), bi-weekly (10%), monthly (5%)
  - [ ] Seed 10 service area zip codes (Austin metro: 78702, 78723, 78704, 78745, etc.)
  - [ ] Seed 3 crews: "Crew A", "Crew B", "Crew C"
  - [ ] Seed 6 cleaners across 3 crews (2 per crew): realistic names, phone, photo placeholder URLs
  - [ ] Seed crew availability: Mon–Fri 8:00–17:00, max 4 jobs/day per crew
  - [ ] Seed 2 blocked dates: July 4 (Independence Day), Nov 27 (Thanksgiving)
  - [ ] Seed 8 demo clients with realistic Austin addresses, varying home sizes
  - [ ] Seed 6 active plans across clients (2 weekly, 2 bi-weekly, 1 monthly, 1 one-time)
  - [ ] Seed 30+ visits: mix of completed (with ratings), scheduled, and 1 skipped
  - [ ] Seed 15 ratings on completed visits (mix of 4 and 5 stars, 2 with comments)
- [ ] Run seed
  ```bash
  pnpm prisma db seed
  ```
- [ ] Create `lib/db.ts` — Prisma client singleton with `globalThis` pattern

---

### Phase 2 — Core Library Functions

Build and test these before any UI. This is the business logic layer.

- [ ] `lib/quote.ts` — Quote Calculation Engine
  - [ ] `calculateQuote(input)` — the main function:
    - Input: `{ bedrooms, bathrooms, serviceTypeSlug, frequency, addOnSlugs }`
    - [ ] Look up pricing tier by service type + bedroom/bathroom count
    - [ ] Look up frequency discount percentage
    - [ ] Calculate: `basePrice * (1 - discountPct/100)` = recurring price per visit
    - [ ] Look up add-on prices by slugs, sum them
    - [ ] Calculate total per visit: `recurringPrice + addOnTotal`
    - [ ] Calculate first visit price (deep clean rate if Standard + recurring)
    - [ ] Return `QuoteResult`: `{ basePrice, discountPct, recurringPrice, addOnTotal, totalPerVisit, firstVisitPrice, frequency, monthlyEstimate }`
  - [ ] `getMonthlyEstimate(totalPerVisit, frequency)` — weekly×4, biweekly×2, monthly×1

- [ ] `lib/scheduling.ts` — Visit Generation
  - [ ] `generateVisits(plan, count)` — generate next N visit dates from plan rules:
    - [ ] Start from `plan.nextVisitDate` or `plan.startDate`
    - [ ] Respect `plan.frequency`: weekly = +7 days, biweekly = +14, monthly = +1 month
    - [ ] Respect `plan.preferredDay`: shift to nearest matching day-of-week
    - [ ] Skip blocked dates (query `BlockedDate`)
    - [ ] Default to generating 8 weeks of visits ahead
  - [ ] `getNextAvailableDate(preferredDay, startFrom)` — find the next occurrence of a specific day of week
  - [ ] `isDateAvailable(date, crewId)` — check blocked dates + crew capacity for that day
  - [ ] `getCrewCapacity(crewId, date)` — count existing visits vs `maxJobs` from `CrewAvailability`

- [ ] `lib/plan.ts` — Plan State Machine
  - [ ] `PLAN_TRANSITIONS`: valid state transitions
    - `ACTIVE → PAUSED` (client pauses)
    - `ACTIVE → CANCELLED` (client cancels)
    - `PAUSED → ACTIVE` (client resumes or auto-resume after pause expires)
    - `PAUSED → CANCELLED` (client cancels while paused)
  - [ ] `pausePlan(planId, resumeDate?)` — set status PAUSED, delete future scheduled visits, set `pausedAt` + `resumeDate`
  - [ ] `resumePlan(planId)` — set status ACTIVE, regenerate visits from resume date, clear pause fields
  - [ ] `cancelPlan(planId, reason?)` — set status CANCELLED, delete future visits, set `cancelledAt`
  - [ ] `upgradePlan(planId, newFrequency)` — recalculate pricing, regenerate visits at new frequency
  - [ ] `getMaxPauseDate()` — 4 weeks from today (business rule)

- [ ] `lib/assignment.ts` — Crew Assignment Logic
  - [ ] `assignCrew(planId)` — preference-aware assignment:
    - [ ] Check `client.preferredCleanerId` → get their crew
    - [ ] If preferred crew has capacity on `plan.preferredDay`: assign
    - [ ] If not: find crew with most available capacity on that day
    - [ ] Return assigned `crewId`
  - [ ] `getCrewForDate(date)` — list all crews with their load for a given date
  - [ ] `reassignVisit(visitId, newCrewId)` — manual owner reassignment

- [ ] `lib/tokens.ts`
  - [ ] `generatePortalToken()` — nanoid(21) URL-safe, generated at client creation
  - [ ] `getClientByPortalToken(token)` — Prisma lookup with plan + upcoming visits

- [ ] `lib/auth.ts` — Better Auth server instance
  - [ ] Configure Better Auth with Prisma adapter
  - [ ] Email/password provider (Maya's single account)
  - [ ] Session configuration: cookie-based, httpOnly, sameSite strict
  - [ ] Export `auth` instance for use in Server Actions and Route Handler

- [ ] `lib/auth-client.ts` — Better Auth client instance
  - [ ] For client-side auth state (login form, session checks)

- [ ] `lib/dal.ts` — Data Access Layer (`server-only`)
  - [ ] `getSession()` — calls Better Auth to verify current session
  - [ ] `requireOwner()` — calls `getSession()`, throws redirect to login if invalid
  - [ ] Every Server Action that touches owner data calls `requireOwner()` first
  - [ ] This is the security boundary, not `proxy.ts`
  - [ ] Mark file with `import "server-only"` to prevent client import

- [ ] `lib/redis.ts`
  - [ ] Upstash Redis client singleton
  - [ ] `cacheQuote(key, result, ttl)` — cache quote results for 5 minutes
  - [ ] `getCachedQuote(key)` — retrieve cached quote

- [ ] `lib/ratelimit.ts`
  - [ ] Sliding window rate limiter: 10 requests per 10 seconds on public booking endpoints
  - [ ] `rateLimit(identifier)` — returns `{ success, limit, remaining }`

- [ ] `lib/utils.ts`
  - [ ] `formatCurrency(cents: number)` → `"$130.00"`
  - [ ] `formatDate(date: Date)` → `"Thursday, January 14, 2027"` (US format)
  - [ ] `formatShortDate(date: Date)` → `"Jan 14, 2027"`
  - [ ] `formatTime(date: Date)` → `"8:00 AM"`
  - [ ] `getTimeWindowLabel(window: string)` → `"8:00 AM – 12:00 PM"` or `"12:00 PM – 5:00 PM"`
  - [ ] `cn(...classes)` — shadcn Tailwind class merge

---

### Phase 3 — Zod Schemas

- [ ] `schemas/quote.schema.ts`
  - [ ] `QuoteRequestSchema` — bedrooms: number (1–6), bathrooms: number (1–5),
    serviceTypeSlug: string, frequency: PlanFrequency, addOnSlugs: string[] (optional)

- [ ] `schemas/booking.schema.ts`
  - [ ] `HomeSizeSchema` — bedrooms, bathrooms, squareFeet (optional)
  - [ ] `ServiceSelectionSchema` — serviceTypeSlug, frequency, addOnSlugs
  - [ ] `SchedulePreferenceSchema` — preferredDay (0–6), timeWindow ("morning" | "afternoon"), startDate
  - [ ] `ContactDetailsSchema` — name, email, phone, address, city, state, zipCode
  - [ ] `HomeAccessSchema` — entryMethod, accessNotes (optional), alarmCode (optional), petInfo (optional)
  - [ ] `CreateBookingSchema` — combines all steps: home size + service + schedule + contact + access

- [ ] `schemas/portal.schema.ts`
  - [ ] `RescheduleVisitSchema` — visitId, newDate
  - [ ] `SkipVisitSchema` — visitId, reason (optional)
  - [ ] `RateVisitSchema` — visitId, score (1–5), comment (optional)
  - [ ] `UpdateHomeAccessSchema` — entryMethod, accessNotes, alarmCode, petInfo

- [ ] `schemas/plan.schema.ts`
  - [ ] `PausePlanSchema` — planId, resumeDate (optional, max 4 weeks)
  - [ ] `ResumePlanSchema` — planId
  - [ ] `UpgradePlanSchema` — planId, newFrequency
  - [ ] `CancelPlanSchema` — planId, reason (optional)

- [ ] `schemas/crew.schema.ts`
  - [ ] `ReassignVisitSchema` — visitId, newCrewId
  - [ ] `UpdateCleanerSchema` — cleanerId, name, phone, photoUrl, isActive

- [ ] `schemas/settings.schema.ts`
  - [ ] `UpdatePricingTierSchema` — tierId, basePrice (cents)
  - [ ] `UpdateAddOnSchema` — addOnId, price (cents), isActive
  - [ ] `UpdateFrequencyDiscountSchema` — frequency, percentage
  - [ ] `UpdateServiceAreaSchema` — zipCode, name, isActive
  - [ ] `BlockDateSchema` — date, reason (optional)

- [ ] `schemas/auth.schema.ts`
  - [ ] `LoginSchema` — password

---

### Phase 4 — Server Actions & Route Handlers

> **Pattern:** All mutations triggered by the UI use Server Actions (`'use server'`).
> Route Handlers are ONLY for external callers (Stripe webhooks, Inngest handler).
> Data for Server Components is fetched directly in the component — no API needed.

#### Server Actions: Booking (`actions/booking.actions.ts`)

- [ ] `getInstantQuote(formData)` — Server Action
  - [ ] Rate limit with Upstash (10 req / 10 sec per IP via `headers()`)
  - [ ] Validate `QuoteRequestSchema`
  - [ ] Check Redis cache for identical quote request
  - [ ] If cache miss: call `calculateQuote()`, cache result for 5 min
  - [ ] Return `QuoteResult`

- [ ] `createBooking(prevState, formData)` — Server Action (`useActionState`-compatible)
  - [ ] Rate limit (5 req / 60 sec per IP — stricter)
  - [ ] Validate `CreateBookingSchema`
  - [ ] Verify zip code is in `ServiceArea`
  - [ ] Calculate final quote (server-side re-validation)
  - [ ] Create Stripe Customer + SetupIntent for card-on-file
  - [ ] Return `{ clientSecret, customerId }` or `{ errors }`

- [ ] `confirmBooking(data)` — Server Action
  - [ ] Receive Stripe SetupIntent confirmation
  - [ ] Find or create `Client` record
  - [ ] Store `stripeCustomerId` and `stripePaymentMethodId` on client
  - [ ] Generate `portalToken`
  - [ ] Create `Plan` with pricing snapshot + schedule
  - [ ] Call `assignCrew(planId)` — auto-assign best crew
  - [ ] Call `generateVisits(plan, 8)` — create 8 weeks of scheduled visits
  - [ ] Send `booking-confirmed` email with portal link
  - [ ] Emit Inngest event: `"booking.confirmed"`
  - [ ] Return `{ portalToken, nextVisitDate }`

#### Server Actions: Portal (`actions/portal.actions.ts`)

- [ ] `rescheduleVisit(prevState, formData)` — Server Action
  - [ ] Validate portal token + `RescheduleVisitSchema`
  - [ ] Check new date is available for assigned crew
  - [ ] Check new date is 48hrs+ away (policy enforcement)
  - [ ] Update `visit.scheduledDate`
  - [ ] Send `visit-rescheduled` email
  - [ ] `revalidatePath()` to refresh portal schedule page

- [ ] `skipVisit(prevState, formData)` — Server Action
  - [ ] Validate portal token + `SkipVisitSchema`
  - [ ] Check visit is 48hrs+ away for free skip, otherwise apply fee
  - [ ] Set `visit.status = SKIPPED`, set `paymentStatus` accordingly
  - [ ] If charged: create PaymentIntent and charge card-on-file
  - [ ] Send `visit-skipped` email, `revalidatePath()`

- [ ] `rateVisit(prevState, formData)` — Server Action
  - [ ] Validate portal token + `RateVisitSchema`
  - [ ] Verify visit belongs to this client and is `COMPLETED`
  - [ ] Verify no existing rating (idempotency)
  - [ ] Create `Rating` record, `revalidatePath()`

#### Server Actions: Plan (`actions/plan.actions.ts`)

- [ ] `pausePlan(prevState, formData)` — Server Action
  - [ ] Validate `PausePlanSchema`, call `pausePlan()`, send email
  - [ ] Emit `"plan.paused"` Inngest event, `revalidatePath()`

- [ ] `resumePlan(planId)` — Server Action
  - [ ] Call `resumePlan()`, send email, `revalidatePath()`

- [ ] `upgradePlan(prevState, formData)` — Server Action
  - [ ] Validate `UpgradePlanSchema`, recalculate pricing, `revalidatePath()`

- [ ] `cancelPlan(prevState, formData)` — Server Action
  - [ ] Validate `CancelPlanSchema`, call `cancelPlan()`, send email, `revalidatePath()`

#### Server Actions: Client (`actions/client.actions.ts`)

- [ ] `updateHomeAccess(prevState, formData)` — Server Action
  - [ ] Validate portal token + `UpdateHomeAccessSchema`
  - [ ] Update client access notes, alarm code, pet info, `revalidatePath()`

- [ ] `createStripeSetupIntent(portalToken)` — Server Action
  - [ ] Create new Stripe SetupIntent for updating card on file
  - [ ] Return `{ clientSecret }`

#### Server Actions: Owner (`actions/owner.actions.ts`)

- [ ] `markJobStatus(visitId, newStatus)` — Server Action
  - [ ] `requireOwner()` via DAL
  - [ ] Validate status transition (SCHEDULED → IN_PROGRESS → COMPLETED)
  - [ ] Update `visit.status`, set timestamps
  - [ ] On COMPLETED: emit `"clean.completed"` Inngest event
  - [ ] `revalidatePath()` to refresh dashboard

- [ ] `reassignCrew(prevState, formData)` — Server Action
  - [ ] `requireOwner()`, validate `ReassignVisitSchema`
  - [ ] Call `reassignVisit()`, `revalidatePath()`

- [ ] `updateClientNotes(clientId, notes)` — Server Action
  - [ ] `requireOwner()`, update owner notes field, `revalidatePath()`

#### Server Actions: Settings (`actions/settings.actions.ts`)

- [ ] `updatePricing(prevState, formData)` — Server Action
  - [ ] `requireOwner()`, validate, update pricing tier

- [ ] `updateAddOn(prevState, formData)` — Server Action
  - [ ] `requireOwner()`, validate, update add-on price/active status

- [ ] `updateServiceArea(prevState, formData)` — Server Action
  - [ ] `requireOwner()`, add/remove zip codes

- [ ] `blockDate(prevState, formData)` / `unblockDate(dateId)` — Server Actions
  - [ ] `requireOwner()`, manage blocked dates

#### Server Actions: Auth (`actions/auth.actions.ts`)

- [ ] `login(prevState, formData)` — Server Action
  - [ ] Validate `LoginSchema`
  - [ ] Call Better Auth signIn endpoint
  - [ ] Redirect to `/dashboard` on success, return `{ error }` on failure

- [ ] `logout()` — Server Action
  - [ ] Call Better Auth signOut
  - [ ] Redirect to `/login`

#### Route Handlers (External callers ONLY)

- [ ] `api/auth/[...all]/route.ts`
  - [ ] Better Auth catch-all handler
  - [ ] Handles session management, CSRF, cookie operations

- [ ] `api/stripe/webhook/route.ts` — POST
  - [ ] Verify Stripe webhook signature
  - [ ] `setup_intent.succeeded`: update client's `stripePaymentMethodId`
  - [ ] `payment_intent.succeeded`: mark visit as `CHARGED` (idempotency guard)
  - [ ] `payment_intent.payment_failed`: mark visit as `FAILED`, emit `"payment.failed"`

- [ ] `api/inngest/route.ts` — POST
  - [ ] Import Inngest serve handler
  - [ ] Register all Inngest functions
  - [ ] Export as POST handler

> **Why no GET Route Handlers for dashboard/portal data?** Server Components fetch
> data directly via Prisma in the component itself. No API layer needed between
> a Server Component and the database. This is the core benefit of RSC.

---

### Phase 5 — Inngest Background Functions

All async operations run via Inngest. Each function is triggered by an event and
runs independently with automatic retries.

- [ ] `inngest/functions/post-clean-email.ts`
  - [ ] Trigger: `"clean.completed"` event
  - [ ] Look up visit + client + crew
  - [ ] Send `clean-completed` email: summary, charge confirmation, rate-your-clean link
  - [ ] Send `payment-receipt` email with amount charged

- [ ] `inngest/functions/review-request.ts`
  - [ ] Trigger: `"clean.completed"` event with 2-hour delay (`sleep("2h")`)
  - [ ] Check if client has already rated this visit (skip if yes)
  - [ ] Send `review-request` email with Google review link + in-portal rating link

- [ ] `inngest/functions/clean-reminder.ts`
  - [ ] Trigger: `"visit.created"` event with scheduled delay until 24hrs before visit
  - [ ] Verify visit is still `SCHEDULED` (not skipped/cancelled)
  - [ ] Update visit status to `CONFIRMED`
  - [ ] Send `clean-reminder-24h` email: date, time window, cleaner name, access notes reminder

- [ ] `inngest/functions/payment-charge.ts`
  - [ ] Trigger: `"clean.completed"` event
  - [ ] Look up visit pricing + client's saved card
  - [ ] Call `api/stripe/charge` to charge card-on-file
  - [ ] If success: update `visit.paymentStatus = CHARGED`
  - [ ] If failure: emit `"payment.failed"` event

- [ ] `inngest/functions/payment-failed-followup.ts`
  - [ ] Trigger: `"payment.failed"` event
  - [ ] Send `payment-failed` email to client with update-card portal link
  - [ ] Notify owner (Maya) via email about failed payment

- [ ] `inngest/functions/plan-pause-expiry.ts`
  - [ ] Trigger: `"plan.paused"` event with delay until `plan.resumeDate`
  - [ ] Check if plan is still `PAUSED` (client may have already resumed)
  - [ ] If still paused: auto-resume plan, send `plan-resumed` email
  - [ ] Regenerate visits from resume date

- [ ] `inngest/functions/weekly-owner-summary.ts`
  - [ ] Trigger: Inngest cron `"0 8 * * 1"` (Monday 8 AM CT)
  - [ ] Aggregate: last week's revenue, new clients, cancelled plans, avg rating, crew utilisation
  - [ ] Send `owner-weekly-summary` email to Maya

---

### Phase 6 — Email Templates (React Email)

All emails are warm, professional, and branded as Greenleaf Home Co. Clean layout,
eco-green accent colour, US date formatting throughout.

- [ ] `emails/booking-confirmed.tsx`
  - [ ] Props: `clientName`, `serviceName`, `frequency`, `firstCleanDate`, `timeWindow`,
    `cleanerNames`, `totalPrice`, `portalUrl`, `address`
  - [ ] Content: Welcome to Greenleaf. First clean summary. What to expect.
    Access notes reminder. Portal link for managing your plan.

- [ ] `emails/clean-reminder-24h.tsx`
  - [ ] Props: `clientName`, `cleanDate`, `timeWindow`, `cleanerNames`, `accessNotes`, `portalUrl`
  - [ ] Content: "Your clean is tomorrow." Time window, who's coming, access notes
    echoed back. Portal link to reschedule if needed.

- [ ] `emails/clean-completed.tsx`
  - [ ] Props: `clientName`, `cleanDate`, `amountCharged`, `ratingUrl`, `portalUrl`
  - [ ] Content: "Your home is fresh." Amount charged to card on file. One-tap
    rating link. "If anything wasn't right, let us know."

- [ ] `emails/review-request.tsx`
  - [ ] Props: `clientName`, `googleReviewUrl`, `portalRatingUrl`
  - [ ] Content: "How was your clean?" Google review link + portal rating. Sent 2hrs after.

- [ ] `emails/plan-paused.tsx`
  - [ ] Props: `clientName`, `pauseDate`, `resumeDate`, `portalUrl`
  - [ ] Content: "Your plan is paused." Resume date. Portal link to resume early.

- [ ] `emails/plan-resumed.tsx`
  - [ ] Props: `clientName`, `nextCleanDate`, `timeWindow`, `cleanerNames`, `portalUrl`
  - [ ] Content: "Welcome back!" Next clean date. Crew assignment. Portal link.

- [ ] `emails/plan-cancelled.tsx`
  - [ ] Props: `clientName`, `bookingUrl`
  - [ ] Content: "We're sorry to see you go." No guilt language. Rebook CTA.

- [ ] `emails/payment-receipt.tsx`
  - [ ] Props: `clientName`, `cleanDate`, `amountCharged`, `cardLast4`, `portalUrl`
  - [ ] Content: Receipt — date, amount, card ending, next clean date.

- [ ] `emails/payment-failed.tsx`
  - [ ] Props: `clientName`, `amountDue`, `updateCardUrl`
  - [ ] Content: "We couldn't process your payment." Update card CTA.

- [ ] `emails/visit-rescheduled.tsx`
  - [ ] Props: `clientName`, `oldDate`, `newDate`, `timeWindow`, `cleanerNames`, `portalUrl`
  - [ ] Content: "Your clean has been rescheduled." Old → new date. Crew info.

- [ ] `emails/visit-skipped.tsx`
  - [ ] Props: `clientName`, `skippedDate`, `nextCleanDate`, `fee`, `portalUrl`
  - [ ] Content: "This visit has been skipped." Fee if applied. Next clean on schedule.

- [ ] `emails/owner-weekly-summary.tsx`
  - [ ] Props: `weekStartDate`, `revenue`, `newClients`, `cancelledPlans`, `activeClients`,
    `avgRating`, `crewUtilisation`, `upcomingWeekCount`
  - [ ] Content: Monday morning summary. Key numbers in a clean table.

---

### Phase 7 — Booking Flow (Public, Client-Facing)

5-step wizard. State in Zustand. URL advances per step. Back button works.
Instant quote updates live as selections change.

#### Step 1 — Home Size `(public)/book/page.tsx`
- [ ] `<HomeSizeForm />`: bedroom selector (1–6), bathroom selector (1–5), sq ft (optional)
- [ ] Save to Zustand, navigate to services
- [ ] `<BookingProgress step={1} of={5} />`

#### Step 2 — Service + Frequency + Add-ons `(public)/book/services/page.tsx`
- [ ] Guard: redirect if home size not set
- [ ] `<ServiceTypePicker />`: 3 cards (Standard, Deep, Move-In/Out) with descriptions
- [ ] `<FrequencySelector />` (Standard only): Weekly/Bi-weekly/Monthly/One-time with discounts shown
- [ ] `<AddonChecklist />`: toggle cards for each add-on with running total
- [ ] `<InstantQuoteDisplay />`: TanStack Query to `api/booking/quote`, live price calc
  - [ ] Per-visit price, discount, add-on total, monthly estimate
  - [ ] First visit callout: "Your first visit is a deep clean at $X"

#### Step 3 — Schedule `(public)/book/schedule/page.tsx`
- [ ] Guard: redirect if service not selected
- [ ] `<DatePreferencePicker />`: preferred day (Mon–Sat radio), time window (morning/afternoon), start date calendar (min 3 days out, no Sundays, no blocked dates)

#### Step 4 — Contact + Access `(public)/book/details/page.tsx`
- [ ] Guard: redirect if schedule not set
- [ ] `<ContactForm />`: name, email, phone, address, city, state, zip
  - [ ] Validate zip against `ServiceArea` — "We don't service this area yet" if invalid
- [ ] `<HomeAccessForm />`: entry method dropdown, access notes, alarm code, pet info, special instructions

#### Step 5 — Review + Card `(public)/book/review/page.tsx`
- [ ] Guard: redirect if details not complete
- [ ] `<BookingSummary />`: full summary with edit links per section
- [ ] `<StripeCardSetup />`: SetupIntent card input. "No charge today. Card saved securely."
- [ ] Test card notice: `4242 4242 4242 4242`
- [ ] On success: POST `api/booking/confirm`, navigate to confirmed

#### Confirmation `(public)/book/confirmed/page.tsx`
- [ ] "You're all set." First clean date, time window, crew names
- [ ] Portal link: "Manage your plan anytime"
- [ ] "Check your email for confirmation"

---

### Phase 8 — Client Portal (Self-Service)

At `(portal)/my/[token]`. Persistent, bookmarkable. No login.

#### Dashboard `(portal)/my/[token]/page.tsx`
- [ ] `<PlanSummaryCard />`: service, frequency, price, status badge
- [ ] `<NextCleanCard />`: date, time window, crew names + photos, access notes echo
- [ ] `<CleanerProfileCard />`: assigned cleaner name, photo, avg rating
- [ ] Navigation: Schedule, Plan, History, Home, Billing

#### Schedule `(portal)/my/[token]/schedule/page.tsx`
- [ ] `<UpcomingCleansList />`: next 8 weeks of visits
  - [ ] Per visit: date, time, crew, status, Reschedule/Skip buttons
  - [ ] Skip dialog: 48hr+ = free, under 48hr = fee with amount shown

#### Plan `(portal)/my/[token]/plan/page.tsx`
- [ ] `<PlanControls />`: Pause / Resume / Upgrade / Cancel
- [ ] `<PausePlanDialog />`: resume date picker (max 4 weeks). "Slot held."
- [ ] `<UpgradePlanDialog />`: frequency dropdown, new price shown live
- [ ] Cancel: reason dropdown + confirmation

#### History `(portal)/my/[token]/history/page.tsx`
- [ ] `<CleanHistoryList />`: past visits with date, crew, amount, rating
- [ ] Unrated visits show `<RatingForm />`: 1–5 stars + optional comment

#### Home `(portal)/my/[token]/home/page.tsx`
- [ ] `<HomeDetailsForm />`: edit entry method, access notes, alarm, pets, instructions
- [ ] "Shared with your crew before each visit."

#### Billing `(portal)/my/[token]/billing/page.tsx`
- [ ] `<BillingCard />`: current card on file, update button → Stripe SetupIntent
- [ ] Billing history: past charges with date, amount, card, status

---

### Phase 9 — Owner Dashboard

Protected by iron-session. `requireOwner()` on all routes.

#### Login `(owner)/login/page.tsx`
- [ ] Password-only form. POST to `api/owner/auth/login`. Redirect to dashboard.

#### Dashboard `(owner)/dashboard/page.tsx`
- [ ] `<KPICards />`: Active Plans (trend), Monthly Revenue (trend), Churn Rate, Avg Rating, Crew Utilisation
- [ ] `<TodaySchedule />`: grouped by crew, each job with client/address/time/status
  - [ ] `<JobStatusControls />`: Arrived → In Progress → Completed
  - [ ] On "Completed": emit `"clean.completed"` Inngest event
- [ ] `<WeekCalendar />`: 7-day, all crews, colour-coded, click day → schedule view

#### Schedule `(owner)/schedule/page.tsx`
- [ ] Full calendar, filter by crew. Click visit → detail slide-over
- [ ] `<AssignCrewDialog />`: reassign visit to different crew

#### Clients `(owner)/clients/page.tsx` + `[id]/page.tsx`
- [ ] Searchable table: name, plan type, frequency, next clean, last rating, status
- [ ] Detail: contact, home, plan, owner notes, visit history, ratings

#### Crew `(owner)/crew/page.tsx` + `[id]/page.tsx`
- [ ] Table: crew name, cleaners, active clients, avg rating, utilisation
- [ ] Detail: schedule, regular clients, ratings, performance (on-time, retention)

#### Plans `(owner)/plans/page.tsx`
- [ ] `<PlanHealthTable />`: grouped by Active/Paused/Cancelled
  - [ ] Churn risk: low-rated plans flagged
- [ ] `<RevenueByPlanChart />`: MRR by frequency type

#### Settings `(owner)/settings/*`
- [ ] Service pricing editor (per tier, per service)
- [ ] Add-on pricing + active toggle
- [ ] Frequency discount percentages
- [ ] Service area zip codes
- [ ] Blocked dates with reasons
- [ ] Crew hours: per crew per day, start/end, max jobs

---

### Phase 10 — Landing Page (Public, SEO)

`(public)/page.tsx` — replaces the need for a separate Squarespace/Wix site.

- [ ] Hero: "Your home, handled." + CTA → booking step 1
- [ ] Trust badges: eco-friendly, licensed, background-checked
- [ ] Services: 3 cards with starting prices
- [ ] How it works: Book → Match → Clean → Relax (4 steps)
- [ ] Why Greenleaf: eco products, consistent crews, no contracts
- [ ] Service area: Austin neighbourhoods list
- [ ] Testimonials: 3 seeded reviews
- [ ] FAQ: 6 questions (cancellation, products, pets, first visit, what's included, tipping)
- [ ] Footer: privacy link, area, contact, CTA

---

### Phase 11 — Privacy & Compliance

- [ ] `(public)/privacy/page.tsx` — privacy policy, CCPA, data requests, cookie notice

---

### Phase 12 — Polish and Demo Readiness

- [ ] All Stripe in test mode
- [ ] Test card visible: `4242 4242 4242 4242`
- [ ] Mobile-responsive: booking flow + portal (primary mobile use case)
- [ ] Confirm all 12 emails render: `pnpm email dev`
- [ ] Realistic seeded data: 8 clients, 30+ visits, 15 ratings, 1 paused plan, 1 cancelled
- [ ] Full E2E test: booking flow → confirmation → portal → plan management → owner dashboard
- [ ] Test Inngest functions: post-clean email, charge, review request, reminder, pause expiry
- [ ] Write `README.md`: tech stack, setup, env vars, seed, demo walkthrough

---

### Phase 13 — Portfolio Writeup (Case Study)

- [ ] Case study for Demola Studio portfolio
  - [ ] Before: Maya's 6-tool stack, 10–15 hrs/week admin
  - [ ] Diagnosis: slow lead response, no self-service, manual payments
  - [ ] Build: instant quoting, subscription plans, client portal, auto-charge, crew assignment, rating loop, owner dashboard
  - [ ] Result: leads get instant quotes 24/7, clients manage their own plans, crews get schedules on phone, payments auto-collected, 10+ hrs/week returned
- [ ] Video walkthrough — 4 parts:
  - [ ] Part 1 (3 min): Public booking flow
  - [ ] Part 2 (3 min): Client portal
  - [ ] Part 3 (3 min): Owner dashboard
  - [ ] Part 4 (1 min): Automated flows (email, charge, review)

---

## Key Implementation Notes

**Instant quoting is the hook.**
The price appears live — no "request a quote." `calculateQuote()` must return in under 200ms.
Use Upstash Redis caching.

**Card-on-file, not per-visit payment.**
Client saves card at booking. After each completed clean, the system charges via Inngest.
Stripe `off_session` PaymentIntents with saved PaymentMethods.

**Plans are the core entity, not appointments.**
Visits are generated from plans. Pause → delete future visits. Resume → regenerate.
Upgrade → regenerate at new frequency. The plan state machine (`lib/plan.ts`) is the engine.

**Visit generation is lazy, not eager.**
Generate 8 weeks ahead. When the window runs low, generate more. Keeps the database lean.

**Crew assignment is preference-aware but not rigid.**
Try preferred cleaner's crew first. Fall back to most available crew. Client sees who's coming.

**Rate limiting on public endpoints.**
Quote: 10 req / 10 sec. Booking creation: 5 req / 60 sec. Use Upstash.

**Inngest replaces Vercel Cron entirely.**
Vercel Hobby: 1 cron/day. Inngest free: 5K runs/month with events, delays, retries, fan-out.

**Neon free tier autosuspend.**
Cold-start 500ms–1s after 5 min inactivity. Fine for demo. Production: connection pooling.

**All monetary values in cents (USD).**
Consistent with Stripe. `formatCurrency()` converts to `$X.XX`. All money columns are `Int`.

**Portal tokens are permanent.**
Unlike booking tokens, portal tokens live for the lifetime of the client relationship.
No email/password login for clients.

**First visit pricing.**
Recurring Standard Clean plans: first visit is Deep Clean price. Industry standard.
Subsequent visits revert to discounted Standard price.

---

## Engineering Rules (Learned from Projects A & B)

These are non-negotiable patterns. Every function, component, and handler must follow them.

**1. Idempotency keys on every mutation.**
Every Stripe charge, every Inngest event emit, every email send must include an
idempotency key derived from the entity ID + action. Pattern: `${visitId}-charge`,
`${visitId}-clean-completed-email`, `${planId}-pause`. This prevents double-charges,
duplicate emails, and replay bugs. Stripe's `idempotencyKey` param + Inngest's event
deduplication handle the rest. If a function retries (and Inngest retries by default),
the idempotency key ensures it's safe.

**2. All dates stored in UTC. All display in `America/Chicago` (CT).**
Austin is Central Time. Store all `DateTime` fields in UTC (Prisma default). Convert
to CT only at the display layer using `date-fns-tz` with `formatInTimeZone()`. Never
do timezone math in the client. The server determines "today" and "tomorrow" using
`utcToZonedTime(new Date(), 'America/Chicago')`. This prevents the "your clean is
tomorrow but it's actually today" bug.

**3. Single source of truth — one function per business rule.**
- Pricing calculation: `calculateQuote()` in `lib/quote.ts` is the ONLY place prices
  are computed. The booking flow, the portal, and the owner dashboard all call this
  function. Never inline price math.
- Visit generation: `generateVisits()` in `lib/scheduling.ts` is the ONLY place visits
  are created. Plan creation, resume, upgrade — all call this function.
- Plan state transitions: `lib/plan.ts` is the ONLY place plan status changes. Server
  Actions, Inngest functions, and the owner dashboard all go through `pausePlan()`,
  `resumePlan()`, etc.
- If you find yourself writing pricing logic, visit creation, or plan state changes
  anywhere else, you are doing it wrong. Extract it to the lib function.

**4. Code-splitting: isolate dynamic routes from static routes.**
Next.js 16 PPR (Partial Pre-Rendering) requires clean boundaries between static and
dynamic content. Follow the "Isolate-by-Dynamic" pattern from Project A/B:
- Public pages (`(public)/page.tsx`, `(public)/privacy/page.tsx`) should be fully
  static — no `cookies()`, no `headers()`, no dynamic data.
- Dashboard pages (`(owner)/dashboard/page.tsx`) are dynamic — they read session
  cookies and query live data. Mark these with `export const dynamic = 'force-dynamic'`
  or let Next.js infer from `cookies()` usage.
- Keep `'use client'` at the leaf level. Dashboard layout stays as Server Component.
  Only interactive widgets (status buttons, dialogs, forms) use `'use client'`.
- Never import a `'use client'` component into a place that forces the entire layout
  to become client-rendered.

**5. Stripe webhook handler: verify signature, then dispatch.**
The webhook route must:
1. Read the raw body (not parsed JSON) for signature verification.
2. Verify with `stripe.webhooks.constructEvent()`.
3. Check `event.type`, dispatch to handler functions.
4. Use idempotency: check if `visit.paymentStatus` is already `CHARGED` before
   processing `payment_intent.succeeded`. Return 200 even if already processed.
5. Return 200 quickly — do heavy work via Inngest event emission, not inline.

**6. Error boundaries at every route segment.**
Every route group must have `error.tsx` and `loading.tsx`:
- `(public)/error.tsx`, `(public)/loading.tsx`
- `(portal)/my/[token]/error.tsx`, `(portal)/my/[token]/loading.tsx`
- `(owner)/dashboard/error.tsx`, `(owner)/dashboard/loading.tsx`
This gives streaming UI (Suspense boundaries) and graceful error recovery for free.
The `error.tsx` should show a branded error state with a retry button, not a white screen.

**7. Server Actions return structured results, not throw errors.**
Use `useActionState` pattern: every Server Action returns
`{ success: true, data: ... }` or `{ success: false, errors: { field: [messages] } }`.
Never throw from a Server Action unless it's a redirect. The component uses
`useActionState(action, initialState)` to manage pending/error/success states.
Forms use `useFormStatus()` for the submit button loading state.

**8. Validate twice: client AND server.**
Zod schemas are shared between client-side form validation (instant feedback) and
Server Action validation (security). The client validates for UX. The server validates
for safety. Never trust the client — always re-validate in the Server Action.

**9. `revalidatePath()` after every mutation.**
Every Server Action that changes data must call `revalidatePath()` with the affected
route(s) before returning. This ensures Server Components re-render with fresh data.
Without this, the user sees stale data until they manually refresh.

**10. `server-only` imports for sensitive modules.**
`lib/dal.ts`, `lib/auth.ts`, `lib/db.ts`, and all Server Action files must use
`import "server-only"` at the top. This causes a build error if any client component
accidentally imports them, preventing secret leaks.

