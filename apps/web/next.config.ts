import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server for the Cloud Run container (see /Dockerfile).
  output: "standalone",
  // npm workspaces: trace dependencies from the repository root.
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Images come from Supabase Storage / CDN once the media library exists
  // (BUILD_GUIDE §9). Hosts are added to remotePatterns at that point.
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
