# QA — flowbite

> Sign this off before setting `status: published`. CI blocks unsigned entries.

## Checklist

- [x] `meta.yaml` passes the shared schema (`@agentds/shared`) — `pipeline validate`
- [x] `@google/design.md lint` passes with zero errors (see `lint-report.json`: 0 errors, 0 warnings)
- [x] 10+ token values spot-checked against Flowbite's documented default theme (table below)
- [x] Prose is written fresh — no copied text from upstream docs
- [x] License SPDX + URL verified (MIT, open-source core); `restricted: false`
- [x] Fonts: Inter is open (SIL OFL, Google Fonts) — no substitution; JetBrains Mono for code
- [ ] Preview cards render sane (palette, type scale, spacing, radius) — _pending the Phase 3 renderer_

## Token spot-check (≥10)

> **Grounding: canonical, not auto-extracted.** Flowbite is a Tailwind preset (JS),
> not a static token file. Values are the documented Flowbite default theme
> (Tailwind gray ramp + Flowbite brand/semantic colours); cross-check against
> flowbite.com before publish.

| Token (file)               | Value in file | Source (Flowbite / Tailwind default) | OK  |
| -------------------------- | ------------- | ------------------------------------ | --- |
| colors.primary             | #1C64F2       | primary / blue-600                   | ✓   |
| colors.primary-strong      | #1A56DB       | blue-700 (hover)                     | ✓   |
| colors.on-surface          | #111827       | gray-900                             | ✓   |
| colors.on-surface-variant  | #6B7280       | gray-500                             | ✓   |
| colors.surface-variant     | #F9FAFB       | gray-50                              | ✓   |
| colors.fill                | #F3F4F6       | gray-100                             | ✓   |
| colors.border              | #E5E7EB       | gray-200                             | ✓   |
| colors.success             | #0E9F6E       | green-500                            | ✓   |
| colors.warning             | #9F580A       | yellow-800                           | ✓   |
| colors.error               | #E02424       | red-600                              | ✓   |
| typography.body.fontFamily | Inter         | Flowbite default font                | ✓   |

## Sign-off

- Automated checks (schema, lint, license, fonts) completed by the pipeline.
- **Human reviewer sign-off required before `status: published`** (kept `draft`);
  cross-check the palette/scale against flowbite.com.
- Reviewer:
- Date:
