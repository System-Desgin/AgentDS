import { z } from "zod";

/**
 * Validates and types `process.env` at boot. NestJS ConfigModule runs this via
 * `validate`; an invalid environment fails fast with a readable error rather
 * than surfacing as a runtime bug later.
 *
 * Note: ANTHROPIC_API_KEY is intentionally absent — it must never be set in any
 * repo environment (see CLAUDE.md: it reroutes pipeline billing off the plan).
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  // Postgres connection. Optional in Phase 0 (the API boots without a DB);
  // required once the persistence layer lands in Phase 2.
  DATABASE_URL: z.string().url().optional(),

  // Open CORS for public GET traffic; comma-separated origins or "*".
  CORS_ORIGIN: z.string().default("*"),

  // Bearer token guarding POST /internal/ingest. Unset = ingest endpoint
  // disabled (boot-time ingest still runs).
  INGEST_TOKEN: z.string().min(1).optional(),

  // Comma-separated IPs allowed to call POST /internal/ingest.
  // Defaults to loopback only — override for Dokploy-internal callers.
  INGEST_IP_ALLOWLIST: z.string().default("127.0.0.1,::1,::ffff:127.0.0.1"),

  // Content directory baked into the image (/app/content in Docker). Unset in
  // dev = resolved by walking up from cwd to the repo's content/ folder.
  CONTENT_DIR: z.string().min(1).optional(),

  // Set to "1" to skip the boot-time ingest (tests / one-off debugging).
  SKIP_BOOT_INGEST: z.enum(["0", "1"]).default("0"),

  // Global throttler defaults (requests per window per IP); file routes get a
  // higher ceiling (PRD F-4: 60/min global, 120/min file endpoints).
  RATE_LIMIT_TTL_MS: z.coerce.number().int().positive().default(60_000),
  RATE_LIMIT_LIMIT: z.coerce.number().int().positive().default(60),
  RATE_LIMIT_FILES_LIMIT: z.coerce.number().int().positive().default(120),

  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
});

export type Env = z.infer<typeof envSchema>;

/** ConfigModule `validate` hook — throws with all issues if the env is invalid. */
export function validateEnv(config: Record<string, unknown>): Env {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return parsed.data;
}
