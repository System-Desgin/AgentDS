import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { extractDesignFrontMatter, type DesignTokens, type SystemDetail } from "@agentds/shared";
import {
  ComponentTokenTable,
  PalettePreview,
  RadiusPreview,
  SpacingPreview,
  TypeScalePreview,
  googleFontsUrl,
} from "@agentds/shared/preview";
import { CopyButton } from "../../../components/copy-button";
import { DesignMdViewer } from "../../../components/design-md-viewer";
import { DownloadLink } from "../../../components/download-link";
import { Tabs } from "../../../components/tabs";
import { AGENT_SNIPPETS } from "../../../lib/agent-snippets";
import { fetchAllSlugs, fetchDesignMd, fetchSystem } from "../../../lib/api";
import { API_URL, INSTALL_COMMAND, SITE_URL } from "../../../lib/site";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const system = await fetchSystem(slug);
  // Resolving 404 here (before streaming starts) makes the response status a
  // real 404; from the page body it would stream inside a 200 shell.
  if (!system) notFound();
  return {
    title: `${system.name} DESIGN.md`,
    description: system.summary,
    alternates: { canonical: `${SITE_URL}/systems/${slug}` },
  };
}

function provenanceLine(system: SystemDetail): string {
  const p = system.provenance;
  if (p.source_type === "npm") return `npm ${p.package ?? "?"}@${p.version ?? "?"}`;
  if (p.source_type === "repo") return `repo ${p.repo ?? "?"} @ ${p.commit ?? "?"}`;
  return `captured from ${(p.urls ?? []).join(", ")}`;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-on-surface-variant">
      {children}
    </h2>
  );
}

