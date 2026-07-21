import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthService, type HealthStatus } from "./health.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: "Liveness/readiness probe", operationId: "getHealth" })
  @ApiOkResponse({
    description: "Service is healthy; `db` reports database connectivity.",
    schema: {
      example: {
        status: "ok",
        uptime_seconds: 42,
        timestamp: "2026-07-02T00:00:00.000Z",
        db: "up",
      },
    },
  })
  check(): Promise<HealthStatus> {
    return this.healthService.check();
  }
}
