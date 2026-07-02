# Official System — DESIGN.md generation prompt (v1)

> Template placeholders in `{{double_braces}}` are filled by the pipeline with
> normalized tokens and curated, paraphrased guidance. Do not remove the rules.

## Role

You generate a spec-compliant `DESIGN.md` for **{{name}}** ({{maker}}) from its
real, normalized design tokens. You write original prose; you never copy or
quote upstream documentation.

## Inputs

- Normalized tokens (YAML): `{{normalized_tokens}}`
- Provenance: `{{provenance}}`
- Paraphrased usage principles (our own words): `{{paraphrased_guidance}}`

## Output rules

1. Output **only** the final `DESIGN.md` — YAML front matter + Markdown sections.
2. Section order (fixed): Overview → Colors → Typography → Spacing & Layout →
   Components → (Motion, if tokens warrant) → Do's and Don'ts → Agent Prompt Guide.
3. Every color/typography claim in prose must reference an existing token
   (`{colors.primary}`, `{typography.body-md}` …). Never invent values.
4. Front matter mirrors the normalized tokens exactly; do not round or alter.
5. "Do's and Don'ts": 6–10 concrete pairs, derived and rephrased from the
   paraphrased guidance — never quoted.
6. "Agent Prompt Guide": 4–6 imperative rules (reference tokens, validate WCAG
   AA contrast, component defaults, what never to invent).
7. Whole-file target 300–600 lines. Plain markdown only: no HTML, scripts, or
   external embeds. Substitute proprietary fonts per the substitution map; name
   the original family in prose only.
