import { describe, expect, it } from "vitest";
import { stringify as toYaml } from "yaml";
import { metaSchema, type MetaInput } from "./meta-schema";
import { parseMetaYaml, validateMeta } from "./parse-meta";

/** A minimal valid Official entry, used as a base for targeted mutations. */
function officialMeta(overrides: Partial<MetaInput> = {}): MetaInput {
  return {
    slug: "carbon",
    name: "Carbon",
    path: "official",
    maker: "IBM",
    summary: "IBM's open-source design system with the cleanest token packages.",
    description: "Carbon is IBM's design system, extracted from its published token packages.",
    categories: ["enterprise-dashboard", "data-dense"],
    tags: ["ibm", "enterprise"],
    best_for: ["dashboards"],
    license: { spdx: "Apache-2.0", url: "https://www.apache.org/licenses/LICENSE-2.0" },
    provenance: {
      source_type: "npm",
      package: "@carbon/themes",
      version: "11.0.0",
      extracted_at: "2026-07-02",
    },
    spec_version: "alpha",
    ...overrides,
  };
}

/** A minimal valid Brand Look entry. */
function brandLookMeta(overrides: Partial<MetaInput> = {}): MetaInput {
  return {
    slug: "stripe",
    name: "Stripe",
    path: "brand-look",
    maker: "Stripe",
    summary: "Independent analysis of Stripe's marketing site visual language.",
    description: "An independent look at the publicly observable design of stripe.com.",
    categories: ["fintech", "marketing-site"],
    license: { spdx: "CC-BY-4.0", url: "https://creativecommons.org/licenses/by/4.0/" },
    provenance: {
      source_type: "css-analysis",
      urls: ["https://stripe.com"],
      extracted_at: "2026-07-02",
    },
    spec_version: "alpha",
    ...overrides,
  };
}

describe("metaSchema", () => {
  it("accepts a valid Official entry and applies defaults", () => {
    const result = metaSchema.safeParse(officialMeta());
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("draft");
      expect(result.data.restricted).toBe(false);
      expect(result.data.links).toEqual({});
    }
  });

  it("accepts a valid Brand Look entry", () => {
    expect(metaSchema.safeParse(brandLookMeta()).success).toBe(true);
  });

  it("rejects a non-kebab-case slug", () => {
    expect(metaSchema.safeParse(officialMeta({ slug: "Carbon Design" })).success).toBe(false);
  });

  it("rejects a summary over 140 characters", () => {
    expect(metaSchema.safeParse(officialMeta({ summary: "x".repeat(141) })).success).toBe(false);
  });

  it("requires at least one category", () => {
    expect(metaSchema.safeParse(officialMeta({ categories: [] })).success).toBe(false);
  });

  it("rejects an unknown purpose category", () => {
    const bad = officialMeta();
    // Deliberately invalid value to prove the enum guard holds.
    (bad as { categories: string[] }).categories = ["not-a-category"];
    expect(metaSchema.safeParse(bad).success).toBe(false);
  });

  it("requires provenance for Official entries (no bare metadata)", () => {
    const bad = officialMeta({
      provenance: { source_type: "npm", extracted_at: "2026-07-02" },
    });
    expect(metaSchema.safeParse(bad).success).toBe(false);
  });

  it("forbids css-analysis provenance on the Official path", () => {
    const bad = officialMeta({
      provenance: { source_type: "css-analysis", extracted_at: "2026-07-02" },
    });
    expect(metaSchema.safeParse(bad).success).toBe(false);
  });

  it("requires css-analysis provenance on the Brand Look path", () => {
    const bad = brandLookMeta({
      provenance: {
        source_type: "npm",
        package: "x",
        version: "1.0.0",
        extracted_at: "2026-07-02",
      },
    });
    expect(metaSchema.safeParse(bad).success).toBe(false);
  });

  it("requires restricted_reason when restricted is true", () => {
    expect(metaSchema.safeParse(officialMeta({ restricted: true })).success).toBe(false);
    expect(
      metaSchema.safeParse(officialMeta({ restricted: true, restricted_reason: "SLDS license" }))
        .success,
    ).toBe(true);
  });

  it("rejects an invalid extracted_at date", () => {
    const bad = officialMeta({
      provenance: {
        source_type: "npm",
        package: "@carbon/themes",
        version: "11.0.0",
        extracted_at: "not-a-date",
      },
    });
    expect(metaSchema.safeParse(bad).success).toBe(false);
  });
});

describe("parseMetaYaml / validateMeta", () => {
  it("parses a valid meta.yaml round-trip", () => {
    const yaml = toYaml(officialMeta());
    const meta = parseMetaYaml(yaml);
    expect(meta.slug).toBe("carbon");
    expect(meta.status).toBe("draft");
  });

  it("throws on invalid meta.yaml", () => {
    const yaml = toYaml(officialMeta({ slug: "Bad Slug" }));
    expect(() => parseMetaYaml(yaml)).toThrow();
  });

  it("validateMeta returns a non-throwing result", () => {
    const ok = validateMeta(officialMeta());
    expect(ok.success).toBe(true);
    const bad = validateMeta({ slug: "carbon" });
    expect(bad.success).toBe(false);
  });
});
