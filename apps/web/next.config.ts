import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Consume the workspace shared package directly (compiled JS + types).
  transpilePackages: ["@agentds/shared"],
  poweredByHeader: false,
};

export default nextConfig;
