import { describe, expect, it } from "vitest";
import { metaSchema } from "@agentds/shared";
import { buildMetaTemplate } from "./meta-template";

describe("buildMetaTemplate", () => {
  it("produces a schema-valid Official draft", () => {
    const result = metaSchema.safeParse(buildMetaTemplate("carbon", "official"));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.path).toBe("official");
      expect(result.data.status).toBe("draft");
      expect(result.data.provenance.source_type).toBe("npm");
    }
  });

  it("produces a schema-valid Brand Look draft", () => {
    const result = metaSchema.safeParse(buildMetaTemplate("stripe", "brand-look"));
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.provenance.source_type).toBe("css-analysis");
    }
  });
});
