# apps/api/prisma

Prisma schema and migrations for the AgentDS API.

- **Phase 0 (now):** datasource + generator only. No models, no migrations yet.
- **Phase 2:** models `System`, `Category`, `SystemCategory`, `Counter`,
  `LintReport`; migrations checked in; ingest service reads `content/` and
  upserts the DB.

## Commands

```bash
pnpm --filter api db:generate    # prisma generate
pnpm --filter api db:migrate     # prisma migrate dev (local)
pnpm --filter api db:deploy      # prisma migrate deploy (CI/container boot)
```

Rules (CLAUDE.md): DB access only through Prisma; schema changes only via
migrations; never edit an already-applied migration; never hand-edit the
production database.
