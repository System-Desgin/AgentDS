## What & why

<!-- One logical change. What does this PR do and why? Link the checklist box in
docs/03-DEV-CHECKLIST.md it advances. -->

## Type

- [ ] `feat` / `fix` / `refactor` / `chore` (code)
- [ ] `content` (content-only — no code changes)
- [ ] `docs`

## Checklist

- [ ] `pnpm lint && pnpm typecheck && pnpm test` pass locally
- [ ] New UI matches `/DESIGN.md` tokens; loading/empty/error states exist
- [ ] New API endpoints appear in Swagger with examples
- [ ] No secrets, PII, or proprietary fonts added
- [ ] Docs updated (`docs/`, README, or relevant checklist box ticked)

## Content PRs only

- [ ] `meta.yaml` passes the shared schema
- [ ] `npx @google/design.md lint` passes (report attached)
- [ ] `QA.md` signed off
- [ ] Provenance (Official) or disclaimer (Brand Looks) present
