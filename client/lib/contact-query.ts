import { CONTACT_FORM_PURPOSES } from "@/lib/contact-purposes";
import {
  getChurchBySlug,
  getEventBySlug,
  getMinistryBySlug,
} from "@/lib/mock-data";
import type { ContactFormPurpose } from "@/lib/types";

const PURPOSE_SET = new Set<string>(CONTACT_FORM_PURPOSES);

export function normalizeContactPurpose(value: unknown): ContactFormPurpose {
  if (typeof value !== "string") return "general";
  return PURPOSE_SET.has(value) ? (value as ContactFormPurpose) : "general";
}

const KEBAB_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Returns a trimmed kebab-case slug or undefined (invalid shape rejected). */
export function parseKebabSlugParam(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 120) return undefined;
  if (!KEBAB_SLUG.test(trimmed)) return undefined;
  return trimmed;
}

export interface ContactPageQueryState {
  purpose: ContactFormPurpose;
  churchSlug?: string;
  ministrySlug?: string;
  eventSlug?: string;
  churchContextLabel?: string;
  ministryContextLabel?: string;
  eventContextLabel?: string;
  /** Valid kebab slug from URL that did not match any church listing. */
  churchSlugUnresolved?: string;
  ministrySlugUnresolved?: string;
  eventSlugUnresolved?: string;
}

export interface ContactPageSearchParamsInput {
  purpose?: unknown;
  churchSlug?: unknown;
  ministrySlug?: unknown;
  eventSlug?: unknown;
  /** Short alias (Praise Centre–style) for `churchSlug` when `purpose=churches`. */
  church?: unknown;
  /** Short alias for `ministrySlug` when `purpose=ministries`. */
  ministry?: unknown;
  /** Short alias for `eventSlug` when `purpose=events`. */
  event?: unknown;
}

/**
 * Normalizes contact route search params: invalid purpose → general;
 * contextual slugs only when purpose matches and slug resolves in listings.
 * Accepts canonical `*Slug` keys plus short `church` / `ministry` / `event` aliases.
 */
export function resolveContactPageQuery(
  params: ContactPageSearchParamsInput,
): ContactPageQueryState {
  const purpose = normalizeContactPurpose(params.purpose);
  const rawChurch =
    parseKebabSlugParam(params.churchSlug) ??
    parseKebabSlugParam(params.church);
  const rawMinistry =
    parseKebabSlugParam(params.ministrySlug) ??
    parseKebabSlugParam(params.ministry);
  const rawEvent =
    parseKebabSlugParam(params.eventSlug) ??
    parseKebabSlugParam(params.event);

  let churchSlug: string | undefined;
  let churchContextLabel: string | undefined;
  let churchSlugUnresolved: string | undefined;
  let ministrySlug: string | undefined;
  let ministryContextLabel: string | undefined;
  let ministrySlugUnresolved: string | undefined;
  let eventSlug: string | undefined;
  let eventContextLabel: string | undefined;
  let eventSlugUnresolved: string | undefined;

  if (purpose === "churches" && rawChurch) {
    const church = getChurchBySlug(rawChurch);
    if (church) {
      churchSlug = church.slug;
      churchContextLabel = church.name;
    } else {
      churchSlugUnresolved = rawChurch;
    }
  }

  if (purpose === "ministries" && rawMinistry) {
    const ministry = getMinistryBySlug(rawMinistry);
    if (ministry) {
      ministrySlug = ministry.slug;
      ministryContextLabel = ministry.name;
    } else {
      ministrySlugUnresolved = rawMinistry;
    }
  }

  if (purpose === "events" && rawEvent) {
    const event = getEventBySlug(rawEvent);
    if (event) {
      eventSlug = event.slug;
      eventContextLabel = event.title;
    } else {
      eventSlugUnresolved = rawEvent;
    }
  }

  return {
    purpose,
    churchSlug,
    ministrySlug,
    eventSlug,
    churchContextLabel,
    ministryContextLabel,
    eventContextLabel,
    churchSlugUnresolved,
    ministrySlugUnresolved,
    eventSlugUnresolved,
  };
}
