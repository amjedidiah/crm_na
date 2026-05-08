import Button from "@/components/shared/Button";
import SectionHeader from "@/components/shared/SectionHeader";

function WatchLiveSection() {
  return (
    <section className="dark-strip section-padding text-(--color-fg-inverse)">
      <div className="container-shell flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Watch &amp; listen"
          title="Tune in wherever this week finds you"
          description="Teaching, altar ministry, worship sets, and special services stream from CRM NA campuses and circulate through our media archive. Pause the rush, declare Jesus Lord again, and let the preached Word reset your posture."
          inverse
        />
        <Button
          href="/media#live"
          variant="outline"
          className="border-(--color-fg-inverse-soft) text-(--color-fg-inverse) hover:bg-(--color-bg-accent-strong) hover:text-(--color-fg-on-accent)"
        >
          Jump to live section
        </Button>
      </div>
    </section>
  );
}

export default WatchLiveSection;
