import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

/** Mirrors `app/churches/page.tsx`: PageHeader, gradient, directory (`ChurchesDirectoryClient`), CTA band. */
function ChurchesLoading() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton descriptionLineCount={3} />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-warm-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell space-y-12">
            <div className="space-y-16">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {[
                  "w-[3.25rem]",
                  "w-14",
                  "w-[4.25rem]",
                  "w-[4.5rem]",
                ].map((wClass, i) => (
                  <div
                    key={`region-${i.toString()}`}
                    className={`h-10 ${wClass} animate-pulse rounded border border-(--color-border-subtle) bg-shimmer-canvas`}
                  />
                ))}
              </div>

              <div className="space-y-6">
                <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={`card-${i.toString()}`}
                      className="card-surface flex h-full min-h-0 flex-col gap-4 p-6"
                    >
                      <div className="h-3 w-16 animate-pulse rounded bg-shimmer-canvas" />
                      <div className="h-9 w-4/5 animate-pulse rounded bg-shimmer-canvas" />
                      <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                        <div className="h-4 max-w-[92%] animate-pulse rounded bg-shimmer-canvas" />
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="h-4 w-36 animate-pulse rounded bg-shimmer-canvas" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="border-t border-(--color-border-subtle) bg-surface-subtle section-padding">
        <div className="container-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <div className="h-4 w-28 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-10 max-w-lg animate-pulse rounded bg-shimmer-canvas md:h-12" />
            <div className="h-5 max-w-xl animate-pulse rounded bg-shimmer-canvas" />
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="h-12 w-28 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-12 w-36 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-12 w-32 animate-pulse rounded bg-shimmer-canvas" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChurchesLoading;
