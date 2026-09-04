#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));

const defaultFiles = {
  baseline: new URL("./outputs/baseline.html", import.meta.url),
  carbon: new URL("./outputs/carbon.html", import.meta.url),
};

const carbonTokensUrl = new URL("content/official/carbon/tokens.json", `file://${repositoryRoot}/`);

function unique(values) {
  return [...new Set(values)];
}

function collectHexValues(value, colors = []) {
  if (typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)) {
    colors.push(value.toUpperCase());
    return colors;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectHexValues(item, colors);
    return colors;
  }

  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectHexValues(item, colors);
  }

  return colors;
}

function declarationValues(html, propertyPattern) {
  const values = [];
  const expression = new RegExp(`(?:^|[;{\\s])(?:${propertyPattern})\\s*:\\s*([^;}]+)`, "gim");
  for (const match of html.matchAll(expression)) values.push(match[1].trim());
  return values;
}

function pixelValues(values) {
  return unique(
    values.flatMap((value) =>
      [...value.matchAll(/(?:^|[^\w.-])(-?\d+(?:\.\d+)?)px\b/g)].map((match) => Number(match[1])),
    ),
  ).sort((left, right) => left - right);
}

function scoreOutput(html, carbonColors) {
  const colors = unique(
    (html.match(/#[0-9a-f]{6}\b/gi) ?? []).map((color) => color.toUpperCase()),
  ).sort();
  const matchingColors = colors.filter((color) => carbonColors.includes(color));
  const foreignColors = colors.filter((color) => !carbonColors.includes(color));
  const radiusValues = pixelValues(declarationValues(html, "border-radius"));
  const spacingValues = pixelValues(
    declarationValues(
      html,
      "margin(?:-(?:top|right|bottom|left|inline|block))?|padding(?:-(?:top|right|bottom|left|inline|block))?|gap|row-gap|column-gap",
    ),
  );
  const shadows = declarationValues(html, "box-shadow|text-shadow").filter(
    (value) => value.toLowerCase() !== "none",
  );
  const allowedRadii = new Set([0, 2, 4, 8, 9999]);
  const allowedSpacing = new Set([0, 2, 4, 8, 16, 24, 32, 48, 64]);

  const checks = {
    verifiedPaletteOnly: colors.length > 0 && foreignColors.length === 0,
    primaryTokenUsed: colors.includes("#0F62FE"),
    carbonTypefaceUsed: /IBM Plex Sans/i.test(html),
    carbonRadiiOnly:
      radiusValues.length > 0 && radiusValues.every((value) => allowedRadii.has(value)),
    carbonSpacingOnly:
      spacingValues.length > 0 && spacingValues.every((value) => allowedSpacing.has(value)),
    noDropShadows: shadows.length === 0,
    semanticStatusTokensUsed: colors.includes("#24A148") && colors.includes("#DA1E28"),
  };

  return {
    score: {
      passed: Object.values(checks).filter(Boolean).length,
      total: Object.keys(checks).length,
    },
    checks,
    evidence: {
      colors,
      matchingColors,
      foreignColors,
      radiusValuesPx: radiusValues,
      spacingValuesPx: spacingValues,
      shadowDeclarations: shadows,
    },
  };
}

export async function evaluate({
  baselineUrl = defaultFiles.baseline,
  carbonUrl = defaultFiles.carbon,
} = {}) {
  const [baseline, carbon, tokenSource] = await Promise.all([
    readFile(baselineUrl, "utf8"),
    readFile(carbonUrl, "utf8"),
    readFile(carbonTokensUrl, "utf8"),
  ]);
  const carbonColors = unique(collectHexValues(JSON.parse(tokenSource))).sort();

  return {
    methodology: "Static source analysis of the two generated, self-contained HTML files.",
    rubric: {
      verifiedPaletteOnly: "Every six-digit hex color is present in Carbon tokens.json.",
      primaryTokenUsed: "Carbon interaction blue #0F62FE is present.",
      carbonTypefaceUsed: "The CSS names IBM Plex Sans.",
      carbonRadiiOnly: "Every literal border radius is 0, 2, 4, 8, or 9999px.",
      carbonSpacingOnly:
        "Every literal margin, padding, and gap pixel value is on Carbon's published scale.",
      noDropShadows: "No non-none box-shadow or text-shadow declaration is present.",
      semanticStatusTokensUsed: "Carbon success #24A148 and error #DA1E28 are both present.",
    },
    carbonTokenSource: "content/official/carbon/tokens.json",
    allowedCarbonColors: carbonColors,
    outputs: {
      baseline: scoreOutput(baseline, carbonColors),
      carbon: scoreOutput(carbon, carbonColors),
    },
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = await evaluate();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
