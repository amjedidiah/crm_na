import type { TimelineEntry } from "@/lib/types";

export interface AboutOverviewContent {
  title: string;
  description: string;
  paragraphs: string[];
  featurePoints: string[];
}

export interface AboutVisionContent {
  title: string;
  description: string;
  body: string[];
}

export interface AboutMissionContent {
  title: string;
  description: string;
  commitments: string[];
}

export interface AboutStrategyContent {
  title: string;
  description: string;
  items: string[];
  mandate: string;
}

export interface AboutWelcomeMessageContent {
  eyebrow: string;
  title: string;
  authorName: string;
  authorTitle: string;
  body: string[];
}

export interface AboutLeadershipIntroContent {
  title: string;
  description: string;
  lanes: string[];
  emptyTitle: string;
  emptyDescription: string;
}

export interface WhoWeAreIntroContent {
  title: string;
  summary: string;
  points: string[];
}

export interface VisionSnippetContent {
  title: string;
  body: string[];
}

/** CMS-backed About bundle consumed by About page and home welcome band. */
export interface AboutContentBundle {
  overview: AboutOverviewContent;
  vision: AboutVisionContent;
  mission: AboutMissionContent;
  strategy: AboutStrategyContent;
  historyTimeline: TimelineEntry[];
  historyHighlights: TimelineEntry[];
  welcomeMessage: AboutWelcomeMessageContent;
  leadershipIntro: AboutLeadershipIntroContent;
  whoWeAreIntro: WhoWeAreIntroContent;
  visionSnippet: VisionSnippetContent;
}
