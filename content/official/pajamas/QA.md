# QA — pajamas

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against the extracted source (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, `LICENSE` in `@gitlab/ui@135.1.0` and package.json `license` field); `restricted: false`
- [x] Fonts: GitLab Sans / GitLab Mono are open (OFL) but not on Google Fonts — substituted with Inter / JetBrains Mono in tokens; originals named in prose only. JetBrains Mono is itself the first fallback in GitLab's shipped monospace stack.
- [x] Preview cards render sane (palette, type scale, spacing, radius) — rendered through the Phase 3 renderer (`@agentds/shared/preview`) on 2026-07-21; all cards produce output

## Token spot-check (≥10)

Source: `@gitlab/ui@135.1.0` via extraction (6725 raw tokens, 40 files); resolved
light-theme values from `src/tokens/build/json/tokens.json` plus the constant
color ramps.

| Token (file)             | Value in file | Value in source                                           | OK  |
| ------------------------ | ------------- | --------------------------------------------------------- | --- |
| colors.primary           | #3A383F       | button.confirm.primary.background.color.default #3a383f   | ✓   |
| colors.action            | #1F75CB       | action.strong.confirm.background.color.default #1f75cb    | ✓   |
| colors.link              | #2F5CA0       | text.color.link #2f5ca0 (color.blue.700)                  | ✓   |
| colors.surface-strong    | #ECECEF       | background.color.strong #ececef (color.neutral.50)        | ✓   |
| colors.on-surface        | #3A383F       | text.color.default #3a383f (color.neutral.800)            | ✓   |
| colors.on-surface-strong | #18171D       | text.color.strong / heading #18171d (color.neutral.950)   | ✓   |
| colors.border            | #DCDCDE       | border.color.default #dcdcde (color.neutral.100)          | ✓   |
| colors.control-border    | #89888D       | control.border.color.default #89888d (color.neutral.400)  | ✓   |
| colors.success           | #108548       | status.success.icon.color #108548 (color.green.500)       | ✓   |
| colors.warning           | #AB6100       | status.warning.icon.color #ab6100 (color.orange.500)      | ✓   |
| colors.danger            | #DD2B0E       | control.border.color.error #dd2b0e (color.red.500)        | ✓   |
| rounded.md               | 4px           | border.radius.default 0.25rem                             | ✓   |
| rounded.lg               | 8px           | button.border.radius / control.border.radius 0.5rem       | ✓   |
| spacing.md               | 16px          | spacing-scale.5 1rem                                      | ✓   |
| typography.body.fontSize | 0.875rem      | font.size.base 0.875rem                                   | ✓   |
| typography.display       | 1.75rem/1.125 | heading.scale.800-fixed fontSize 1.75rem lineHeight 1.125 | ✓   |

## Notes

- **Primary button color deviates from the classic Pajamas look.** The task
  expectation was action blue #1F75CB for interactive elements, but the current
  `@gitlab/ui@135.1.0` token build styles the confirm (primary) button with
  neutral-800 #3A383F (`button.confirm.primary.background.color.default`).
  Blue-500 #1F75CB remains the interactive accent: focus ring outer color,
  checked toggles, and strong confirm actions; links use blue-700 #2F5CA0. The
  file follows the extracted source; `colors.primary` is the dark confirm fill
  and `colors.action` carries the blue.
- GitLab's brand oranges (#FC6D26, #E24329) exist only in the extracted brand
  constants (`color.brand-orange.02p` / `.03p`); no semantic UI role references
  them, matching their logo/marketing-only use. They are intentionally absent
  from the token set and mentioned in prose only.
- Contrast: all component text/background pairings pass WCAG AA. Status text on
  white sits close to the threshold by design (success 4.70:1, warning 4.73:1,
  danger 4.74:1) — these are the system's own 500-level anchors; the linter
  reports zero warnings.

## Sign-off

- Automated checks (schema, lint, spot-check, license, font substitution) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft` until then).
- Reviewer: Oday Bakkour (owner sign-off, Claude Code session)
- Date: 2026-07-21
