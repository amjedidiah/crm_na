import type { Leader } from "@/lib/types";
import LeaderCard from "@/components/leadership/LeaderCard";

function ChurchLeadership({ leaders }: Readonly<{ leaders: Leader[] }>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {leaders.map((leader) => (
        <LeaderCard key={leader.id} leader={leader} variant="compact" />
      ))}
    </div>
  );
}

export default ChurchLeadership;
