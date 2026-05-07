import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader";

function WatchLiveSection() {
  return (
    <section className="dark-strip section-padding">
      <div className="container-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Livestream"
          title="A dedicated watch-live route stays in the initial scaffold."
          description="The rebuild replaces the legacy placeholder audio/demo content with a proper livestream hub tied to media records."
        />
        <Button href="/watch-us-live" variant="outline">
          Open watch live
        </Button>
      </div>
    </section>
  );
}

export default WatchLiveSection;
