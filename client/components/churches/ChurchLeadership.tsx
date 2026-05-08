import type { Leader } from "@/lib/types";

function ChurchLeadership({ leaders }: Readonly<{ leaders: Leader[] }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {leaders.map((leader) => (
        <article key={leader.id} className="card-surface space-y-3 p-5">
          <h3 className="text-2xl">{leader.name}</h3>
          <p className="text-(--color-fg-secondary)">{leader.title}</p>
          <p className="text-sm leading-7 text-(--color-fg-secondary)">
            {leader.bio}
          </p>
        </article>
      ))}
    </div>
  );
}

export default ChurchLeadership;
