import { sortChurchesByDirectoryOrder } from "@/lib/church-utils";
import type { Church, Event, Ministry } from "@/lib/types";

export type ContactSelectOption = {
  value: string;
  label: string;
};

export function buildChurchContactSelectOptions(
  churchList: Church[],
): ContactSelectOption[] {
  return [
    { value: "", label: "Not tied to a specific church" },
    ...sortChurchesByDirectoryOrder(churchList).map((c) => ({
      value: c.slug,
      label: c.name,
    })),
  ];
}

export function buildMinistryContactSelectOptions(
  ministryList: Ministry[],
): ContactSelectOption[] {
  const sorted = [...ministryList].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
  );
  return [
    { value: "", label: "Not tied to a specific ministry" },
    ...sorted.map((m) => ({ value: m.slug, label: m.name })),
  ];
}

export function buildEventContactSelectOptions(
  eventList: Event[],
): ContactSelectOption[] {
  const sorted = [...eventList].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
  return [
    { value: "", label: "Not tied to a specific event" },
    ...sorted.map((e) => ({ value: e.slug, label: e.title })),
  ];
}

export function labelForContactSelectValue(
  options: readonly ContactSelectOption[],
  value: string,
): string | undefined {
  if (!value) return undefined;
  return options.find((o) => o.value === value)?.label;
}
