import { join } from "node:path";

/**
 * e2e environment. Imported before AppModule so both ConfigModule validation
 * and module-load-time constants (the file-route throttle) see these values.
 */
process.env["NODE_ENV"] = "test";
process.env["LOG_LEVEL"] = "fatal";
process.env["CONTENT_DIR"] = join(__dirname, "fixtures/content");
process.env["INGEST_TOKEN"] = "e2e-token";
process.env["INGEST_IP_ALLOWLIST"] = "127.0.0.1,::1,::ffff:127.0.0.1";
delete process.env["DATABASE_URL"];
