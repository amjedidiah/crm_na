import ChurchFilterBar from "@/components/churches/ChurchFilterBar";
import ChurchGrid from "@/components/churches/ChurchGrid";
import PageHeader from "@/components/shared/PageHeader";
import { getChurches } from "@/lib/wordpress";

async function ChurchesPage() {
  const churches = await getChurches();
  const regions = [...new Set(churches.map((church) => church.region))];

  return (
    <>
      <PageHeader
        eyebrow="Churches"
        title="Church directory"
        description="Canonical church detail pages live under `/churches/[slug]`, with legacy flat branch URLs redirected into them."
      />
      <section className="section-padding">
        <div className="container-shell space-y-8">
          <ChurchFilterBar regions={regions} />
          <ChurchGrid churches={churches} />
        </div>
      </section>
    </>
  );
}

export default ChurchesPage;
