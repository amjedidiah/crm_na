import type { MediaItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function MediaCard({ item }: Readonly<{ item: MediaItem }>) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      className="card-surface block space-y-4 p-6"
    >
      <p className="eyebrow">{item.type}</p>
      <h3 className="text-3xl">{item.title}</h3>
      <p className="text-(--color-fg-secondary)">{item.summary}</p>
      <p className="text-sm text-(--color-fg-secondary)">
        {formatDate(item.publishedAt)}
      </p>
    </a>
  );
}

export default MediaCard;
