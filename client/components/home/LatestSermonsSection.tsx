import Link from "next/link";
import { ArrowRight, ArrowUpRight, PlayCircle } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { MediaItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

function LatestSermonsSection({
  sermons,
}: Readonly<{ sermons: MediaItem[] }>) {
  const [featuredSermon, ...otherSermons] = sermons;

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Sermons"
          title="Recent messages from across CRM North America"
          description="Step into the latest preaching before moving deeper into the full media archive. These messages keep worshipers, workers, and first-time visitors connected to the voice of the house."
        />
        {featuredSermon ? (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <a
              href={featuredSermon.url}
              target="_blank"
              rel="noreferrer"
              className="dark-strip group flex h-full flex-col justify-between rounded-[1.9rem] p-8 md:p-10"
            >
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-(--color-fg-accent-strong)">
                  <PlayCircle className="size-5" aria-hidden />
                  <p className="font-display text-[0.68rem] tracking-[0.28em] uppercase">
                    Featured sermon
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl text-(--color-fg-inverse) md:text-5xl">
                    {featuredSermon.title}
                  </h3>
                  <p className="max-w-2xl text-base leading-8 text-(--color-fg-inverse-soft) md:text-lg">
                    {featuredSermon.summary}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-(--color-fg-inverse-soft)">
                  {featuredSermon.speaker ? (
                    <span>{featuredSermon.speaker}</span>
                  ) : null}
                  <span aria-hidden>·</span>
                  <span>{formatDate(featuredSermon.publishedAt)}</span>
                </div>
              </div>
              <span className="font-display text-(--color-fg-accent-strong) mt-8 inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase">
                Watch message
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </a>

            <div className="grid gap-4">
              {otherSermons.slice(0, 2).map((sermon) => (
                <a
                  key={sermon.slug}
                  href={sermon.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-surface group flex h-full flex-col justify-between p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent)"
                >
                  <div className="space-y-3">
                    <p className="font-display text-(--color-fg-accent-text) text-[0.64rem] tracking-[0.24em] uppercase">
                      Sermon replay
                    </p>
                    <h3 className="text-3xl">{sermon.title}</h3>
                    <p className="text-(--color-fg-secondary) text-sm leading-7">
                      {sermon.summary}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-(--color-fg-secondary)">
                      {sermon.speaker ? <span>{sermon.speaker}</span> : null}
                      <span>{formatDate(sermon.publishedAt)}</span>
                    </div>
                  </div>
                  <span className="text-(--color-fg-accent-text) font-display mt-6 inline-flex items-center gap-2 text-[0.64rem] tracking-[0.24em] uppercase">
                    Open sermon
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-surface space-y-4 p-8">
            <p className="eyebrow">Sermons</p>
            <h3 className="text-4xl">New sermon replays will appear here.</h3>
            <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
              Visit the media hub for livestream access and replay discovery as
              fresh preaching records are added to the archive.
            </p>
          </div>
        )}
        <Link
          href="/media"
          className="font-display text-(--color-fg-accent-text) inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase"
        >
          Browse the full media hub
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}

export default LatestSermonsSection;
