import type { PaginationMeta } from "../schemas/pagination";

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
