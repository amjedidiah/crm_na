import Link from "next/link";
import type { Ministry } from "@/lib/types";

function MinistryCard({ ministry }: Readonly<{ ministry: Ministry }>) {
  return (
    <article className="card-surface space-y-4 p-6">
      <h3 className="text-3xl">{ministry.name}</h3>
      <p className="text-(--muted)">{ministry.summary}</p>
      <Link
        href={`/ministries/${ministry.slug}`}
        className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--gold)"
      >
        View ministry
      </Link>
    </article>
  );
}

export default MinistryCard;
