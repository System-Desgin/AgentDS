import { Injectable } from "@nestjs/common";
import { PURPOSE_CATEGORY_LABELS, type CategoryWithCount } from "@agentds/shared";
import { PrismaService } from "../../prisma/prisma.service";

/**
 * The fixed purpose taxonomy with published-entry counts (PRD F-4). The
 * taxonomy itself comes from @agentds/shared — the DB only contributes counts,
 * so an empty DB still returns every category with count 0.
 */
@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<CategoryWithCount[]> {
    const grouped = await this.prisma.db.systemCategory.groupBy({
      by: ["categoryId"],
      where: { system: { status: "published" } },
      _count: { systemId: true },
    });
    const counts = new Map(grouped.map((g) => [g.categoryId, g._count.systemId]));

    return Object.entries(PURPOSE_CATEGORY_LABELS).map(([id, label]) => ({
      id,
      label,
      count: counts.get(id) ?? 0,
    }));
  }
}
