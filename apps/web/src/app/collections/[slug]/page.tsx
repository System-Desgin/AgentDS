import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SystemCard } from "../../../components/system-card";
import {
  CURATED_COLLECTIONS,
  findCollection,
  type CuratedCollection,
} from "../../../lib/collections";
import { fetchCatalogOptions } from "../../../lib/api";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return CURATED_COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = findCollection(slug);
  if (!collection) notFound();
  return {
    title: collection.title,
    description: collection.summary,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

function compareHref(collection: CuratedCollection): string {
  const params = new URLSearchParams();
  for (const slug of collection.systemSlugs.slice(0, 3)) params.append("systems", slug);
  return `/compare?${params.toString()}`;
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = findCollection(slug);
  if (!collection) notFound();

  const catalog = await fetchCatalogOptions();
  const bySlug = new Map(catalog.items.map((system) => [system.slug, system]));
  const systems = collection.systemSlugs.flatMap((systemSlug) => {
    const system = bySlug.get(systemSlug);
    return system ? [system] : [];
  });

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <nav
          aria-label="Breadcrumb"
          className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant"
        >
          <Link href="/collections" className="text-accent underline">
            collections
          </Link>{" "}
          / {collection.slug}
        </nav>
        <h1 className="max-w-[18ch] font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          {collection.title}
        </h1>
        <p className="max-w-[72ch] text-lg leading-[1.65] text-on-surface-variant">
          {collection.summary}
        </p>
        <div className="max-w-[72ch] rounded-md bg-code-bg px-6 py-4 font-mono text-sm leading-[1.7] text-code-fg">
          <p>
            <span className="text-code-accent">selection:</span> {collection.selection}
          </p>
          <p>
            <span className="text-code-accent">files:</span> {systems.length}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={compareHref(collection)}
            className="rounded-md bg-primary px-5 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
          >
            compare first three
          </Link>
          <a
            href="/random"
            className="rounded-md border border-border px-5 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            pick a random system
          </a>
        </div>
        {!catalog.live ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            api unreachable — serving files bundled with this build
          </p>
        ) : null}
      </header>

      {systems.length > 0 ? (
        <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {systems.map((system) => (
            <li key={system.slug}>
              <SystemCard system={system} />
            </li>
          ))}
        </ul>
      ) : (
        <section className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant">
            this collection is temporarily unavailable
          </p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
            None of its published files are available in the current catalog response.
          </p>
          <Link
            href="/systems"
            className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            open catalog
          </Link>
        </section>
      )}
    </div>
  );
}
