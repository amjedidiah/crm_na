import Link from "next/link";
import LeadershipGrid from "@/components/leadership/LeadershipGrid";
import { leaders } from "@/lib/mock-data";

function LeadershipPreview() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="text-4xl md:text-5xl">
              Meet the pastors and leaders serving CRM NA.
            </h2>
          </div>
          <Link
            href="/about#leadership"
            className="font-display text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
          >
            View leadership
          </Link>
        </div>
        <LeadershipGrid leaders={leaders.slice(0, 3)} variant="preview" />
      </div>
    </section>
  );
}

export default LeadershipPreview;
