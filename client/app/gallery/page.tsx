import type { Metadata } from "next";
import FadeInWhenVisible from "@/components/shared/FadeInWhenVisible";
import GalleryFilterSection from "@/components/gallery/GalleryFilterSection";
import Button from "@/components/shared/Button";
import PageHeader from "@/components/shared/PageHeader";
import {
  GALLERY_CATEGORIES,
  SITE_NAME,
} from "@/lib/mock-data";
import { getGalleryAlbums } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Gallery",
  description: `Photo albums from events, ministries, and shared moments across ${SITE_NAME}.`,
  alternates: {
    canonical: "/gallery",
  },
};

async function GalleryPage() {
  const albums = [...(await getGalleryAlbums())].sort((left, right) => {
    const leftTime = left.date ? new Date(left.date).getTime() : 0;
    const rightTime = right.date ? new Date(right.date).getTime() : 0;
    return rightTime - leftTime;
  });

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        eyebrow="Gallery"
        title="Gallery"
        description="Browse photo albums from events, ministries, and shared moments across the CRM North America network."
      />

      {albums.length === 0 ? (
        <section className="section-padding">
          <div className="container-shell">
            <div className="card-surface mx-auto max-w-2xl space-y-6 p-8 text-center md:p-12">
              <p className="eyebrow">Gallery</p>
              <h2 className="text-3xl md:text-4xl">No albums yet</h2>
              <p className="text-lg leading-8 text-(--text-secondary)">
                New photo albums will appear here after gatherings and ministry
                highlights. You can still explore events and ministries across
                the network.
              </p>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button href="/events">Browse events</Button>
                <Button href="/ministries" variant="outline">
                  Ministries
                </Button>
                <Button href="/" variant="outline">
                  Home
                </Button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-top-glow"
          />
          <FadeInWhenVisible>
            <GalleryFilterSection albums={albums} categories={GALLERY_CATEGORIES} />
          </FadeInWhenVisible>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
