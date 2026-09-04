# Contributing to AgentDS

Thanks for helping make design-system context more trustworthy for coding
agents. Small corrections are welcome. New catalog entries require more care
because AgentDS publishes token values as source-verified facts.

## Choose the right path

- Report incorrect behavior with the bug issue form.
- Report an upstream token mismatch with the source-drift form.
- Propose a new Official System or Brand Look with the system-request form.
- Send code and documentation improvements directly as focused pull requests.

Security reports do not belong in public issues. Follow [SECURITY.md](./SECURITY.md)
and email contact@oday-bakkour.com.

## Before proposing a system

Open a system-request issue before writing content. A maintainer must confirm
the upstream source, license, trademark restrictions, and whether the entry is
an Official System or a Brand Look. This prevents contributors from spending
time on sources AgentDS cannot legally or reliably publish.

Official Systems require a versioned package or repository commit. Brand Looks
must use public CSS evidence and carry the standard non-affiliation disclaimer.
Do not copy prose from upstream documentation or competing collections.

## Local setup

AgentDS requires Node.js 22 or newer, pnpm 10, and Corepack.

```bash
corepack enable
pnpm install
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

The web app runs at `http://localhost:3000` and the API at
`http://localhost:4000`:

```bash
pnpm dev
```

## Content changes

Content pull requests must be content-only. Never hand-edit a token value.
Values must come from the cited source through `extract` or `verify --fix`.

```bash
pnpm pipeline new <slug>
pnpm pipeline extract <slug>
pnpm pipeline generate <slug>
pnpm pipeline validate <slug>
pnpm pipeline verify <slug>
pnpm pipeline export <slug>
npx @google/design.md lint content/<path>/<slug>/DESIGN.md
pnpm check:verification
```

Each publishable entry needs all of the following:

- Valid `meta.yaml` with package/version or repository/commit provenance.
- `DESIGN.md` with zero official-linter errors.
- A conclusive `verify-report.json` grounding every published color.
- A human-signed `QA.md`.
- Correct upstream attribution and license notes.

Leave an entry as `draft` when its source cannot be recovered. An inconclusive
report is more useful than an invented token.

## Code changes

- Keep TypeScript strict and avoid `any`.
- Put shared schemas and DTOs in `packages/shared`.
- Use Server Components by default in the web app.
- Read [DESIGN.md](./DESIGN.md) before changing UI.
- Add service and e2e coverage for new API endpoints.
- Run `pnpm audit` after changing dependencies.

Use a Conventional Commit title such as `fix: correct catalog pagination` or
`docs: clarify Carbon provenance`. Keep each pull request to one logical
change, explain how it was verified, and complete the pull-request checklist.

By participating, you agree to follow [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).
