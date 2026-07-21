import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { eventSchema, type EventInput } from "@agentds/shared";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { EventsService } from "./events.service";

@ApiTags("events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @HttpCode(202)
  @ApiOperation({
    summary: "Record a usage event (fire-and-forget counter)",
    operationId: "postEvent",
    description:
      "Aggregate-only counters: {slug, type: download|copy|api_fetch}. " +
      "No cookies, no PII, no per-request rows (PRD F-3).",
  })
  @ApiAcceptedResponse({
    description: "Counter incremented.",
    schema: { example: { data: { accepted: true } } },
  })
  @ApiBadRequestResponse({ description: "Unknown slug format or event type." })
  async record(
    @Body(new ZodValidationPipe(eventSchema)) event: EventInput,
  ): Promise<{ data: { accepted: boolean } }> {
    await this.eventsService.increment(event.slug, event.type);
    return { data: { accepted: true } };
  }
}
