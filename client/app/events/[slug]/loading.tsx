import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

/** Mirrors `EventDetailContent` structure after `PageHeader`. */
function LoadingEventDetailPage() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-(--color-fg-primary)">
      <PageHeaderSkeleton
        descriptionLineCount={3}
        leading={
          <div className="h-4 w-44 max-w-[85%] animate-pulse rounded bg-shimmer-emphasis-muted" />
        }
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-page-warm-top-glow opacity-80"
        />
        <section className="section-padding">
          <div className="container-shell space-y-14">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-10 max-w-lg animate-pulse rounded bg-shimmer-canvas md:h-12" />
                <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="aspect-4/3 animate-pulse rounded-[1.8rem] bg-shimmer-canvas" />
                <div className="space-y-3">
                  <div className="h-5 max-w-4xl animate-pulse rounded bg-shimmer-canvas" />
                  <div className="h-5 max-w-4xl animate-pulse rounded bg-shimmer-canvas" />
                  <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="card-surface space-y-4 p-6">
                <div className="h-9 w-24 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-12 animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="card-surface space-y-4 p-6">
                <div className="h-9 w-28 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-12 animate-pulse rounded bg-shimmer-canvas" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-10 max-w-xs animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-80 animate-pulse bg-shimmer-canvas" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoadingEventDetailPage;
