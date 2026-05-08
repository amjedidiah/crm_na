import Link from "next/link";
import type { Church } from "@/lib/types";

function ChurchCard({ church }: Readonly<{ church: Church }>) {
  return (
    <article className="card-surface space-y-4 p-6">
      <p className="eyebrow">{church.region}</p>
      <h3 className="text-3xl">{church.name}</h3>
      <p className="text-(--color-fg-secondary)">
        {church.city}, {church.stateOrProvince}
      </p>
      <p className="text-(--color-fg-secondary)">{church.summary}</p>
      <Link
        href={`/churches/${church.slug}`}
        className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
      >
        View church
      </Link>
    </article>
  );
}

export default ChurchCard;
