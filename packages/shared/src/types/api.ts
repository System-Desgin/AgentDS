import type { PaginationMeta } from "../schemas/pagination";
import type { License, Links, Provenance } from "../schemas/meta-schema";
import type { TokenSummary } from "../content/token-summary";

/**
 * Standard success envelope (CLAUDE.md convention: `{ data, meta }`).
 * `meta` is optional for single-resource responses.
 */
export interface ApiEnvelope<T> {
  data: T;
  meta?: Record<string, unknown>;
}

/** Paginated list envelope — `meta` always carries pagination info. */
export interface PaginatedEnvelope<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Problem-details error shape (CLAUDE.md convention). No stack traces or
 * internal paths are ever exposed here in production.
 */
export interface ProblemDetails {
  statusCode: number;
  error: string;
  message: string | string[];
}

/** One row of `GET /v1/systems` (published entries only). */
export interface SystemListItem {
  slug: string;
  name: string;
  path: string;
  maker: string;
  summary: string;
  categories: string[];
  tags: string[];
  license_spdx: string;
  restricted: boolean;
  /** Aggregate api_fetch counter (drives the "most-fetched" sort). */
  fetches: number;
  /** First tokens of the palette, for the catalog card mini-swatches (F-1). */
  palette: string[];
  /** Display font family for the card initial, when the system declares one. */
  display_font?: string;
  updated_at: string;
}

/** Lint state recorded at ingest from the pipeline's lint-report.json. */
export interface LintSummaryDto {
  errors: number;
  warnings: number;
  infos: number;
  linted_at: string;
}

/** Aggregate usage counters for one entry (no PII, PRD F-3). */
export interface SystemCountersDto {
  download: number;
  copy: number;
  api_fetch: number;
}

/** Full payload of `GET /v1/systems/{slug}`. */
export interface SystemDetail {
  slug: string;
  name: string;
  path: string;
  maker: string;
  summary: string;
  description: string;
  categories: string[];
  tags: string[];
  best_for: string[];
  license: License;
  provenance: Provenance;
  links: Links;
  restricted: boolean;
  restricted_reason?: string;
  status: string;
  spec_version: string;
  token_summary: TokenSummary | null;
  lint: LintSummaryDto | null;
  counters: SystemCountersDto;
  updated_at: string;
}

/** One row of `GET /v1/categories`: taxonomy entry + published-system count. */
export interface CategoryWithCount {
  id: string;
  label: string;
  count: number;
}
