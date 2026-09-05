import { describe, expect, it } from "vitest";
import {
  colorOf,
  customProperties,
  fontFamilies,
  inlinePresentationValues,
  inlineStyles,
  lengthToPx,
  resolveValue,
  stylesheetUrls,
} from "./site-css";

describe("stylesheetUrls", () => {
  it("resolves stylesheet hrefs against the page URL", () => {
    const html = `
      <link rel="stylesheet" href="/_next/static/css/a.css">
      <link rel="preload" href="/not-a-sheet.css">
      <link rel="stylesheet" href="https://cdn.example.com/b.css">
    `;
    expect(stylesheetUrls(html, "https://www.example.com/page")).toEqual([
      "https://www.example.com/_next/static/css/a.css",
      "https://cdn.example.com/b.css",
    ]);
  });

  it("ignores non-stylesheet links and malformed hrefs", () => {
    expect(stylesheetUrls('<link rel="icon" href="/favicon.ico">', "https://e.com")).toEqual([]);
  });
});

describe("inlineStyles", () => {
  it("returns the contents of every style block", () => {
    expect(inlineStyles("<style>a{color:red}</style><style>b{}</style>")).toEqual([
      "a{color:red}",
      "b{}",
    ]);
  });
});

describe("inlinePresentationValues", () => {
  it("collects inline CSS and SVG presentation colors", () => {
    const html = `
      <div style="background:#123456;color:var(--ink)"></div>
      <svg fill="none">
        <path fill="#0D99FF" stroke='#000000'></path>
        <stop stop-color="#FFFFFF"></stop>
      </svg>
    `;
    expect(inlinePresentationValues(html)).toEqual([
      "background:#123456;color:var(--ink)",
      "none",
      "#0D99FF",
      "#000000",
      "#FFFFFF",
    ]);
  });

  it("ignores scripts and unrelated attributes", () => {
    const html = `
      <script>const serialized = '<path fill="#DEADBE">';</script>
      <img src="image.svg#ABCDEF" alt="sample">
    `;
    expect(inlinePresentationValues(html)).toEqual([]);
  });

  it("skips script bodies with spaced end tags and ignores comments", () => {
    const html = `
      <!-- <path fill="#BADBAD"> -->
      <SCRIPT type="module">const serialized = '<div style="#DEADBE">';</script   >
      <script>const decoy = '</scriptx><svg fill="#C0FFEE">';</script>
      <div style="color:#123456"></div>
    `;
    expect(inlinePresentationValues(html)).toEqual(["color:#123456"]);
  });

  it("ignores everything after an unclosed script tag", () => {
    expect(inlinePresentationValues('<script><path fill="#DEADBE"><div style="#BADBAD">')).toEqual(
      [],
    );
  });
});

describe("customProperties", () => {
  it("collects declarations and keeps themed duplicates", () => {
    const props = customProperties(
      ":root{--color-blue-500:#097fe8;--bg:var(--color-white)}.dark{--bg:#000}",
    );
    expect(props.get("--color-blue-500")).toEqual(["#097fe8"]);
    expect(props.get("--bg")).toEqual(["var(--color-white)", "#000"]);
  });
});

describe("resolveValue", () => {
  const props = customProperties(
    ":root{--a:var(--b);--b:var(--c);--c:#191918;--only-fallback:var(--nope, #ff0000)}",
  );

  it("follows var() chains to a literal", () => {
    expect(resolveValue("var(--a)", props)).toBe("#191918");
  });

  it("uses the declared fallback when the reference is unknown", () => {
    expect(resolveValue("var(--only-fallback)", props)).toBe("#ff0000");
  });

  it("stops rather than looping on a cycle", () => {
    const cyclic = customProperties(":root{--x:var(--y);--y:var(--x)}");
    expect(() => resolveValue("var(--x)", cyclic)).not.toThrow();
  });
});

describe("colorOf", () => {
  it("reads hex, rgb(), and the two named colors sites actually use", () => {
    expect(colorOf("#F6F5F4")).toBe("#f6f5f4");
    expect(colorOf("rgb(55, 53, 47)")).toBe("#37352f");
    expect(colorOf("rgb(0 0 0 / 8%)")).toBe("#000000");
    expect(colorOf("white")).toBe("#ffffff");
  });

  it("reads the notations modern sites ship", () => {
    expect(colorOf("hsl(210 100% 50%)")).toBe("#0080ff");
    expect(colorOf("oklch(0.62796 0.25768 29.234)")).toBe("#ff0000");
  });

  it("returns null for non-colors and for transparent", () => {
    expect(colorOf("1.5rem")).toBeNull();
    expect(colorOf("transparent")).toBeNull();
  });
});

describe("lengthToPx", () => {
  it("converts rem against a 16px root", () => {
    expect(lengthToPx("0.375rem")).toBe(6);
    expect(lengthToPx("12px")).toBe(12);
    expect(lengthToPx("0")).toBe(0);
  });

  it("returns null for non-lengths", () => {
    expect(lengthToPx("var(--x)")).toBeNull();
  });
});

describe("fontFamilies", () => {
  it("collects declared stacks and skips indirection", () => {
    const css = "a{font-family:NotionInter}b{font-family:var(--f)}c{font-family:inherit}";
    expect(fontFamilies(css)).toEqual(["NotionInter"]);
  });
});
