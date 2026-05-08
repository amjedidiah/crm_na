import AboutOverview from "@/components/about/AboutOverview";
import LeadershipPreview from "@/components/about/LeadershipPreview";
import PageHeader from "@/components/shared/PageHeader";

function WhoWeArePage() {
  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="About"
        title="Who We Are"
        description="`/who-we-are` is the About landing page in the initial CRM NA route strategy."
      />
      <AboutOverview />
      <LeadershipPreview />
    </div>
  );
}

export default WhoWeArePage;
