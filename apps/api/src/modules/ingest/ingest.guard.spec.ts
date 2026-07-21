import {
  ForbiddenException,
  ServiceUnavailableException,
  UnauthorizedException,
  type ExecutionContext,
} from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { describe, expect, it } from "vitest";
import type { Env } from "../../config/env.schema";
import { IngestGuard } from "./ingest.guard";

function guardWith(env: Partial<Record<string, string>>): IngestGuard {
  const config = {
    get: (key: string) => env[key],
  } as unknown as ConfigService<Env, true>;
  return new IngestGuard(config);
}

function contextFor(ip: string, authorization?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ ip, headers: authorization ? { authorization } : {} }),
    }),
  } as unknown as ExecutionContext;
}

const ENV = { INGEST_TOKEN: "secret-token", INGEST_IP_ALLOWLIST: "127.0.0.1,::1" };

describe("IngestGuard", () => {
  it("disables the endpoint entirely without a configured token", () => {
    const guard = guardWith({ INGEST_IP_ALLOWLIST: "127.0.0.1" });
    expect(() => guard.canActivate(contextFor("127.0.0.1", "Bearer x"))).toThrow(
      ServiceUnavailableException,
    );
  });

  it("rejects callers outside the IP allowlist", () => {
    const guard = guardWith(ENV);
    expect(() => guard.canActivate(contextFor("203.0.113.9", "Bearer secret-token"))).toThrow(
      ForbiddenException,
    );
  });

  it("rejects missing or wrong bearer tokens", () => {
    const guard = guardWith(ENV);
    expect(() => guard.canActivate(contextFor("127.0.0.1"))).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(contextFor("127.0.0.1", "Bearer nope"))).toThrow(
      UnauthorizedException,
    );
  });

  it("accepts an allowlisted caller with the exact token", () => {
    const guard = guardWith(ENV);
    expect(guard.canActivate(contextFor("::1", "Bearer secret-token"))).toBe(true);
  });
});
