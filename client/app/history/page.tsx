import HistoryTimeline from "@/components/about/HistoryTimeline";
import PageHeader from "@/components/shared/PageHeader";

function HistoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="History"
        title="CRM NA history"
        description="This route is the canonical North America history page and should carry the strongest CRM NA-specific narrative."
      />
      <HistoryTimeline />
    </>
  );
}

export default HistoryPage;
