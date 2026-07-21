import type { PrismaService } from "../src/prisma/prisma.service";

/**
 * In-memory stand-in for the Prisma client covering exactly the query surface
 * the API uses. Lets unit and e2e tests exercise real request paths (filters,
 * 404/451, counters, ingest upserts) with zero database infrastructure.
 */

export interface FakeSystemRow {
  id: string;
  slug: string;
  path: string;
  name: string;
  maker: string;
  summary: string;
  description: string;
  tags: string[];
  bestFor: string[];
  licenseSpdx: string;
  licenseUrl: string;
  licenseNotes: string | null;
  provenance: unknown;
  links: unknown;
  restricted: boolean;
  restrictedReason: string | null;
  status: string;
  specVersion: string;
  tokenSummary: unknown;
  fileEtags: unknown;
  createdAt: Date;
  updatedAt: Date;
  categories: { categoryId: string }[];
  lintReport: FakeLintReportRow | null;
}

interface FakeLintReportRow {
  id: string;
  systemId: string;
  errors: number;
  warnings: number;
  info: number;
  findings: unknown;
  lintedAt: Date;
}

interface FakeCounterRow {
  id: string;
  slug: string;
  type: string;
  count: number;
}

interface WhereContains {
  contains?: string;
  equals?: string;
  mode?: string;
}

interface SystemWhere {
  status?: string | { not?: string };
  path?: string;
  slug?: string | { in?: string[]; notIn?: string[] };
  licenseSpdx?: WhereContains;
  categories?: { some: { categoryId: string } };
  OR?: Record<string, WhereContains>[];
}

let nextId = 1;
function id(): string {
  nextId += 1;
  return `fake-${nextId}`;
}

function textMatch(value: string, cond: WhereContains): boolean {
  const insensitive = cond.mode === "insensitive";
  const norm = (s: string): string => (insensitive ? s.toLowerCase() : s);
  if (cond.contains !== undefined) return norm(value).includes(norm(cond.contains));
  if (cond.equals !== undefined) return norm(value) === norm(cond.equals);
  return true;
}

export class FakePrismaDb {
  systems: FakeSystemRow[] = [];
  counters: FakeCounterRow[] = [];
  categoriesTable = new Map<string, string>();

  private matches(row: FakeSystemRow, where: SystemWhere | undefined): boolean {
    if (!where) return true;
    if (typeof where.status === "string" && row.status !== where.status) return false;
    if (where.path !== undefined && row.path !== where.path) return false;
    if (typeof where.slug === "string" && row.slug !== where.slug) return false;
    if (typeof where.slug === "object" && where.slug !== null) {
      if (where.slug.in && !where.slug.in.includes(row.slug)) return false;
      if (where.slug.notIn && where.slug.notIn.includes(row.slug)) return false;
    }
    if (where.licenseSpdx && !textMatch(row.licenseSpdx, where.licenseSpdx)) return false;
    if (
      where.categories &&
      !row.categories.some((c) => c.categoryId === where.categories?.some.categoryId)
    ) {
      return false;
    }
    if (where.OR) {
      const hit = where.OR.some((clause) =>
        Object.entries(clause).every(([field, cond]) => {
          const value = (row as unknown as Record<string, unknown>)[field];
          return typeof value === "string" && textMatch(value, cond);
        }),
      );
      if (!hit) return false;
    }
    return true;
  }

