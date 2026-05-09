import PublicationsListView from "@/components/publications/PublicationsListView";
import { getPublicationsByType } from "@/lib/wordpress";

async function BlogPage() {
  const publications = [...(await getPublicationsByType("blog"))].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <PublicationsListView
      eyebrow="Publications"
      title="Blog"
      description="Editorial writing and leadership perspectives from across CRM North America."
      publications={publications}
    />
  );
}

export default BlogPage;
