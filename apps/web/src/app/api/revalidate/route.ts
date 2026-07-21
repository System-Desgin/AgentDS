import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Ingest-triggered ISR revalidation (Phase 3 checklist): after content merges,
 * the API redeploy + ingest calls this webhook so catalog and detail pages
 * refresh without a full rebuild. Guarded by REVALIDATE_TOKEN (bearer).
 */
export function POST(request: NextRequest): NextResponse {
  const token = process.env["REVALIDATE_TOKEN"];
  if (!token) {
    return NextResponse.json(
      { statusCode: 503, error: "Service Unavailable", message: "Revalidation is not configured" },
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization") ?? "";
  const presented = header.startsWith("Bearer ") ? header.slice("Bearer ".length) : "";
  const a = Buffer.from(presented, "utf8");
  const b = Buffer.from(token, "utf8");
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json(
      { statusCode: 401, error: "Unauthorized", message: "Invalid revalidation token" },
      { status: 401 },
    );
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ data: { revalidated: true } });
}
