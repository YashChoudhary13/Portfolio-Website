import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export — served directly by Nginx on the droplet (no Node runtime).
  output: "export",
  // next/image optimization needs the Next server; export serves images as-is.
  // Our case-study screenshots are already pre-optimized JPEGs.
  images: { unoptimized: true },
};

export default nextConfig;
