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
  imageSrc?: string;
  imageAlt?: string;
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
  imageSrc?: string;
  galleryImages?: GalleryImage[];
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
  imageSrc?: string;
  galleryImages?: GalleryImage[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export type GalleryCategory = "all" | "events" | "ministries" | "general";

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: string;
  date?: string;
  category: Exclude<GalleryCategory, "all">;
  coverImage: GalleryImage;
  images: GalleryImage[];
  sourceHref?: string;
}

export interface Devotional {
  date: string;
  dayLabel: string;
  title: string;
  scriptureRef: string;
  scriptureText: string;
  message: string[];
  memoryVerse: string;
  actionPoint: string;
  prayerPoints: string[];
  bibleReading: string;
}

export type PublicationType = "blog" | "devotional";

export const PUBLICATION_TYPE_LABELS: Record<PublicationType, string> = {
  blog: "Blog",
  devotional: "Devotional",
};

export interface Publication {
  slug: string;
  type: PublicationType;
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
