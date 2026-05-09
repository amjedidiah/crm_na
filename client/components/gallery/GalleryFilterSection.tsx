"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageOff } from "lucide-react";
import AlbumGrid from "@/components/gallery/AlbumGrid";
import Motion from "@/components/shared/Motion";
import { filterAlbumsByCategory } from "@/lib/gallery-utils";
import type { GalleryAlbum, GalleryCategory } from "@/lib/types";

interface GalleryFilterSectionProps {
  albums: GalleryAlbum[];
  categories: { value: GalleryCategory; label: string }[];
}

function GalleryFilterSection({
  albums,
  categories,
}: Readonly<GalleryFilterSectionProps>) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const filtered = useMemo(
    () => filterAlbumsByCategory(albums, activeCategory),
    [activeCategory, albums],
  );

  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell space-y-8">
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
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

        <AnimatePresence mode="wait">
          <Motion
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <AlbumGrid
              albums={filtered}
              emptyState={
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <ImageOff
                    className="size-16 text-(--color-fg-secondary) opacity-60"
                    aria-hidden
                  />
                  <p className="max-w-md text-lg text-(--color-fg-secondary)">
                    No albums in this category yet. Try another filter or check
                    back after the next gathering.
                  </p>
                </div>
              }
            />
          </Motion>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default GalleryFilterSection;
