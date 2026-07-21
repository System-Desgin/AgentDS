import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AGENT_SNIPPETS } from "../../../lib/agent-snippets";
import { INSTALL_COMMAND } from "../../../lib/site";

/** Per-agent integration guides (Phase 3 checklist: /agents/[agent] ×6). */

const GUIDES: Record<string, { intro: string; steps: string[] }> = {
  "claude-code": {
    intro:
      "Claude Code reads CLAUDE.md at the repo root on every session. Point it at DESIGN.md once and every UI task follows the system.",
    steps: [
      "Fetch the DESIGN.md for your chosen system into the repo root.",
      "Add a design-system rule to CLAUDE.md telling Claude to read DESIGN.md before any UI work.",
      "Alternatively, install the AgentDS skill and ask for a system by name.",
    ],
  },
  cursor: {
    intro:
      "Cursor applies project rules from .cursor/rules to matching files. A small rule injects DESIGN.md into every UI-generation context.",
    steps: [
      "Fetch the DESIGN.md into the repo root.",
      "Create .cursor/rules/design-system.mdc scoped to your UI globs.",
      "Reference the file from the rule so Cursor loads it when generating components.",
    ],
  },
  kiro: {
    intro:
      "Kiro loads steering files from .kiro/steering into every session — DESIGN.md drops in directly.",
    steps: [
      "Fetch the file straight into .kiro/steering/design-system.md.",
      "Kiro picks it up automatically; no further wiring needed.",
    ],
  },
  windsurf: {
    intro:
      "Windsurf reads global_rules.md (and .windsurf rules) for persistent instructions across conversations.",
    steps: [
      "Fetch the DESIGN.md into the repo root.",
      "Add a rule to global_rules.md pointing at DESIGN.md for all UI work.",
    ],
  },
  codex: {
    intro:
      "Codex and other AGENTS.md-convention agents read AGENTS.md at the repo root — add a UI & design-system section.",
    steps: [
      "Fetch the DESIGN.md into the repo root.",
      "Add a '## UI & design system' section in AGENTS.md referencing the file.",
    ],
  },
  copilot: {
    intro:
      "GitHub Copilot applies repository custom instructions from .github/copilot-instructions.md to every chat and inline suggestion.",
    steps: [
      "Fetch the DESIGN.md into the repo root.",
      "Reference it from .github/copilot-instructions.md so generations follow the tokens.",
    ],
  },
};

export function generateStaticParams() {
  return AGENT_SNIPPETS.map((agent) => ({ agent: agent.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agent: string }>;
}): Promise<Metadata> {
  const { agent } = await params;
  const snippet = AGENT_SNIPPETS.find((s) => s.id === agent);
  if (!snippet) return { title: "Not found" };
  return {
    title: `Use DESIGN.md with ${snippet.label}`,
    description: `Set up ${snippet.label} to follow an AgentDS design system file.`,
  };
}

export default async function AgentGuidePage({ params }: { params: Promise<{ agent: string }> }) {
  const { agent } = await params;
  const snippet = AGENT_SNIPPETS.find((s) => s.id === agent);
  const guide = GUIDES[agent];
  if (!snippet || !guide) notFound();

  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## agents/{snippet.id}
        </p>
        <h1 className="font-display text-[2.25rem] font-semibold leading-[1.15] text-primary">
          Use DESIGN.md with {snippet.label}
        </h1>
        <p className="max-w-[64ch] text-lg leading-[1.65] text-on-surface-variant">{guide.intro}</p>
      </header>

      <ol className="flex list-decimal flex-col gap-3 pl-5 leading-relaxed text-on-surface">
        {guide.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div className="flex flex-col gap-3">
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant">
          target file: {snippet.file}
        </p>
        <pre className="overflow-x-auto rounded-md bg-code-bg p-6 font-mono text-sm leading-[1.7] text-code-fg">
          {snippet.snippet("carbon")}
        </pre>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          Replace <code className="font-mono">carbon</code> with any slug from the{" "}
          <Link href="/systems" className="text-accent underline">
            catalog
          </Link>
          . Or skip the manual setup entirely:
        </p>
        <pre className="overflow-x-auto rounded-md bg-code-bg p-6 font-mono text-sm leading-[1.7] text-code-accent">
          {INSTALL_COMMAND}
        </pre>
      </div>

      <nav
        aria-label="Other agents"
        className="flex flex-wrap gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em]"
      >
        {AGENT_SNIPPETS.filter((s) => s.id !== agent).map((s) => (
          <Link key={s.id} href={`/agents/${s.id}`} className="text-accent hover:underline">
            {s.label} →
          </Link>
        ))}
      </nav>
    </article>
  );
}
