import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PublicationsListView from "@/components/publications/PublicationsListView";
import { getPublications } from "@/lib/wordpress";

async function PublicationsPage() {
  const publications = [...(await getPublications())].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const filterNav = (
    <div className="flex flex-wrap gap-5">
      <Link
        href="/publications/devotionals"
        className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-accent-text)"
      >
        Devotionals <ArrowRight className="size-3" aria-hidden />
      </Link>
      <Link
        href="/publications/blog"
        className="font-display inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase text-(--color-fg-secondary)"
      >
        Blog <ArrowRight className="size-3" aria-hidden />
      </Link>
    </div>
  );

  return (
    <PublicationsListView
      eyebrow="Publications"
      title="Pastor's Corner"
      description="Pastoral reflections, devotionals, and editorial writing from CRM North America leadership."
      publications={publications}
      filterNav={filterNav}
    />
  );
}

export default PublicationsPage;
