import FeaturedSermon from "@/components/media/FeaturedSermon";
import LivestreamEmbed from "@/components/media/LivestreamEmbed";
import MediaGrid from "@/components/media/MediaGrid";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeader from "@/components/shared/SectionHeader";
import { getMediaItems } from "@/lib/wordpress";

async function MediaPage() {
  const items = [...(await getMediaItems())].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
  const featuredSermon =
    items.find((item) => item.type === "sermon") ?? null;
  const livestreamItem =
    items.find((item) => item.type === "livestream") ?? null;
  const archiveItems = items.filter(
    (item) =>
      item.slug !== featuredSermon?.slug && item.slug !== livestreamItem?.slug,
  );

  return (
    <div className="bg-(--color-bg-canvas) text-(--color-fg-primary)">
      <PageHeader
        eyebrow="Media"
        title="Media hub"
        description="Sermons lead the experience, livestream access stays anchored here, and the broader archive still covers videos, audio, and replays."
      />
      <section className="section-padding text-(--color-fg-primary)">
        <div className="container-shell space-y-12">
          <FeaturedSermon item={featuredSermon} />
          <div id="live" className="space-y-6 scroll-mt-24">
            <SectionHeader
              eyebrow="Live"
              title="Watch CRM North America live"
              description="This section replaces the old standalone watch-live page with a stable anchor inside the main media hub."
            />
            {livestreamItem ? (
              <LivestreamEmbed
                url={livestreamItem.url}
                title={livestreamItem.title}
                description={livestreamItem.summary}
              />
            ) : (
              <div className="card-surface space-y-4 p-6">
                <p className="eyebrow">Livestream</p>
                <h2 className="text-3xl">No active livestream record yet</h2>
                <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
                  The live section remains the permanent destination. As soon as
                  a livestream item is published, it will appear here.
                </p>
              </div>
            )}
          </div>
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Archive"
              title="More media from CRM North America"
              description="Browse replay, teaching, and audio records that sit behind the featured sermon and live experience."
            />
            <MediaGrid items={archiveItems} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MediaPage;
