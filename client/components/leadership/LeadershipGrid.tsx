import type { Leader } from "@/lib/types";
import LeaderCard from "@/components/leadership/LeaderCard";

function LeadershipGrid({ leaders }: Readonly<{ leaders: Leader[] }>) {
  return (
    <div className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3">
      {leaders.map((leader) => (
        <LeaderCard key={leader.id} leader={leader} />
      ))}
    </div>
  );
}

export default LeadershipGrid;
