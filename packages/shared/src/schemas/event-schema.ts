import { z } from "zod";
import { slugSchema } from "./meta-schema";

/** Counter event types (PRD F-3): aggregate-only, no PII, no cookies. */
export const EVENT_TYPES = ["download", "copy", "api_fetch"] as const;
export type EventType = (typeof EVENT_TYPES)[number];

/** Body for `POST /v1/events` — fire-and-forget usage counters. */
export const eventSchema = z.object({
  slug: slugSchema,
  type: z.enum(EVENT_TYPES),
});
export type EventInput = z.infer<typeof eventSchema>;
