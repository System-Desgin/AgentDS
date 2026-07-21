import {
  Injectable,
  Logger,
  ServiceUnavailableException,
  type OnModuleDestroy,
  type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Env } from "../config/env.schema";
import { PrismaClient } from "../generated/prisma/client";

/**
 * Wraps the generated PrismaClient (Prisma 7, @prisma/adapter-pg driver
 * adapter). Composition instead of inheritance so the API still boots when
 * DATABASE_URL is unset (dev without a DB) and tests can substitute `db`
 * with an in-memory fake.
 */
@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly client: PrismaClient | null;

  constructor(config: ConfigService<Env, true>) {
    const url = config.get("DATABASE_URL", { infer: true });
    this.client = url
      ? new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) })
      : null;
  }

  /** Whether a database is configured at all (not whether it is reachable). */
  get enabled(): boolean {
    return this.client !== null;
  }

  /** The live client. Throws 503 on DB-backed routes when no DB is configured. */
  get db(): PrismaClient {
    if (!this.client) {
      throw new ServiceUnavailableException("Database is not configured");
    }
    return this.client;
  }

  /** Quick connectivity probe for the health endpoint. */
  async ping(): Promise<boolean> {
    if (!this.client) return false;
    try {
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async onModuleInit(): Promise<void> {
    if (!this.client) {
      this.logger.warn("DATABASE_URL is not set — DB-backed routes will return 503.");
      return;
    }
    try {
      await this.client.$connect();
    } catch (error) {
      // Don't crash the app on a boot-time DB hiccup; Prisma reconnects
      // lazily on the next query and the healthcheck reports `db: down`.
      this.logger.error(`Database connection failed at boot: ${String(error)}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client?.$disconnect();
  }
}
