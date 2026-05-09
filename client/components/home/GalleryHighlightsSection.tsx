import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryAlbum } from "@/lib/types";
import AlbumCard from "@/components/gallery/AlbumCard";
import SectionHeader from "@/components/shared/SectionHeader";

function GalleryHighlightsSection({
  albums,
}: Readonly<{ albums: GalleryAlbum[] }>) {
  const previewAlbums = albums.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Gallery"
          title="Photos from gatherings, ministries, and shared moments"
          description="The CRM NA gallery now serves as the visual archive for conventions, ministry life, and network-wide fellowship across North America."
        />
        {previewAlbums.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {previewAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <div className="card-surface p-8">
            <p className="eyebrow">Gallery</p>
            <h3 className="mt-3 text-3xl">Fresh gallery albums will appear here.</h3>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
              As events, ministries, and special network moments are documented,
              this section will point visitors into the full gallery archive.
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/gallery"
            className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-accent-text)"
          >
            Browse the full gallery
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/events"
            className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-secondary)"
          >
            View upcoming events
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GalleryHighlightsSection;
