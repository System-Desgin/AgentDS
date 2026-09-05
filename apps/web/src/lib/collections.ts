export interface CuratedCollection {
  slug: string;
  title: string;
  summary: string;
  selection: string;
  systemSlugs: readonly string[];
}

/**
 * Small, opinionated starting sets from the published catalog. Keep these
 * lists explicit: a collection is editorial guidance, not another filter.
 */
export const CURATED_COLLECTIONS: readonly CuratedCollection[] = [
  {
    slug: "dashboards",
    title: "Best for dashboards",
    summary:
      "Six official systems built for operational workflows, dense information, and durable product interfaces.",
    selection:
      "Strong table, form, navigation, and status conventions for admin, cloud, or developer-facing products.",
    systemSlugs: ["carbon", "cloudscape", "ant-design", "primer", "atlassian", "backstage"],
  },
  {
    slug: "dark-first",
    title: "Dark-first systems",
    summary:
      "Six systems and visual languages where dark surfaces are foundational rather than an afterthought.",
    selection:
      "Published tokens support high-contrast dark product, media, developer-tool, or technical marketing work.",
    systemSlugs: ["linear", "raycast", "supabase", "spotify", "nvidia", "moon"],
  },
] as const;

export function findCollection(slug: string): CuratedCollection | undefined {
  return CURATED_COLLECTIONS.find((collection) => collection.slug === slug);
}
