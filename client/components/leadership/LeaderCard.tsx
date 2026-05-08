import type { Leader } from "@/lib/types";

function LeaderCard({ leader }: Readonly<{ leader: Leader }>) {
  return (
    <article className="card-surface space-y-3 p-6">
      <h3 className="text-3xl">{leader.name}</h3>
      <p className="text-(--color-fg-secondary)">{leader.title}</p>
      <p className="text-sm leading-7 text-(--color-fg-secondary)">
        {leader.bio}
      </p>
    </article>
  );
}

export default LeaderCard;
