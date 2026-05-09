import { notFound } from "next/navigation";
import PublicationDetailContent from "@/components/publications/PublicationDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { formatDate } from "@/lib/utils";
import { getPublication, getPublications } from "@/lib/wordpress";
import { PUBLICATION_TYPE_LABELS } from "@/lib/types";

export async function generateStaticParams() {
  const publications = await getPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

async function PublicationDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const publication = await getPublication(slug);

  if (!publication) {
    notFound();
  }

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow={PUBLICATION_TYPE_LABELS[publication.type]}
        title={publication.title}
        description={publication.synopsis}
      >
        <div className="flex flex-wrap gap-4 text-sm text-(--color-fg-inverse-soft)">
          <span>{formatDate(publication.publishedAt)}</span>
          <span>{publication.authorName}</span>
        </div>
      </PageHeader>
      <PublicationDetailContent publication={publication} />
    </div>
  );
}

export default PublicationDetailPage;
