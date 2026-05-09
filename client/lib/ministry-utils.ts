import type { Ministry } from "@/lib/types";

/** Ministries other than `currentSlug`, stable alphabetical order by name. */
export function getSiblingMinistries(
  currentSlug: string,
  ministries: Ministry[],
): Ministry[] {
  return ministries
    .filter((m) => m.slug !== currentSlug)
    .sort((a, b) => a.name.localeCompare(b.name));
}
