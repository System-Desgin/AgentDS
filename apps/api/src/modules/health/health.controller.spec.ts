import { describe, expect, it } from "vitest";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";
import type { PrismaService } from "../../prisma/prisma.service";

function makeController(prisma: Partial<PrismaService>): HealthController {
  return new HealthController(new HealthService(prisma as PrismaService));
}

describe("HealthController", () => {
  const noDb = makeController({ enabled: false, ping: () => Promise.resolve(false) });

  it("reports ok status", async () => {
    expect((await noDb.check()).status).toBe("ok");
  });

  it("reports a non-negative uptime and an ISO timestamp", async () => {
    const result = await noDb.check();
    expect(result.uptime_seconds).toBeGreaterThanOrEqual(0);
    expect(result.timestamp).toBe(new Date(result.timestamp).toISOString());
  });

  it("reports db not_configured when DATABASE_URL is unset", async () => {
    expect((await noDb.check()).db).toBe("not_configured");
  });

  it("reports db up when the ping succeeds", async () => {
    const controller = makeController({ enabled: true, ping: () => Promise.resolve(true) });
    expect((await controller.check()).db).toBe("up");
  });

  it("reports db down when the ping fails", async () => {
    const controller = makeController({ enabled: true, ping: () => Promise.resolve(false) });
    expect((await controller.check()).db).toBe("down");
  });
});
