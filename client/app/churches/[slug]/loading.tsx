import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

/** Mirrors `ChurchDetailContent`: `container-shell space-y-12` between SectionHeader blocks and their bodies. */
function ChurchSlugLoading() {
  function sectionHeaderSkeleton(
    props?: Readonly<{ includeDescription?: boolean }>,
  ) {
    const includeDescription = props?.includeDescription ?? true;
    return (
      <div className="space-y-3">
        <div className="h-4 w-28 animate-pulse rounded bg-shimmer-canvas" />
        <div className="h-10 max-w-lg animate-pulse rounded bg-shimmer-canvas md:h-12 md:max-w-2xl" />
        {includeDescription ? (
          <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
        ) : null}
      </div>
    );
  }

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton
        descriptionLineCount={3}
        leading={
          <div className="h-4 w-44 max-w-[85%] animate-pulse rounded bg-shimmer-emphasis-muted" />
        }
      />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 h-52 bg-gradient-page-warm-top-glow"
        />
        <section className="section-padding">
          <div className="container-shell space-y-12">
            {sectionHeaderSkeleton()}
            <div className="grid gap-4">
              <div className="h-5 max-w-4xl animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-5 max-w-4xl animate-pulse rounded bg-shimmer-canvas" />
              <div className="h-5 max-w-3xl animate-pulse rounded bg-shimmer-canvas" />
            </div>

            {sectionHeaderSkeleton()}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card-surface h-52 animate-pulse p-6 md:h-56" />
              <div className="card-surface h-52 animate-pulse p-6 md:h-56" />
            </div>

            {sectionHeaderSkeleton({ includeDescription: false })}
            <div className="space-y-4">
              <div className="card-surface h-24 animate-pulse p-5" />
              <div className="card-surface h-24 animate-pulse p-5" />
            </div>

            {sectionHeaderSkeleton()}
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="space-y-5">
                <div className="card-surface space-y-4 p-6">
                  <div className="h-8 w-48 animate-pulse rounded bg-shimmer-canvas" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                    <div className="h-4 max-w-[85%] animate-pulse rounded bg-shimmer-canvas" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="card-surface h-24 animate-pulse p-4" />
                  <div className="card-surface h-24 animate-pulse p-4" />
                </div>
              </div>
              <div className="aspect-video animate-pulse rounded-2xl bg-shimmer-canvas lg:min-h-[280px]" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChurchSlugLoading;
