import { describe, expect, it } from "vitest";
import { FakePrismaDb, fakePrismaService } from "../../../test/fake-prisma";
import type { PrismaService } from "../../prisma/prisma.service";
import { EventsService } from "./events.service";

describe("EventsService", () => {
  it("creates then increments the aggregate counter", async () => {
    const db = new FakePrismaDb();
    const service = new EventsService(fakePrismaService(db));

    await service.increment("carbon", "copy");
    await service.increment("carbon", "copy");
    await service.increment("carbon", "download");

    expect(db.counters).toEqual([
      expect.objectContaining({ slug: "carbon", type: "copy", count: 2 }),
      expect.objectContaining({ slug: "carbon", type: "download", count: 1 }),
    ]);
  });

  it("swallows failures in the background variant", async () => {
    const failing = {
      enabled: true,
      db: {
        counter: {
          upsert: () => Promise.reject(new Error("db down")),
        },
      },
    } as unknown as PrismaService;
    const service = new EventsService(failing);

    expect(() => service.incrementInBackground("carbon", "api_fetch")).not.toThrow();
    // Give the rejected promise a tick to settle through the catch handler.
    await new Promise((resolve) => setImmediate(resolve));
  });
});
