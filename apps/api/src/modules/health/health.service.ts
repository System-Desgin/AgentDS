import { Injectable } from "@nestjs/common";

export interface HealthStatus {
  status: "ok";
  uptime_seconds: number;
  timestamp: string;
}

/** Liveness/readiness reporting. DB readiness checks are added in Phase 2. */
@Injectable()
export class HealthService {
  check(): HealthStatus {
    return {
      status: "ok",
      uptime_seconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
