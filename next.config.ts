import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Correct placement
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignores ESLint errors in production
  },
};

export default nextConfig;
