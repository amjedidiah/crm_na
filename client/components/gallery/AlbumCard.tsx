import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryAlbum } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const CATEGORY_LABELS: Record<GalleryAlbum["category"], string> = {
  events: "Event album",
  ministries: "Ministry album",
  general: "Gallery album",
};

function AlbumCard({ album }: Readonly<{ album: GalleryAlbum }>) {
  return (
    <Link
      href={`/gallery/${album.slug}`}
      className="card-surface group block h-full overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent)"
    >
      <div className="aspect-4/3 overflow-hidden border-b border-(--color-border-subtle)">
        <Image
          src={album.coverImage.src}
          alt={album.coverImage.alt}
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          unoptimized
        />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-fg-secondary)">
          <span className="eyebrow">{CATEGORY_LABELS[album.category]}</span>
          {album.date ? <span>{formatDate(album.date)}</span> : null}
        </div>
        <div className="space-y-2">
          <h3 className="text-3xl">{album.title}</h3>
          <p className="text-sm leading-7 text-(--color-fg-secondary)">
            {album.images.length} photos from worship, fellowship, and ministry
            life.
          </p>
        </div>
        <span className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-accent-text)">
          View album
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

export default AlbumCard;
