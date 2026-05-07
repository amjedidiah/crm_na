import type { Leader } from "@/lib/types";

function LeadershipHierarchy({ leaders }: Readonly<{ leaders: Leader[] }>) {
  return (
    <div className="card-surface p-6">
      <p className="eyebrow">Hierarchy</p>
      <div className="mt-4 space-y-3">
        {leaders.map((leader, index) => (
          <div key={leader.id} className="flex items-center gap-3">
            <span className="font-display text-xs tracking-[0.2em] uppercase text-(--gold)">
              {index + 1}
            </span>
            <div>
              <p className="text-lg">{leader.name}</p>
              <p className="text-sm text-(--muted)">{leader.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeadershipHierarchy;