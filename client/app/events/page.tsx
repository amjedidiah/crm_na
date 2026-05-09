import type { Metadata } from "next";
import EventsArchiveSection from "@/components/events/EventsArchiveSection";
import PageHeader from "@/components/shared/PageHeader";
import { SITE_NAME } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Events",
  description: `Gatherings, conventions, and regional moments across ${SITE_NAME}. Browse upcoming dates and register when doors open.`,
  alternates: {
    canonical: "/events",
  },
};

function EventsPage() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        eyebrow="Events"
        title="Gather with CRM NA"
        description="Explore upcoming gatherings, what is happening today, and recent milestones across our network."
      />
      <EventsArchiveSection />
    </div>
  );
}

export default EventsPage;
