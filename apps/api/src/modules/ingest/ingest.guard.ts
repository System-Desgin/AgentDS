import { timingSafeEqual } from "node:crypto";
import {
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import type { Env } from "../../config/env.schema";

/**
 * Guards POST /internal/ingest (PRD F-5): bearer token + IP allowlist.
 * With no INGEST_TOKEN configured the endpoint is disabled outright —
 * boot-time ingest still runs regardless.
 */
@Injectable()
export class IngestGuard implements CanActivate {
  constructor(private readonly config: ConfigService<Env, true>) {}

  canActivate(context: ExecutionContext): boolean {
    const token = this.config.get("INGEST_TOKEN", { infer: true });
    if (!token) {
      throw new ServiceUnavailableException("Ingest endpoint is disabled (no token configured)");
    }

    const request = context.switchToHttp().getRequest<Request>();

    const allowlist = this.config
      .get("INGEST_IP_ALLOWLIST", { infer: true })
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean);
    const ip = request.ip ?? "";
    if (!allowlist.includes(ip)) {
      throw new ForbiddenException("Caller IP is not allowlisted for ingest");
    }

    const header = request.headers.authorization ?? "";
    const presented = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
    if (!safeEquals(presented, token)) {
      throw new UnauthorizedException("Invalid ingest token");
    }
    return true;
  }
}

/** Constant-time comparison; length mismatch short-circuits safely. */
function safeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}
