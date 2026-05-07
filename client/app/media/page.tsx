import MediaGrid from "@/components/media/MediaGrid";
import PageHeader from "@/components/shared/PageHeader";
import { getMediaItems } from "@/lib/wordpress";

async function MediaPage() {
  const items = await getMediaItems();

  return (
    <>
      <PageHeader
        eyebrow="Media"
        title="Media hub"
        description="This route replaces the legacy empty media page and becomes the home for sermons, videos, and livestream replays."
      />
      <section className="section-padding">
        <div className="container-shell">
          <MediaGrid items={items} />
        </div>
      </section>
    </>
  );
}

export default MediaPage;