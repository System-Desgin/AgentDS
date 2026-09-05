import { fetchCatalogOptions } from "../../lib/api";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  const catalog = await fetchCatalogOptions();
  const downloadable = catalog.items.filter((system) => !system.restricted);
  const selected = downloadable[Math.floor(Math.random() * downloadable.length)];
  const destination = selected ? `/systems/${selected.slug}` : "/systems";

  return new Response(null, {
    status: 307,
    headers: {
      "cache-control": "no-store",
      location: new URL(destination, request.url).toString(),
    },
  });
}
