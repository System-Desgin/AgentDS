import type { MetadataRoute } from "next";
import { SAMPLE_TEMPLATES } from "@agentds/shared/preview";
import { AGENT_SNIPPETS } from "../lib/agent-snippets";
import { fetchAllSlugs, fetchCatalog } from "../lib/api";
import { SITE_URL } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/systems", "/what-is-design-md", "/api", "/about"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
  }));
  const agentRoutes = AGENT_SNIPPETS.map((agent) => ({
    url: `${SITE_URL}/agents/${agent.id}`,
    changeFrequency: "monthly" as const,
  }));
  const systemRoutes = (await fetchAllSlugs()).map((slug) => ({
    url: `${SITE_URL}/systems/${slug}`,
    changeFrequency: "weekly" as const,
  }));
  // Sample-screen previews exist for every non-restricted system.
  const restricted = new Set<string>();
  const first = await fetchCatalog({}).catch(() => null);
  if (first) {
    const pages = [first.items];
    for (let page = 2; page <= Math.min(first.totalPages, 5); page++) {
      const next = await fetchCatalog({ page }).catch(() => null);
      if (next) pages.push(next.items);
    }
    for (const item of pages.flat()) if (item.restricted) restricted.add(item.slug);
  }
  const previewRoutes = (await fetchAllSlugs())
    .filter((slug) => !restricted.has(slug))
    .flatMap((slug) =>
      SAMPLE_TEMPLATES.map((template) => ({
        url: `${SITE_URL}/systems/${slug}/preview/${template.id}`,
        changeFrequency: "monthly" as const,
      })),
    );
  return [...staticRoutes, ...agentRoutes, ...systemRoutes, ...previewRoutes];
}
