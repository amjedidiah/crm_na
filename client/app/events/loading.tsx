import PageHeaderSkeleton from "@/components/shared/PageHeaderSkeleton";
import EventsArchiveSkeleton from "@/components/events/EventsArchiveSkeleton";

/** Mirrors `app/events/page.tsx`: `PageHeader`, gradient wash, archive skeleton. */
function LoadingEventsPage() {
  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeaderSkeleton descriptionLineCount={3} />

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-6 h-56 bg-gradient-page-warm-top-glow"
        />
        <EventsArchiveSkeleton />
      </div>
    </div>
  );
}

export default LoadingEventsPage;
