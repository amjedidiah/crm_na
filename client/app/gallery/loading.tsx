import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

function SkeletonAlbumCard() {
  return (
    <div className="card-surface overflow-hidden">
      <div className="aspect-4/3 animate-pulse bg-shimmer-emphasis-muted" />
      <div className="space-y-3 p-6">
        <div className="h-8 max-w-[80%] animate-pulse rounded bg-shimmer-emphasis-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-shimmer-emphasis-muted" />
      </div>
    </div>
  );
}

function GalleryLoading() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton descriptionLineCount={3} />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell space-y-8">
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {[56, 72, 88, 72].map((width, index) => (
                <div
                  key={`${index.toString()}`}
                  className="h-9 animate-pulse rounded border border-transparent bg-shimmer-emphasis-muted"
                  style={{ width }}
                />
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonAlbumCard key={`${index.toString()}`} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GalleryLoading;
