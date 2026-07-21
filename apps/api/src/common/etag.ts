import { createHash } from "node:crypto";

/** Strong ETag from content bytes (sha256, truncated). Quoted per RFC 9110. */
export function etagOf(buffer: Buffer): string {
  return `"${createHash("sha256").update(buffer).digest("hex").slice(0, 32)}"`;
}
