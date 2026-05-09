import MinistryVisualIcon from "@/components/ministries/MinistryVisualIcon";
import type { Ministry } from "@/lib/types";

function MinistryMediaBlock({
  ministry,
}: Readonly<{
  ministry: Pick<Ministry, "name" | "slug">;
}>) {
  return (
    <div
      className="bg-surface-subtle flex aspect-4/3 flex-col items-center justify-center gap-5 rounded-[1.8rem] border border-(--border-default) px-8 text-center"
      aria-label={`${ministry.name} visual`}
    >
      <MinistryVisualIcon
        slug={ministry.slug}
        className="size-20 text-(--text-brand) md:size-24"
      />
      <p className="font-display text-xs tracking-[0.24em] text-(--text-secondary) uppercase">
        Ministry
      </p>
    </div>
  );
}

export default MinistryMediaBlock;
