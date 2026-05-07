import type { MetadataRoute } from "next";
import { churches, events, ministries } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/who-we-are",
    "/vision",
    "/core-values",
    "/history",
    "/our-pastors",
    "/churches",
    "/ministries",
    "/events",
    "/watch-us-live",
    "/publications",
    "/media",
    "/contact",
    "/give",
    "/youths",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...churches.map((church) => ({
      url: `${siteUrl}/churches/${church.slug}`,
      lastModified: new Date(),
    })),
    ...ministries.map((ministry) => ({
      url: `${siteUrl}/ministries/${ministry.slug}`,
      lastModified: new Date(),
    })),
    ...events.map((event) => ({
      url: `${siteUrl}/events/${event.slug}`,
      lastModified: new Date(),
    })),
  ];
}
