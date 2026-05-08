import MinistryGrid from "@/components/ministries/MinistryGrid";
import MinistryNavigation from "@/components/ministries/MinistryNavigation";
import PageHeader from "@/components/shared/PageHeader";
import { getMinistries } from "@/lib/wordpress";

async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Ministries"
        title="Ministry hub"
        description="This route is intentionally distinct from the church directory and is built around ministry entities rather than locations."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell space-y-8">
          <MinistryNavigation ministries={ministries} />
          <MinistryGrid ministries={ministries} />
        </div>
      </section>
    </div>
  );
}

export default MinistriesPage;
