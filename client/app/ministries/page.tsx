import MinistryGrid from "@/components/ministries/MinistryGrid";
import MinistryCallToAction from "@/components/ministries/MinistryCallToAction";
import MinistryNavigation from "@/components/ministries/MinistryNavigation";
import PageHeader from "@/components/shared/PageHeader";
import { getMinistries } from "@/lib/wordpress";

async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Ministries"
        title="Ministries"
        description="Discover the ministry lanes helping CRM North America serve families, raise disciples, and strengthen fellowship across the network."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell space-y-8">
          <MinistryNavigation ministries={ministries} />
          <MinistryGrid ministries={ministries} />
          <MinistryCallToAction />
        </div>
      </section>
    </div>
  );
}

export default MinistriesPage;
