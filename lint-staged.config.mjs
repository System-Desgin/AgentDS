/**
 * Fast, format-only pre-commit. ESLint + typecheck run in CI and via
 * `pnpm lint` / `pnpm typecheck` (per-package tooling) — keeping the hook
 * cheap avoids cross-package binary-resolution surprises on commit.
 * @type {import("lint-staged").Configuration}
 */
export default {
  "*.{ts,tsx,js,jsx,mjs,cjs,json,md,yaml,yml,css}": ["prettier --write"],
};
