import type { Metadata } from "next";
import Link from "next/link";
import { SYSTEM_PATHS, type SystemPath } from "@agentds/shared";
import { SystemCard } from "../../../components/system-card";
import { fetchCatalog, fetchCategories, type CatalogQuery } from "../../../lib/api";

export const metadata: Metadata = {
  title: "Catalog",
  description:
    "Browse agent-ready DESIGN.md files: Official Systems from real token packages and Brand Looks from famous product sites.",
};

export const revalidate = 300;

type SearchParams = Record<string, string | string[] | undefined>;

function first(params: SearchParams, key: string): string | undefined {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value;
}

/** Parse URL state (F-1: shared URLs restore the same filtered view). */
function parseQuery(params: SearchParams): CatalogQuery {
  const query: CatalogQuery = {};
  const path = first(params, "path");
  if (path && (SYSTEM_PATHS as readonly string[]).includes(path)) {
    query.path = path as SystemPath;
  }
  const q = first(params, "q")?.trim();
  if (q) query.q = q.slice(0, 100);
  const category = first(params, "category");
  if (category) query.category = category;
  const license = first(params, "license");
  if (license) query.license = license;
  const sort = first(params, "sort");
  if (sort === "most-fetched") query.sort = "most-fetched";
  const page = Number(first(params, "page"));
  if (Number.isInteger(page) && page > 1) query.page = page;
  return query;
}

function queryString(query: CatalogQuery, overrides: Partial<CatalogQuery>): string {
  const merged = { ...query, ...overrides };
  const params = new URLSearchParams();
  if (merged.path) params.set("path", merged.path);
  if (merged.q) params.set("q", merged.q);
  if (merged.category) params.set("category", merged.category);
  if (merged.license) params.set("license", merged.license);
  if (merged.sort) params.set("sort", merged.sort);
  if (merged.page && merged.page > 1) params.set("page", String(merged.page));
  const s = params.toString();
  return s ? `?${s}` : "";
}

const PATH_TABS = [
  { value: undefined, label: "all" },
  { value: "official", label: "official" },
  { value: "brand-look", label: "brand looks" },
] as const;

export default async function SystemsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const query = parseQuery(await searchParams);
  const [catalog, categories] = await Promise.all([fetchCatalog(query), fetchCategories()]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-[0.8125rem] font-medium uppercase tracking-[0.04em] text-accent">
          ## catalog
        </p>
        <h1 className="font-display text-4xl font-semibold leading-[1.15] text-primary">
          {catalog.total} agent-ready design systems
        </h1>
        {!catalog.live ? (
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            api unreachable — serving files bundled with this build
          </p>
        ) : null}
      </header>

      {/* Path toggle — persists in URL (F-1). */}
      <nav aria-label="Catalog path" className="flex gap-2">
        {PATH_TABS.map((tab) => {
          const active = (query.path ?? undefined) === tab.value;
          const next: CatalogQuery = { ...query };
          delete next.page;
          if (tab.value) next.path = tab.value as SystemPath;
          else delete next.path;
          const href = `/systems${queryString(next, {})}`;
          return (
            <Link
              key={tab.label}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full border px-4 py-1.5 font-mono text-[0.8125rem] uppercase tracking-[0.04em] transition-colors duration-150 ease-out ${
                active
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border text-on-surface-variant hover:border-accent hover:text-accent"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Search + filters: plain GET form so state lives in the URL. */}
      <form action="/systems" method="get" className="flex flex-wrap items-end gap-4">
        {query.path ? <input type="hidden" name="path" value={query.path} /> : null}
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            search
          </span>
          <input
            type="search"
            name="q"
            defaultValue={query.q ?? ""}
            placeholder="name, maker, summary…"
            className="w-64 rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            category
          </span>
          <select
            name="category"
            defaultValue={query.category ?? ""}
            className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-on-surface"
          >
            <option value="">all categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.04em] text-on-surface-variant">
            sort
          </span>
          <select
            name="sort"
            defaultValue={query.sort ?? "newest"}
            className="rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-on-surface"
          >
            <option value="newest">newest</option>
            <option value="most-fetched">most fetched</option>
          </select>
        </label>
        <button
          type="submit"
          className="rounded-md bg-primary px-5 py-2.5 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-primary transition-colors duration-150 ease-out hover:bg-accent hover:text-on-accent"
        >
          apply
        </button>
      </form>

      {/* Results */}
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
                  href={`/systems${queryString(query, { page: catalog.page - 1 })}`}
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
                  href={`/systems${queryString(query, { page: catalog.page + 1 })}`}
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
          <p className="font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-on-surface-variant">
            no systems match these filters
          </p>
          <p className="max-w-[60ch] text-sm leading-relaxed text-on-surface-variant">
            Entries appear here once they pass the lint gate and human QA sign-off. Try clearing the
            filters — or check back soon.
          </p>
          <Link
            href="/systems"
            className="rounded-md border border-border px-4 py-2 font-mono text-[0.8125rem] uppercase tracking-[0.04em] text-primary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            reset filters
          </Link>
        </div>
      )}
    </div>
  );
}
