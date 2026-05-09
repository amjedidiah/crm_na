import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import type { GalleryImage } from "@/lib/types";

const MAX_IMAGES = 4;

function GalleryPreview({
  images,
  href,
  title = "Photo Gallery",
}: Readonly<{
  images: GalleryImage[];
  href: string;
  title?: string;
}>) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="bg-(--color-bg-accent-soft) flex size-10 items-center justify-center rounded-full">
          <Camera
            className="size-5 text-(--color-fg-accent-text)"
            aria-hidden
          />
        </div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {images.slice(0, MAX_IMAGES).map((image) => (
          <div
            key={`${href}-${image.src}`}
            className="overflow-hidden rounded-[1.2rem] border border-(--color-border-subtle)"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              className="aspect-4/3 h-full w-full object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
      <Link
        href={href}
        className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-accent-text)"
      >
        View more in gallery
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

export default GalleryPreview;
