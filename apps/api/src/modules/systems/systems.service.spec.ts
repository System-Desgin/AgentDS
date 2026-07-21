import { join } from "node:path";
import { HttpException, NotFoundException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { listSystemsQuerySchema, type ListSystemsQuery } from "@agentds/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FakePrismaDb, fakePrismaService, seedSystem } from "../../../test/fake-prisma";
import type { Env } from "../../config/env.schema";
import type { EventsService } from "../events/events.service";
import { SystemsService } from "./systems.service";

const FIXTURES = join(__dirname, "../../../test/fixtures/content");

function fakeConfig(): ConfigService<Env, true> {
  return {
    get: (key: string) => (key === "CONTENT_DIR" ? FIXTURES : undefined),
  } as unknown as ConfigService<Env, true>;
}

function query(input: Record<string, unknown> = {}): ListSystemsQuery {
  return listSystemsQuerySchema.parse(input);
}

describe("SystemsService", () => {
  let db: FakePrismaDb;
  let events: { incrementInBackground: ReturnType<typeof vi.fn> };
  let service: SystemsService;

  beforeEach(() => {
    db = new FakePrismaDb();
    events = { incrementInBackground: vi.fn() };
    service = new SystemsService(
      fakePrismaService(db),
      fakeConfig(),
      events as unknown as EventsService,
    );

    db.systems.push(
      seedSystem(),
      seedSystem({
        id: "sys-restricted",
        slug: "restricted-sys",
        name: "Restricted System",
        maker: "Example State",
        licenseSpdx: "MIT",
        restricted: true,
        restrictedReason: "State-restricted identity.",
        categories: [{ categoryId: "government" }],
        createdAt: new Date("2026-07-05T00:00:00Z"),
      }),
      seedSystem({
        id: "sys-draft",
        slug: "draft-sys",
        name: "Draft System",
        status: "draft",
      }),
    );
  });

  describe("list", () => {
    it("returns only published systems in the {data, meta} envelope", async () => {
      const result = await service.list(query());
      expect(result.data.map((s) => s.slug).sort()).toEqual(["restricted-sys", "test-carbon"]);
      expect(result.meta).toEqual({ page: 1, limit: 20, total: 2, total_pages: 1 });
    });

    it("sorts by newest first by default", async () => {
      const result = await service.list(query());
      expect(result.data[0]?.slug).toBe("restricted-sys");
    });

    it("filters by q across name/maker/summary/description", async () => {
      const result = await service.list(query({ q: "restricted" }));
      expect(result.data.map((s) => s.slug)).toEqual(["restricted-sys"]);
    });

    it("filters by category and license (case-insensitive)", async () => {
      const byCategory = await service.list(query({ category: "government" }));
      expect(byCategory.data.map((s) => s.slug)).toEqual(["restricted-sys"]);

      const byLicense = await service.list(query({ license: "apache-2.0" }));
      expect(byLicense.data.map((s) => s.slug)).toEqual(["test-carbon"]);
    });

    it("paginates with limit and page", async () => {
      const page2 = await service.list(query({ limit: 1, page: 2 }));
      expect(page2.data).toHaveLength(1);
      expect(page2.meta).toEqual({ page: 2, limit: 1, total: 2, total_pages: 2 });
    });

    it("orders by api_fetch count for sort=most-fetched", async () => {
      db.counters.push({ id: "c1", slug: "test-carbon", type: "api_fetch", count: 9 });
      const result = await service.list(query({ sort: "most-fetched" }));
      expect(result.data[0]?.slug).toBe("test-carbon");
      expect(result.data[0]?.fetches).toBe(9);
    });
  });

  describe("detail", () => {
    it("maps the full metadata, token summary, lint, and counters", async () => {
      db.counters.push({ id: "c2", slug: "test-carbon", type: "download", count: 3 });
      const detail = await service.detail("test-carbon");
      expect(detail.slug).toBe("test-carbon");
      expect(detail.license).toEqual({
        spdx: "Apache-2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0",
      });
      expect(detail.token_summary).toMatchObject({ fonts: ["IBM Plex Sans"] });
      expect(detail.lint).toMatchObject({ errors: 0, warnings: 0, infos: 1 });
      expect(detail.counters).toEqual({ download: 3, copy: 0, api_fetch: 0 });
      expect(detail.categories).toEqual(["enterprise-dashboard"]);
    });

    it("404s for unknown slugs and drafts", async () => {
      await expect(service.detail("nope")).rejects.toBeInstanceOf(NotFoundException);
      await expect(service.detail("draft-sys")).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("getArtifact", () => {
    it("serves the raw file with content type + etag and counts the fetch", async () => {
      const file = await service.getArtifact("test-carbon", "design.md");
      expect(file.contentType).toBe("text/markdown; charset=utf-8");
      expect(file.buffer.toString("utf8")).toContain("## Overview");
      expect(file.etag).toMatch(/^"[0-9a-f]{32}"$/);
      expect(events.incrementInBackground).toHaveBeenCalledWith("test-carbon", "api_fetch");
    });

    it("prefers the etag recorded at ingest", async () => {
      const carbon = db.systems.find((s) => s.slug === "test-carbon");
      if (carbon) carbon.fileEtags = { "design.md": '"ingest-etag"' };
      const file = await service.getArtifact("test-carbon", "design.md");
      expect(file.etag).toBe('"ingest-etag"');
    });

    it("returns 451 with the restriction reason for restricted entries", async () => {
      const rejection = await service.getArtifact("restricted-sys", "design.md").then(
        () => null,
        (error: unknown) => error,
      );
      expect(rejection).toBeInstanceOf(HttpException);
      expect((rejection as HttpException).getStatus()).toBe(451);
      expect((rejection as HttpException).getResponse()).toMatchObject({
        error: "Unavailable For Legal Reasons",
        message: "State-restricted identity.",
      });
      expect(events.incrementInBackground).not.toHaveBeenCalled();
    });

    it("404s for unknown slugs, drafts, and missing files on disk", async () => {
      await expect(service.getArtifact("nope", "design.md")).rejects.toBeInstanceOf(
        NotFoundException,
      );
      await expect(service.getArtifact("draft-sys", "design.md")).rejects.toBeInstanceOf(
        NotFoundException,
      );
      db.systems.push(seedSystem({ id: "sys-ghost", slug: "ghost-sys" }));
      await expect(service.getArtifact("ghost-sys", "design.md")).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
