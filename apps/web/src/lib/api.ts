import {
  PURPOSE_CATEGORY_LABELS,
  type CategoryWithCount,
  type PaginatedEnvelope,
  type SystemDetail,
  type SystemListItem,
} from "@agentds/shared";
import {
  fallbackAllSlugs,
  fallbackCategoryCounts,
  fallbackGetDesignMd,
  fallbackGetSystem,
  fallbackListSystems,
} from "./content-fallback";
import { API_URL } from "./site";

/**
 * Server-side data access: the public API first (ISR-cached fetches), the
 * bundled content files second (graceful fallback when the API is
 * unreachable — Phase 3 checklist). Every function is safe to call during
 * build and render; none throw on network failure.
 */

const REVALIDATE_SECONDS = 300;

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { accept: "application/json" },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export interface CatalogQuery {
  path?: "official" | "brand-look";
  category?: string;
  q?: string;
  license?: string;
  sort?: "newest" | "most-fetched";
  page?: number;
}

export const CATALOG_PAGE_SIZE = 24;

export interface CatalogResult {
  items: SystemListItem[];
  total: number;
  page: number;
  totalPages: number;
  /** True when the API answered; false when the bundled-content fallback did. */
  live: boolean;
}

export async function fetchCatalog(query: CatalogQuery): Promise<CatalogResult> {
  const page = query.page && query.page > 0 ? query.page : 1;
  const params = new URLSearchParams();
  if (query.path) params.set("path", query.path);
  if (query.category) params.set("category", query.category);
  if (query.q) params.set("q", query.q);
  if (query.license) params.set("license", query.license);
  if (query.sort) params.set("sort", query.sort);
  params.set("page", String(page));
  params.set("limit", String(CATALOG_PAGE_SIZE));

  const live = await apiFetch<PaginatedEnvelope<SystemListItem>>(`/v1/systems?${params}`);
  if (live) {
    return {
      items: live.data,
      total: live.meta.total,
      page: live.meta.page,
      totalPages: live.meta.total_pages,
      live: true,
    };
  }

  const fallbackQuery: Parameters<typeof fallbackListSystems>[0] = {
    page,
    limit: CATALOG_PAGE_SIZE,
  };
  if (query.path) fallbackQuery.path = query.path;
  if (query.category) fallbackQuery.category = query.category;
  if (query.q) fallbackQuery.q = query.q;
  if (query.license) fallbackQuery.license = query.license;
  const fallback = await fallbackListSystems(fallbackQuery);
  return {
    items: fallback.data,
    total: fallback.total,
    page,
    totalPages: Math.ceil(fallback.total / CATALOG_PAGE_SIZE),
    live: false,
  };
}

export async function fetchSystem(slug: string): Promise<SystemDetail | null> {
  const live = await apiFetch<{ data: SystemDetail }>(`/v1/systems/${slug}`);
  if (live) return live.data;
  return fallbackGetSystem(slug);
}

export async function fetchDesignMd(slug: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_URL}/v1/systems/${slug}/design.md`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (response.ok) return await response.text();
  } catch {
    // fall through to bundled content
  }
  return fallbackGetDesignMd(slug);
}

export async function fetchCategories(): Promise<CategoryWithCount[]> {
  const live = await apiFetch<{ data: CategoryWithCount[] }>("/v1/categories");
  if (live) return live.data;
  const counts = await fallbackCategoryCounts();
  return Object.entries(PURPOSE_CATEGORY_LABELS).map(([id, label]) => ({
    id,
    label,
    count: counts.get(id) ?? 0,
  }));
}

/** Slugs for generateStaticParams — union of API and bundled content. */
export async function fetchAllSlugs(): Promise<string[]> {
  const slugs = new Set<string>(await fallbackAllSlugs());
  const live = await apiFetch<PaginatedEnvelope<SystemListItem>>("/v1/systems?limit=100");
  if (live) for (const item of live.data) slugs.add(item.slug);
  return [...slugs];
}
