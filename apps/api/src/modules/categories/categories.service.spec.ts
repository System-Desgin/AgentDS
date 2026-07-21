import { PURPOSE_CATEGORIES } from "@agentds/shared";
import { describe, expect, it } from "vitest";
import { FakePrismaDb, fakePrismaService, seedSystem } from "../../../test/fake-prisma";
import { CategoriesService } from "./categories.service";

describe("CategoriesService", () => {
  it("returns every taxonomy category with published counts (zero-filled)", async () => {
    const db = new FakePrismaDb();
    db.systems.push(
      seedSystem({
        categories: [{ categoryId: "enterprise-dashboard" }, { categoryId: "data-dense" }],
      }),
      seedSystem({
        id: "sys-2",
        slug: "other-sys",
        categories: [{ categoryId: "enterprise-dashboard" }],
      }),
      // Draft entries must not count.
      seedSystem({
        id: "sys-3",
        slug: "draft-sys",
        status: "draft",
        categories: [{ categoryId: "fintech" }],
      }),
    );

    const service = new CategoriesService(fakePrismaService(db));
    const list = await service.list();

    expect(list).toHaveLength(PURPOSE_CATEGORIES.length);
    const byId = new Map(list.map((c) => [c.id, c]));
    expect(byId.get("enterprise-dashboard")).toMatchObject({
      label: "Enterprise dashboard",
      count: 2,
    });
    expect(byId.get("data-dense")?.count).toBe(1);
    expect(byId.get("fintech")?.count).toBe(0);
    expect(byId.get("mobile-first")?.count).toBe(0);
  });
});
