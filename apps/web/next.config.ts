import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portfolio/shared"],
  devIndicators: false,
};

export default nextConfig;
