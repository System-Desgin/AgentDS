import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { LoggerModule } from "nestjs-pino";
import type { Env } from "./config/env.schema";
import { validateEnv } from "./config/env.schema";
import { HealthModule } from "./modules/health/health.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validate: validateEnv,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => {
        const isDev = config.get("NODE_ENV", { infer: true }) === "development";
        return {
          pinoHttp: {
            level: config.get("LOG_LEVEL", { infer: true }),
            // Never logs request bodies; never retains IPs beyond the rate-limit window.
            redact: ["req.headers.authorization", "req.headers.cookie"],
            // Pretty logs in dev; structured JSON in production. Only set the
            // transport when present (exactOptionalPropertyTypes forbids `undefined`).
            ...(isDev
              ? { transport: { target: "pino-pretty", options: { singleLine: true } } }
              : {}),
          },
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) => ({
        throttlers: [
          {
            ttl: config.get("RATE_LIMIT_TTL_MS", { infer: true }),
            limit: config.get("RATE_LIMIT_LIMIT", { infer: true }),
          },
        ],
      }),
    }),
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
