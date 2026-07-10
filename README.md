# Greenleaf Home Co.

A branded operations platform for a residential cleaning company — instant quoting,
recurring plans, a client self-service portal, and an owner dashboard — replacing a
manual stack of forms, spreadsheets, and chat apps.

Full product brief: [project-d-greenleaf-home-co.md](./project-d-greenleaf-home-co.md).

## Stack

- **Next.js 16** (App Router, Server Actions) + **React 19** + **TypeScript** (strict)
- **Prisma 7** + **PostgreSQL** (Neon), via the `@prisma/adapter-pg` driver adapter
- **Zod** for all input validation
- **Better Auth** for the owner login/session
- **Tailwind CSS v4** + **shadcn/ui**
- **Lenis** smooth scrolling

## Conventions

This project follows the playbook in [.playbook/](./.playbook/) (see [AGENTS.md](./AGENTS.md)).
Kebab-case filenames, split by concern (`types/`, `schemas/`, `actions/`, `lib/`),
arrow functions, and money stored in **cents** everywhere.

## Getting Started

Requires **pnpm** and a PostgreSQL connection string.

```bash
pnpm install
cp .env.example .env   # then fill in the values below
pnpm prisma migrate dev
pnpm prisma db seed
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The booking flow lives at `/book`;
the owner dashboard at `/dashboard` (log in at `/login`). The seed creates an owner:
`maya@greenleafhome.co` / `password123`.

### Environment variables

| Variable                                          | Purpose                      |
| ------------------------------------------------- | ---------------------------- |
| `DATABASE_URL`                                    | PostgreSQL connection string |
| `BETTER_AUTH_SECRET`                              | Better Auth signing secret   |
| `BETTER_AUTH_URL` / `NEXT_PUBLIC_BETTER_AUTH_URL` | Auth base URL                |
| `NEXT_PUBLIC_BASE_URL`                            | App base URL                 |

## Scripts

| Command          | Description                                         |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Start the dev server (runs `prisma generate` first) |
| `pnpm build`     | Validate schema, typecheck, lint, then build        |
| `pnpm typecheck` | `tsc --noEmit`                                      |
| `pnpm lint`      | ESLint                                              |

## Status

**Implemented:** database schema + seed, owner auth (login/dashboard), the public
booking wizard end-to-end (instant quote → server-validated booking that persists a
client + plan/visit and issues a portal token).

**Not yet built** (specified in the brief): the client portal, Stripe card-on-file,
Inngest background jobs, transactional emails, and the remaining owner dashboard views.
