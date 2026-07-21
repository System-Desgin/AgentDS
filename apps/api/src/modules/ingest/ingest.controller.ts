import { Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import type { ApiEnvelope } from "@agentds/shared";
import { IngestGuard } from "./ingest.guard";
import { IngestService, type IngestSummary } from "./ingest.service";

/**
 * Internal re-sync trigger (PRD F-5). Lives outside the public /v1 prefix
 * (excluded in main.ts) and is the API's only non-GET route besides /v1/events.
 */
@ApiTags("internal")
@Controller("internal/ingest")
export class IngestController {
  constructor(private readonly ingestService: IngestService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(IngestGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Re-sync the catalog DB from the baked-in content directory",
    operationId: "runIngest",
    description:
      "Token-authenticated and IP-allowlisted. Invalid entries are skipped and logged; " +
      "entries missing from disk are demoted to draft. Also runs automatically on boot.",
  })
  @ApiOkResponse({
    description: "Ingest summary.",
    schema: {
      example: {
        data: { scanned: 10, ingested: 10, skipped: [], demoted: [] },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: "Missing or invalid bearer token." })
  @ApiForbiddenResponse({ description: "Caller IP not allowlisted." })
  async run(): Promise<ApiEnvelope<IngestSummary>> {
    return { data: await this.ingestService.ingestAll() };
  }
}
