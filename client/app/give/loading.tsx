import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

function GiveLoading() {
  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <PageHeaderSkeleton descriptionLineCount={3} />

      {/* Scripture block */}
      <section className="section-padding border-t border-(--border-default)">
        <div className="container-shell mx-auto max-w-3xl space-y-6">
          <div className="mx-auto h-4 w-24 animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="mx-auto h-24 w-full max-w-2xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="mx-auto h-4 w-48 animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="h-20 animate-pulse rounded bg-shimmer-emphasis-muted" />
        </div>
      </section>

      {/* Ways to give — two cards */}
      <section className="section-padding bg-section-wash-medium">
        <div className="container-shell space-y-8">
          <div className="space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-12 max-w-md animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-16 max-w-2xl animate-pulse rounded bg-shimmer-emphasis-muted" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-surface h-72 animate-pulse p-8 md:h-80" />
            <div className="card-surface h-72 animate-pulse p-8 md:h-80" />
          </div>
        </div>
      </section>

      {/* Categories — three cards */}
      <section className="section-padding border-t border-(--border-default)">
        <div className="container-shell space-y-8">
          <div className="space-y-3">
            <div className="h-4 w-32 animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-12 max-w-sm animate-pulse rounded bg-shimmer-emphasis-muted" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card-surface h-40 animate-pulse" />
            <div className="card-surface h-40 animate-pulse" />
            <div className="card-surface h-40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-section-wash-soft">
        <div className="container-shell max-w-3xl space-y-6">
          <div className="h-4 w-16 animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="h-12 max-w-xs animate-pulse rounded bg-shimmer-emphasis-muted" />
          <div className="card-surface space-y-0 divide-y divide-(--border-default) px-6 py-2 md:px-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-5">
                <div className="h-6 w-full animate-pulse rounded bg-shimmer-emphasis-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default GiveLoading;
