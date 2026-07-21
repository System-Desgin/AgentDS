import { BadRequestException } from "@nestjs/common";
import { listSystemsQuerySchema, slugSchema } from "@agentds/shared";
import { describe, expect, it } from "vitest";
import { ZodValidationPipe } from "./zod-validation.pipe";

describe("ZodValidationPipe", () => {
  it("applies defaults and coercions from the shared query schema", () => {
    const pipe = new ZodValidationPipe(listSystemsQuerySchema);
    const result = pipe.transform({ page: "2", limit: "5" });
    expect(result).toMatchObject({ page: 2, limit: 5, sort: "newest" });
  });

  it("rejects invalid input with a 400 listing each issue", () => {
    const pipe = new ZodValidationPipe(listSystemsQuerySchema);
    expect(() => pipe.transform({ limit: "9999" })).toThrow(BadRequestException);
  });

  it("blocks path-traversal-shaped slugs at the edge", () => {
    const pipe = new ZodValidationPipe(slugSchema);
    expect(() => pipe.transform("../etc/passwd")).toThrow(BadRequestException);
    expect(pipe.transform("carbon")).toBe("carbon");
  });
});
