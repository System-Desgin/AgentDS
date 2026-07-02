import type { MetaInput, SystemPath } from "@agentds/shared";

/**
 * A schema-valid `meta.yaml` draft for a new entry. Values are placeholders the
 * author replaces; `status` stays `draft` until QA sign-off. Kept valid against
 * the shared schema so `new` output is a working starting point, not a stub.
 */
export function buildMetaTemplate(slug: string, path: SystemPath): MetaInput {
  const isOfficial = path === "official";
  return {
    slug,
    name: "REPLACE: display name",
    path,
    maker: "REPLACE: maker",
    summary: "REPLACE: one-line summary (max 140 characters)",
    description: "REPLACE: fuller description, written fresh from tokens (never copied).",
    categories: ["saas-product"],
    tags: [],
    best_for: [],
    license: {
      spdx: isOfficial ? "REPLACE-SPDX" : "CC-BY-4.0",
      url: "https://example.com/license",
      notes: "",
    },
    provenance: isOfficial
      ? {
          source_type: "npm",
          package: "REPLACE-package",
          version: "0.0.0",
          extracted_at: "2026-01-01",
        }
      : {
          source_type: "css-analysis",
          urls: ["https://example.com"],
          extracted_at: "2026-01-01",
        },
    restricted: false,
    links: {},
    status: "draft",
    spec_version: "alpha",
  };
}
