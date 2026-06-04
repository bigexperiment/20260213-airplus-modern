import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3001", "127.0.0.1:3001"],
  outputFileTracingIncludes: {
    "/opengraph-image": [
      "./node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff",
      "./node_modules/@fontsource/manrope/files/manrope-latin-800-normal.woff",
      "./public/information/assets/hero_main.png",
      "./public/brand/airplusnepal-hiker-mark-tight.png",
      "./public/og/share.jpg",
    ],
  },
};

export default nextConfig;
