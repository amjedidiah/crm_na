import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GalleryAlbum } from "@/lib/types";

function AlbumDetailContent({ album }: Readonly<{ album: GalleryAlbum }>) {
  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell space-y-8">
        {album.sourceHref ? (
          <div className="flex flex-wrap gap-4">
            <Link
              href={album.sourceHref}
              className="font-display inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-accent-text)"
            >
              Return to source page
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        ) : null}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {album.images.map((image) => (
            <figure
              key={`${album.slug}-${image.src}`}
              className="card-surface overflow-hidden"
            >
              <div className="aspect-4/3 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </div>
              {image.caption ? (
                <figcaption className="p-4 text-sm leading-7 text-(--color-fg-secondary)">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AlbumDetailContent;
