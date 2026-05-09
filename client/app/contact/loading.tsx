import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

function ContactLoading() {
  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <PageHeaderSkeleton descriptionLineCount={3} />

      <section className="section-padding">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface space-y-5 p-6">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {[56, 72, 88, 72, 64, 72].map((width, index) => (
                <div
                  key={`${index.toString()}`}
                  className="h-9 animate-pulse rounded border border-transparent bg-shimmer-emphasis-muted"
                  style={{ width }}
                />
              ))}
            </div>
            <div className="h-12 max-w-md animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-12 max-w-md animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-32 animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-11 w-40 animate-pulse rounded bg-shimmer-emphasis-muted" />
          </div>
          <div className="card-surface space-y-5 p-6">
            <div className="h-4 w-28 animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-10 max-w-sm animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="h-20 animate-pulse rounded bg-shimmer-emphasis-muted" />
            <div className="space-y-3 border-t border-(--border-default) pt-5">
              <div className="h-4 w-32 animate-pulse rounded bg-shimmer-emphasis-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-shimmer-emphasis-muted" />
              <div className="h-4 max-w-[85%] animate-pulse rounded bg-shimmer-emphasis-muted" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactLoading;
