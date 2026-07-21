import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

export interface HealthStatus {
  status: "ok";
  uptime_seconds: number;
  timestamp: string;
  /** Database connectivity: configured + reachable, unreachable, or unset. */
  db: "up" | "down" | "not_configured";
}

/**
 * Liveness/readiness reporting. Always answers 200 with a `db` field rather
 * than failing the probe on a DB hiccup — Dokploy would otherwise restart-loop
 * the container while Postgres recovers.
 */
@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthStatus> {
    const db = this.prisma.enabled
      ? (await this.prisma.ping())
        ? "up"
        : "down"
      : "not_configured";
    return {
      status: "ok",
      uptime_seconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      db,
    };
  }
}
