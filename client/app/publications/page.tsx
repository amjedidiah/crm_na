import PublicationCard from "@/components/media/PublicationCard";
import PageHeader from "@/components/shared/PageHeader";
import { getPublications } from "@/lib/wordpress";

async function PublicationsPage() {
  const publications = [...(await getPublications())].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Publications"
        title="Pastor&apos;s Corner"
        description="Read pastoral reflections and leadership meditations in a structured editorial archive rooted at the existing publications URL."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell grid gap-6 md:grid-cols-2">
          {publications.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default PublicationsPage;
