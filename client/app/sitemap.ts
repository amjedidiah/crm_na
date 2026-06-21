import type { MetadataRoute } from "next";
import { churchShouldAppearInSitemap } from "@/lib/church-utils";
import { eventShouldAppearInSitemap } from "@/lib/event-utils";
import {
  getChurches,
  getEvents,
  getGalleryAlbums,
  getMinistries,
} from "@/lib/wordpress";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/about",
    "/churches",
    "/ministries",
    "/events",
    "/devotionals",
    "/gallery",
    "/contact",
    "/give",
  ];

  const [churches, ministries, events, galleryAlbums] = await Promise.all([
    getChurches(),
    getMinistries(),
    getEvents(),
    getGalleryAlbums(),
  ]);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...churches
      .filter(churchShouldAppearInSitemap)
      .map((church) => ({
        url: `${siteUrl}/churches/${church.slug}`,
        lastModified: new Date(),
      })),
    ...ministries.map((ministry) => ({
      url: `${siteUrl}/ministries/${ministry.slug}`,
      lastModified: new Date(),
    })),
    ...events
      .filter(eventShouldAppearInSitemap)
      .map((event) => ({
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
