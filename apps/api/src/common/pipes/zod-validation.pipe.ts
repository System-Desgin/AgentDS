import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";

/**
 * Param/query/body validation against a shared zod schema (CLAUDE.md rule 7:
 * validate at the edge with the schemas from @agentds/shared — never duplicate
 * them as class-validator DTOs).
 */
@Injectable()
export class ZodValidationPipe<T> implements PipeTransform<unknown, T> {
  constructor(private readonly schema: ZodType<T>) {}

  transform(value: unknown): T {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      const message = result.error.issues.map(
        (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`,
      );
      throw new BadRequestException(message);
    }
    return result.data;
  }
}
