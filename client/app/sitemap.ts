import type { MetadataRoute } from "next";
import { churches, events, ministries, publications } from "@/lib/mock-data";

function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/who-we-are",
    "/churches",
    "/ministries",
    "/events",
    "/publications",
    "/media",
    "/contact",
    "/give",
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
    ...publications.map((publication) => ({
      url: `${siteUrl}/publications/${publication.slug}`,
      lastModified: new Date(publication.publishedAt),
    })),
  ];
}

export default sitemap;
