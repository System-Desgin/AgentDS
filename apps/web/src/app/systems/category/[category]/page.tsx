import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PURPOSE_CATEGORIES,
  PURPOSE_CATEGORY_DESCRIPTIONS,
  PURPOSE_CATEGORY_LABELS,
  isPurposeCategory,
  type PurposeCategory,
} from "@agentds/shared";
import { SystemCard } from "../../../../components/system-card";
import { CATALOG_PAGE_SIZE, fetchCatalog, fetchCategories } from "../../../../lib/api";
import { SITE_NAME, SITE_URL } from "../../../../lib/site";

export const revalidate = 300;

export function generateStaticParams() {
  return PURPOSE_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isPurposeCategory(category)) notFound();

  const label = PURPOSE_CATEGORY_LABELS[category];
  const description = `${PURPOSE_CATEGORY_DESCRIPTIONS[category]} Browse source-verified DESIGN.md files for coding agents.`;
  return {
    title: `${label} design systems`,
    description,
    alternates: { canonical: `/systems/category/${category}` },
    openGraph: {
      title: `${label} design systems · ${SITE_NAME}`,
      description,
      url: `/systems/category/${category}`,
    },
  };
}

function parsePage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  return Number.isInteger(page) && page > 1 ? page : 1;
}

function CategoryResultsLoading() {
  return (
    <div className="flex flex-col gap-10" aria-busy="true">
      <div className="h-4 w-44 rounded-sm bg-surface-variant" />
      <div className="h-36 rounded-sm border-y border-border bg-surface-variant" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-56 rounded-lg border border-border bg-surface-variant" />
        ))}
      </div>
      <span className="sr-only">Loading category results…</span>
    </div>
  );
}

async function CategoryResults({ category, page }: { category: PurposeCategory; page: number }) {
  const [catalog, categories] = await Promise.all([
    fetchCatalog({ category, page, sort: "most-fetched" }),
    fetchCategories(),
  ]);
  const label = PURPOSE_CATEGORY_LABELS[category];
  const categoryCounts = new Map(categories.map((item) => [item.id, item.count]));
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${label} design systems for coding agents`,
    url: `${SITE_URL}/systems/category/${category}`,
    numberOfItems: catalog.total,
    itemListElement: catalog.items.map((system, index) => ({
      "@type": "ListItem",
      position: (catalog.page - 1) * CATALOG_PAGE_SIZE + index + 1,
      url: `${SITE_URL}/systems/${system.slug}`,
      name: system.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="flex flex-col gap-10">
        <p className="font-mono text-[0.8125rem] text-on-surface-variant">
          {catalog.total} published {catalog.total === 1 ? "system" : "systems"}
        </p>
        <nav aria-label="Browse design-system purposes" className="border-y border-border py-5">
          <ul className="grid list-none gap-x-8 gap-y-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {PURPOSE_CATEGORIES.map((item) => {
              const active = item === category;
              return (
                <li key={item}>
                  <Link
                    href={`/systems/category/${item}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline justify-between gap-4 font-mono text-[0.8125rem] transition-colors duration-150 ease-out hover:text-accent ${
                      active ? "text-accent" : "text-on-surface-variant"
                    }`}
                  >
                    <span>{PURPOSE_CATEGORY_LABELS[item]}</span>
                    <span aria-label={`${categoryCounts.get(item) ?? 0} systems`}>
                      {categoryCounts.get(item) ?? 0}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {catalog.items.length > 0 ? (
          <>
            <ul className="grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
              {catalog.items.map((system) => (
                <li key={system.slug}>
                  <SystemCard system={system} />
                </li>
              ))}
            </ul>
            {catalog.totalPages > 1 ? (
              <nav
                aria-label="Pagination"
                className="flex items-center gap-4 font-mono text-[0.8125rem] uppercase tracking-[0.04em]"
              >
                {catalog.page > 1 ? (
                  <Link
                    href={`/systems/category/${category}?page=${catalog.page - 1}`}
                    className="text-accent hover:underline"
                  >
                    ← prev
                  </Link>
                ) : null}
                <span className="text-on-surface-variant">
                  page {catalog.page} / {catalog.totalPages}
                </span>
                {catalog.page < catalog.totalPages ? (
                  <Link
                    href={`/systems/category/${category}?page=${catalog.page + 1}`}
                    className="text-accent hover:underline"
                  >
                    next →
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-lg border border-border p-10">
            <p className="font-mono text-[0.8125rem] text-on-surface-variant">
              no published systems in this category
            </p>
            <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
              Entries appear after source verification and human QA. Browse the full catalog while
              this category grows.
            </p>
            <Link
              href="/systems"
              className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
            >
              browse catalog
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { category } = await params;
  if (!isPurposeCategory(category)) notFound();

  const page = parsePage((await searchParams).page);
  const label = PURPOSE_CATEGORY_LABELS[category];

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16">
      <header className="flex max-w-[760px] flex-col gap-4">
        <Link
          href="/systems"
          className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-accent hover:underline"
        >
          ← catalog
        </Link>
        <p className="font-mono text-[0.8125rem] font-medium tracking-[0.04em] text-on-surface-variant">
          category: {category}
        </p>
        <h1 className="font-display text-[3.25rem] font-semibold leading-[1.08] tracking-[-0.02em] text-primary">
          {label} design systems for coding agents
        </h1>
        <p className="text-lg leading-[1.65] text-on-surface-variant">
          {PURPOSE_CATEGORY_DESCRIPTIONS[category]} Each result includes a DESIGN.md file your agent
          can follow, plus tokens, provenance, and a live preview.
        </p>
      </header>
      <Suspense fallback={<CategoryResultsLoading />}>
        <CategoryResults category={category} page={page} />
      </Suspense>
    </div>
  );
}
