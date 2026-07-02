/**
 * Conventional Commits, plus a "content:" type for catalog content changes
 * (see CLAUDE.md — PRs touching content/ are content-only).
 * @type {import("@commitlint/types").UserConfig}
 */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "content",
        "chore",
        "refactor",
        "test",
        "build",
        "ci",
        "perf",
        "style",
        "revert",
      ],
    ],
    "body-max-line-length": [0, "always"],
  },
};
