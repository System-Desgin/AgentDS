import { PURPOSE_CATEGORIES, PURPOSE_CATEGORY_LABELS } from "@agentds/shared";
import { fetchCatalog } from "../../lib/api";
import { API_URL, SITE_URL } from "../../lib/site";

export const revalidate = 3600;

/** llms.txt — a machine-readable site guide for AI crawlers/agents. */
export async function GET(): Promise<Response> {
  const firstPage = await fetchCatalog({});
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, firstPage.totalPages - 1) }, (_, index) =>
      fetchCatalog({ page: index + 2 }),
    ),
  );
  const systems = [firstPage, ...remainingPages].flatMap((page) => page.items);
  const lines = [
    "# AgentDS",
    "",
    "> A free catalog of agent-ready design system files (DESIGN.md + tokens):",
    "> Official Systems extracted from real token packages, and Brand Looks —",
    "> independent analyses of famous product sites. Public read-only API.",
    "",
    "## Key pages",
    `- [Catalog](${SITE_URL}/systems): browse and filter every published system`,
    `- [What is DESIGN.md](${SITE_URL}/what-is-design-md): the format explained`,
    `- [API docs](${SITE_URL}/api): fetch endpoints, no keys required`,
    "",
    "## Browse by purpose",
    ...PURPOSE_CATEGORIES.map(
      (category) =>
        `- [${PURPOSE_CATEGORY_LABELS[category]}](${SITE_URL}/systems/category/${category})`,
    ),
    "",
    "## API",
    `- List systems: ${API_URL}/v1/systems`,
    `- Raw file: ${API_URL}/v1/systems/{slug}/design.md`,
    "",
    "## Published systems",
    ...systems.map((item) => `- [${item.name}](${SITE_URL}/systems/${item.slug}): ${item.summary}`),
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
