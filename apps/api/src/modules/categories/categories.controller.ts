import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import type { ApiEnvelope, CategoryWithCount } from "@agentds/shared";
import { CategoriesService } from "./categories.service";

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: "List the purpose taxonomy with published-system counts",
    operationId: "listCategories",
  })
  @ApiOkResponse({
    description: "All purpose categories (fixed taxonomy), each with its count.",
    schema: {
      example: {
        data: [
          { id: "enterprise-dashboard", label: "Enterprise dashboard", count: 4 },
          { id: "dev-tools", label: "Developer tools", count: 3 },
        ],
      },
    },
  })
  async list(): Promise<ApiEnvelope<CategoryWithCount[]>> {
    return { data: await this.categoriesService.list() };
  }
}
