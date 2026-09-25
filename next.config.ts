import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // URLは末尾スラッシュあり（公開後に変えない）
  trailingSlash: true,
  images: {
    // Sanity の画像CDN
    remotePatterns: [new URL("https://cdn.sanity.io/images/**")],
  },
};

export default nextConfig;
