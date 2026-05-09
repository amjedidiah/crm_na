import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatEventDateRange(startDate: string, endDate?: string) {
  if (!endDate || endDate === startDate) {
    return formatDate(startDate);
  }
  return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

/** `tel:` URI from a display phone string (digits; leading `+` preserved when present). */
export function phoneToTelHref(phone: string): string {
  const digits = phone.replaceAll(/\D/g, "");
  if (!digits) {
    return "#";
  }
  const hasLeadingPlus = phone.trimStart().startsWith("+");
  return hasLeadingPlus ? `tel:+${digits}` : `tel:${digits}`;
}
