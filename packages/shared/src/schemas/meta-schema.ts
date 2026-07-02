import { z } from "zod";
import { PURPOSE_CATEGORIES } from "../taxonomy/purpose-categories";

/** Catalog path — the visitor's two choices. */
export const SYSTEM_PATHS = ["official", "brand-look"] as const;
export type SystemPath = (typeof SYSTEM_PATHS)[number];

/** How an entry's tokens were sourced (drives provenance requirements). */
export const SOURCE_TYPES = ["npm", "repo", "css-analysis"] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

/** Publication state — nothing is served publicly until `published`. */
export const ENTRY_STATUSES = ["draft", "published"] as const;
export type EntryStatus = (typeof ENTRY_STATUSES)[number];

/** Reusable kebab-case slug — the folder name and URL segment for an entry. */
export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case (a-z, 0-9, hyphens)");

const isDateLike = (value: string): boolean => !Number.isNaN(Date.parse(value));

export const licenseSchema = z.object({
  spdx: z.string().min(1, "license.spdx is required (SPDX identifier)"),
  url: z.url(),
  notes: z.string().optional(),
});
export type License = z.infer<typeof licenseSchema>;

export const provenanceSchema = z.object({
  source_type: z.enum(SOURCE_TYPES),
  package: z.string().optional(),
  version: z.string().optional(),
  repo: z.url().optional(),
  commit: z.string().optional(),
  /** Brand Looks: the public page URLs the analysis was captured from. */
  urls: z.array(z.url()).optional(),
  extracted_at: z.string().refine(isDateLike, "extracted_at must be a valid date"),
});
export type Provenance = z.infer<typeof provenanceSchema>;

export const linksSchema = z.object({
  official_site: z.url().optional(),
  docs: z.url().optional(),
  figma: z.url().optional(),
  github: z.url().optional(),
});
export type Links = z.infer<typeof linksSchema>;

/**
 * Full catalog metadata for one entry (`content/<path>/<slug>/meta.yaml`).
 * The source of truth for the shape of every catalog entry; the API ingest,
 * pipeline, and CI all validate against this exact schema.
 */
export const metaSchema = z
  .object({
    slug: slugSchema,
    name: z.string().min(1),
    path: z.enum(SYSTEM_PATHS),
    maker: z.string().min(1),
    summary: z.string().min(1).max(140, "summary must be <= 140 characters"),
    description: z.string().min(1),
    categories: z.array(z.enum(PURPOSE_CATEGORIES)).min(1, "at least one category is required"),
    tags: z.array(z.string()).default([]),
    best_for: z.array(z.string()).default([]),
    license: licenseSchema,
    provenance: provenanceSchema,
    restricted: z.boolean().default(false),
    restricted_reason: z.string().optional(),
    links: linksSchema.default({}),
    status: z.enum(ENTRY_STATUSES).default("draft"),
    spec_version: z.string().min(1),
  })
  .superRefine((meta, ctx) => {
    if (meta.restricted && !meta.restricted_reason) {
      ctx.addIssue({
        code: "custom",
        message: "restricted_reason is required when restricted is true",
        path: ["restricted_reason"],
      });
    }

    if (meta.path === "official") {
      if (meta.provenance.source_type === "css-analysis") {
        ctx.addIssue({
          code: "custom",
          message: "official entries must use npm or repo provenance, not css-analysis",
          path: ["provenance", "source_type"],
        });
      }
      const hasNpm = Boolean(meta.provenance.package && meta.provenance.version);
      const hasRepo = Boolean(meta.provenance.repo && meta.provenance.commit);
      if (!hasNpm && !hasRepo) {
        ctx.addIssue({
          code: "custom",
          message: "official entries require package@version or repo@commit provenance",
          path: ["provenance"],
        });
      }
    }

    if (meta.path === "brand-look" && meta.provenance.source_type !== "css-analysis") {
      ctx.addIssue({
        code: "custom",
        message: "brand-look entries must use css-analysis provenance",
        path: ["provenance", "source_type"],
      });
    }
  });

/** Validated metadata (output — defaults applied). */
export type Meta = z.infer<typeof metaSchema>;
/** Raw metadata (input — before defaults, e.g. parsed straight from YAML). */
export type MetaInput = z.input<typeof metaSchema>;
