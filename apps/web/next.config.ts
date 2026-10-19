import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Images come from Supabase Storage / CDN once the media library exists
  // (BUILD_GUIDE §9). Hosts are added to remotePatterns at that point.
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
