---
description: Generate a spec-compliant DESIGN.md for an Official System or Brand Look from its normalized tokens.
argument-hint: <slug> [--path official|brand-look]
allowed-tools: Read, Grep, Glob
---

Generate the `DESIGN.md` for **$ARGUMENTS**.

This is the interactive alternative to `pnpm pipeline generate <slug>`. Runtime
is the owner's Claude Max plan — **never** set `ANTHROPIC_API_KEY` (it reroutes
billing off the plan). Tools are read-only by design: you produce the file
contents as your response; the pipeline writes them to disk. You never run
arbitrary commands or fetch upstream docs to copy.

## Steps

1. Read the entry's normalized tokens and provenance under
   `content/<official|brand-looks>/<slug>/` (produced by `pipeline extract`).
2. Read the matching prompt template in `packages/pipeline/prompts/`
   (`official.md` or `brand-look.md`) and follow it exactly.
3. Read `/DESIGN.md` conventions only for tone/format reference — not to copy.

## Output rules (from the prompt templates)

- Output **only** the final `DESIGN.md`: YAML front matter + Markdown sections
  in the fixed order (Overview → Colors → Typography → Spacing & Layout →
  Components → Motion? → Do's and Don'ts → Agent Prompt Guide).
- Front matter mirrors the normalized tokens exactly; never invent values.
- Every color/typography claim in prose references an existing token.
- Prose is written fresh — never copy or quote upstream documentation.
- Plain markdown only: no HTML, scripts, or external embeds.
- Brand Looks: inject the mandatory disclaimer header and describe only the
  _observed_ patterns.
- Substitute proprietary fonts per the substitution map; name the original
  family in prose only.

After writing, the entry must pass `npx @google/design.md lint` and human QA
before `status: published`.
