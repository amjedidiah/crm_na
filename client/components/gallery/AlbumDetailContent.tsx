"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Lightbox from "@/components/gallery/Lightbox";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import { clampGalleryIndex } from "@/lib/gallery-utils";
import type { GalleryAlbum } from "@/lib/types";

function AlbumDetailContent({ album }: Readonly<{ album: GalleryAlbum }>) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const len = album.images.length;

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((index) =>
      index === null ? index : clampGalleryIndex(index + 1, len),
    );
  }, [len]);

  const goPrevious = useCallback(() => {
    setSelectedIndex((index) =>
      index === null ? index : clampGalleryIndex(index - 1, len),
    );
  }, [len]);

  return (
    <section className="section-padding text-(--text-primary)">
      <div className="container-shell space-y-8">
        {album.sourceHref ? (
          <div className="flex flex-wrap gap-4">
            <Link
              href={album.sourceHref}
              className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--text-accent)"
            >
              Return to source page
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : null}

        {len === 0 ? (
          <div className="card-surface p-10 text-center">
            <p className="text-lg text-(--text-secondary)">
              This album does not have any photos yet. Check back soon or browse
              other albums in the gallery.
            </p>
          </div>
        ) : (
          <PhotoGrid
            images={album.images}
            onImageClick={(index) =>
              setSelectedIndex(clampGalleryIndex(index, len))
            }
          />
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && len > 0 ? (
          <Lightbox
            images={album.images}
            currentIndex={clampGalleryIndex(selectedIndex, len)}
            onClose={closeLightbox}
            onNext={goNext}
            onPrevious={goPrevious}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}

export default AlbumDetailContent;
