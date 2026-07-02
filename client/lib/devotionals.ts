import type { Devotional } from "@/lib/types";
import mayData from "@/lib/devotionals-may-2026.json";
import juneData from "@/lib/devotionals-june-2026.json";
import julyData from "@/lib/devotionals-july-2026.json";

const devotionals: Devotional[] = [
  ...(mayData as Devotional[]),
  ...(juneData as Devotional[]),
  ...(julyData as Devotional[]),
];

export function getDevotionalByDate(date: string): Devotional | null {
  return devotionals.find((d) => d.date === date) ?? null;
}

export function getTodaysDevotional(): Devotional | null {
  // Use server-side date in ET (Eastern Time) — the church's timezone
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return getDevotionalByDate(today);
}

export function getAllDevotionals(): Devotional[] {
  return devotionals;
}
