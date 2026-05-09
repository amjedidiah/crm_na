import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "crm-na.org" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "**.ytimg.com" },
      { protocol: "https", hostname: "**.ibb.co" },
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
      {
        source: "/vision",
        destination: "/who-we-are#vision",
        permanent: true,
      },
      {
        source: "/history",
        destination: "/who-we-are#history",
        permanent: true,
      },
      {
        source: "/core-values",
        destination: "/who-we-are#core-values",
        permanent: true,
      },
      {
        source: "/our-pastors",
        destination: "/who-we-are#leadership",
        permanent: true,
      },
      {
        source: "/watch-us-live",
        destination: "/gallery",
        permanent: true,
      },
      { source: "/sermon", destination: "/gallery", permanent: true },
      { source: "/media", destination: "/gallery", permanent: true },
      { source: "/publications", destination: "/devotionals", permanent: true },
      {
        source: "/publications/devotionals",
        destination: "/devotionals",
        permanent: true,
      },
      {
        source: "/publications/blog",
        destination: "/devotionals",
        permanent: true,
      },
      {
        source: "/publications/:slug",
        destination: "/devotionals",
        permanent: true,
      },
      {
        source: "/devotionals/:slug",
        destination: "/devotionals",
        permanent: true,
      },
    ];
  },
  // Hostnames only (not full URLs). Origin `http://127.0.0.1:3000` → hostname `127.0.0.1`.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
