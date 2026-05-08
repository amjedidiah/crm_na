import type { Church } from "@/lib/types";
import ChurchCard from "@/components/churches/ChurchCard";

function ChurchGrid({ churches }: Readonly<{ churches: Church[] }>) {
  return (
    <div className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3">
      {churches.map((church) => (
        <ChurchCard key={church.slug} church={church} />
      ))}
    </div>
  );
}

export default ChurchGrid;
