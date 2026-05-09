import Link from "next/link";
import type { Publication } from "@/lib/types";
import { PUBLICATION_TYPE_LABELS } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function PublicationCard({
  publication,
  basePath = "/devotionals",
}: Readonly<{
  publication: Publication;
  basePath?: string;
}>) {
  return (
    <Link href={`${basePath}/${publication.slug}`} className="card-surface block space-y-4 p-6">
      <p className="eyebrow">{PUBLICATION_TYPE_LABELS[publication.type]}</p>
      <h3 className="text-3xl">{publication.title}</h3>
      <p className="text-(--color-fg-secondary)">{publication.synopsis}</p>
      <p className="text-sm text-(--color-fg-secondary)">
        {formatDate(publication.publishedAt)}
      </p>
    </Link>
  );
}

export default PublicationCard;
