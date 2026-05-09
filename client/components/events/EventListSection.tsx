"use client";

import { useMemo, useState, startTransition, type ReactNode } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Event } from "@/lib/types";
import type { EventLifecycleTab } from "@/lib/event-utils";
import {
  filterEventsByDateRange,
  formatDateRangeSummary,
  parseNormalizedDateRangeFromSearchParams,
} from "@/lib/event-utils";
import { cn } from "@/lib/utils";
import Button from "@/components/shared/Button";
import EventGrid from "@/components/shared/EventGrid";
import { contactHref } from "@/lib/contact-hrefs";

const TABS: { id: EventLifecycleTab; label: string }[] = [
  { id: "upcoming", label: "Upcoming" },
  { id: "happening-today", label: "Happening today" },
  { id: "past", label: "Past events" },
];

function parseIsoToLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map((x) => Number.parseInt(x, 10));
  return new Date(y, m - 1, d);
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function EventListSection({
  happeningToday,
  upcoming,
  past,
  todayCalendarDate,
  totalEventCount,
}: Readonly<{
  happeningToday: Event[];
  upcoming: Event[];
  past: Event[];
  todayCalendarDate: string;
  totalEventCount: number;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rangeFromUrl = useMemo(
    () =>
      parseNormalizedDateRangeFromSearchParams(
        searchParams.get("from") ?? undefined,
        searchParams.get("to") ?? undefined,
      ),
    [searchParams],
  );

  const [activeTab, setActiveTab] = useState<EventLifecycleTab>("upcoming");

  let tabEvents: Event[];
  if (activeTab === "upcoming") {
    tabEvents = upcoming;
  } else if (activeTab === "happening-today") {
    tabEvents = happeningToday;
  } else {
    tabEvents = past;
  }

  const displayEvents = useMemo(() => {
    if (!rangeFromUrl) {
      return tabEvents;
    }
    return filterEventsByDateRange(tabEvents, rangeFromUrl);
  }, [tabEvents, rangeFromUrl]);

  const selectedRange: DateRange | undefined = rangeFromUrl
    ? {
        from: parseIsoToLocalDate(rangeFromUrl.from),
        to: parseIsoToLocalDate(rangeFromUrl.to),
      }
    : undefined;

  const todayDate = parseIsoToLocalDate(todayCalendarDate);

  const clearRange = () => {
    startTransition(() => {
      router.replace(pathname);
    });
  };

  const onRangeSelect = (range: DateRange | undefined) => {
    if (!range?.from) {
      startTransition(() => {
        router.replace(pathname);
      });
      return;
    }
    if (!range.to) {
      return;
    }
    const from = toIsoDate(range.from);
    const to = toIsoDate(range.to);
    startTransition(() => {
      router.replace(`${pathname}?from=${from}&to=${to}`);
    });
  };

  if (totalEventCount === 0) {
    return (
      <section
        className="section-padding text-(--color-fg-primary)"
        aria-labelledby="events-empty-heading"
      >
        <div className="container-shell">
          <div className="card-surface mx-auto max-w-2xl space-y-6 p-10 text-center">
            <h2 id="events-empty-heading" className="text-3xl">
              No events are scheduled yet
            </h2>
            <p className="text-lg leading-8 text-(--color-fg-secondary)">
              Check back soon, or reach out and we will point you to the next
              gathering on the calendar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href={contactHref("events")}>Contact us</Button>
              <Button href="/" variant="outline">
                Return home
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const rangeStatusId = "events-date-range-status";
  const defaultMonth = selectedRange?.from ?? selectedRange?.to ?? todayDate;

  let archivePanelBody: ReactNode;
  if (displayEvents.length > 0) {
    archivePanelBody = <EventGrid events={displayEvents} />;
  } else if (rangeFromUrl) {
    archivePanelBody = (
      <div className="card-surface space-y-4 p-10 text-center">
        <p className="text-lg text-(--color-fg-secondary)">
          No events in this tab match{" "}
          <span className="text-(--color-fg-primary)">
            {formatDateRangeSummary(rangeFromUrl)}
          </span>
          {'.'}
        </p>
        <Button type="button" variant="outline" onClick={clearRange}>
          Clear date filter
        </Button>
      </div>
    );
  } else {
    let emptyTabMessage: string;
    if (activeTab === "upcoming") {
      emptyTabMessage =
        "There are no upcoming events scheduled right now.";
    } else if (activeTab === "happening-today") {
      emptyTabMessage = "Nothing is happening today on the calendar.";
    } else {
      emptyTabMessage = "No past events to show yet.";
    }
    archivePanelBody = (
      <div className="card-surface p-10 text-center">
        <p className="text-lg text-(--color-fg-secondary)">{emptyTabMessage}</p>
      </div>
    );
  }

  return (
    <section
      className="section-padding text-(--color-fg-primary)"
      aria-describedby={rangeFromUrl ? rangeStatusId : undefined}
    >
      <div className="container-shell space-y-10">
        <div className="flex flex-wrap gap-2 border-b border-(--color-border-subtle) pb-1">
          <div
            role="tablist"
            aria-label="Event timeframe"
            className="flex flex-wrap gap-2"
          >
            {TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`events-tab-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  aria-controls="events-archive-panel"
                  className={cn(
                    "font-display rounded-t px-5 py-3 text-xs tracking-[0.2em] uppercase transition-colors",
                    selected
                      ? "border-b-2 border-(--color-fg-accent) text-(--color-fg-primary)"
                      : "text-(--color-fg-secondary) hover:text-(--color-fg-primary)",
                  )}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {rangeFromUrl ? (
          <p id={rangeStatusId} className="sr-only">
            Date filter active: {formatDateRangeSummary(rangeFromUrl)}. Use the
            clear filter control to show all events in this tab.
          </p>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:items-start">
          <div className="card-surface space-y-4 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="eyebrow">Filter by dates</p>
              {rangeFromUrl ? (
                <Button type="button" variant="outline" onClick={clearRange}>
                  Clear filter
                </Button>
              ) : null}
            </div>
            <div className="flex justify-center overflow-x-auto">
              <DayPicker
                mode="range"
                today={todayDate}
                defaultMonth={defaultMonth}
                selected={selectedRange}
                onSelect={onRangeSelect}
                numberOfMonths={1}
                weekStartsOn={0}
              />
            </div>
          </div>

          <div
            role="tabpanel"
            id="events-archive-panel"
            aria-labelledby={`events-tab-${activeTab}`}
          >
            {archivePanelBody}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventListSection;
