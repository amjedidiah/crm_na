import { cacheLife, cacheTag } from "next/cache";
import { sortChurchesByDirectoryOrder } from "@/lib/church-utils";
import type { AboutContentBundle } from "@/lib/wordpress/about-types";
import {
  getMockAboutContent,
  getMockChurch,
  getMockChurches,
  getMockCoreValues,
  getMockEvent,
  getMockEvents,
  getMockGalleryAlbums,
  getMockLeaders,
  getMockMinistries,
  getMockMinistry,
  getMockPublication,
  getMockPublications,
  getMockPublicationsByType,
} from "@/lib/wordpress/fallback";
import {
  getGraphQLClient,
  hasWordPressEndpoint,
  requestWordPress,
} from "@/lib/wordpress/graphql-client";
import {
  buildGalleryAlbumsFromRecords,
  mapAboutPageFields,
  mapChurch,
  mapEvent,
  mapLeader,
  mapMediaItemToGalleryAlbum,
  mapMinistry,
} from "@/lib/wordpress/mappers";
import {
  ABOUT_PAGE_QUERY,
  ALL_CHURCHES_QUERY,
  ALL_EVENTS_QUERY,
  ALL_LEADERS_QUERY,
  ALL_MEDIA_ITEMS_QUERY,
  ALL_MINISTRIES_QUERY,
  CHURCH_BY_SLUG_QUERY,
  EVENT_BY_SLUG_QUERY,
  MINISTRY_BY_SLUG_QUERY,
} from "@/lib/wordpress/queries";
import type {
  WPAboutPageNode,
  WPChurchNode,
  WPEventNode,
  WPLeaderNode,
  WPMediaItemNode,
  WPMinistryNode,
} from "@/lib/wordpress/wp-types";
import type { PublicationType } from "@/lib/types";

export type { AboutContentBundle } from "@/lib/wordpress/about-types";

export function hasWordPress() {
  return hasWordPressEndpoint();
}

async function fetchChurchesFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("churches");

  const client = getGraphQLClient();
  if (!client) return getMockChurches();

  try {
    const data = await requestWordPress<{ churches: { nodes: WPChurchNode[] } }>(
      client,
      ALL_CHURCHES_QUERY,
    );
    return sortChurchesByDirectoryOrder(data.churches.nodes.map(mapChurch));
  } catch (error) {
    console.error("WordPress fetch failed (churches)", error);
    return getMockChurches();
  }
}

async function fetchChurchFromWP(slug: string) {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("churches", `church-${slug}`);

  const client = getGraphQLClient();
  if (!client) return getMockChurch(slug);

  try {
    const data = await requestWordPress<{ church: WPChurchNode | null }>(
      client,
      CHURCH_BY_SLUG_QUERY,
      { slug },
    );
    return data.church ? mapChurch(data.church) : null;
  } catch (error) {
    console.error(`WordPress fetch failed (church/${slug})`, error);
    return getMockChurch(slug);
  }
}

async function fetchLeadersFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("leaders");

  const client = getGraphQLClient();
  if (!client) return getMockLeaders();

  try {
    const data = await requestWordPress<{ leaders: { nodes: WPLeaderNode[] } }>(
      client,
      ALL_LEADERS_QUERY,
    );
    return data.leaders.nodes.map(mapLeader);
  } catch (error) {
    console.error("WordPress fetch failed (leaders)", error);
    return getMockLeaders();
  }
}

async function fetchMinistriesFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("ministries");

  const client = getGraphQLClient();
  if (!client) return getMockMinistries();

  try {
    const data = await requestWordPress<{ ministries: { nodes: WPMinistryNode[] } }>(
      client,
      ALL_MINISTRIES_QUERY,
    );
    return data.ministries.nodes.map(mapMinistry);
  } catch (error) {
    console.error("WordPress fetch failed (ministries)", error);
    return getMockMinistries();
  }
}

async function fetchMinistryFromWP(slug: string) {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("ministries", `ministry-${slug}`);

  const client = getGraphQLClient();
  if (!client) return getMockMinistry(slug);

  try {
    const data = await requestWordPress<{ ministry: WPMinistryNode | null }>(
      client,
      MINISTRY_BY_SLUG_QUERY,
      { slug },
    );
    return data.ministry ? mapMinistry(data.ministry) : null;
  } catch (error) {
    console.error(`WordPress fetch failed (ministry/${slug})`, error);
    return getMockMinistry(slug);
  }
}

