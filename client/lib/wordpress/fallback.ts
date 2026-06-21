import {
  aboutHistoryHighlights,
  aboutHistoryTimeline,
  aboutLeadership,
  aboutMission,
  aboutOverview,
  aboutStrategy,
  aboutVision,
  aboutWelcomeMessage,
} from "@/lib/about-content";
import type { AboutContentBundle } from "@/lib/wordpress/about-types";
import {
  churches,
  coreValues,
  events,
  getAlbumBySlug,
  getChurchBySlug,
  getEventBySlug,
  getGalleryAlbums as getGalleryAlbumsFromMock,
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
import { sortChurchesByDirectoryOrder } from "@/lib/church-utils";

export function getMockAboutContent(): AboutContentBundle {
  return {
    overview: {
      title: aboutOverview.title,
      description: aboutOverview.description,
      paragraphs: [...aboutOverview.paragraphs],
      featurePoints: [...aboutOverview.featurePoints],
    },
    vision: {
      title: aboutVision.title,
      description: aboutVision.description,
      body: [...aboutVision.body],
    },
    mission: {
      title: aboutMission.title,
      description: aboutMission.description,
      commitments: [...aboutMission.commitments],
    },
    strategy: {
      title: aboutStrategy.title,
      description: aboutStrategy.description,
      items: [...aboutStrategy.items],
      mandate: aboutStrategy.mandate,
    },
    historyTimeline: [...aboutHistoryTimeline],
    historyHighlights: [...aboutHistoryHighlights],
    welcomeMessage: {
      eyebrow: aboutWelcomeMessage.eyebrow,
      title: aboutWelcomeMessage.title,
      authorName: aboutWelcomeMessage.authorName,
      authorTitle: aboutWelcomeMessage.authorTitle,
      body: [...aboutWelcomeMessage.body],
    },
    leadershipIntro: {
      title: aboutLeadership.title,
      description: aboutLeadership.description,
      lanes: [...aboutLeadership.lanes],
      emptyTitle: aboutLeadership.emptyTitle,
      emptyDescription: aboutLeadership.emptyDescription,
    },
    whoWeAreIntro: {
      title: whoWeAreIntro.title,
      summary: whoWeAreIntro.summary,
      points: [...whoWeAreIntro.points],
    },
    visionSnippet: {
      title: visionContent.title,
      body: [...visionContent.body],
    },
  };
}

export function getMockChurches() {
  return sortChurchesByDirectoryOrder(churches);
}

export function getMockLeaders() {
  return leaders;
}

export function getMockMinistries() {
  return ministries;
}

export function getMockEvents() {
  return events;
}

export function getMockGalleryAlbums() {
  return getGalleryAlbumsFromMock();
}

export function getMockGalleryAlbum(slug: string) {
  return getAlbumBySlug(slug) ?? null;
}

export function getMockChurch(slug: string) {
  return getChurchBySlug(slug) ?? null;
}

export function getMockMinistry(slug: string) {
  return getMinistryBySlug(slug) ?? null;
}

export function getMockEvent(slug: string) {
  return getEventBySlug(slug) ?? null;
}

export function getMockPublications() {
  return publications;
}

export function getMockPublication(slug: string) {
  return getPublicationBySlug(slug) ?? null;
}

export function getMockPublicationsByType(type: PublicationType) {
  return publications.filter((publication) => publication.type === type);
}

export function getMockCoreValues() {
  return coreValues;
}

export function getMockHistoryTimeline() {
  return historyTimeline;
}

export function getMockWhoWeAreIntro() {
  return whoWeAreIntro;
}

export function getMockVisionContent() {
  return visionContent;
}
