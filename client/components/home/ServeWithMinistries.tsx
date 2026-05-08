import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Ministry } from "@/lib/types";

interface ServeWithMinistriesProps {
  ministries: Ministry[];
}

function ServeWithMinistries({ ministries }: Readonly<ServeWithMinistriesProps>) {
  return (
    <section className="relative overflow-hidden">
      <div className="from-(--color-bg-accent-soft)/40 pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,transparent_52%,rgba(250,246,238,1)_70%)] to-transparent" />

      <div className="section-padding relative">
        <div className="container-shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Serve with us"
              title="Faith that moves past Sunday gatherings"
              description="Branches need volunteers, creatives, counselors, administrators, worshipers, and intercessors—each stewarding revival in households, neighborhoods, and digital spaces."
            />
            <Button href="/ministries">Explore ministries</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {ministries.map((card) => (
              <Link
                key={card.slug}
                href={`/ministries/${card.slug}`}
                className="card-surface hover:border-(--color-fg-accent) flex h-full flex-col p-6 transition-colors"
              >
                <p className="font-display text-(--color-fg-accent) text-[0.62rem] tracking-[0.3em] uppercase">
                  Ministry
                </p>
                <h3 className="mt-2 text-2xl">{card.name}</h3>
                <p className="text-(--color-fg-secondary) mt-3 grow text-sm leading-6">
                  {card.summary}
                </p>
                <span className="text-(--color-fg-accent) font-display mt-5 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.24em] uppercase">
                  Learn more
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
            <Link
              href="/ministries"
              className="card-surface group flex h-full flex-col justify-between border-dashed p-6 md:col-span-2"
            >
              <div>
                <p className="font-display text-(--color-fg-accent) text-[0.62rem] tracking-[0.3em] uppercase">
                  Your gift matters
                </p>
                <h3 className="mt-2 text-2xl">There is a place for you on the team</h3>
                <p className="text-(--color-fg-secondary) mt-3 max-w-2xl text-sm leading-6">
                  From youth ministry to women&apos;s discipleship, men&apos;s accountability, and
                  creative media, these teams are a glimpse of the larger story—open more doors as
                  faithful stewards arrive.
                </p>
              </div>
              <span className="text-(--color-fg-accent) font-display mt-6 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.24em] uppercase">
                View the full ministry index
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServeWithMinistries;
