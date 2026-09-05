import { describe, expect, it } from "vitest";
import { assertNoAnthropicApiKey } from "./generate";

describe("assertNoAnthropicApiKey", () => {
  it.each(["sk-ant-xxxx", "", "   "])(
    "throws when ANTHROPIC_API_KEY is present as %j (billing guardrail)",
    (value) => {
      expect(() => assertNoAnthropicApiKey({ ANTHROPIC_API_KEY: value })).toThrow(
        /ANTHROPIC_API_KEY/,
      );
    },
  );

  it("passes only when ANTHROPIC_API_KEY is absent", () => {
    expect(() => assertNoAnthropicApiKey({})).not.toThrow();
  });
});
