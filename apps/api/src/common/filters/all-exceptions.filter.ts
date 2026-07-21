import {
  Catch,
  HttpException,
  HttpStatus,
  type ArgumentsHost,
  type ExceptionFilter,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { ProblemDetails } from "@agentds/shared";

/**
 * Global exception filter producing the project's problem-details error shape
 * `{ statusCode, error, message }`. Never leaks stack traces or internal paths
 * in production (CLAUDE.md rule 7).
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const body: ProblemDetails = {
      statusCode: status,
      error: this.errorName(exception, status),
      message: this.extractMessage(exception, status),
    };

    // Structured server-side log; the client only ever sees `body`.
    // (Replaced by the pino logger wiring in Phase 2.)
    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      console.error(`[${request.method} ${request.url}]`, exception);
    }

    response.status(status).json(body);
  }

  private errorName(exception: unknown, status: number): string {
    // Respect an explicit `error` in the HttpException response (e.g. the 451
    // legal-restriction responses, which Nest's HttpStatus enum has no name for).
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (res && typeof res === "object" && "error" in res) {
        const error = (res as { error: unknown }).error;
        if (typeof error === "string") return error;
      }
    }
    const name = HttpStatus[status];
    return typeof name === "string" ? name.replace(/_/g, " ") : "Error";
  }

  private extractMessage(exception: unknown, status: number): string | string[] {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res === "string") return res;
      if (res && typeof res === "object" && "message" in res) {
        const message = (res as { message: unknown }).message;
        if (typeof message === "string" || Array.isArray(message)) {
          return message as string | string[];
        }
      }
      return exception.message;
    }
    // Generic 500 — deliberately opaque to the client.
    return status >= HttpStatus.INTERNAL_SERVER_ERROR ? "Internal server error" : "Error";
  }
}
