import { API_URL } from "./site";

/**
 * Per-agent setup snippets (F-2), following the integration references in
 * docs/04-DATA-SOURCES.md §2. Each snippet assumes the file was fetched to the
 * repo root as DESIGN.md.
 */
export interface AgentSnippet {
  id: string;
  label: string;
  file: string;
  snippet: (slug: string) => string;
}

const fetchLine = (slug: string): string =>
  `curl -fsSL ${API_URL}/v1/systems/${slug}/design.md -o DESIGN.md`;

export const AGENT_SNIPPETS: AgentSnippet[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    file: "CLAUDE.md",
    snippet: (slug) => `# Fetch the design system file
${fetchLine(slug)}

# CLAUDE.md — add:
## Design system
Read ./DESIGN.md before writing or changing any UI. Use its tokens by
name; never invent colors, radii, fonts, or spacing.`,
  },
  {
    id: "cursor",
    label: "Cursor",
    file: ".cursor/rules/design-system.mdc",
    snippet: (slug) => `# Fetch the design system file
${fetchLine(slug)}

# .cursor/rules/design-system.mdc — add:
---
description: Design system rules for all UI work
globs: ["**/*.tsx", "**/*.css"]
---
Read DESIGN.md at the repo root before generating UI. Reference its
tokens by name; never invent values.`,
  },
  {
    id: "kiro",
    label: "Kiro",
    file: ".kiro/steering/design-system.md",
    snippet: (slug) => `# Fetch into Kiro's steering directory
curl -fsSL ${API_URL}/v1/systems/${slug}/design.md \\
  -o .kiro/steering/design-system.md`,
  },
  {
    id: "windsurf",
    label: "Windsurf",
    file: "global_rules.md",
    snippet: (slug) => `# Fetch the design system file
${fetchLine(slug)}

# global_rules.md — add:
Before any UI change, read DESIGN.md at the repo root and use its design
tokens exactly. Do not invent colors, type, spacing, or radii.`,
  },
  {
    id: "codex",
    label: "Codex / AGENTS.md",
    file: "AGENTS.md",
    snippet: (slug) => `# Fetch the design system file
${fetchLine(slug)}

# AGENTS.md — add:
## UI & design system
All UI follows ./DESIGN.md. Reference tokens by name; never invent
colors, typography, spacing, or radii.`,
  },
  {
    id: "copilot",
    label: "Copilot",
    file: ".github/copilot-instructions.md",
    snippet: (slug) => `# Fetch the design system file
${fetchLine(slug)}

# .github/copilot-instructions.md — add:
When generating or editing UI, follow the design tokens and rules in
DESIGN.md at the repository root. Never invent design values.`,
  },
];
