import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";

/** Mirrors `app/devotionals/page.tsx`: PageHeader + `DevotionalContent` article layout inside `section-padding` / `container-shell`. */
function DevotionalsLoading() {
  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <PageHeaderSkeleton />

      <section className="section-padding">
        <div className="container-shell">
          <article className="mx-auto max-w-4xl space-y-6">
            <div className="space-y-3 text-center">
              <div className="mx-auto h-4 w-40 animate-pulse rounded bg-shimmer-canvas" />
              <div className="mx-auto h-12 max-w-2xl animate-pulse rounded bg-shimmer-canvas md:h-14" />
            </div>

            <div className="h-40 animate-pulse rounded-[1.8rem] bg-(--surface-muted) md:h-44" />

            <div className="card-surface space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 w-28 animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="space-y-3">
                <div className="h-5 w-full animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-5 w-full animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-5 max-w-[95%] animate-pulse rounded bg-shimmer-canvas" />
              </div>
            </div>

            <div className="card-surface space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 w-36 animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="h-16 animate-pulse rounded bg-shimmer-canvas" />
            </div>

            <div className="card-surface space-y-4 p-6">
              <div className="flex items-center gap-3">
                <div className="size-5 animate-pulse rounded bg-shimmer-canvas" />
                <div className="h-4 w-32 animate-pulse rounded bg-shimmer-canvas" />
              </div>
              <div className="h-14 animate-pulse rounded bg-shimmer-canvas" />
            </div>

            <div className="h-28 animate-pulse rounded-[1.4rem] border border-(--border-default) bg-(--surface-muted)" />
          </article>
        </div>
      </section>
    </div>
  );
}

export default DevotionalsLoading;
