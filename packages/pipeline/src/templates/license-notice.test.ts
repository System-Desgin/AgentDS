import { describe, expect, it } from "vitest";
import { metaSchema, type Meta } from "@agentds/shared";
import { buildLicenseNotice } from "./license-notice";

function meta(overrides: Record<string, unknown> = {}): Meta {
  return metaSchema.parse({
    slug: "carbon",
    name: "Carbon",
    path: "official",
    maker: "IBM",
    summary: "IBM's open-source design system.",
    description: "Carbon from real token packages.",
    categories: ["enterprise-dashboard"],
    license: { spdx: "Apache-2.0", url: "https://www.apache.org/licenses/LICENSE-2.0" },
    provenance: {
      source_type: "npm",
      package: "@carbon/themes",
      version: "11.76.0",
      extracted_at: "2026-07-02",
    },
    spec_version: "alpha",
    ...overrides,
  });
}

describe("buildLicenseNotice", () => {
  it("includes CC BY 4.0 attribution and upstream provenance", () => {
    const notice = buildLicenseNotice(meta());
    expect(notice).toContain("CC BY 4.0");
    expect(notice).toContain("Apache-2.0");
    expect(notice).toContain("@carbon/themes@11.76.0");
    expect(notice).toContain("agent-ds.oday-bakkour.com");
  });

  it("adds the independence disclaimer only for Brand Looks", () => {
    expect(buildLicenseNotice(meta())).not.toContain("Not affiliated");
    const brand = buildLicenseNotice(
      meta({
        path: "brand-look",
        provenance: {
          source_type: "css-analysis",
          urls: ["https://stripe.com"],
          extracted_at: "2026-07-02",
        },
      }),
    );
    expect(brand).toContain("Not affiliated");
  });
});
