import helmet from "helmet";
import { RequestMethod, ValidationPipe } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

/**
 * Everything the HTTP layer needs besides listening: security headers, CORS,
 * the /v1 prefix, validation, and the problem-details filter. Shared between
 * bootstrap (main.ts) and the e2e suite so tests exercise the real setup.
 */
export function configureApp(app: NestExpressApplication, corsOrigin: string): void {
  app.use(helmet());
  // Exactly one reverse-proxy hop (Traefik) — needed so req.ip and per-IP
  // throttling see the client address, not the proxy's.
  app.set("trust proxy", 1);
  app.enableCors({
    origin: corsOrigin === "*" ? true : corsOrigin.split(",").map((o) => o.trim()),
    methods: ["GET", "POST", "OPTIONS"],
  });

  // Versioned public prefix. Breaking changes require /v2 (PRD F-4).
  // The internal ingest trigger deliberately lives outside /v1.
  app.setGlobalPrefix("v1", {
    exclude: [{ path: "internal/ingest", method: RequestMethod.POST }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
}
