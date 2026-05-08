import type { MediaItem } from "@/lib/types";
import MediaCard from "@/components/media/MediaCard";

function MediaGrid({ items }: Readonly<{ items: MediaItem[] }>) {
  return (
    <div className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <MediaCard key={item.slug} item={item} />
      ))}
    </div>
  );
}

export default MediaGrid;
