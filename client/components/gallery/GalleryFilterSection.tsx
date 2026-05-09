"use client";

import { useMemo, useState } from "react";
import type { GalleryAlbum, GalleryCategory } from "@/lib/types";
import AlbumGrid from "@/components/gallery/AlbumGrid";

interface GalleryFilterSectionProps {
  albums: GalleryAlbum[];
  categories: { value: GalleryCategory; label: string }[];
}

function GalleryFilterSection({
  albums,
  categories,
}: Readonly<GalleryFilterSectionProps>) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const filteredAlbums = useMemo(
    () =>
      activeCategory === "all"
        ? albums
        : albums.filter((album) => album.category === activeCategory),
    [activeCategory, albums],
  );

  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell space-y-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = category.value === activeCategory;

            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setActiveCategory(category.value)}
                className={`font-display border px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors ${
                  active
                    ? "border-(--color-fg-accent-text) bg-(--color-bg-accent-soft) text-(--color-fg-accent-text)"
                    : "border-(--color-border-subtle) text-(--color-fg-secondary) hover:border-(--color-border-accent)"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <AlbumGrid albums={filteredAlbums} />
      </div>
    </section>
  );
}

export default GalleryFilterSection;
