import { sortChurchesByDirectoryOrder } from "@/lib/church-utils";
import {
  churches,
  coreValues,
  events,
  getAlbumBySlug,
  getChurchBySlug,
  getEventBySlug,
  getGalleryAlbums as getGalleryAlbumsFromMockData,
  getMinistryBySlug,
  getPublicationBySlug,
  historyTimeline,
  leaders,
  ministries,
  publications,
  visionContent,
  whoWeAreIntro,
} from "@/lib/mock-data";
import type { PublicationType } from "@/lib/types";

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
  return sortChurchesByDirectoryOrder(churches);
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

export async function getGalleryAlbums() {
  return getGalleryAlbumsFromMockData();
}

export async function getGalleryAlbum(slug: string) {
  return getAlbumBySlug(slug) ?? null;
}

export async function getPublications() {
  return publications;
}

export async function getPublication(slug: string) {
  return getPublicationBySlug(slug) ?? null;
}

export async function getPublicationsByType(type: PublicationType) {
  const all = await getPublications();
  return all.filter((p) => p.type === type);
}
