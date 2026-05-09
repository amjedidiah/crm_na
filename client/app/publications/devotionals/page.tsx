import PublicationsListView from "@/components/publications/PublicationsListView";
import { getPublicationsByType } from "@/lib/wordpress";

async function DevotionalsPage() {
  const publications = [...(await getPublicationsByType("devotional"))].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <PublicationsListView
      eyebrow="Publications"
      title="Devotionals"
      description="Pastoral meditations and devotional writings from CRM North America leadership."
      publications={publications}
    />
  );
}

export default DevotionalsPage;
