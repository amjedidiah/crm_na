import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

/** Mirrors `app/ministries/page.tsx`: PageHeader, gradient, `MinistryGrid`, CTA band. */
function MinistriesLoading() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton descriptionLineCount={3} />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell space-y-10">
            <div className="space-y-3">
              <div className="h-4 w-28 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-10 max-w-xl animate-pulse rounded bg-shimmer-canvas md:h-12 md:max-w-2xl" />
              <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`card-${i.toString()}`}
                  className="card-surface flex h-full min-h-0 flex-col overflow-hidden p-0"
                >
                  <div className="aspect-16/10 animate-pulse bg-shimmer-canvas" />
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="h-3 w-20 animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-8 w-4/5 animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-4 max-w-[90%] animate-pulse rounded bg-shimmer-canvas" />
                    <div className="mt-auto h-4 w-40 animate-pulse rounded bg-shimmer-canvas" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="border-t border-(--border-default) bg-surface-subtle section-padding">
        <div className="container-shell">
          <div className="card-surface flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-3">
              <div className="h-4 w-32 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-10 max-w-md animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-5 max-w-2xl animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="h-12 w-56 animate-pulse rounded bg-shimmer-canvas" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default MinistriesLoading;
