import type { MetadataRoute } from "next";
import { AGENT_SNIPPETS } from "../lib/agent-snippets";
import { fetchAllSlugs } from "../lib/api";
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
  return [...staticRoutes, ...agentRoutes, ...systemRoutes];
}
