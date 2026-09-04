#!/usr/bin/env node

import { readdir, readFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const traceRoot = join(repositoryRoot, "apps", "web", ".next", "server");
const contentRoot = join(repositoryRoot, "content");
const allowedBasenames = new Set(["DESIGN.md", "meta.yaml"]);

async function findTraceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findTraceFiles(entryPath)));
    else if (entry.name.endsWith(".nft.json")) files.push(entryPath);
  }
  return files;
}

function isInsideContent(absolutePath) {
  const fromContentRoot = relative(contentRoot, absolutePath);
  return (
    fromContentRoot !== "" && !fromContentRoot.startsWith(`..${sep}`) && fromContentRoot !== ".."
  );
}

const traceFiles = await findTraceFiles(traceRoot);
let tracedRoutes = 0;
let contentReferences = 0;
const unexpected = [];

for (const traceFile of traceFiles) {
  const trace = JSON.parse(await readFile(traceFile, "utf8"));
  const contentFiles = trace.files
    .map((file) => resolve(dirname(traceFile), file))
    .filter(isInsideContent);
  if (contentFiles.length === 0) continue;

  tracedRoutes += 1;
  contentReferences += contentFiles.length;
  for (const file of contentFiles) {
    const basename = file.slice(file.lastIndexOf(sep) + 1);
    if (!allowedBasenames.has(basename)) unexpected.push(relative(repositoryRoot, file));
  }
}

if (tracedRoutes === 0 || contentReferences === 0) {
  throw new Error(
    "No catalog content was found in the web server traces; the offline fallback would be empty.",
  );
}

if (unexpected.length > 0) {
  throw new Error(
    `Unexpected catalog files in web server traces:\n${[...new Set(unexpected)].join("\n")}`,
  );
}

process.stdout.write(
  `Web trace verified: ${tracedRoutes} routes include ${contentReferences} references to DESIGN.md/meta.yaml only.\n`,
);