  readonly system = {
    findMany: (args: { where?: SystemWhere; select?: { slug: true } } = {}) => {
      const rows = this.systems.filter((row) => this.matches(row, args.where));
      if (args.select) return Promise.resolve(rows.map((r) => ({ slug: r.slug })));
      return Promise.resolve(rows.map((r) => ({ ...r })));
    },
    findUnique: (args: { where: { slug: string } }) => {
      const row = this.systems.find((r) => r.slug === args.where.slug);
      return Promise.resolve(row ? { ...row } : null);
    },
    upsert: (args: {
      where: { slug: string };
      create: Record<string, unknown>;
      update: Record<string, unknown>;
    }) => {
      const existing = this.systems.find((r) => r.slug === args.where.slug);
      if (existing) {
        Object.assign(existing, args.update, { updatedAt: new Date() });
        return Promise.resolve({ ...existing });
      }
      const row = {
        id: id(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: [],
        lintReport: null,
        licenseNotes: null,
        restrictedReason: null,
        tokenSummary: null,
        fileEtags: null,
        ...args.create,
      } as unknown as FakeSystemRow;
      this.systems.push(row);
      return Promise.resolve({ ...row });
    },
    updateMany: (args: { where?: SystemWhere; data: { status?: string } }) => {
      const rows = this.systems.filter((row) => this.matches(row, args.where));
      for (const row of rows) Object.assign(row, args.data, { updatedAt: new Date() });
      return Promise.resolve({ count: rows.length });
    },
  };

  readonly counter = {
    findMany: (args: { where?: { slug?: string | { in: string[] }; type?: string } } = {}) => {
      let rows = this.counters;
      const slug = args.where?.slug;
      if (typeof slug === "string") rows = rows.filter((r) => r.slug === slug);
      if (typeof slug === "object" && slug !== null) {
        rows = rows.filter((r) => slug.in.includes(r.slug));
      }
      if (args.where?.type) rows = rows.filter((r) => r.type === args.where?.type);
      return Promise.resolve(rows.map((r) => ({ ...r })));
    },
    upsert: (args: {
      where: { slug_type: { slug: string; type: string } };
      create: { slug: string; type: string; count: number };
      update: { count: { increment: number } };
    }) => {
      const { slug, type } = args.where.slug_type;
      const existing = this.counters.find((r) => r.slug === slug && r.type === type);
      if (existing) {
        existing.count += args.update.count.increment;
        return Promise.resolve({ ...existing });
      }
      const row = { id: id(), ...args.create };
      this.counters.push(row);
      return Promise.resolve({ ...row });
    },
  };

  readonly category = {
    upsert: (args: {
      where: { id: string };
      create: { id: string; label: string };
      update: { label: string };
    }) => {
      this.categoriesTable.set(args.where.id, args.create.label);
      return Promise.resolve({ id: args.where.id, label: args.create.label });
    },
  };

  readonly systemCategory = {
    deleteMany: (args: { where: { systemId: string } }) => {
      const system = this.systems.find((r) => r.id === args.where.systemId);
      if (system) system.categories = [];
      return Promise.resolve({ count: 0 });
    },
    createMany: (args: { data: { systemId: string; categoryId: string }[] }) => {
      for (const item of args.data) {
        const system = this.systems.find((r) => r.id === item.systemId);
        system?.categories.push({ categoryId: item.categoryId });
      }
      return Promise.resolve({ count: args.data.length });
    },
    groupBy: (args: { where?: { system?: { status?: string } } }) => {
      const counts = new Map<string, number>();
      for (const system of this.systems) {
        if (args.where?.system?.status && system.status !== args.where.system.status) continue;
        for (const c of system.categories) {
          counts.set(c.categoryId, (counts.get(c.categoryId) ?? 0) + 1);
        }
      }
      return Promise.resolve(
        [...counts.entries()].map(([categoryId, n]) => ({
          categoryId,
          _count: { systemId: n },
        })),
      );
    },
  };

  readonly lintReport = {
    upsert: (args: {
      where: { systemId: string };
      create: Record<string, unknown>;
      update: Record<string, unknown>;
    }) => {
      const system = this.systems.find((r) => r.id === args.where.systemId);
      if (!system) return Promise.resolve(null);
      if (system.lintReport) {
        Object.assign(system.lintReport, args.update);
      } else {
        system.lintReport = {
          id: id(),
          systemId: system.id,
          ...args.create,
        } as FakeLintReportRow;
      }
      return Promise.resolve({ ...system.lintReport });
    },
  };

  $queryRaw(): Promise<number> {
    return Promise.resolve(1);
  }
}

/** A PrismaService-compatible fake for provider overrides in tests. */
export function fakePrismaService(db: FakePrismaDb): PrismaService {
  const service = {
    enabled: true,
    db,
    ping: () => Promise.resolve(true),
    onModuleInit: () => Promise.resolve(),
    onModuleDestroy: () => Promise.resolve(),
  };
  // The fake intentionally implements only the query surface the app uses.
  return service as unknown as PrismaService;
}

/** A published, ingested-looking system row for seeding unit tests. */
export function seedSystem(overrides: Partial<FakeSystemRow> = {}): FakeSystemRow {
  return {
    id: id(),
    slug: "test-carbon",
    path: "official",
    name: "Test Carbon",
    maker: "IBM",
    summary: "Test system.",
    description: "A test entry.",
    tags: ["test"],
    bestFor: ["Testing"],
    licenseSpdx: "Apache-2.0",
    licenseUrl: "https://www.apache.org/licenses/LICENSE-2.0",
    licenseNotes: null,
    provenance: {
      source_type: "npm",
      package: "@carbon/styles",
      version: "1.0.0",
      extracted_at: "2026-07-01",
    },
    links: {},
    restricted: false,
    restrictedReason: null,
    status: "published",
    specVersion: "alpha",
    tokenSummary: { fonts: ["IBM Plex Sans"], counts: { colors: 2 } },
    fileEtags: null,
    createdAt: new Date("2026-07-01T00:00:00Z"),
    updatedAt: new Date("2026-07-02T00:00:00Z"),
    categories: [{ categoryId: "enterprise-dashboard" }],
    lintReport: {
      id: id(),
      systemId: "x",
      errors: 0,
      warnings: 0,
      info: 1,
      findings: [],
      lintedAt: new Date("2026-07-02T00:00:00Z"),
    },
    ...overrides,
  };
}
