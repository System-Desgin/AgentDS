import { Controller, Get, Param, Query, Req, Res } from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import type { Request, Response } from "express";
import {
  listSystemsQuerySchema,
  slugSchema,
  type ApiEnvelope,
  type ListSystemsQuery,
  type PaginatedEnvelope,
  type SystemDetail,
  type SystemListItem,
} from "@agentds/shared";
import { ZodValidationPipe } from "../../common/pipes/zod-validation.pipe";
import { SystemsService, type ArtifactName } from "./systems.service";

/** PRD F-4 cache policy for raw-file endpoints. */
const FILE_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=86400";

/**
 * File routes get a higher throttle ceiling (PRD F-4: 120/min vs 60/min).
 * Decorator metadata is static, so the values are read from the environment at
 * module load; they mirror RATE_LIMIT_FILES_LIMIT / RATE_LIMIT_TTL_MS defaults.
 */
const FILE_THROTTLE = {
  default: {
    limit: Number(process.env["RATE_LIMIT_FILES_LIMIT"] ?? 120),
    ttl: Number(process.env["RATE_LIMIT_TTL_MS"] ?? 60_000),
  },
};

const RESTRICTED_RESPONSE = {
  status: 451,
  description: "Restricted entry — served with a JSON reason (PRD §12).",
  schema: {
    example: {
      statusCode: 451,
      error: "Unavailable For Legal Reasons",
      message: "Visual identity legally restricted to the French state.",
    },
  },
} as const;

@ApiTags("systems")
@Controller("systems")
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Get()
  @ApiOperation({
    summary: "List published systems (filterable, paginated)",
    operationId: "listSystems",
    description:
      "Filters: path, category, q, license, sort (newest | most-fetched), page, limit (max 100).",
  })
  @ApiOkResponse({
    description: "Paginated catalog in the { data, meta } envelope.",
    schema: {
      example: {
        data: [
          {
            slug: "carbon",
            name: "Carbon",
            path: "official",
            maker: "IBM",
            summary: "IBM's open-source design system.",
            categories: ["enterprise-dashboard"],
            tags: ["ibm"],
            license_spdx: "Apache-2.0",
            restricted: false,
            fetches: 42,
            updated_at: "2026-07-21T00:00:00.000Z",
          },
        ],
        meta: { page: 1, limit: 20, total: 1, total_pages: 1 },
      },
    },
  })
  @ApiTooManyRequestsResponse({ description: "Rate limited (60/min); includes Retry-After." })
  list(
    @Query(new ZodValidationPipe(listSystemsQuerySchema)) query: ListSystemsQuery,
  ): Promise<PaginatedEnvelope<SystemListItem>> {
    return this.systemsService.list(query);
  }

  @Get(":slug")
  @ApiOperation({
    summary: "Full metadata + parsed token summary for one system",
    operationId: "getSystem",
  })
  @ApiParam({ name: "slug", example: "carbon" })
  @ApiOkResponse({ description: "System detail in the { data } envelope." })
  @ApiNotFoundResponse({ description: "Unknown or unpublished slug." })
  async detail(
    @Param("slug", new ZodValidationPipe(slugSchema)) slug: string,
  ): Promise<ApiEnvelope<SystemDetail>> {
    return { data: await this.systemsService.detail(slug) };
  }

  @Get(":slug/design.md")
  @Throttle(FILE_THROTTLE)
  @ApiOperation({ summary: "Raw DESIGN.md", operationId: "getDesignMd" })
  @ApiParam({ name: "slug", example: "carbon" })
  @ApiProduces("text/markdown")
  @ApiOkResponse({ description: "Markdown body with ETag + Cache-Control." })
  @ApiResponse({ status: 304, description: "Not modified (If-None-Match matched)." })
  @ApiNotFoundResponse({ description: "Unknown slug or artifact." })
  @ApiResponse(RESTRICTED_RESPONSE)
  @ApiTooManyRequestsResponse({ description: "Rate limited (120/min); includes Retry-After." })
  designMd(
    @Param("slug", new ZodValidationPipe(slugSchema)) slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.sendArtifact(slug, "design.md", req, res);
  }

  @Get(":slug/tokens.json")
  @Throttle(FILE_THROTTLE)
  @ApiOperation({ summary: "DTCG tokens.json", operationId: "getTokensJson" })
  @ApiParam({ name: "slug", example: "carbon" })
  @ApiProduces("application/json")
  @ApiOkResponse({ description: "W3C DTCG token file with ETag + Cache-Control." })
  @ApiResponse({ status: 304, description: "Not modified (If-None-Match matched)." })
  @ApiNotFoundResponse({ description: "Unknown slug or artifact." })
  @ApiResponse(RESTRICTED_RESPONSE)
  @ApiTooManyRequestsResponse({ description: "Rate limited (120/min); includes Retry-After." })
  tokensJson(
    @Param("slug", new ZodValidationPipe(slugSchema)) slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.sendArtifact(slug, "tokens.json", req, res);
  }

  @Get(":slug/tailwind.css")
  @Throttle(FILE_THROTTLE)
  @ApiOperation({ summary: "Tailwind v4 @theme CSS", operationId: "getTailwindCss" })
  @ApiParam({ name: "slug", example: "carbon" })
  @ApiProduces("text/css")
  @ApiOkResponse({ description: "Tailwind v4 theme CSS with ETag + Cache-Control." })
  @ApiResponse({ status: 304, description: "Not modified (If-None-Match matched)." })
  @ApiNotFoundResponse({ description: "Unknown slug or artifact." })
  @ApiResponse(RESTRICTED_RESPONSE)
  @ApiTooManyRequestsResponse({ description: "Rate limited (120/min); includes Retry-After." })
  tailwindCss(
    @Param("slug", new ZodValidationPipe(slugSchema)) slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.sendArtifact(slug, "tailwind.css", req, res);
  }

  @Get(":slug/bundle.zip")
  @Throttle(FILE_THROTTLE)
  @ApiOperation({
    summary: "Zip bundle (DESIGN.md + exports + LICENSE-NOTICE.txt)",
    operationId: "getBundleZip",
  })
  @ApiParam({ name: "slug", example: "carbon" })
  @ApiProduces("application/zip")
  @ApiOkResponse({ description: "Zip archive with ETag + Cache-Control." })
  @ApiResponse({ status: 304, description: "Not modified (If-None-Match matched)." })
  @ApiNotFoundResponse({ description: "Unknown slug or artifact." })
  @ApiResponse(RESTRICTED_RESPONSE)
  @ApiTooManyRequestsResponse({ description: "Rate limited (120/min); includes Retry-After." })
  bundleZip(
    @Param("slug", new ZodValidationPipe(slugSchema)) slug: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    return this.sendArtifact(slug, "bundle.zip", req, res);
  }

  private async sendArtifact(
    slug: string,
    artifact: ArtifactName,
    req: Request,
    res: Response,
  ): Promise<void> {
    const file = await this.systemsService.getArtifact(slug, artifact);

    res.setHeader("ETag", file.etag);
    res.setHeader("Cache-Control", FILE_CACHE_CONTROL);

    if (req.headers["if-none-match"] === file.etag) {
      res.status(304).end();
      return;
    }

    res.setHeader("Content-Type", file.contentType);
    if (artifact === "bundle.zip") {
      res.setHeader("Content-Disposition", `attachment; filename="${slug}-design-md.zip"`);
    }
    res.send(file.buffer);
  }
}
