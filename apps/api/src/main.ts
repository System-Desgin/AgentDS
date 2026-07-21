import "reflect-metadata";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "nestjs-pino";
import type { Env } from "./config/env.schema";
import { AppModule } from "./app.module";
import { configureApp } from "./app.setup";

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  const config = app.get(ConfigService<Env, true>);
  const port = config.get("PORT", { infer: true });

  configureApp(app, config.get("CORS_ORIGIN", { infer: true }));
  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle("AgentDS API")
    .setDescription("Public, read-only fetch API for agent-ready design system files.")
    .setVersion("1.0")
    .addTag("systems", "Catalog list, detail, and raw-file endpoints")
    .addTag("categories", "Purpose taxonomy with counts")
    .addTag("events", "Aggregate usage counters (fire-and-forget)")
    .addTag("health")
    .addTag("internal", "Token-gated operational endpoints")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("docs", app, document, { jsonDocumentUrl: "docs-json" });

  await app.listen(port, "0.0.0.0");
  app.get(Logger).log(`AgentDS API listening on port ${port} (docs at /docs)`);
}

void bootstrap();
