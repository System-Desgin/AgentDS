import { describe, expect, it } from "vitest";
import { assertNoAnthropicApiKey } from "./generate";

describe("assertNoAnthropicApiKey", () => {
  it("throws when ANTHROPIC_API_KEY is set (billing guardrail)", () => {
    expect(() => assertNoAnthropicApiKey({ ANTHROPIC_API_KEY: "sk-ant-xxxx" })).toThrow(
      /ANTHROPIC_API_KEY/,
    );
  });

  it("passes when ANTHROPIC_API_KEY is unset or empty", () => {
    expect(() => assertNoAnthropicApiKey({})).not.toThrow();
    expect(() => assertNoAnthropicApiKey({ ANTHROPIC_API_KEY: "" })).not.toThrow();
    expect(() => assertNoAnthropicApiKey({ ANTHROPIC_API_KEY: "   " })).not.toThrow();
  });
});
