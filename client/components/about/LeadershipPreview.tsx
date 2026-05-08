import Link from "next/link";
import { leaders } from "@/lib/mock-data";

function LeadershipPreview() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="text-4xl md:text-5xl">
              Structured leader records replace template lists.
            </h2>
          </div>
          <Link
            href="/our-pastors"
            className="font-display text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
          >
            View leadership
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {leaders.slice(0, 3).map((leader) => (
            <article key={leader.id} className="card-surface space-y-3 p-6">
              <p className="eyebrow">{leader.region ?? "CRM NA"}</p>
              <h3 className="text-3xl">{leader.name}</h3>
              <p className="text-(--color-fg-secondary)">{leader.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LeadershipPreview;
