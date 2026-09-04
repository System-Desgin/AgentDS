import type { Metadata } from "next";
import Link from "next/link";
import { extractDesignFrontMatter, type DesignTokens } from "@agentds/shared";
import { DashboardTemplate, googleFontsUrl } from "@agentds/shared/preview";
import { CopyButton } from "../components/copy-button";
import { SpecimenFonts } from "../components/specimen-fonts";
import { SystemCard } from "../components/system-card";
import { fetchCatalog, fetchCategories, fetchDesignMd, fetchSystem } from "../lib/api";
import { INSTALL_COMMAND, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SKILLS_SH_URL } from "../lib/site";
import carbonVerification from "../../../../content/official/carbon/verify-report.json";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick a system",
    body: "Start with an Official System extracted from its published token source. Brand Looks are available when you want observed visual inspiration.",
  },
  {
    step: "02",
    title: "Give it to your agent",
    body: "Copy the DESIGN.md into your repo, fetch it from the API, or install the skill. Every agent — Claude Code, Cursor, Kiro, Windsurf, Codex, OpenCode, Pi — reads the same file.",
  },
  {
    step: "03",
    title: "Ship on-system UI",
    body: "Your agent follows source-grounded palettes, type scales, spacing, and component defaults instead of inventing them.",
  },
] as const;

const VERIFICATION_ROWS = [
  ["source", "package@version or repo@commit"],
  ["tokens", "compared with the cited source"],
  ["format", "DESIGN.md lint · zero errors"],
  ["review", "human QA required"],
] as const;

