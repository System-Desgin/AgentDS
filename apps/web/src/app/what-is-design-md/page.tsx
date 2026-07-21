import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is DESIGN.md?",
  description:
    "DESIGN.md is an open format from Google Labs: machine-readable design tokens plus human-readable rationale in one markdown file any coding agent can follow.",
  alternates: { canonical: "/what-is-design-md" },
};

const EXAMPLE = `---
version: alpha
name: Example
colors:
  primary: "#1A1C1E"
  accent: "#B8422E"
typography:
  body-md:
    fontFamily: Public Sans
    fontSize: 1rem
    fontWeight: 400
---

## Overview
Calm, editorial, precise.

## Colors
- **Primary (#1A1C1E):** ink for text and actions.
- **Accent (#B8422E):** the single interactive voice.`;

export default function WhatIsDesignMdPage() {
  return (
    <article className="mx-auto flex max-w-[720px] flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## what-is-design-md
        </p>
        <h1 className="font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          One file that teaches your agent the design system.
        </h1>
      </header>

      <div className="flex flex-col gap-6 text-lg leading-[1.65] text-on-surface">
        <p>
          <strong>DESIGN.md</strong> is an open format introduced by Google Labs (spec version{" "}
          <code className="font-mono text-base">alpha</code>, Apache-2.0). It puts a design
          system&apos;s <em>machine-readable tokens</em> — colors, typography, spacing, radii,
          component defaults — in YAML front matter, and the <em>human-readable rationale</em> in
          markdown sections below. One plain-text file, readable by people, parseable by tools, and
          followed by any coding agent.
        </p>
        <p>
          Agents are excellent at writing components and terrible at inventing visual language.
          Without a system they produce &quot;AI-default&quot; UI: generic indigo gradients,
          arbitrary spacing, inconsistent radii. With a DESIGN.md in the repo, the agent references
          real token values instead of guessing.
        </p>
      </div>

      <pre className="overflow-x-auto rounded-md bg-code-bg p-6 font-mono text-sm leading-[1.7] text-code-fg">
        {EXAMPLE}
      </pre>

      <div className="flex flex-col gap-6 text-lg leading-[1.65] text-on-surface">
        <p>
          The format ships with an official linter and exporter (
          <code className="font-mono text-base">npx @google/design.md lint</code>) that checks
          structure, WCAG AA contrast, and broken token references, and exports W3C DTCG{" "}
          <code className="font-mono text-base">tokens.json</code> or a Tailwind v4 theme. Every
          file in the AgentDS catalog passes that linter with zero errors before it ships.
        </p>
        <p>
          AgentDS gives you two kinds of DESIGN.md:{" "}
          <Link href="/systems?path=official" className="text-accent underline">
            Official Systems
          </Link>{" "}
          extracted from real open-source token packages with pinned provenance, and{" "}
          <Link href="/systems?path=brand-look" className="text-accent underline">
            Brand Looks
          </Link>{" "}
          — independent, clearly-disclaimed analyses of the publicly observable visual language of
          famous product sites.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
        <a
          href="https://github.com/google-labs-code/design.md"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          official spec ↗
        </a>
        <Link href="/systems" className="text-accent hover:underline">
          browse the catalog →
        </Link>
      </div>
    </article>
  );
}
