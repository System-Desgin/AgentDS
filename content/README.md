# content/

Catalog content, licensed under [CC BY 4.0](./LICENSE) (with per-entry upstream
notices). This directory is **content-as-code**: entries are added via Git, CI
validates them, and the API ingests the version baked into its Docker image.

## Layout

```
content/
├── official/<slug>/       Official Systems — from real token packages
│   ├── DESIGN.md          spec-compliant: YAML front matter + ordered sections
│   ├── meta.yaml          catalog metadata (validated by @agentds/shared zod schema)
│   ├── tokens.json        DTCG export (generated)
│   ├── tailwind.css       Tailwind v4 theme export (generated)
│   └── QA.md              human QA checklist — must be signed before publish
└── brand-looks/<slug>/    Brand Looks — independent site analyses
    └── (same layout; disclaimer header is mandatory and pipeline-injected)
```

## Publishing gate (non-negotiable)

Nothing reaches `status: published` without all of:

1. `meta.yaml` passing the shared zod schema.
2. `npx @google/design.md lint` with **zero** errors.
3. A human-signed `QA.md`.

CI enforces these on every PR touching `content/`. See `docs/04-DATA-SOURCES.md`
for the extraction and verification protocol, and `packages/pipeline` for the
tooling that produces these files.
