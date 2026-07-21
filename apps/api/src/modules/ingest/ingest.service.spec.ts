import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { join } from "node:path";
import type { ConfigService } from "@nestjs/config";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { FakePrismaDb, fakePrismaService, seedSystem } from "../../../test/fake-prisma";
import type { Env } from "../../config/env.schema";
import { IngestService } from "./ingest.service";

const FIXTURES = join(__dirname, "../../../test/fixtures/content");

function fakeConfig(contentDir: string | undefined = FIXTURES): ConfigService<Env, true> {
  return {
    get: (key: string) => (key === "CONTENT_DIR" ? contentDir : undefined),
  } as unknown as ConfigService<Env, true>;
}

describe("IngestService", () => {
  let db: FakePrismaDb;
  let service: IngestService;

  beforeEach(() => {
    db = new FakePrismaDb();
    service = new IngestService(fakePrismaService(db), fakeConfig());
  });

  afterAll(async () => {
    // Ingest pre-builds bundle.zip next to each fixture entry (gitignored).
    for (const slug of ["test-carbon", "restricted-sys", "draft-sys", "broken-sys"]) {
      await rm(join(FIXTURES, "official", slug, "bundle.zip"), { force: true });
    }
  });

  it("ingests valid entries and skips the invalid one with a reason", async () => {
    const summary = await service.ingestAll();

    expect(summary.scanned).toBe(4);
    expect(summary.ingested).toBe(3);
    expect(summary.skipped).toHaveLength(1);
    expect(summary.skipped[0]).toMatchObject({ slug: "broken-sys" });
    expect(summary.skipped[0]?.reason).toContain("invalid meta.yaml");

    const slugs = db.systems.map((s) => s.slug).sort();
    expect(slugs).toEqual(["draft-sys", "restricted-sys", "test-carbon"]);
  });

  it("stores status, categories, lint report, token summary, and file etags", async () => {
    await service.ingestAll();

    const carbon = db.systems.find((s) => s.slug === "test-carbon");
    expect(carbon).toBeDefined();
    expect(carbon?.status).toBe("published");
    expect(carbon?.categories.map((c) => c.categoryId).sort()).toEqual([
      "data-dense",
      "enterprise-dashboard",
    ]);
    expect(carbon?.lintReport).toMatchObject({ errors: 0, warnings: 0, info: 1 });
    expect(carbon?.tokenSummary).toMatchObject({
      fonts: ["IBM Plex Sans"],
      counts: { colors: 3, typography: 1, components: 1 },
    });
    const etags = carbon?.fileEtags as Record<string, string>;
    for (const artifact of ["design.md", "tokens.json", "tailwind.css", "bundle.zip"]) {
      expect(etags[artifact]).toMatch(/^"[0-9a-f]{32}"$/);
    }

    const draft = db.systems.find((s) => s.slug === "draft-sys");
    expect(draft?.status).toBe("draft");
    const restricted = db.systems.find((s) => s.slug === "restricted-sys");
    expect(restricted?.restricted).toBe(true);
  });

  it("pre-builds bundle.zip next to each ingested entry", async () => {
    await service.ingestAll();
    expect(existsSync(join(FIXTURES, "official", "test-carbon", "bundle.zip"))).toBe(true);
    expect(existsSync(join(FIXTURES, "official", "broken-sys", "bundle.zip"))).toBe(false);
  });

  it("demotes published DB entries that vanished from disk", async () => {
    db.systems.push(seedSystem({ id: "sys-gone", slug: "gone-sys", status: "published" }));

    const summary = await service.ingestAll();

    expect(summary.demoted).toEqual(["gone-sys"]);
    expect(db.systems.find((s) => s.slug === "gone-sys")?.status).toBe("draft");
  });

  it("re-ingest is idempotent (upserts, no duplicates)", async () => {
    await service.ingestAll();
    const summary = await service.ingestAll();

    expect(summary.ingested).toBe(3);
    expect(db.systems.filter((s) => s.slug === "test-carbon")).toHaveLength(1);
    expect(db.systems.find((s) => s.slug === "test-carbon")?.categories).toHaveLength(2);
  });

  it("fails loudly when the content directory cannot be found", async () => {
    const broken = new IngestService(fakePrismaService(db), fakeConfig("/nonexistent"));
    await expect(broken.ingestAll()).rejects.toThrow(/Content directory not found/);
  });
});
