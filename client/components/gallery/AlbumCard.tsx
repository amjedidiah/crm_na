import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import Motion from "@/components/shared/Motion";
import { cn, formatDate } from "@/lib/utils";
import type { GalleryAlbum } from "@/lib/types";

function AlbumCard({ album }: Readonly<{ album: GalleryAlbum }>) {
  return (
    <Link href={`/gallery/${album.slug}`} className="group block h-full">
      <Motion
        as="article"
        className={cn(
          "card-surface flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300",
          "hover:-translate-y-1 hover:border-(--border-brand) hover:shadow-lg",
        )}
      >
        <div className="relative aspect-4/3 overflow-hidden border-b border-(--border-default)">
          <Image
            src={album.coverImage.src}
            alt={album.coverImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            unoptimized
          />
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-(--border-default) bg-(--surface-page-elevated)/90 px-3 py-1 text-xs font-medium text-(--text-primary) backdrop-blur-sm">
            <Camera className="size-3.5" aria-hidden />
            {album.images.length}
          </span>
        </div>

        <div className="flex flex-1 flex-col space-y-3 p-6">
          <h3 className="text-2xl transition-colors group-hover:text-(--text-accent) md:text-3xl">
            {album.title}
          </h3>
          {album.date ? (
            <p className="text-sm text-(--text-secondary)">
              {formatDate(album.date)}
            </p>
          ) : null}

          <div className="mt-auto flex items-center gap-1 pt-2 font-display text-xs tracking-[0.22em] uppercase text-(--text-accent) opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            View album
            <ArrowUpRight className="size-4" aria-hidden />
          </div>
        </div>
      </Motion>
    </Link>
  );
}

export default AlbumCard;
