import { z } from "zod";
import { PURPOSE_CATEGORIES } from "../taxonomy/purpose-categories";
import { SYSTEM_PATHS } from "./meta-schema";

/** Sort options for the catalog list endpoint. */
export const SYSTEM_SORTS = ["newest", "most-fetched"] as const;
export type SystemSort = (typeof SYSTEM_SORTS)[number];

/** Hard ceiling on page size (PRD F-4: `limit` max 100). */
export const MAX_PAGE_LIMIT = 100;
export const DEFAULT_PAGE_LIMIT = 20;

/**
 * Query parameters for `GET /v1/systems`. Values arrive as strings, so numeric
 * fields are coerced. Applied at the API edge via the global validation pipe.
 */
export const listSystemsQuerySchema = z.object({
  path: z.enum(SYSTEM_PATHS).optional(),
  category: z.enum(PURPOSE_CATEGORIES).optional(),
  q: z.string().trim().min(1).max(100).optional(),
  license: z.string().min(1).optional(),
  sort: z.enum(SYSTEM_SORTS).default("newest"),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(MAX_PAGE_LIMIT).default(DEFAULT_PAGE_LIMIT),
});
export type ListSystemsQuery = z.infer<typeof listSystemsQuerySchema>;
export type ListSystemsQueryInput = z.input<typeof listSystemsQuerySchema>;
