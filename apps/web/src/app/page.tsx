import Link from "next/link";
import { CopyButton } from "../components/copy-button";
import { SystemCard } from "../components/system-card";
import { fetchCatalog } from "../lib/api";
import { INSTALL_COMMAND, SKILLS_SH_URL } from "../lib/site";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick a system",
    body: "Browse Official Systems extracted from real token packages, or Brand Looks — independent analyses of famous product sites.",
  },
  {
    step: "02",
    title: "Give it to your agent",
    body: "Copy the DESIGN.md into your repo, fetch it from the API, or install the skill. Every agent — Claude Code, Cursor, Kiro, Windsurf, Codex, OpenCode, Pi — reads the same file.",
  },
  {
    step: "03",
    title: "Ship on-system UI",
    body: "Your agent references real tokens instead of inventing values: exact palettes, type scales, spacing, and component defaults.",
  },
] as const;

export default async function HomePage() {
  const featured = await fetchCatalog({ sort: "most-fetched" });

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-24 px-6 py-16">
      {/* Hero thesis */}
      <section className="flex max-w-[720px] flex-col gap-6">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## agent-ready design systems
        </p>
        <h1 className="font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          Your coding agent is a brilliant engineer with no taste. Hand it a design system.
        </h1>
        <p className="max-w-[64ch] text-lg leading-[1.65] text-on-surface-variant">
          AgentDS is a free catalog of <code className="font-mono text-base">DESIGN.md</code> files
          — machine-readable design tokens plus human-readable rationale — extracted from real
          design systems and famous product sites. One file, and any agent builds UI that follows
          the system instead of generic defaults.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-3 rounded-md bg-code-bg px-4 py-3">
            <code className="font-mono text-sm text-code-accent">{INSTALL_COMMAND}</code>
          </div>
          <CopyButton text={INSTALL_COMMAND} label="copy" />
          <a
            href={SKILLS_SH_URL}
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-surface-variant px-4 py-2 font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            listed on skills.sh →
          </a>
        </div>
      </section>

      {/* Path split */}
      <section aria-labelledby="paths-heading" className="flex flex-col gap-8">
        <h2
          id="paths-heading"
          className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant"
        >
          ## two paths
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/systems?path=official"
            className="group flex flex-col gap-3 rounded-lg border border-border bg-surface-variant p-6 transition-colors duration-150 ease-out hover:border-accent"
          >
            <h3 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
              Official Systems
            </h3>
            <p className="max-w-[60ch] leading-relaxed text-on-surface-variant">
              Generated from real open-source token packages — Carbon, Material 3, Primer, Fluent 2,
              Cloudscape and more. Provenance-pinned: package@version, extraction date, and a lint
              report on every entry.
            </p>
            <span className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent">
              browse official →
            </span>
          </Link>
          <Link
            href="/systems?path=brand-look"
            className="group flex flex-col gap-3 rounded-lg border border-border bg-surface-variant p-6 transition-colors duration-150 ease-out hover:border-accent"
          >
            <h3 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
              Brand Looks
            </h3>
            <p className="max-w-[60ch] leading-relaxed text-on-surface-variant">
              Independent analyses of the publicly observable visual language of famous product
              sites — captured from public CSS, normalized to the same token schema, clearly
              disclaimed.
            </p>
            <span className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent">
              browse brand looks →
            </span>
          </Link>
        </div>
      </section>

      {/* Featured grid */}
      {featured.items.length > 0 ? (
        <section aria-labelledby="featured-heading" className="flex flex-col gap-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="featured-heading"
              className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant"
            >
              ## most fetched
            </h2>
            <Link
              href="/systems"
              className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent hover:underline"
            >
              full catalog →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.items.slice(0, 6).map((system) => (
              <SystemCard key={system.slug} system={system} />
            ))}
          </div>
        </section>
      ) : null}

      {/* How it works */}
      <section aria-labelledby="how-heading" className="flex flex-col gap-8">
        <h2
          id="how-heading"
          className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant"
        >
          ## how it works
        </h2>
        <ol className="grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <li key={item.step} className="flex flex-col gap-3 rounded-lg border border-border p-6">
              <span className="font-mono text-[0.8125rem] font-medium tracking-[0.04em] text-accent">
                {item.step}
              </span>
              <h3 className="font-display text-2xl font-semibold text-primary">{item.title}</h3>
              <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
