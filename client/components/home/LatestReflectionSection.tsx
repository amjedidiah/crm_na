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
            eyebrow="Devotionals"
            title="A devotional word for the week"
            description="Read the latest pastoral reflection from CRM North America leadership—written to strengthen faith, clarity, and hunger for revival in ordinary life."
            inverse
          />
          <div className="mt-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-display text-[0.68rem] tracking-[0.26em] uppercase text-(--color-fg-accent-strong)">
                Featured reading
              </p>
              <p className="mt-3 text-sm leading-7 text-(--color-fg-inverse-soft)">
                Short pastoral reading for households, workers, and church
                members who want spiritual direction beyond the service hour.
              </p>
            </div>
            <span className="font-display text-6xl leading-none text-(--color-fg-accent-strong)/60">
              01
            </span>
          </div>
        </div>
        <Link
          href={`/publications/${latest.slug}`}
          className="card-surface shadow-card-hover group relative block overflow-hidden rounded-[1.75rem] space-y-5 p-8 transition-[transform,box-shadow,border-color] hover:-translate-y-1 hover:border-(--color-border-accent) md:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full blur-2xl"
            style={{ background: "var(--gradient-reflection-orb)" }}
          />
          <p className="eyebrow text-(--color-fg-accent-text)">Latest essay</p>
          <h3 className="text-3xl leading-tight group-hover:text-(--color-fg-accent-text) md:text-4xl">
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
          <p className="text-(--color-fg-accent-text) font-display text-xs tracking-[0.26em] uppercase">
            Read the devotional
          </p>
        </Link>
      </div>
    </section>
  );
}

export default LatestReflectionSection;
