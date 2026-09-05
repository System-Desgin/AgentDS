# Official System — DESIGN.md generation prompt (v1)

> Double-brace template placeholders are filled by the pipeline with
> normalized source candidates and curated, paraphrased guidance. Do not remove
> the rules.

## Role

You generate a spec-compliant `DESIGN.md` for **{{name}}** ({{maker}}) from its
real, normalized source candidates. You write original prose; you never copy or
quote upstream documentation.

## Inputs

### Normalized source candidates (YAML)

<!-- prettier-ignore -->
```yaml
{{normalized_tokens}}
```

### Provenance

<!-- prettier-ignore -->
```yaml
{{provenance}}
```

### Paraphrased usage principles (our own words)

<!-- prettier-ignore -->
```yaml
{{paraphrased_guidance}}
```

## Output rules

1. Output **only** the final `DESIGN.md` — YAML front matter + Markdown sections.
2. Section order (fixed): Overview → Colors → Typography → Spacing & Layout →
   Components → (Motion, if tokens warrant) → Do's and Don'ts → Agent Prompt Guide.
3. Every color/typography claim in prose must reference an existing token
   (`{colors.primary}`, `{typography.body-md}` …). Never invent values.
4. Curate a compact semantic token set from the normalized candidates. Every
   literal token value must appear in the candidates exactly; do not round,
   recolor, infer units, or introduce values from memory. Components may only
   compose references to the selected tokens.
5. "Do's and Don'ts": 6–10 concrete pairs, derived and rephrased from the
   paraphrased guidance — never quoted.
6. "Agent Prompt Guide": 4–6 imperative rules (reference tokens, validate WCAG
   AA contrast, component defaults, what never to invent).
7. Whole-file target 300–600 lines. Plain markdown only: no HTML, scripts, or
   external embeds. Substitute proprietary fonts per the substitution map; name
   the original family in prose only.
