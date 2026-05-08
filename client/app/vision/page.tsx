import PageHeader from "@/components/shared/PageHeader";
import VisionContent from "@/components/about/VisionContent";

function VisionPage() {
  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Vision"
        title="Preparing men for the great harvest"
        description="The vision page preserves CRM’s prophetic language while giving it a cleaner editorial treatment."
      />
      <VisionContent />
    </div>
  );
}

export default VisionPage;
