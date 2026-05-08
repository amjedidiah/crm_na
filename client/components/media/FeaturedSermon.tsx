import type { MediaItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function FeaturedSermon({ item }: Readonly<{ item: MediaItem | null }>) {
  if (!item) {
    return (
      <div className="card-surface space-y-4 p-8">
        <p className="eyebrow">Latest sermon</p>
        <h2 className="text-4xl md:text-5xl">A featured sermon will appear here.</h2>
        <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
          No sermon records are available yet. The media archive below remains
          the fallback discovery surface until the first sermon is published.
        </p>
      </div>
    );
  }

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="card-surface block space-y-5 p-8"
    >
      <p className="eyebrow">Latest sermon</p>
      <div className="space-y-3">
        <h2 className="text-4xl md:text-5xl">{item.title}</h2>
        <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
          {item.summary}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-(--color-fg-secondary)">
        <span>{formatDate(item.publishedAt)}</span>
        {item.speaker ? <span>{item.speaker}</span> : null}
      </div>
      <span className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)">
        Watch message
      </span>
    </a>
  );
}

export default FeaturedSermon;
