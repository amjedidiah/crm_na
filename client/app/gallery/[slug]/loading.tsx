import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

function GalleryAlbumLoading() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton
        descriptionLineCount={2}
        leading={
          <div className="inline-block h-4 w-40 animate-pulse rounded bg-shimmer-emphasis-muted" />
        }
      />

      <section className="section-padding">
        <div className="container-shell">
          <div className="mb-8 h-4 w-56 animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`${index.toString()}`}
                className="aspect-4/3 animate-pulse rounded-2xl bg-shimmer-emphasis-muted"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GalleryAlbumLoading;
