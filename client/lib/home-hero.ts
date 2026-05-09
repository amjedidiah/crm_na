import {
  CONVENTION_EVENT_DETAIL_PATH,
  conventionHeroPromoCopy,
} from "@/lib/convention-hero-promo";
import type { Event } from "@/lib/types";

export interface ConventionHeroPanelData {
  eyebrow: string;
  title: string;
  locationDates: string;
  supporting: string;
  registerLabel: string;
  detailsLabel: string;
  detailsHref: string;
  flyerSrc?: string;
  flyerAlt: string;
}

export function buildConventionHeroPanelData(
  event: Pick<Event, "imageSrc"> | null | undefined,
): ConventionHeroPanelData | null {
  if (!event) {
    return null;
  }

  const flyerSrc = event.imageSrc?.trim() || undefined;

  return {
    ...conventionHeroPromoCopy,
    detailsHref: CONVENTION_EVENT_DETAIL_PATH,
    flyerSrc,
    flyerAlt: `Program flyer for ${conventionHeroPromoCopy.title}`,
  };
}
