import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint hatalarını derleme sırasında görmezden gel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript hatalarını derleme sırasında görmezden gel
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
