import PublicationCard from "@/components/media/PublicationCard";
import PageHeader from "@/components/shared/PageHeader";
import { getPublications } from "@/lib/wordpress";

async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Publications"
        title="Publications"
        description="The route is scaffolded now even though the legacy page was empty during the audit."
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
