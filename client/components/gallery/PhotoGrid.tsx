"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

const WINDOWING_THRESHOLD = 50;
const INITIAL_COUNT = 32;
const BATCH_SIZE = 24;

interface PhotoGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}

function GridImage({
  image,
  index,
  onClick,
}: Readonly<{
  image: GalleryImage;
  index: number;
  onClick: () => void;
}>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative aspect-4/3 cursor-pointer overflow-hidden rounded-2xl border border-(--color-border-subtle)",
        "focus-visible:ring-2 focus-visible:ring-(--color-fg-accent-text) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg-canvas) focus-visible:outline-none",
      )}
      aria-label={image.alt ? image.alt : `Photo ${index + 1}`}
    >
      <div
        className={cn(
          "absolute inset-0 bg-shimmer-emphasis-muted transition-opacity duration-300",
          loaded ? "opacity-0" : "animate-pulse opacity-100",
        )}
        aria-hidden
      />

      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={cn(
          "object-cover transition-all duration-500",
          loaded
            ? "scale-100 opacity-100 group-hover:scale-105"
            : "scale-105 opacity-0",
        )}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        unoptimized
        onLoad={() => setLoaded(true)}
      />

      {loaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/35">
          <Expand
            className="size-6 text-(--color-fg-inverse) opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </div>
      ) : null}
    </button>
  );
}

function PhotoGrid({ images, onImageClick }: Readonly<PhotoGridProps>) {
  const windowed = images.length > WINDOWING_THRESHOLD;
  const [visibleCount, setVisibleCount] = useState(() =>
    windowed ? Math.min(INITIAL_COUNT, images.length) : images.length,
  );
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((count) => Math.min(count + BATCH_SIZE, images.length));
  }, [images.length]);

  useEffect(() => {
    if (!windowed) {
      return;
    }
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [windowed, loadMore]);

  const visibleImages = windowed ? images.slice(0, visibleCount) : images;
  const hasMore = windowed && visibleCount < images.length;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibleImages.map((image, index) => (
          <GridImage
            key={`${image.src}-${index.toString()}`}
            image={image}
            index={index}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>

      {hasMore ? <div ref={sentinelRef} className="h-1" aria-hidden /> : null}
    </>
  );
}

export default PhotoGrid;
