import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

function AboutPageSkeleton() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton descriptionLineCount={3}>
        <div className="flex flex-wrap gap-3 pt-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={`${index.toString()}`}
              className="h-10 w-28 animate-pulse rounded border border-shimmer-emphasis bg-shimmer-emphasis-muted"
            />
          ))}
        </div>
      </PageHeaderSkeleton>
      {/* AboutOverview + warm glow */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-10 h-64 bg-gradient-page-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <div className="h-4 w-32 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-10 max-w-md animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-4 max-w-sm animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="space-y-6">
              <div className="card-surface h-56 animate-pulse p-8" />
              <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`${index.toString()}`}
                    className="card-surface h-32 animate-pulse p-6"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="section-padding bg-surface-subtle">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="h-4 w-40 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-20 animate-pulse rounded bg-shimmer-canvas" />
          </div>
          <div className="card-surface p-8">
            <div className="grid gap-8 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
              <div className="aspect-4/5 animate-pulse rounded-card-lg bg-shimmer-canvas" />
              <div className="space-y-4">
                <div className="h-4 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 max-w-[90%] animate-pulse rounded bg-shimmer-canvas" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="dark-strip section-padding relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-live-top-glow opacity-70"
        />
        <div className="container-shell relative space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-48 animate-pulse rounded bg-shimmer-emphasis" />
            <div className="h-12 max-w-xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`${index.toString()}`}
                className="h-72 animate-pulse rounded-card-xl border border-shimmer-emphasis bg-shimmer-emphasis-muted"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-shell space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-20 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-14 max-w-lg animate-pulse rounded bg-shimmer-canvas" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`${index.toString()}`}
                className="card-surface h-40 animate-pulse p-6"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding surface-band-dual-glow">
        <div className="container-shell space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-shimmer-canvas" />
            <div className="h-12 animate-pulse rounded bg-shimmer-canvas" />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`lane-${index.toString()}`}
                className="h-20 animate-pulse rounded-card-md bg-shimmer-canvas"
              />
            ))}
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="h-4 w-28 animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-12 max-w-md animate-pulse rounded bg-shimmer-canvas" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`lead-${index.toString()}`}
                  className="card-surface overflow-hidden p-4"
                >
                  <div className="aspect-4/5 animate-pulse rounded-card-lg bg-shimmer-canvas" />
                  <div className="space-y-3 p-2 pt-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-8 w-3/4 animate-pulse rounded bg-shimmer-canvas" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-emphasis-strong">
        <div className="container-shell mx-auto max-w-2xl space-y-6 py-4 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded bg-shimmer-emphasis" />
          <div className="mx-auto h-16 animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`cta-${index.toString()}`}
                className="h-12 w-40 animate-pulse rounded bg-shimmer-emphasis-muted"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPageSkeleton;
