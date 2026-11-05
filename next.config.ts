import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the project root (a parent folder has its own lockfile).
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    // Hosts allowed for project posters. Add your own CDN here.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
    ],
  },
};

export default nextConfig;
