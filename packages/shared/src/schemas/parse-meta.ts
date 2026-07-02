import { parse as parseYaml } from "yaml";
import { metaSchema, type Meta } from "./meta-schema";

/**
 * Parse and validate a `meta.yaml` string into a typed, defaulted `Meta`.
 * Throws a `ZodError` on schema violations (or a YAML error on malformed input).
 * Used by the pipeline, CI validation, and API ingest.
 */
export function parseMetaYaml(raw: string): Meta {
  const data: unknown = parseYaml(raw);
  return metaSchema.parse(data);
}

/**
 * Non-throwing variant: returns zod's discriminated result so callers can log
 * structured issues (e.g. ingest skipping an invalid entry) instead of throwing.
 */
export function validateMeta(data: unknown): ReturnType<typeof metaSchema.safeParse> {
  return metaSchema.safeParse(data);
}
