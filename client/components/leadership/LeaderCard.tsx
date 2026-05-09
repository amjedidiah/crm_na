import type { Leader } from "@/lib/types";
import { cn } from "@/lib/utils";
import LeaderPortrait from "@/components/leadership/LeaderPortrait";

type LeaderCardVariant = "default" | "compact" | "preview";

function LeaderCard({
  leader,
  variant = "default",
  priority = false,
}: Readonly<{
  leader: Leader;
  variant?: LeaderCardVariant;
  priority?: boolean;
}>) {
  const showBio = variant !== "preview";
  const headingClassName =
    variant === "compact" ? "text-2xl" : "text-3xl leading-tight";

  return (
    <article className="card-surface overflow-hidden p-4">
      <div
        className={cn(
          "grid gap-4",
          variant === "compact"
            ? "sm:grid-cols-[140px_1fr] sm:items-start"
            : "grid-cols-1",
        )}
      >
        <LeaderPortrait leader={leader} priority={priority} />
        <div className="space-y-3 p-2">
          <p className="eyebrow">{leader.region ?? "CRM NA"}</p>
          <h3 className={headingClassName}>{leader.name}</h3>
          <p className="text-fg-secondary">{leader.title}</p>
          {showBio ? (
            <p className="text-sm leading-7 text-fg-secondary">
              {leader.bio}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default LeaderCard;
