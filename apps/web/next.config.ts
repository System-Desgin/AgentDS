import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Consume the workspace shared package directly (compiled JS + types).
  transpilePackages: ["@agentds/shared"],
  poweredByHeader: false,
  // Bundle the catalog content into the server output so the site can serve
  // files when the API is unreachable (Phase 3: graceful fallback).
  outputFileTracingIncludes: {
    "/**": ["../../content/**"],
  },
};

export default nextConfig;
