import type { GalleryAlbum, GalleryCategory } from "@/lib/types";

export function filterAlbumsByCategory(
  albums: readonly GalleryAlbum[],
  category: GalleryCategory,
): GalleryAlbum[] {
  if (category === "all") {
    return [...albums];
  }
  return albums.filter((album) => album.category === category);
}

/** Clamps `index` to a valid index for an array of `length`, or 0 when empty. */
export function clampGalleryIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }
  return Math.max(0, Math.min(index, length - 1));
}
