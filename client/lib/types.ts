export type Region = "USA" | "Canada" | "Mexico";

export interface ChurchServiceTime {
  label: string;
  day: string;
  time: string;
  note?: string;
}

export interface ChurchProgram {
  title: string;
  cadence: string;
  note?: string;
}

export interface Church {
  slug: string;
  name: string;
  legacyPath?: string;
  region: Region;
  city: string;
  stateOrProvince: string;
  country: string;
  summary: string;
  story: string[];
  address: string;
  phone: string;
  email: string;
  website?: string;
  livestreamUrl?: string;
  pastorId: string;
  leaderIds?: string[];
  serviceTimes: ChurchServiceTime[];
  programs: ChurchProgram[];
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  bio: string;
  region?: Region;
  churchSlug?: string;
  ministrySlug?: string;
}

export interface Ministry {
  slug: string;
  name: string;
  legacyPath?: string;
  summary: string;
  description: string[];
  leaderIds: string[];
  meetingSchedule: string[];
  focusAreas: string[];
}

export interface Event {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  startDate: string;
  endDate?: string;
  location: string;
  churchSlug?: string;
  ministrySlug?: string;
  registrationUrl?: string;
  livestreamUrl?: string;
}

export type MediaType = "livestream" | "sermon" | "video" | "audio";

export interface MediaItem {
  slug: string;
  title: string;
  type: MediaType;
  summary: string;
  url: string;
  speaker?: string;
  publishedAt: string;
}

export interface Publication {
  slug: string;
  title: string;
  synopsis: string;
  content: string[];
  publishedAt: string;
  authorName: string;
  authorTitle: string;
  imageSrc?: string;
  externalUrl?: string;
}

export interface CoreValue {
  title: string;
  scripture: string;
  description: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface SiteContact {
  name: string;
  email: string;
  phone: string;
  addressLabel: string;
  note?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export type ContactFormPurpose =
  | "general"
  | "plan-visit"
  | "prayer-request"
  | "churches"
  | "ministries"
  | "events";

export interface ContactFormState {
  success: boolean;
  message: string;
}
