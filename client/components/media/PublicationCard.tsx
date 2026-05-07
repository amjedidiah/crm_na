import type { Publication } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function PublicationCard({
  publication,
}: Readonly<{
  publication: Publication;
}>) {
  return (
    <a
      href={publication.url}
      target="_blank"
      rel="noreferrer"
      className="card-surface block space-y-4 p-6"
    >
      <p className="eyebrow">Publication</p>
      <h3 className="text-3xl">{publication.title}</h3>
      <p className="text-(--muted)">{publication.summary}</p>
      <p className="text-sm text-(--muted)">
        {formatDate(publication.publishedAt)}
      </p>
    </a>
  );
}

export default PublicationCard;
