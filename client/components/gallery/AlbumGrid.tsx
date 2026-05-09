import type { ReactNode } from "react";
import type { GalleryAlbum } from "@/lib/types";
import AlbumCard from "@/components/gallery/AlbumCard";

function AlbumGrid({
  albums,
  emptyState,
}: Readonly<{
  albums: GalleryAlbum[];
  emptyState?: ReactNode;
}>) {
  if (albums.length === 0) {
    return (
      emptyState ?? (
        <div className="card-surface p-8 text-center">
          <p className="text-(--color-fg-secondary)">
            No albums are available in this category yet.
          </p>
        </div>
      )
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

export default AlbumGrid;
