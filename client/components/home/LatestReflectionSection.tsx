import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { formatDate } from "@/lib/utils";
import { getPublications } from "@/lib/wordpress";

async function LatestReflectionSection() {
  const publications = [...(await getPublications())].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
  const latest = publications[0];

  if (!latest) return null;

  return (
    <section className="section-padding">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
        <div className="rounded-[1.75rem] bg-(--color-bg-emphasis) p-8 text-(--color-fg-inverse) md:p-10">
          <SectionHeader
            eyebrow="Pastor&apos;s corner"
            title="A word for the house"
            description="Read the latest pastoral reflection from CRM North America leadership—written to strengthen faith, clarity, and hunger for revival."
            inverse
          />
          <div className="mt-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-display text-[0.68rem] tracking-[0.26em] uppercase text-(--color-fg-accent-strong)">
                Latest voice
              </p>
              <p className="mt-3 text-sm leading-7 text-(--color-fg-inverse-soft)">
                Long-form encouragement for households, workers, and church
                members who want pastoral clarity beyond the service hour.
              </p>
            </div>
            <span className="font-display text-6xl leading-none text-(--color-fg-accent-strong)/60">
              01
            </span>
          </div>
        </div>
        <Link
          href={`/publications/${latest.slug}`}
          className="card-surface group relative block overflow-hidden rounded-[1.75rem] space-y-5 p-8 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-(--color-border-accent) hover:shadow-[0_24px_60px_-30px_rgba(11,22,40,0.35)] md:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(200,168,90,0.18),transparent_70%)] blur-2xl"
          />
          <p className="eyebrow">Latest essay</p>
          <h3 className="text-3xl leading-tight group-hover:text-(--color-fg-accent) md:text-4xl">
            {latest.title}
          </h3>
          <p className="text-(--color-fg-secondary) text-lg leading-8">
            {latest.synopsis}
          </p>
          <div className="flex flex-wrap items-baseline gap-3 pt-2 text-sm text-(--color-fg-secondary)">
            <span className="text-(--color-fg-primary) font-semibold">
              {latest.authorName}
            </span>
            <span>{latest.authorTitle}</span>
            <span aria-hidden>·</span>
            <time dateTime={latest.publishedAt}>
              {formatDate(latest.publishedAt)}
            </time>
          </div>
          <p className="text-(--color-fg-accent) font-display text-xs tracking-[0.26em] uppercase">
            Read full reflection
          </p>
        </Link>
      </div>
    </section>
  );
}

export default LatestReflectionSection;
