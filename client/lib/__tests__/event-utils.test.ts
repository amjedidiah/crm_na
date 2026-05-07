import { describe, expect, test } from "bun:test";
import { events } from "@/lib/mock-data";
import { getFeaturedEvent, getUpcomingEvents } from "@/lib/event-utils";

describe("event utils", () => {
  test("returns an upcoming event when available", () => {
    expect(getUpcomingEvents(events).length).toBeGreaterThan(0);
    expect(getFeaturedEvent(events)).not.toBeNull();
  });
});
