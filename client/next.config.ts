import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "crm-na.org" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "http", hostname: "localhost", port: "8080" },
    ],
    dangerouslyAllowLocalIP: true,
  },
  async redirects() {
    return [
      { source: "/contact-us", destination: "/contact", permanent: true },
      {
        source: "/crm-word-of-life",
        destination: "/churches/crm-word-of-life",
        permanent: true,
      },
      {
        source: "/crm-praise-center",
        destination: "/churches/crm-praise-center",
        permanent: true,
      },
      {
        source: "/crm-rhode-island",
        destination: "/churches/crm-rhode-island",
        permanent: true,
      },
      {
        source: "/grace-glory-sanctuary",
        destination: "/churches/grace-glory-sanctuary",
        permanent: true,
      },
      {
        source: "/cwl-charismatic-women-league",
        destination: "/ministries/cwl-charismatic-women-league",
        permanent: true,
      },
      {
        source: "/kings-men",
        destination: "/ministries/kings-men",
        permanent: true,
      },
      {
        source: "/youths",
        destination: "/ministries/youths",
        permanent: true,
      },
      { source: "/sermon", destination: "/media", permanent: true },
    ];
  },
  // Hostnames only (not full URLs). Origin `http://127.0.0.1:3000` → hostname `127.0.0.1`.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
