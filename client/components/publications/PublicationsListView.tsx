import type { ReactNode } from "react";
import type { Publication } from "@/lib/types";
import PageHeader from "@/components/shared/PageHeader";
import PublicationCard from "@/components/publications/PublicationCard";

interface PublicationsListViewProps {
  publications: Publication[];
  eyebrow: string;
  title: string;
  description: string;
  /** Optional content rendered between the PageHeader and the publication grid (e.g. filter links). */
  filterNav?: ReactNode;
  basePath?: string;
}

function PublicationsListView({
  publications,
  eyebrow,
  title,
  description,
  filterNav,
  basePath,
}: Readonly<PublicationsListViewProps>) {
  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {filterNav ? (
        <div className="container-shell section-padding pb-0">{filterNav}</div>
      ) : null}
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell">
          {publications.length === 0 ? (
            <div className="card-surface p-8 text-center md:p-12">
              <p className="text-(--color-fg-secondary)">
                No content in this category has been published yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {publications.map((publication) => (
                <PublicationCard
                  key={publication.slug}
                  publication={publication}
                  basePath={basePath}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PublicationsListView;
