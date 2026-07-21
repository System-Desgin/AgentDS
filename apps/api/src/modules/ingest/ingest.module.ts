import { Injectable, Logger, Module, type OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Env } from "../../config/env.schema";
import { PrismaService } from "../../prisma/prisma.service";
import { IngestController } from "./ingest.controller";
import { IngestGuard } from "./ingest.guard";
import { IngestService } from "./ingest.service";

/**
 * Runs ingest once at boot (PRD F-5: "runs on boot"). Failures are logged,
 * never fatal — the API must still serve whatever the DB already holds.
 */
@Injectable()
export class IngestBootstrap implements OnApplicationBootstrap {
  private readonly logger = new Logger(IngestBootstrap.name);

  constructor(
    private readonly ingestService: IngestService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    if (!this.prisma.enabled) {
      this.logger.warn("Skipping boot ingest: no database configured.");
      return;
    }
    if (this.config.get("SKIP_BOOT_INGEST", { infer: true }) === "1") {
      this.logger.warn("Skipping boot ingest: SKIP_BOOT_INGEST=1.");
      return;
    }
    try {
      await this.ingestService.ingestAll();
    } catch (error) {
      this.logger.error(`Boot ingest failed: ${String(error)}`);
    }
  }
}

@Module({
  controllers: [IngestController],
  providers: [IngestService, IngestGuard, IngestBootstrap],
  exports: [IngestService],
})
export class IngestModule {}
