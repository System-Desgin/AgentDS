#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const contentRoot = join(repositoryRoot, "content");
const outputPath = join(repositoryRoot, "skills", "design-systems", "references", "SHA256SUMS");
const artifacts = ["DESIGN.md", "tokens.json", "tailwind.css"];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

const entries = [];
for (const catalogPath of ["official", "brand-looks"]) {
  const catalogDirectory = join(contentRoot, catalogPath);
  for (const slug of (await readdir(catalogDirectory)).sort()) {
    const entryDirectory = join(catalogDirectory, slug);
    if (!(await isDirectory(entryDirectory))) continue;
    if (!slugPattern.test(slug) || slug.length > 64) {
      throw new Error(`Refusing to publish a non-canonical skill artifact slug: ${slug}`);
    }
    const meta = await readFile(join(entryDirectory, "meta.yaml"), "utf8");
    if (!/^status:\s*published\s*$/m.test(meta)) continue;

    for (const artifact of artifacts) {
      const contents = await readFile(join(entryDirectory, artifact));
      const publicName = artifact === "DESIGN.md" ? "design.md" : artifact;
      entries.push(`${sha256(contents)}  ${slug}/${publicName}`);
    }
  }
}

entries.sort((left, right) => left.slice(66).localeCompare(right.slice(66)));
await writeFile(outputPath, `${entries.join("\n")}\n`);
process.stdout.write(`Wrote ${entries.length} pinned artifact digests to ${outputPath}\n`);
