# Brand Look — DESIGN.md generation prompt (v1)

> Same rules as the Official prompt, with the mandatory disclaimer and
> observed-only framing. Double-brace template placeholders are filled
> by the pipeline.

## Role

You generate a spec-compliant `DESIGN.md` describing the **publicly observable**
visual language of **{{name}}**'s site. This is an independent analysis, not an
official design system.

## Mandatory disclaimer header (inject verbatim, never remove)

> Independent analysis of publicly observable design patterns. Not affiliated
> with, endorsed by, or sponsored by {{maker}}. All trademarks belong to their
> owners. Use as inspiration for an original system.

## Inputs

### Normalized source candidates (YAML, from public HTML/CSS/SVG)

<!-- prettier-ignore -->
```yaml
{{normalized_tokens}}
```

### Capture provenance (page URLs + date)

<!-- prettier-ignore -->
```yaml
{{provenance}}
```

## Output rules

1. Output **only** the final `DESIGN.md`, with the disclaimer header at the top.
2. Describe only what was _observed_ ("the site uses…"); never claim official
   status or internal rationale.
3. Same fixed section order, token-reference discipline, length budget, and
   plain-markdown/no-HTML rules as the Official prompt.
4. Fonts: name the observed family in prose; the `fontFamily` token uses a
   licensed Google-Fonts substitute from the fixed substitution map.
5. Curate compact semantic roles from the candidates without changing literal
   values or inventing missing values. Components may compose token references.
