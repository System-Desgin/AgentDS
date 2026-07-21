import type { Request, Response } from "express";
import { listSystemsQuerySchema } from "@agentds/shared";
import { describe, expect, it, vi } from "vitest";
import { SystemsController } from "./systems.controller";
import type { ArtifactFile, SystemsService } from "./systems.service";

function fakeRes(): Response & {
  headers: Record<string, string>;
  statusCode: number;
  body: unknown;
} {
  const res = {
    headers: {} as Record<string, string>,
    statusCode: 200,
    body: undefined as unknown,
    setHeader(name: string, value: string) {
      res.headers[name] = value;
      return res;
    },
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    end() {
      return res;
    },
    send(body: unknown) {
      res.body = body;
      return res;
    },
  };
  return res as unknown as Response & typeof res;
}

function fakeReq(headers: Record<string, string> = {}): Request {
  return { headers } as unknown as Request;
}

const artifact: ArtifactFile = {
  buffer: Buffer.from("# hello"),
  contentType: "text/markdown; charset=utf-8",
  etag: '"abc123"',
};

function controllerWith(service: Partial<SystemsService>): SystemsController {
  return new SystemsController(service as SystemsService);
}

describe("SystemsController", () => {
  it("delegates list and detail to the service", async () => {
    const list = vi.fn().mockResolvedValue({ data: [], meta: {} });
    const detail = vi.fn().mockResolvedValue({ slug: "carbon" });
    const controller = controllerWith({
      list,
      detail,
    } as unknown as Partial<SystemsService>);

    await controller.list(listSystemsQuerySchema.parse({}));
    expect(list).toHaveBeenCalledWith(expect.objectContaining({ page: 1, limit: 20 }));

    const result = await controller.detail("carbon");
    expect(result).toEqual({ data: { slug: "carbon" } });
  });

  it("sends artifacts with ETag, cache policy, and content type", async () => {
    const getArtifact = vi.fn().mockResolvedValue(artifact);
    const controller = controllerWith({ getArtifact } as unknown as Partial<SystemsService>);
    const res = fakeRes();

    await controller.designMd("carbon", fakeReq(), res);

    expect(getArtifact).toHaveBeenCalledWith("carbon", "design.md");
    expect(res.headers["ETag"]).toBe('"abc123"');
    expect(res.headers["Cache-Control"]).toBe("public, max-age=300, stale-while-revalidate=86400");
    expect(res.headers["Content-Type"]).toBe("text/markdown; charset=utf-8");
    expect(res.body).toEqual(artifact.buffer);
  });

  it("answers 304 without a body when If-None-Match matches", async () => {
    const controller = controllerWith({
      getArtifact: vi.fn().mockResolvedValue(artifact),
    } as unknown as Partial<SystemsService>);
    const res = fakeRes();

    await controller.tokensJson("carbon", fakeReq({ "if-none-match": '"abc123"' }), res);

    expect(res.statusCode).toBe(304);
    expect(res.body).toBeUndefined();
    expect(res.headers["ETag"]).toBe('"abc123"');
  });

  it("marks bundle.zip as a download attachment", async () => {
    const controller = controllerWith({
      getArtifact: vi.fn().mockResolvedValue({ ...artifact, contentType: "application/zip" }),
    } as unknown as Partial<SystemsService>);
    const res = fakeRes();

    await controller.bundleZip("carbon", fakeReq(), res);

    expect(res.headers["Content-Disposition"]).toBe('attachment; filename="carbon-design-md.zip"');
  });

  it("covers the tailwind.css route mapping", async () => {
    const getArtifact = vi.fn().mockResolvedValue({ ...artifact, contentType: "text/css" });
    const controller = controllerWith({ getArtifact } as unknown as Partial<SystemsService>);

    await controller.tailwindCss("carbon", fakeReq(), fakeRes());
    expect(getArtifact).toHaveBeenCalledWith("carbon", "tailwind.css");
  });
});
