import type { MetadataRoute } from "next";
import { churches, events, getGalleryAlbums, ministries } from "@/lib/mock-data";

function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/who-we-are",
    "/churches",
    "/ministries",
    "/events",
    "/devotionals",
    "/gallery",
    "/contact",
    "/give",
  ];
  const galleryAlbums = getGalleryAlbums();

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
    ...galleryAlbums.map((album) => ({
      url: `${siteUrl}/gallery/${album.slug}`,
      lastModified: new Date(album.date ?? "2026-01-01"),
    })),
  ];
}

export default sitemap;