export default async function HomePage() {
  const [featured, categories, carbon, carbonDesignMd] = await Promise.all([
    fetchCatalog({ sort: "most-fetched" }),
    fetchCategories(),
    fetchSystem("carbon"),
    fetchDesignMd("carbon"),
  ]);
  const carbonTokens: DesignTokens | null = carbonDesignMd
    ? extractDesignFrontMatter(carbonDesignMd)
    : ((carbon?.token_summary as DesignTokens | null) ?? null);
  const carbonFontsHref = carbonTokens?.typography
    ? googleFontsUrl(
        Object.values(carbonTokens.typography)
          .map((level) => (typeof level["fontFamily"] === "string" ? level["fontFamily"] : ""))
          .filter(Boolean),
      )
    : null;
  const carbonSource =
    carbon?.provenance.package && carbon.provenance.version
      ? `${carbon.provenance.package}@${carbon.provenance.version}`
      : "versioned token source";
  const carbonPrimary = carbonTokens?.colors?.["primary"] ?? "#0F62FE";
  const carbonFont = carbonTokens?.typography?.["body"]?.["fontFamily"] ?? "IBM Plex Sans";
  const carbonRadius = carbonTokens?.rounded?.["sm"] ?? "2px";

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-24 px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      {/* Hero thesis + verification receipt */}
      <section className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-16">
        <div className="flex min-w-0 max-w-[720px] flex-col gap-6">
          <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
            ## source-verified design systems
          </p>
          <h1 className="font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
            Real design systems, translated for coding agents.
          </h1>
          <p className="max-w-[64ch] text-lg leading-[1.65] text-on-surface-variant">
            Use Carbon, Material 3, Primer, Fluent 2, Cloudscape, and more from their published
            token sources—not a visual guess. AgentDS turns each one into a verified{" "}
            <code className="font-mono text-base">DESIGN.md</code> your agent can follow.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-full min-w-0 overflow-x-auto rounded-md bg-code-bg px-4 py-3 sm:w-auto">
              <code className="whitespace-nowrap font-mono text-sm text-code-accent">
                {INSTALL_COMMAND}
              </code>
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
          <p className="font-mono text-[0.8125rem] text-on-surface-variant">
            {featured.total} published files · free API · no account
          </p>
        </div>

        <aside
          aria-labelledby="verification-heading"
          className="min-w-0 rounded-md bg-code-bg p-6 text-code-fg"
        >
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <h2
              id="verification-heading"
              className="font-mono text-[0.8125rem] font-medium text-code-accent"
            >
              verify-report.json
            </h2>
            <span className="rounded-full bg-success px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-primary">
              required
            </span>
          </div>
          <dl className="flex flex-col gap-4 py-5">
            {VERIFICATION_ROWS.map(([term, description]) => (
              <div key={term} className="grid gap-1">
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-code-accent">
                  {term}:
                </dt>
                <dd className="font-mono text-sm leading-relaxed text-code-fg">{description}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-border pt-4 font-mono text-sm text-code-accent">
            publish_gate: passed
          </p>
        </aside>
      </section>

      {/* Inspectable proof: a real sample screen rendered from Carbon's DESIGN.md. */}
      {carbonTokens?.colors ? (
        <section aria-labelledby="proof-heading" className="flex min-w-0 flex-col gap-6">
          {carbonFontsHref ? <SpecimenFonts href={carbonFontsHref} /> : null}
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="flex max-w-[720px] flex-col gap-3">
              <h2
                id="proof-heading"
                className="font-display text-4xl font-semibold leading-[1.15] text-primary"
              >
                See what the file controls.
              </h2>
              <p className="max-w-[64ch] leading-relaxed text-on-surface-variant">
                This dashboard is rendered directly from Carbon&apos;s published DESIGN.md: its real
                palette, type scale, spacing, radii, and status roles—not a screenshot theme or a
                guessed blue.
              </p>
            </div>
            <Link
              href="/systems/carbon/preview/dashboard"
              className="shrink-0 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent hover:underline"
            >
              open live preview →
            </Link>
          </div>
          <figure className="overflow-hidden rounded-lg border border-border bg-surface">
            <div className="flex items-center justify-between gap-4 bg-code-bg px-5 py-4 text-code-fg">
              <figcaption className="min-w-0 truncate font-mono text-[0.8125rem] text-code-accent">
                carbon/DESIGN.md → dashboard
              </figcaption>
              <span className="shrink-0 rounded-full bg-success px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-primary">
                live tokens
              </span>
            </div>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_304px]">
              <div
                aria-hidden="true"
                className="relative h-[244px] overflow-hidden bg-surface sm:h-[416px] md:h-[480px] lg:h-[520px]"
              >
                <div className="absolute left-0 top-0 w-[900px] origin-top-left scale-[0.38] sm:scale-[0.65] md:scale-[0.75] lg:scale-[0.93]">
                  <DashboardTemplate tokens={carbonTokens} name={carbon?.name ?? "Carbon"} />
                </div>
              </div>
              <aside className="flex flex-col border-t border-border bg-surface-variant p-6 lg:border-l lg:border-t-0">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-accent">
                  ## evidence
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-primary">
                  Grounded, not guessed.
                </h3>
                <dl className="mt-6 flex flex-col gap-5">
                  <div className="border-b border-border pb-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                      source
                    </dt>
                    <dd className="mt-1 break-all font-mono text-sm font-medium text-primary">
                      {carbonSource}
                    </dd>
                  </div>
                  <div className="border-b border-border pb-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                      verification
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-medium text-success">
                      {carbonVerification.score.exact}/{carbonVerification.score.total} color roles
                      exact
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                        primary
                      </dt>
                      <dd className="mt-2 flex items-center gap-2 font-mono text-sm font-medium text-primary">
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 border border-border"
                          style={{ backgroundColor: carbonPrimary }}
                        />
                        {carbonPrimary}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                        radius
                      </dt>
                      <dd className="mt-2 font-mono text-sm font-medium text-primary">
                        {carbonRadius}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                      typography
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-primary">{carbonFont}</dd>
                  </div>
                  <div className="border-t border-border pt-5">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
                      recorded agent run
                    </dt>
                    <dd className="mt-1 font-mono text-sm font-medium text-primary">
                      0/7 baseline → 5/7 with DESIGN.md
                    </dd>
                    <a
                      href="https://github.com/System-Desgin/AgentDS/tree/main/benchmarks/carbon-dashboard"
                      className="mt-2 inline-block font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-accent hover:underline"
                    >
                      inspect exact inputs →
                    </a>
                  </div>
                </dl>
                <p className="mt-auto border-t border-border pt-5 text-xs leading-relaxed text-on-surface-variant">
                  Approximation of Carbon&apos;s visual language, not IBM&apos;s official component
                  library. Verified {carbonVerification.verifiedAt}.
                </p>
              </aside>
            </div>
          </figure>
        </section>
      ) : null}

      {/* Path split */}
      <section aria-labelledby="paths-heading" className="flex flex-col gap-8">
        <h2
          id="paths-heading"
          className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant"
        >
          ## choose a source
        </h2>
        <div className="grid gap-6 md:grid-cols-5">
          <Link
            href="/systems?path=official"
            className="group flex flex-col gap-3 rounded-lg border border-border bg-surface-variant p-6 transition-colors duration-150 ease-out hover:border-accent md:col-span-3"
          >
            <span className="w-fit rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant">
              source: package@version / repo@commit
            </span>
            <h3 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
              Official Systems
            </h3>
            <p className="max-w-[60ch] leading-relaxed text-on-surface-variant">
              Real open-source design systems, distilled from their published tokens. Every entry
              records provenance, compares its colors with the cited source, passes the official
              linter, and requires human QA before publication.
            </p>
            <span className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent">
              browse official →
            </span>
          </Link>
          <Link
            href="/systems?path=brand-look"
            className="group flex flex-col gap-3 rounded-lg border border-border p-6 transition-colors duration-150 ease-out hover:border-accent md:col-span-2"
          >
            <span className="w-fit rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant">
              source: public CSS
            </span>
            <h3 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
              Brand Looks
            </h3>
            <p className="max-w-[60ch] leading-relaxed text-on-surface-variant">
              Independent, clearly disclaimed analyses of publicly observable product-site patterns.
              Use them as inspiration for an original visual system.
            </p>
            <span className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent">
              browse brand looks →
            </span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="purposes-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2
            id="purposes-heading"
            className="font-display text-4xl font-semibold leading-[1.15] text-primary"
          >
            Find the right system for the work.
          </h2>
          <p className="max-w-[64ch] leading-relaxed text-on-surface-variant">
            Start with the interface you are building. Each category combines Official Systems and
            clearly labeled Brand Looks that fit the same job.
          </p>
        </div>
        <nav aria-label="Browse design-system purposes" className="border-y border-border py-5">
          <ul className="grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/systems/category/${category.id}`}
                  className="flex items-baseline justify-between gap-4 font-mono text-[0.8125rem] text-on-surface-variant transition-colors duration-150 ease-out hover:text-accent"
                >
                  <span>{category.label}</span>
                  <span aria-label={`${category.count} systems`}>{category.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
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
