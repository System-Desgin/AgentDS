import { Injectable, Logger } from "@nestjs/common";
import type { EventType } from "@agentds/shared";
import { PrismaService } from "../../prisma/prisma.service";

/**
 * Aggregate usage counters (PRD F-3): one row per slug+type, incremented
 * atomically. No per-request rows, no IPs, no timestamps per hit — counts only.
 */
@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async increment(slug: string, type: EventType): Promise<void> {
    await this.prisma.db.counter.upsert({
      where: { slug_type: { slug, type } },
      create: { slug, type, count: 1 },
      update: { count: { increment: 1 } },
    });
  }

  /**
   * Fire-and-forget variant for server-side api_fetch increments on raw-file
   * GETs — a counter failure must never fail the file response.
   */
  incrementInBackground(slug: string, type: EventType): void {
    void this.increment(slug, type).catch((error: unknown) => {
      this.logger.warn(`Counter increment failed for ${slug}/${type}: ${String(error)}`);
    });
  }
}
