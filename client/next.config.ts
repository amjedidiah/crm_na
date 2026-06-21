import type { NextConfig } from "next";

import { siteRedirects } from "./next-redirects";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "crm-na.org" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "**.ibb.co" },
      { protocol: "https", hostname: "api.qrserver.com" },
      { protocol: "http", hostname: "localhost", port: "8080" },
    ],
    dangerouslyAllowLocalIP: true,
  },
  async redirects() {
    return siteRedirects;
  },
  // Hostnames only (not full URLs). Origin `http://127.0.0.1:3000` → hostname `127.0.0.1`.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
