// e2e-env must load before AppModule (env-driven config + static constants).
import "./e2e-env";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import type { INestApplication } from "@nestjs/common";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { AppModule } from "../src/app.module";
import { configureApp } from "../src/app.setup";
import { PrismaService } from "../src/prisma/prisma.service";
import { FakePrismaDb, fakePrismaService } from "./fake-prisma";

const FIXTURES = join(__dirname, "fixtures/content");

async function createApp(): Promise<{ app: INestApplication; db: FakePrismaDb }> {
  const db = new FakePrismaDb();
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(PrismaService)
    .useValue(fakePrismaService(db))
    .compile();

  const app = moduleRef.createNestApplication<NestExpressApplication>({ logger: false });
  configureApp(app, "*");
  // app.init() triggers the boot ingest, which seeds the fake DB from fixtures.
  await app.init();
  return { app, db };
}

describe("AgentDS API (e2e)", () => {
  let app: INestApplication;
  let db: FakePrismaDb;
  let server: ReturnType<INestApplication["getHttpServer"]>;

  beforeAll(async () => {
    ({ app, db } = await createApp());
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
    for (const slug of ["test-carbon", "restricted-sys", "draft-sys", "broken-sys"]) {
      await rm(join(FIXTURES, "official", slug, "bundle.zip"), { force: true });
    }
  });

  describe("boot ingest", () => {
    it("seeded published + draft entries and skipped the broken one", () => {
      expect(db.systems.map((s) => s.slug).sort()).toEqual([
        "draft-sys",
        "restricted-sys",
        "test-carbon",
      ]);
    });
  });

  describe("GET /v1/health", () => {
    it("reports ok with db state", async () => {
      const res = await request(server).get("/v1/health").expect(200);
      expect(res.body).toMatchObject({ status: "ok", db: "up" });
    });
  });

  describe("GET /v1/systems", () => {
    it("lists published systems in the {data, meta} envelope", async () => {
      const res = await request(server).get("/v1/systems").expect(200);
      expect(res.body.meta).toMatchObject({ page: 1, limit: 20, total: 2 });
      const slugs = (res.body.data as { slug: string }[]).map((s) => s.slug).sort();
      expect(slugs).toEqual(["restricted-sys", "test-carbon"]);
    });

    it("applies filters from the query string", async () => {
      const res = await request(server).get("/v1/systems?q=fixture&category=data-dense");
      expect(res.status).toBe(200);
      expect((res.body.data as { slug: string }[]).map((s) => s.slug)).toEqual(["test-carbon"]);
    });

    it("rejects an over-limit page size (limit max 100)", async () => {
      const res = await request(server).get("/v1/systems?limit=500").expect(400);
      expect(res.body).toMatchObject({ statusCode: 400 });
    });
  });

  describe("GET /v1/systems/:slug", () => {
    it("returns full metadata + token summary for a published entry", async () => {
      const res = await request(server).get("/v1/systems/test-carbon").expect(200);
      expect(res.body.data).toMatchObject({
        slug: "test-carbon",
        maker: "IBM",
        license: { spdx: "Apache-2.0" },
      });
      expect(res.body.data.token_summary.counts).toMatchObject({ colors: 3 });
      expect(res.body.data.lint).toMatchObject({ errors: 0 });
    });

    it("404s for drafts and unknown slugs with problem-details", async () => {
      await request(server).get("/v1/systems/draft-sys").expect(404);
      const res = await request(server).get("/v1/systems/does-not-exist").expect(404);
      expect(res.body).toMatchObject({ statusCode: 404, error: "NOT FOUND" });
    });
  });

  describe("raw-file endpoints", () => {
    it("serves design.md with markdown content type, ETag, and cache policy", async () => {
      const res = await request(server).get("/v1/systems/test-carbon/design.md").expect(200);
      expect(res.headers["content-type"]).toBe("text/markdown; charset=utf-8");
      expect(res.headers["etag"]).toMatch(/^"[0-9a-f]{32}"$/);
      expect(res.headers["cache-control"]).toBe(
        "public, max-age=300, stale-while-revalidate=86400",
      );
      expect(res.text).toContain("## Overview");
    });

    it("serves tokens.json and tailwind.css with exact content types", async () => {
      const tokens = await request(server).get("/v1/systems/test-carbon/tokens.json").expect(200);
      expect(tokens.headers["content-type"]).toBe("application/json; charset=utf-8");

      const css = await request(server).get("/v1/systems/test-carbon/tailwind.css").expect(200);
      expect(css.headers["content-type"]).toBe("text/css; charset=utf-8");
    });

    it("serves the pre-built bundle.zip as an attachment", async () => {
      const res = await request(server)
        .get("/v1/systems/test-carbon/bundle.zip")
        .buffer()
        .expect(200);
      expect(res.headers["content-type"]).toBe("application/zip");
      expect(res.headers["content-disposition"]).toContain("test-carbon-design-md.zip");
    });

    it("honors If-None-Match with a 304", async () => {
      const first = await request(server).get("/v1/systems/test-carbon/design.md").expect(200);
      const etag = first.headers["etag"] as string;
      await request(server)
        .get("/v1/systems/test-carbon/design.md")
        .set("If-None-Match", etag)
        .expect(304);
    });

    it("returns 451 with a JSON reason for restricted entries", async () => {
      const res = await request(server).get("/v1/systems/restricted-sys/design.md").expect(451);
      expect(res.body).toEqual({
        statusCode: 451,
        error: "Unavailable For Legal Reasons",
        message: "Visual identity legally restricted to the issuing state.",
      });
    });

    it("404s for drafts and unknown artifacts", async () => {
      await request(server).get("/v1/systems/draft-sys/design.md").expect(404);
      await request(server).get("/v1/systems/does-not-exist/tokens.json").expect(404);
    });

    it("increments the api_fetch counter server-side", async () => {
      const before =
        db.counters.find((c) => c.slug === "test-carbon" && c.type === "api_fetch")?.count ?? 0;
      await request(server).get("/v1/systems/test-carbon/design.md").expect(200);
      // The increment is fire-and-forget; give it a tick to settle.
      await new Promise((resolve) => setTimeout(resolve, 20));
      const after =
        db.counters.find((c) => c.slug === "test-carbon" && c.type === "api_fetch")?.count ?? 0;
      expect(after).toBe(before + 1);
    });
  });

  describe("GET /v1/categories", () => {
    it("returns the full taxonomy with published counts", async () => {
      const res = await request(server).get("/v1/categories").expect(200);
      const data = res.body.data as { id: string; count: number }[];
      expect(data).toHaveLength(12);
      expect(data.find((c) => c.id === "enterprise-dashboard")?.count).toBe(1);
      expect(data.find((c) => c.id === "government")?.count).toBe(1);
      expect(data.find((c) => c.id === "fintech")?.count).toBe(0);
    });
  });

  describe("POST /v1/events", () => {
    it("accepts a valid counter event with 202", async () => {
      const res = await request(server)
        .post("/v1/events")
        .send({ slug: "test-carbon", type: "copy" })
        .expect(202);
      expect(res.body).toEqual({ data: { accepted: true } });
      expect(db.counters.find((c) => c.type === "copy")?.count).toBe(1);
    });

    it("rejects unknown event types with 400", async () => {
      await request(server)
        .post("/v1/events")
        .send({ slug: "test-carbon", type: "tracking-pixel" })
        .expect(400);
    });
  });

  describe("POST /internal/ingest", () => {
    it("lives outside the /v1 prefix and requires the bearer token", async () => {
      await request(server).post("/internal/ingest").expect(401);
      await request(server)
        .post("/internal/ingest")
        .set("Authorization", "Bearer wrong")
        .expect(401);
    });

    it("re-syncs with a valid token and reports the summary", async () => {
      const res = await request(server)
        .post("/internal/ingest")
        .set("Authorization", "Bearer e2e-token")
        .expect(200);
      expect(res.body.data).toMatchObject({ scanned: 4, ingested: 3 });
      expect(res.body.data.skipped[0]).toMatchObject({ slug: "broken-sys" });
    });
  });
});

describe("rate limiting (e2e)", () => {
  it("returns 429 with Retry-After beyond the global limit", async () => {
    process.env["RATE_LIMIT_LIMIT"] = "3";
    const { app } = await createApp();
    try {
      const server = app.getHttpServer();
      for (let i = 0; i < 3; i += 1) {
        await request(server).get("/v1/categories").expect(200);
      }
      const limited = await request(server).get("/v1/categories").expect(429);
      expect(limited.headers["retry-after"]).toBeDefined();
      expect(limited.body).toMatchObject({ statusCode: 429 });
    } finally {
      delete process.env["RATE_LIMIT_LIMIT"];
      await app.close();
    }
  });
});
