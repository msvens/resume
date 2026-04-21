# Resume

A full-stack resume/portfolio web app built with Next.js 16. Content is stored in Postgres and editable through an admin panel, so updates don't require a rebuild or redeployment.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Postgres + Drizzle ORM
- **Auth:** GitHub OAuth via Auth.js v5 (single admin user, JWT sessions)
- **PDF:** @react-pdf/renderer (server-side CV generation)
- **Testing:** Vitest + Testing Library
- **CI:** GitHub Actions (typecheck, lint, test, build)

## Features

- **Public resume page** at `/` with all sections rendered from the database
- **Bilingual** (EN/SV) with cookie-based locale and toggle in the top bar
- **Dark/light theme** with localStorage persistence
- **Generic section model** — create arbitrary resume sections (Experience, Skills, Education, etc.) from the admin UI without schema changes
- **Two display types:** `entries` (full items with title, subtitle, dates, markdown description) and `chips` (tag/pill layout for skills)
- **Markdown descriptions** with toolbar (bold, italic, bullets, links) and live preview in the admin editor
- **PDF export** — downloadable CV with compact traditional layout, configurable per-section visibility
- **Section visibility controls** — toggle sections on/off for the website and PDF independently
- **Reorderable sections and items** via up/down controls

## Prerequisites

- Node.js 22+
- pnpm 10+
- PostgreSQL (local or remote)

## Setup

### 1. Clone and install

```bash
git clone https://github.com/msvens/resume.git
cd resume
pnpm install
```

### 2. Create the database

```bash
createuser resume --pwprompt    # enter a password when prompted
createdb -O resume resume
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```
DATABASE_URL=postgres://resume:YOUR_PASSWORD@localhost:5432/resume
```

### 4. Run migrations and seed

```bash
pnpm db:generate   # generate SQL migration files (already committed, only needed after schema changes)
pnpm db:migrate    # apply migrations
pnpm db:seed       # populate with initial resume content
```

### 5. Start the dev server

```bash
pnpm dev           # http://localhost:3004
```

## GitHub OAuth (admin access)

The admin panel at `/admin` is protected by GitHub OAuth. Only the GitHub user matching `ADMIN_GITHUB_ID` can sign in.

1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Set the callback URL to `http://localhost:3004/api/auth/callback/github`
3. Add these to your `.env`:

```
AUTH_SECRET=<openssl rand -base64 32>
GITHUB_CLIENT_ID=<from GitHub>
GITHUB_CLIENT_SECRET=<from GitHub>
ADMIN_GITHUB_ID=<your numeric GitHub user ID>
```

Get your GitHub user ID:

```bash
curl -s https://api.github.com/users/YOUR_USERNAME | jq .id
```

For production, create a separate GitHub OAuth App with the production callback URL.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3004 |
| `pnpm build` | Production build (standalone output) |
| `pnpm start` | Start production server on port 3004 |
| `pnpm check` | Run all checks: typecheck + lint + test + build |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm lint` | ESLint |
| `pnpm test` | Run tests (Vitest) |
| `pnpm db:generate` | Generate Drizzle migration SQL from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:seed` | Seed database with initial resume content |
| `pnpm db:studio` | Open Drizzle Studio (database browser) |

## Project structure

```
src/
  app/
    (public)/page.tsx          # Public resume page
    admin/
      signin/page.tsx          # GitHub OAuth sign-in
      (protected)/             # Auth-gated admin pages
        profile/page.tsx       # Edit profile info
        sections/page.tsx      # Manage sections
        sections/[id]/page.tsx # Manage items in a section
    api/
      auth/[...nextauth]/      # Auth.js route handler
      pdf/route.ts             # PDF generation endpoint
  components/
    resume/                    # Public-facing resume components
    admin/                     # Admin UI components
    TopBar.tsx                 # Navigation bar
    Footer.tsx                 # Site footer
  context/                     # Theme and language providers
  db/
    schema.ts                  # Drizzle schema (profile, section, section_item)
    client.ts                  # Database connection
    seed-data.ts               # Initial content
  lib/
    services/                  # Database query functions
    actions/                   # Server Actions (admin mutations)
    validation/                # Zod schemas
    pdf/                       # PDF document component
    i18n/                      # Translation strings
    dates.ts                   # Date formatting utilities
  auth.ts                      # Auth.js configuration
  proxy.ts                     # Route proxy (gates /admin/*)
scripts/
  migrate.ts                   # Programmatic migration runner
  seed.ts                      # Database seeder
drizzle/
  migrations/                  # Generated SQL migrations (committed)
```

## Database schema

Three tables:

- **`profile`** — singleton row with name, title (EN/SV), email, phone, location, GitHub, LinkedIn, photo URL, availability flag, bio (EN/SV)
- **`section`** — resume sections with slug, label (EN/SV), display type (`entries`/`chips`), visibility flags (`visible`, `show_in_pdf`), sort order
- **`section_item`** — items within sections with title (EN/SV), subtitle, start/end dates, link, markdown description (EN/SV), sort order

## Deployment

The app builds with `output: 'standalone'` for self-hosted deployment. It requires:

- A running PostgreSQL instance
- The environment variables from `.env.example`
- Node.js 22+ runtime

The migration script runs automatically via `pnpm db:migrate` and is idempotent (safe to run on every deploy).

## License

MIT
