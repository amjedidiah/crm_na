import LivestreamEmbed from "@/components/media/LivestreamEmbed";
import PageHeader from "@/components/shared/PageHeader";
import { mediaItems } from "@/lib/mock-data";

function WatchUsLivePage() {
  const stream =
    mediaItems.find((item) => item.type === "livestream") ?? mediaItems[0];

  return (
    <>
      <PageHeader
        eyebrow="Watch Us Live"
        title="Dedicated livestream route"
        description="The initial scaffold keeps watch-us-live as a standalone page rather than folding it into media navigation."
      />
      <section className="section-padding">
        <div className="container-shell">
          <LivestreamEmbed url={stream.url} />
        </div>
      </section>
    </>
  );
}

export default WatchUsLivePage;
