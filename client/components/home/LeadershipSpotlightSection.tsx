import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Leader } from "@/lib/types";

function getLeaderHref(leader: Leader) {
  if (leader.churchSlug) {
    return `/churches/${leader.churchSlug}`;
  }

  if (leader.ministrySlug) {
    return `/ministries/${leader.ministrySlug}`;
  }

  return "/who-we-are#leadership";
}

function getLeaderContext(leader: Leader) {
  if (leader.churchSlug) {
    return "Church leader";
  }

  if (leader.ministrySlug) {
    return "Ministry leader";
  }

  return "National leadership";
}

function LeadershipSpotlightSection({
  leaders,
}: Readonly<{ leaders: Leader[] }>) {
  const [featuredLeader, ...supportingLeaders] = leaders;

  if (!featuredLeader) return null;

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Leadership"
          title="Meet the pastors shaping CRM North America"
          description="National oversight and branch leadership stay close to the life of the churches. Start with the leaders below, then move deeper into the wider CRM NA story."
        />
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="dark-strip flex h-full flex-col justify-between rounded-[1.9rem] p-8 md:p-10">
            <div className="space-y-5">
              <p className="font-display text-(--color-fg-accent-strong) text-[0.68rem] tracking-[0.28em] uppercase">
                Featured leader
              </p>
              <div className="space-y-3">
                <h3 className="text-4xl text-(--color-fg-inverse) md:text-5xl">
                  {featuredLeader.name}
                </h3>
                <p className="text-(--color-fg-accent-strong) text-lg">
                  {featuredLeader.title}
                </p>
              </div>
              <p className="max-w-2xl text-base leading-8 text-(--color-fg-inverse-soft) md:text-lg">
                {featuredLeader.bio}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-(--color-fg-inverse-muted) pt-6">
              <span className="font-display text-(--color-fg-inverse-muted) text-[0.64rem] tracking-[0.24em] uppercase">
                {getLeaderContext(featuredLeader)}
              </span>
              <Link
                href="/who-we-are#leadership"
                className="font-display inline-flex items-center gap-2 text-xs tracking-[0.24em] uppercase text-(--color-fg-accent-strong)"
              >
                View leadership
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </article>

          <div className="grid gap-4">
            {supportingLeaders.slice(0, 2).map((leader) => (
              <Link
                key={leader.id}
                href={getLeaderHref(leader)}
                className="card-surface group flex h-full flex-col justify-between p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-(--color-border-accent)"
              >
                <div className="space-y-3">
                  <p className="font-display text-(--color-fg-accent-text) text-[0.64rem] tracking-[0.24em] uppercase">
                    {getLeaderContext(leader)}
                  </p>
                  <div className="space-y-1">
                    <h3 className="text-3xl">{leader.name}</h3>
                    <p className="text-(--color-fg-secondary)">{leader.title}</p>
                  </div>
                  <p className="text-(--color-fg-secondary) text-sm leading-7">
                    {leader.bio}
                  </p>
                </div>
                <span className="text-(--color-fg-accent-text) font-display mt-6 inline-flex items-center gap-2 text-[0.64rem] tracking-[0.24em] uppercase">
                  Open context
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeadershipSpotlightSection;
