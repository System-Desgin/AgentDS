import { describe, expect, it } from "vitest";
import { HealthController } from "./health.controller";
import { HealthService } from "./health.service";

describe("HealthController", () => {
  const controller = new HealthController(new HealthService());

  it("reports ok status", () => {
    expect(controller.check().status).toBe("ok");
  });

  it("reports a non-negative uptime and an ISO timestamp", () => {
    const result = controller.check();
    expect(result.uptime_seconds).toBeGreaterThanOrEqual(0);
    expect(() => new Date(result.timestamp).toISOString()).not.toThrow();
    expect(result.timestamp).toBe(new Date(result.timestamp).toISOString());
  });
});
