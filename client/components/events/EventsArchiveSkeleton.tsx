/** Skeleton for `EventsArchiveSection` — mirrors tabs row, calendar + grid region. */
function EventsArchiveSkeleton() {
  return (
    <section className="section-padding text-(--text-primary)">
      <div className="container-shell space-y-10">
        <div
          className="flex flex-wrap gap-2 border-b border-(--border-default) pb-4"
          aria-hidden
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`tab-${i.toString()}`}
              className="h-12 w-36 animate-pulse rounded bg-shimmer-canvas"
            />
          ))}
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
          <div className="card-surface h-80 animate-pulse space-y-4 p-6">
            <div className="h-4 w-32 rounded bg-shimmer-canvas" />
            <div className="mx-auto h-48 max-w-[16rem] rounded bg-shimmer-canvas" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`card-${i.toString()}`}
                className="card-surface flex h-full min-h-0 flex-col gap-4 p-6"
              >
                <div className="h-3 w-24 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-8 w-4/5 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 w-full animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 max-w-[90%] animate-pulse rounded bg-shimmer-canvas" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventsArchiveSkeleton;
