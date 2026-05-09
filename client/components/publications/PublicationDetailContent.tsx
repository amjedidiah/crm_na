import Link from "next/link";
import type { Publication } from "@/lib/types";

function PublicationDetailContent({
  publication,
  backHref = "/devotionals",
  backLabel = "Back to Devotionals",
}: Readonly<{
  publication: Publication;
  backHref?: string;
  backLabel?: string;
}>) {
  return (
    <section className="section-padding text-(--color-fg-primary)">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <aside className="card-surface space-y-4 p-6">
          <p className="eyebrow">About the author</p>
          <div className="space-y-2">
            <h2 className="text-3xl">{publication.authorName}</h2>
            <p className="text-(--color-fg-secondary)">{publication.authorTitle}</p>
          </div>
          {publication.externalUrl ? (
            <a
              href={publication.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
            >
              Open original source
            </a>
          ) : null}
        </aside>
        <div className="space-y-6">
          {publication.content.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-4xl text-lg leading-8 text-(--color-fg-secondary)"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={backHref}
            className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PublicationDetailContent;
