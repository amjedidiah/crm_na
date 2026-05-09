import { Suspense } from "react";
import EventListSection from "@/components/events/EventListSection";
import EventsArchiveSkeleton from "@/components/events/EventsArchiveSkeleton";
import {
  getCalendarDateStringInTimeZone,
  partitionEventsByLifecycle,
} from "@/lib/event-utils";
import { getEvents } from "@/lib/wordpress";

async function EventsArchiveSection() {
  const events = await getEvents();
  const todayCalendarDate = getCalendarDateStringInTimeZone(new Date());
  const buckets = partitionEventsByLifecycle(events, todayCalendarDate);

  return (
    <Suspense fallback={<EventsArchiveSkeleton />}>
      <EventListSection
        happeningToday={buckets.happeningToday}
        upcoming={buckets.upcoming}
        past={buckets.past}
        todayCalendarDate={todayCalendarDate}
        totalEventCount={events.length}
      />
    </Suspense>
  );
}

export default EventsArchiveSection;
