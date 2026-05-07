import Link from "next/link";
import SectionHeader from "@/components/shared/SectionHeader";
import { getChurches } from "@/lib/wordpress";

async function FeaturedChurches() {
  const churches = await getChurches();

  return (
    <section className="section-padding">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="Churches"
          title="Canonical church routes now live under `/churches/[slug]`."
          description="Legacy branch URLs will remain reachable through redirects only."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {churches.map((church) => (
            <Link
              key={church.slug}
              href={`/churches/${church.slug}`}
              className="card-surface space-y-3 p-6"
            >
              <p className="eyebrow">{church.region}</p>
              <h3 className="text-3xl">{church.name}</h3>
              <p className="text-(--muted)">
                {church.city}, {church.stateOrProvince}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedChurches;
