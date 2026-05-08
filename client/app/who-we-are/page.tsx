import AboutOverview from "@/components/about/AboutOverview";
import CoreValuesGrid from "@/components/about/CoreValuesGrid";
import HistoryTimeline from "@/components/about/HistoryTimeline";
import LeadershipSection from "@/components/about/LeadershipSection";
import VisionContent from "@/components/about/VisionContent";
import PageHeader from "@/components/shared/PageHeader";
import { getLeaders } from "@/lib/wordpress";

const aboutSections = [
  { href: "#about", label: "About" },
  { href: "#vision", label: "Vision" },
  { href: "#history", label: "History" },
  { href: "#core-values", label: "Core Values" },
  { href: "#leadership", label: "Leadership" },
];

async function WhoWeArePage() {
  const leaders = await getLeaders();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="About"
        title="Who We Are"
        description="CRM North America’s vision, history, values, and leadership now live in one durable About destination."
      >
        <div className="flex flex-wrap gap-3">
          {aboutSections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="font-display border border-(--color-border-accent) px-3 py-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
            >
              {section.label}
            </a>
          ))}
        </div>
      </PageHeader>
      <AboutOverview id="about" />
      <VisionContent id="vision" />
      <HistoryTimeline id="history" />
      <CoreValuesGrid id="core-values" />
      <LeadershipSection id="leadership" leaders={leaders} />
    </div>
  );
}

export default WhoWeArePage;