export default async function SystemDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = await fetchSystem(slug);
  if (!system) notFound();

  const designMd = system.restricted ? null : await fetchDesignMd(slug);
  const tokens: DesignTokens | null = designMd
    ? extractDesignFrontMatter(designMd)
    : (system.token_summary as DesignTokens | null);

  const fontsHref = tokens?.typography
    ? googleFontsUrl(
        Object.values(tokens.typography)
          .map((level) => (typeof level["fontFamily"] === "string" ? level["fontFamily"] : ""))
          .filter(Boolean),
      )
    : null;

  const fileBase = `${API_URL}/v1/systems/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: `${system.name} DESIGN.md`,
    description: system.summary,
    url: `${SITE_URL}/systems/${slug}`,
    codeRepository: (system.links as { github?: string }).github,
    license: system.license.url,
    author: { "@type": "Organization", name: system.maker },
  };

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 py-16">
      {fontsHref ? <link rel="stylesheet" href={fontsHref} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header (F-2) */}
      <header className="flex flex-col gap-4">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant"
        >
          <Link href="/systems" className="text-accent hover:underline">
            catalog
          </Link>{" "}
          / {slug}
        </nav>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
            {system.name}
          </h1>
          {system.lint && system.lint.errors === 0 ? (
            <span className="rounded-full bg-success px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-primary">
              lint pass
            </span>
          ) : null}
          {system.restricted ? (
            <span className="rounded-full bg-warning px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-surface">
              restricted
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip>maker: {system.maker}</Chip>
          <Chip>path: {system.path}</Chip>
          <Chip>license: {system.license.spdx}</Chip>
          <Chip>spec: {system.spec_version}</Chip>
          {system.categories.map((category) => (
            <Chip key={category}>category: {category}</Chip>
          ))}
        </div>
        <p className="max-w-[72ch] text-lg leading-[1.65] text-on-surface-variant">
          {system.description}
        </p>
        {system.best_for.length > 0 ? (
          <p className="font-mono text-[0.8125rem] tracking-[0.04em] text-on-surface-variant">
            best for: {system.best_for.join(" · ")}
          </p>
        ) : null}
      </header>

      {/* Restricted notice or actions (F-2) */}
      {system.restricted ? (
        <section className="flex flex-col gap-3 rounded-lg border border-warning p-6">
          <span className="w-fit rounded-full bg-warning px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-surface">
            restricted entry
          </span>
          <p className="max-w-[72ch] leading-relaxed text-on-surface-variant">
            {system.restricted_reason ??
              "This entry is reference-only for legal reasons; downloads and API access are disabled."}
          </p>
        </section>
      ) : (
        <section aria-labelledby="actions-heading" className="flex flex-col gap-4">
          <SectionHeading>## get the file</SectionHeading>
          <span id="actions-heading" className="sr-only">
            Actions
          </span>
          <div className="flex flex-wrap gap-3">
            {designMd ? (
              <CopyButton text={designMd} label="copy file" eventSlug={slug} eventType="copy" />
            ) : null}
            <DownloadLink href={`${fileBase}/design.md`} label="design.md" eventSlug={slug} />
            <DownloadLink href={`${fileBase}/tokens.json`} label="tokens.json" eventSlug={slug} />
            <DownloadLink href={`${fileBase}/tailwind.css`} label="tailwind.css" eventSlug={slug} />
            <DownloadLink href={`${fileBase}/bundle.zip`} label="bundle.zip" eventSlug={slug} />
            <CopyButton text={`${fileBase}/design.md`} label="copy api url" />
            <CopyButton text={INSTALL_COMMAND} label="copy skills command" />
          </div>
        </section>
      )}

      {/* Token previews (F-2) — server-rendered from parsed YAML. */}
      {tokens ? (
        <section aria-label="Token previews" className="flex flex-col gap-8">
          {tokens.colors && Object.keys(tokens.colors).length > 0 ? (
            <div className="fade-up flex flex-col gap-4 rounded-lg border border-border bg-surface-variant p-6">
              <SectionHeading>## colors</SectionHeading>
              <PalettePreview colors={tokens.colors} />
            </div>
          ) : null}
          {tokens.typography && Object.keys(tokens.typography).length > 0 ? (
            <div className="fade-up flex flex-col gap-4 rounded-lg border border-border bg-surface-variant p-6">
              <SectionHeading>## typography</SectionHeading>
              <TypeScalePreview typography={tokens.typography} />
            </div>
          ) : null}
          <div className="grid gap-8 md:grid-cols-2">
            {tokens.spacing && Object.keys(tokens.spacing).length > 0 ? (
              <div className="fade-up flex flex-col gap-4 rounded-lg border border-border bg-surface-variant p-6">
                <SectionHeading>## spacing</SectionHeading>
                <SpacingPreview spacing={tokens.spacing} />
              </div>
            ) : null}
            {tokens.rounded && Object.keys(tokens.rounded).length > 0 ? (
              <div className="fade-up flex flex-col gap-4 rounded-lg border border-border bg-surface-variant p-6">
                <SectionHeading>## shapes</SectionHeading>
                <RadiusPreview rounded={tokens.rounded} />
              </div>
            ) : null}
          </div>
          {tokens.components && Object.keys(tokens.components).length > 0 ? (
            <div className="fade-up flex flex-col gap-4 overflow-x-auto rounded-lg border border-border bg-surface-variant p-6">
              <SectionHeading>## component tokens</SectionHeading>
              <ComponentTokenTable components={tokens.components} />
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Raw file viewer (F-2) */}
      {designMd ? (
        <section aria-label="Raw file" className="flex flex-col gap-4">
          <SectionHeading>## raw file</SectionHeading>
          <DesignMdViewer slug={slug} markdown={designMd} />
        </section>
      ) : null}

      {/* Per-agent setup (F-2) */}
      {!system.restricted ? (
        <section aria-label="Agent setup" className="flex flex-col gap-4">
          <SectionHeading>## use it with your agent</SectionHeading>
          <Tabs
            label="Agent setup instructions"
            items={AGENT_SNIPPETS.map((agent) => ({
              id: agent.id,
              label: agent.label,
              content: (
                <div className="flex flex-col gap-3">
                  <p className="font-mono text-[0.8125rem] tracking-[0.04em] text-on-surface-variant">
                    target: {agent.file} ·{" "}
                    <Link href={`/agents/${agent.id}`} className="text-accent hover:underline">
                      full guide →
                    </Link>
                  </p>
                  <pre className="overflow-x-auto rounded-md bg-code-bg p-6 font-mono text-sm leading-[1.7] text-code-fg">
                    {agent.snippet(slug)}
                  </pre>
                </div>
              ),
            }))}
          />
        </section>
      ) : null}

      {/* Provenance / disclaimer (F-2) */}
      <section
        aria-label="Provenance"
        className="flex flex-col gap-3 rounded-lg border border-border p-6"
      >
        {system.path === "official" ? (
          <>
            <SectionHeading>## provenance</SectionHeading>
            <div className="flex flex-wrap gap-2">
              <Chip>{provenanceLine(system)}</Chip>
              <Chip>extracted: {system.provenance.extracted_at}</Chip>
              {system.lint ? (
                <Chip>
                  lint: {system.lint.errors} errors · {system.lint.warnings} warnings
                </Chip>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em]">
              {Object.entries(system.links as Record<string, string>).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {key.replace(/_/g, " ")} ↗
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            <SectionHeading>## disclaimer</SectionHeading>
            <p className="max-w-[72ch] leading-relaxed text-on-surface-variant">
              Independent analysis of publicly observable design patterns. Not affiliated with,
              endorsed by, or sponsored by {system.maker}. All trademarks belong to their owners.
              Use as inspiration for an original system. Captured {system.provenance.extracted_at}.
            </p>
          </>
        )}
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
          fetched {system.counters.api_fetch} times · downloaded {system.counters.download} times
        </p>
      </section>
    </div>
  );
}
