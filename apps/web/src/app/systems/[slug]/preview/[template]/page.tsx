import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { extractDesignFrontMatter, type DesignTokens } from "@agentds/shared";
import { googleFontsUrl, SAMPLE_TEMPLATES, TEMPLATE_COMPONENTS } from "@agentds/shared/preview";
import { SpecimenFonts } from "../../../../../components/specimen-fonts";
import { fetchAllSlugs, fetchDesignMd, fetchSystem } from "../../../../../lib/api";

/**
 * Sample-screen preview (rich per-system previews): a full app screen rendered
 * purely from the system's DESIGN.md tokens. Honest-approximation caption is
 * mandatory; Brand Looks keep their disclaimer adjacent. Restricted entries
 * have no previews (reference-only, PRD §12).
 */

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.flatMap((slug) => SAMPLE_TEMPLATES.map((t) => ({ slug, template: t.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}): Promise<Metadata> {
  const { slug, template } = await params;
  const meta = SAMPLE_TEMPLATES.find((t) => t.id === template);
  const system = await fetchSystem(slug);
  if (!meta || !system || system.restricted) return { title: "Not found" };
  return {
    title: `${system.name} ${meta.name.toLowerCase()} preview`,
    description: `A sample ${meta.name.toLowerCase()} rendered from the ${system.name} DESIGN.md tokens: real palette, type scale, spacing, and radii.`,
    alternates: { canonical: `/systems/${slug}/preview/${template}` },
  };
}

export default async function SamplePreviewPage({
  params,
}: {
  params: Promise<{ slug: string; template: string }>;
}) {
  const { slug, template } = await params;
  const meta = SAMPLE_TEMPLATES.find((t) => t.id === template);
  if (!meta) notFound();

  const system = await fetchSystem(slug);
  if (!system || system.restricted) notFound();

  const designMd = await fetchDesignMd(slug);
  const tokens: DesignTokens | null = designMd
    ? extractDesignFrontMatter(designMd)
    : (system.token_summary as DesignTokens | null);
  if (!tokens?.colors) notFound();

  const Template = TEMPLATE_COMPONENTS[meta.id];
  if (!Template) notFound();

  const fontsHref = tokens.typography
    ? googleFontsUrl(
        Object.values(tokens.typography)
          .map((level) => (typeof level["fontFamily"] === "string" ? level["fontFamily"] : ""))
          .filter(Boolean),
      )
    : null;

  return (
    <article className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-16">
      {fontsHref ? (
        <>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <SpecimenFonts href={fontsHref} />
        </>
      ) : null}

      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## systems/{slug}/preview
        </p>
        <h1 className="font-display text-[2.25rem] font-semibold leading-[1.15] text-primary">
          {system.name} — {meta.name.toLowerCase()}
        </h1>
        <p className="max-w-[72ch] leading-relaxed text-on-surface-variant">
          {meta.description} Everything below is rendered from the{" "}
          <Link href={`/systems/${slug}`} className="text-accent underline">
            {system.name} DESIGN.md
          </Link>{" "}
          tokens — an approximation of the system&apos;s visual language, not its official component
          library.
        </p>
        {system.path === "brand-look" ? (
          <p className="max-w-[72ch] rounded-md border border-border bg-surface-variant p-4 text-sm leading-relaxed text-on-surface-variant">
            Independent analysis of publicly observable design patterns. Not affiliated with,
            endorsed by, or sponsored by {system.maker.replace(/\.$/, "")}. All trademarks belong to
            their owners.
          </p>
        ) : null}
        <nav
          aria-label="Sample screens"
          className="flex flex-wrap gap-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em]"
        >
          {SAMPLE_TEMPLATES.map((t) => (
            <Link
              key={t.id}
              href={`/systems/${slug}/preview/${t.id}`}
              aria-current={t.id === meta.id ? "page" : undefined}
              className={
                t.id === meta.id
                  ? "rounded-full border border-accent px-4 py-2 text-accent"
                  : "rounded-full border border-border px-4 py-2 text-on-surface-variant hover:border-accent hover:text-accent"
              }
            >
              {t.name}
            </Link>
          ))}
        </nav>
      </header>

      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="min-w-[900px]">
          <Template tokens={tokens} name={system.name} />
        </div>
      </div>

      <footer className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
        <Link href={`/systems/${slug}`} className="text-accent underline">
          ← Back to {system.name}
        </Link>
        <span>
          Want this look in your app? Grab the file from the{" "}
          <Link href={`/systems/${slug}`} className="text-accent underline">
            system page
          </Link>{" "}
          and hand it to your agent.
        </span>
      </footer>
    </article>
  );
}
