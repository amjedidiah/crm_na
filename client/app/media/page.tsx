import MediaGrid from "@/components/media/MediaGrid";
import PageHeader from "@/components/shared/PageHeader";
import { getMediaItems } from "@/lib/wordpress";

async function MediaPage() {
  const items = await getMediaItems();

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Media"
        title="Media hub"
        description="This route replaces the legacy empty media page and becomes the home for sermons, videos, and livestream replays."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell">
          <MediaGrid items={items} />
        </div>
      </section>
    </div>
  );
}

export default MediaPage;
