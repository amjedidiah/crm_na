import type { Metadata } from "next";
import AboutNextSteps from "@/components/about/AboutNextSteps";
import AboutOverview from "@/components/about/AboutOverview";
import HistoryHighlights from "@/components/about/HistoryHighlights";
import LeadershipSection from "@/components/about/LeadershipSection";
import OverseerWelcome from "@/components/about/OverseerWelcome";
import VisionMissionStrategy from "@/components/about/VisionMissionStrategy";
import PageHeader from "@/components/shared/PageHeader";
import { aboutSectionLinks } from "@/lib/about-content";
import { getAboutContent, getLeaders } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn the history, vision, mission, strategy, and leadership behind Charismatic Renewal Ministries North America.",
  openGraph: {
    title: "About Us",
    description:
      "Learn the history, vision, mission, strategy, and leadership behind Charismatic Renewal Ministries North America.",
  },
};

async function AboutPage() {
  const [about, leaders] = await Promise.all([getAboutContent(), getLeaders()]);
  const overseer =
    leaders.find((leader) => leader.id === "peter-ezekwenna") ?? null;

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        eyebrow="About Us"
        title="CRM North America"
        description="A revival family commissioned as arrows of revival to prepare people for the harvest, strengthen believers, and establish centers that bring divine solutions to human problems."
      >
        <div className="flex flex-wrap gap-3">
          {aboutSectionLinks.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="font-display border border-solid nav-jump-pill px-3 py-2 text-xs tracking-[0.2em] uppercase"
            >
              {section.label}
            </a>
          ))}
        </div>
      </PageHeader>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 h-64 bg-gradient-page-top-glow"
        />
        <AboutOverview id="about" overview={about.overview} />
      </div>
      <div className="bg-surface-subtle">
        <OverseerWelcome
          id="welcome"
          overseer={overseer}
          welcomeMessage={about.welcomeMessage}
        />
      </div>
      <VisionMissionStrategy
        vision={about.vision}
        mission={about.mission}
        strategy={about.strategy}
      />
      <HistoryHighlights id="history" historyHighlights={about.historyHighlights} />
      <div className="surface-band-dual-glow">
        <LeadershipSection
          id="leadership"
          leaders={leaders}
          leadershipIntro={about.leadershipIntro}
        />
      </div>
      <AboutNextSteps />
    </div>
  );
}

export default AboutPage;
