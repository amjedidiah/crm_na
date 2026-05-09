import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MinistryVisualIcon from "@/components/ministries/MinistryVisualIcon";
import type { Leader, Ministry } from "@/lib/types";

function primaryLeaderName(
  ministry: Ministry,
  leaders: Leader[],
): string | undefined {
  const byId = new Map(leaders.map((l) => [l.id, l]));
  for (const id of ministry.leaderIds) {
    const leader = byId.get(id);
    if (leader) {
      return leader.name;
    }
  }
  return undefined;
}

function MinistryCard({
  ministry,
  leaders,
}: Readonly<{
  ministry: Ministry;
  leaders: Leader[];
}>) {
  const leaderName = primaryLeaderName(ministry, leaders);
  const rhythmPreview = ministry.meetingSchedule[0];

  return (
    <article className="card-surface flex h-full flex-col overflow-hidden border-(--color-border-subtle) transition-colors hover:border-(--color-fg-accent)">
      <div className="relative flex aspect-16/10 w-full shrink-0 items-center justify-center border-b border-(--color-border-subtle) bg-surface-subtle">
        <MinistryVisualIcon
          slug={ministry.slug}
          className="size-14 text-(--color-fg-accent)"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <p className="font-display text-[0.62rem] tracking-[0.28em] text-(--color-fg-accent-text) uppercase">
            Ministry
          </p>
          <h3 className="text-2xl md:text-3xl">{ministry.name}</h3>
          <p className="text-(--color-fg-secondary) leading-7">
            {ministry.summary}
          </p>
        </div>
        <dl className="space-y-2 text-sm text-(--color-fg-secondary)">
          {leaderName ? (
            <div>
              <dt className="font-display text-[0.6rem] tracking-[0.2em] text-(--color-fg-primary) uppercase">
                Leader
              </dt>
              <dd className="mt-0.5">{leaderName}</dd>
            </div>
          ) : null}
          {rhythmPreview ? (
            <div>
              <dt className="font-display text-[0.6rem] tracking-[0.2em] text-(--color-fg-primary) uppercase">
                Rhythm
              </dt>
              <dd className="mt-0.5 line-clamp-2">{rhythmPreview}</dd>
            </div>
          ) : null}
        </dl>
        <Link
          href={`/ministries/${ministry.slug}`}
          className="font-display mt-auto inline-flex items-center gap-2 pt-2 text-xs tracking-[0.24em] text-(--color-fg-accent) uppercase"
        >
          View ministry
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export default MinistryCard;
