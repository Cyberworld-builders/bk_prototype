import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during build for prototype
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable type checking during build for prototype
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