async function fetchEventsFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("events");

  const client = getGraphQLClient();
  if (!client) return getMockEvents();

  try {
    const data = await requestWordPress<{ events: { nodes: WPEventNode[] } }>(
      client,
      ALL_EVENTS_QUERY,
    );
    return data.events.nodes.map(mapEvent);
  } catch (error) {
    console.error("WordPress fetch failed (events)", error);
    return getMockEvents();
  }
}

async function fetchEventFromWP(slug: string) {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("events", `event-${slug}`);

  const client = getGraphQLClient();
  if (!client) return getMockEvent(slug);

  try {
    const data = await requestWordPress<{ event: WPEventNode | null }>(
      client,
      EVENT_BY_SLUG_QUERY,
      { slug },
    );
    return data.event ? mapEvent(data.event) : null;
  } catch (error) {
    console.error(`WordPress fetch failed (event/${slug})`, error);
    return getMockEvent(slug);
  }
}

async function fetchStandaloneMediaAlbumsFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("gallery");

  const client = getGraphQLClient();
  if (!client) return [];

  try {
    const data = await requestWordPress<{ mediaItems: { nodes: WPMediaItemNode[] } }>(
      client,
      ALL_MEDIA_ITEMS_QUERY,
    );
    return data.mediaItems.nodes
      .map(mapMediaItemToGalleryAlbum)
      .filter((album): album is NonNullable<typeof album> => album !== null);
  } catch (error) {
    console.error("WordPress fetch failed (media_item)", error);
    return [];
  }
}

async function fetchAboutContentFromWP() {
  "use cache";
  cacheLife({ revalidate: 300, expire: 3600 });
  cacheTag("about");

  const fallback = getMockAboutContent();
  const client = getGraphQLClient();
  if (!client) return fallback;

  try {
    const data = await requestWordPress<{ page: WPAboutPageNode | null }>(
      client,
      ABOUT_PAGE_QUERY,
    );
    return mapAboutPageFields(data.page?.aboutPageFields, fallback);
  } catch (error) {
    console.error("WordPress fetch failed (about)", error);
    return fallback;
  }
}

export async function getAboutContent(): Promise<AboutContentBundle> {
  if (!hasWordPressEndpoint()) return getMockAboutContent();
  return fetchAboutContentFromWP();
}

export async function getWhoWeAreContent() {
  const about = await getAboutContent();
  return about.whoWeAreIntro;
}

export async function getVisionContent() {
  const about = await getAboutContent();
  return about.visionSnippet;
}

export async function getCoreValues() {
  return getMockCoreValues();
}

export async function getHistoryTimeline() {
  const about = await getAboutContent();
  return about.historyTimeline;
}

export async function getLeaders() {
  if (!hasWordPressEndpoint()) return getMockLeaders();
  return fetchLeadersFromWP();
}

export async function getChurches() {
  if (!hasWordPressEndpoint()) return getMockChurches();
  return fetchChurchesFromWP();
}

export async function getChurch(slug: string) {
  if (!hasWordPressEndpoint()) return getMockChurch(slug);
  return fetchChurchFromWP(slug);
}

export async function getMinistries() {
  if (!hasWordPressEndpoint()) return getMockMinistries();
  return fetchMinistriesFromWP();
}

export async function getMinistry(slug: string) {
  if (!hasWordPressEndpoint()) return getMockMinistry(slug);
  return fetchMinistryFromWP(slug);
}

export async function getEvents() {
  if (!hasWordPressEndpoint()) return getMockEvents();
  return fetchEventsFromWP();
}

export async function getEvent(slug: string) {
  if (!hasWordPressEndpoint()) return getMockEvent(slug);
  return fetchEventFromWP(slug);
}

export async function getGalleryAlbums() {
  if (!hasWordPressEndpoint()) return getMockGalleryAlbums();

  const [events, ministries, standalone] = await Promise.all([
    fetchEventsFromWP(),
    fetchMinistriesFromWP(),
    fetchStandaloneMediaAlbumsFromWP(),
  ]);
  const albums = buildGalleryAlbumsFromRecords(events, ministries, standalone);
  return albums;
}

export async function getGalleryAlbum(slug: string) {
  const albums = await getGalleryAlbums();
  return albums.find((album) => album.slug === slug) ?? null;
}

export async function getPublications() {
  return getMockPublications();
}

export async function getPublication(slug: string) {
  return getMockPublication(slug);
}

export async function getPublicationsByType(type: PublicationType) {
  return getMockPublicationsByType(type);
}

/** Shared listings for contact routing and select options. */
export async function getContactListings() {
  const [churches, ministries, events] = await Promise.all([
    getChurches(),
    getMinistries(),
    getEvents(),
  ]);
  return { churches, ministries, events };
}
