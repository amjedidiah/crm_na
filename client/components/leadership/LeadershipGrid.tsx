import type { Leader } from "@/lib/types";
import LeaderCard from "@/components/leadership/LeaderCard";

function LeadershipGrid({
  leaders,
  variant = "default",
}: Readonly<{
  leaders: Leader[];
  variant?: "default" | "preview";
}>) {
  return (
    <div className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3">
      {leaders.map((leader, index) => (
        <LeaderCard
          key={leader.id}
          leader={leader}
          variant={variant === "preview" ? "preview" : "default"}
          priority={index < 2}
        />
      ))}
    </div>
  );
}

export default LeadershipGrid;
