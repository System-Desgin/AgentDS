import type { Metadata } from "next";
import Link from "next/link";
import type { SystemListItem } from "@agentds/shared";
import { CURATED_COLLECTIONS, type CuratedCollection } from "../../lib/collections";
import { fetchCatalogOptions } from "../../lib/api";

export const metadata: Metadata = {
  title: "Curated design-system collections",
  description:
    "Start with a focused collection of source-verified design systems for dashboards or dark-first interfaces.",
  alternates: { canonical: "/collections" },
};

export const revalidate = 300;

function systemsForCollection(
  collection: CuratedCollection,
  bySlug: Map<string, SystemListItem>,
): SystemListItem[] {
  return collection.systemSlugs.flatMap((slug) => {
    const system = bySlug.get(slug);
    return system ? [system] : [];
  });
}

function CollectionManifest({
  collection,
  systems,
}: {
  collection: CuratedCollection;
  systems: SystemListItem[];
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex flex-col gap-6 rounded-lg border border-border bg-surface-variant p-6 transition-colors duration-150 ease-out hover:border-accent"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-semibold text-primary group-hover:text-accent">
            {collection.title}
          </h2>
          <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
            {collection.summary}
          </p>
        </div>
        <span className="rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em] text-on-surface-variant">
          files: {systems.length}
        </span>
      </div>

      {systems.length > 0 ? (
        <div className="grid grid-cols-3 gap-2" aria-label="Collection palette samples">
          {systems.map((system) => (
            <span
              key={system.slug}
              title={system.name}
              className="flex h-10 overflow-hidden rounded-sm border border-border bg-surface"
            >
              <span className="sr-only">{system.name}</span>
              {system.palette.length > 0
                ? system.palette.map((color, index) => (
                    <span
                      key={`${system.slug}-${index}`}
                      aria-hidden="true"
                      className="h-full flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))
                : null}
            </span>
          ))}
        </div>
      ) : null}

      <div className="border-t border-border pt-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
          selection:
        </p>
        <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
          {collection.selection}
        </p>
      </div>

      {systems.length > 0 ? (
        <p className="font-mono text-[0.8125rem] tracking-[0.04em] text-on-surface-variant">
          systems: {systems.map((system) => system.name).join(" / ")}
        </p>
      ) : (
        <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-warning">
          collection files are temporarily unavailable
        </p>
      )}

      <span className="mt-auto font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent">
        open collection →
      </span>
    </Link>
  );
}

export default async function CollectionsPage() {
  const catalog = await fetchCatalogOptions();
  const bySlug = new Map(catalog.items.map((system) => [system.slug, system]));

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## curated collections
        </p>
        <h1 className="max-w-[18ch] font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          Start with the work, not the brand.
        </h1>
        <p className="max-w-[72ch] text-lg leading-[1.65] text-on-surface-variant">
          Each short list is selected for a specific interface problem. Open a collection, inspect
          the source-grounded previews, then compare the strongest candidates.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/random"
            className="rounded-md bg-primary px-5 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
          >
            pick a random system
          </a>
          <Link
            href="/systems"
            className="rounded-md border border-border px-5 py-3 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            browse all systems
          </Link>
        </div>
        {!catalog.live ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            api unreachable — serving files bundled with this build
          </p>
        ) : null}
      </header>

      {catalog.items.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {CURATED_COLLECTIONS.map((collection) => (
            <CollectionManifest
              key={collection.slug}
              collection={collection}
              systems={systemsForCollection(collection, bySlug)}
            />
          ))}
        </div>
      ) : (
        <section className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant">
            collections are temporarily unavailable
          </p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
            The catalog has no published files in this build. Try the catalog again shortly.
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
