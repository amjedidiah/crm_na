"use client";

import type { Event } from "@/lib/types";
import EventCard from "@/components/shared/EventCard";
import Motion from "@/components/shared/Motion";
import { useReducedMotion } from "framer-motion";

function EventGrid({
  events,
  animated = true,
}: Readonly<{
  events: Event[];
  animated?: boolean;
}>) {
  const reduceMotion = useReducedMotion();
  const enableMotion = animated && !reduceMotion;

  return (
    <Motion
      className="grid gap-6 text-(--color-fg-primary) md:grid-cols-2 xl:grid-cols-3"
      initial={enableMotion ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
    >
      {events.map((event, index) => (
        <Motion
          key={event.slug}
          initial={enableMotion ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: enableMotion ? index * 0.05 : 0 }}
        >
          <EventCard event={event} />
        </Motion>
      ))}
    </Motion>
  );
}

export default EventGrid;
