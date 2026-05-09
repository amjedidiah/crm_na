"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import AlbumCard from "@/components/gallery/AlbumCard";
import { GALLERY_ALBUM_PAGE_SIZE } from "@/lib/mock-data";
import type { GalleryAlbum } from "@/lib/types";

interface AlbumGridProps {
  albums: GalleryAlbum[];
  emptyState?: ReactNode;
}

function AlbumGrid({ albums, emptyState }: Readonly<AlbumGridProps>) {
  const [visibleCount, setVisibleCount] = useState(GALLERY_ALBUM_PAGE_SIZE);

  if (albums.length === 0) {
    return (
      emptyState ?? (
        <div className="card-surface p-8 text-center">
          <p className="text-(--text-secondary)">
            No albums are available.
          </p>
        </div>
      )
    );
  }

  const visible = albums.slice(0, visibleCount);
  const hasMore = visibleCount < albums.length;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() =>
              setVisibleCount((count) => count + GALLERY_ALBUM_PAGE_SIZE)
            }
            className="font-display inline-flex cursor-pointer items-center gap-2 border border-(--border-default) px-8 py-2.5 text-xs tracking-[0.2em] uppercase text-(--text-secondary) transition-colors hover:border-(--border-brand) hover:text-(--text-accent)"
          >
            Load more
            <ChevronDown className="size-4" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AlbumGrid;
