# AgentDS

> A free, curated catalog of agent-ready design system files (`DESIGN.md` +
> tokens) with visual previews, purpose guidance, and a public fetch API — so
> any coding agent (Claude Code, Cursor, Codex, Copilot, Windsurf, Kiro…) can
> build UI that follows a real design system instead of generic AI defaults.

- **Web:** https://agent-ds.oday-bakkour.com
- **API:** https://api.agent-ds.oday-bakkour.com
- **Install (from Phase 4):** `npx skills add System-Design/AgentDS --skill design-systems`
- **License:** code Apache-2.0 · catalog content ([`content/`](./content)) CC BY 4.0
- **Contact / security:** contact@oday-bakkour.com

> Status: **Phase 0 — Foundation.** Monorepo scaffolding, tooling, CI, and the
> shared schema package are in place. Content, API, and web are built in later
> phases (see [`docs/03-DEV-CHECKLIST.md`](./docs/03-DEV-CHECKLIST.md)).

## What's here

Two catalog paths:

- **Official Systems** — `DESIGN.md` files generated from real, published
  open-source token packages (Carbon, Material 3, Primer, Fluent 2, Cloudscape…)
  with recorded provenance.
- **Brand Looks** — independent visual-language analyses of famous product
  sites, each carrying a mandatory non-affiliation disclaimer.

Every published file passes `npx @google/design.md lint` and a human QA gate.

## Monorepo layout

```
apps/web/          Next.js (App Router, RSC, Tailwind v4) — deployed on Vercel
apps/api/          NestJS (Express) + Prisma + PostgreSQL — Docker on Dokploy
packages/shared/   zod schemas (meta.yaml, API DTOs), types, taxonomy constants
packages/pipeline/ content CLI: extract | generate | validate | export | new
content/           official/<slug>/ and brand-looks/<slug>/ catalog entries
skills/            Agent Skills (SKILL.md) mirrored to the public skills repo
docs/              project docs (idea, PRD, checklist, data sources)
DESIGN.md          this site's own design system — read before any UI work
```

## Prerequisites

- Node.js `>= 22` (see [`.nvmrc`](./.nvmrc))
- pnpm `>= 10` (via Corepack: `corepack enable`)
- Docker + Docker Compose (for the backend stack)

## Getting started

```bash
pnpm install                 # install workspace deps
pnpm dev                     # web + api in watch mode (Turborepo)
pnpm dev --filter web        # frontend only  (http://localhost:3000)
pnpm dev --filter api        # backend only   (http://localhost:4000, docs at /docs)

pnpm lint                    # ESLint across the workspace
pnpm typecheck               # strict TypeScript, no `any`
pnpm test                    # unit tests (Vitest)
pnpm build                   # build every app/package
pnpm audit                   # dependency audit
```

### Backend stack (single Docker Compose)

The whole backend — API + PostgreSQL — comes up from one compose file. Dokploy
provides the reverse proxy (Traefik + Let's Encrypt) in production; locally you
talk to the API directly.

```bash
cp apps/api/.env.example apps/api/.env    # then fill in values
docker compose up --build                 # api + postgres
```

See [`docs/`](./docs) for the full plan: `01-PROJECT-IDEA.md`, `02-PRD.md`,
`03-DEV-CHECKLIST.md`, `04-DATA-SOURCES.md`.

## Contributing

Conventional Commits are enforced (`feat:`, `fix:`, `content:`, `docs:`,
`chore:`…). Run `pnpm lint && pnpm typecheck && pnpm test` before pushing.
Read [`CLAUDE.md`](./CLAUDE.md) and [`DESIGN.md`](./DESIGN.md) first — they hold
the non-negotiable rules for this codebase.
