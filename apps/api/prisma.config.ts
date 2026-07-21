import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7): schema/migrations paths and the
 * connection URL for Migrate. The runtime client does not read this — it
 * connects through the @prisma/adapter-pg driver adapter (PrismaService).
 * DATABASE_URL comes from the environment (never from a committed file);
 * it is optional so URL-less commands (`prisma generate`) work in CI.
 */
const url = process.env["DATABASE_URL"];

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  ...(url ? { datasource: { url } } : {}),
});
