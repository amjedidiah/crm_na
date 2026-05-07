import type { Event } from "@/lib/types";

export function sortEventsByDate(events: Event[]) {
  return [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

export function getUpcomingEvents(events: Event[], now = new Date()) {
  return sortEventsByDate(events).filter(
    (event) => new Date(event.startDate).getTime() >= now.getTime(),
  );
}

export function getPastEvents(events: Event[], now = new Date()) {
  return sortEventsByDate(events).filter(
    (event) => new Date(event.startDate).getTime() < now.getTime(),
  );
}

export function getFeaturedEvent(events: Event[]) {
  return getUpcomingEvents(events)[0] ?? sortEventsByDate(events)[0] ?? null;
}
