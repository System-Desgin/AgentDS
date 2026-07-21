# QA — slds

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `npx @google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (BSD-3-Clause, from `package.json` of `@salesforce-ux/design-system@2.30.7` and `LICENSE.txt` in the salesforce-ux/design-system repo); `restricted: false`
- [x] Fonts: proprietary Salesforce Sans substituted (→ Inter, per the `packages/pipeline` substitution map); original named in prose only. Code uses JetBrains Mono in place of the shipped Consolas/Menlo stack. No font binaries committed or served.
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## License & trademark notes (strict handling)

- The BSD-3-Clause license covers the **open-sourced token values** shipped in
  `@salesforce-ux/design-system` — that is all this entry reproduces.
- **Salesforce Sans is proprietary.** It is never committed or served; tokens
  substitute Inter and the original family is named in prose only. The npm
  package itself ships a system-ui font stack, not Salesforce Sans binaries.
- **Salesforce trademarks, logos, and branding remain Salesforce's.** This
  entry does not grant any right to them and does not reproduce any logo,
  wordmark, or brand asset.

## Token spot-check (≥10)

Source: `@salesforce-ux/design-system@2.30.7` via extraction
(`tokens.raw.json`, from `design-tokens/dist/*.json`). Namespaces below refer
to the source files: `colors` = colors.json, `hooks` = hooks.json,
`components` = components.json, `font` = font.json.

| Token (file)                | Value in file | Value in source                                                                          | OK  |
| --------------------------- | ------------- | ---------------------------------------------------------------------------------------- | --- |
| colors.primary              | #0176D3       | colors color-brand-base-50 rgb(1, 118, 211); components BUTTON_COLOR_BACKGROUND_BRAND    | ✓   |
| colors.primary-hover        | #014486       | components COLOR_BACKGROUND_BUTTON_BRAND_HOVER rgb(1, 68, 134)                           | ✓   |
| colors.surface-variant      | #F3F3F3       | colors color-neutral-base-95 rgb(243, 243, 243); components PAGE_HEADER_COLOR_BACKGROUND | ✓   |
| colors.on-surface           | #181818       | colors color-neutral-base-10 rgb(24, 24, 24); components INPUT_STATIC_COLOR              | ✓   |
| colors.on-surface-variant   | #444444       | colors color-neutral-base-30 rgb(68, 68, 68); components TABLE_COLOR_TEXT_HEADER         | ✓   |
| colors.link                 | #0B5CAB       | colors link-color rgb(11, 92, 171)                                                       | ✓   |
| colors.border               | #C9C9C9       | colors color-border-base-1 rgb(201, 201, 201)                                            | ✓   |
| colors.border-strong        | #747474       | colors color-border-base-4 rgb(116, 116, 116)                                            | ✓   |
| colors.success              | #2E844A       | colors color-success-base-50 rgb(46, 132, 74)                                            | ✓   |
| colors.warning              | #A96404       | colors color-warning-base-50 rgb(169, 100, 4)                                            | ✓   |
| colors.error                | #BA0517       | colors color-error-base-40 rgb(186, 5, 23)                                               | ✓   |
| rounded.md                  | 4px           | hooks radius-border-2 0.25rem; components BUTTON_BORDER_RADIUS .25rem                    | ✓   |
| rounded.sm                  | 2px           | hooks radius-border-1 0.125rem                                                           | ✓   |
| spacing.sm                  | 0.75rem       | hooks spacing-3 0.75rem; components alias SPACING_SMALL 0.75rem                          | ✓   |
| spacing.md                  | 1rem          | hooks spacing-4 1rem; components CARD_SPACING_MARGIN 1rem                                | ✓   |
| typography.body.fontSize    | 0.8125rem     | font font-scale-neg-2 0.8125rem; components INPUT_STATIC_FONT_SIZE                       | ✓   |
| typography.label.fontSize   | 0.75rem       | components FORM_LABEL_FONT_SIZE 0.75rem                                                  | ✓   |
| typography.display.fontSize | 1.802rem      | font font-scale-5 1.802rem                                                               | ✓   |
| typography.body.lineHeight  | 1.5           | font font-lineheight 1.5                                                                 | ✓   |

Notes: rounded values are the px equivalents of the source rem hooks
(0.125rem = 2px, 0.25rem = 4px, 0.5rem = 8px, 1rem = 16px). Status colors use
the mid ramp steps (success-50, warning-50, error-40) so each passes WCAG AA
as text on white; the lighter upstream steps (for example error-base-50
rgb(234, 0, 30)) are fills, not text, and are not used as text tokens here.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
