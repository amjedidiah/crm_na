import {
  churches,
  coreValues,
  events,
  getChurchBySlug,
  getEventBySlug,
  getMinistryBySlug,
  historyTimeline,
  leaders,
  mediaItems,
  ministries,
  publications,
  visionContent,
  whoWeAreIntro,
} from "@/lib/mock-data";

const WORDPRESS_GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

export function hasWordPress() {
  return Boolean(WORDPRESS_GRAPHQL_ENDPOINT);
}

export async function getWhoWeAreContent() {
  return whoWeAreIntro;
}

export async function getVisionContent() {
  return visionContent;
}

export async function getCoreValues() {
  return coreValues;
}

export async function getHistoryTimeline() {
  return historyTimeline;
}

export async function getLeaders() {
  return leaders;
}

export async function getChurches() {
  return churches;
}

export async function getChurch(slug: string) {
  return getChurchBySlug(slug) ?? null;
}

export async function getMinistries() {
  return ministries;
}

export async function getMinistry(slug: string) {
  return getMinistryBySlug(slug) ?? null;
}

export async function getEvents() {
  return events;
}

export async function getEvent(slug: string) {
  return getEventBySlug(slug) ?? null;
}

export async function getMediaItems() {
  return mediaItems;
}

export async function getPublications() {
  return publications;
}
