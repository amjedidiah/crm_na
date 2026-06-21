export interface WPImageNode {
  sourceUrl: string;
  altText?: string | null;
}

export interface WPImage {
  node: WPImageNode | null;
}

export interface WPLeaderRef {
  slug: string;
}

export interface WPLeaderRefs {
  nodes: WPLeaderRef[];
}

export interface WPChurchNode {
  slug: string;
  title: string;
  content?: string | null;
  featuredImage?: WPImage | null;
  churchDetails?: {
    mode?: string | null;
    directoryOrder?: number | null;
    legacyPath?: string | null;
    region?: string | null;
    city?: string | null;
    stateOrProvince?: string | null;
    country?: string | null;
    summary?: string | null;
    storyParagraphs?: { paragraph?: string | null }[] | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    livestreamUrl?: string | null;
    primaryLeader?: WPLeaderRefs | null;
    secondaryLeaders?: WPLeaderRefs | null;
    serviceTimes?:
      | {
          label?: string | null;
          day?: string | null;
          time?: string | null;
          note?: string | null;
        }[]
      | null;
    programs?:
      | {
          title?: string | null;
          cadence?: string | null;
          note?: string | null;
        }[]
      | null;
  } | null;
}

export interface WPLeaderNode {
  slug: string;
  title: string;
  leaderDetails?: {
    title?: string | null;
    bio?: string | null;
    photo?: WPImage | null;
    region?: string | null;
    church?: WPLeaderRefs | null;
    ministry?: WPLeaderRefs | null;
  } | null;
}

export interface WPMinistryNode {
  slug: string;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  featuredImage?: WPImage | null;
  ministryDetails?: {
    email?: string | null;
    legacyPath?: string | null;
    leaders?: WPLeaderRefs | null;
    meetingSchedule?: { line?: string | null }[] | null;
    focusAreas?: { area?: string | null }[] | null;
    photoGallery?: { nodes: WPImageNode[] } | null;
  } | null;
}

export interface WPEventNode {
  slug: string;
  title: string;
  content?: string | null;
  excerpt?: string | null;
  featuredImage?: WPImage | null;
  eventDetails?: {
    mode?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    location?: string | null;
    email?: string | null;
    church?: WPLeaderRefs | null;
    ministry?: WPLeaderRefs | null;
    externalUrl?: string | null;
    registrationUrl?: string | null;
    livestreamUrl?: string | null;
    galleryImages?: { nodes: WPImageNode[] } | null;
  } | null;
}

export interface WPMediaItemNode {
  slug: string;
  title: string;
  mediaItemDetails?: {
    albumDate?: string | null;
    category?: string | null;
    coverImage?: WPImage | null;
    galleryImages?: { nodes: WPImageNode[] } | null;
    sourceHref?: string | null;
  } | null;
}

export interface WPAboutPageFields {
  overviewTitle?: string | null;
  overviewDescription?: string | null;
  overviewParagraphs?: { paragraph?: string | null }[] | null;
  overviewFeaturePoints?: { point?: string | null }[] | null;
  visionTitle?: string | null;
  visionDescription?: string | null;
  visionBody?: { paragraph?: string | null }[] | null;
  missionTitle?: string | null;
  missionDescription?: string | null;
  missionCommitments?: { commitment?: string | null }[] | null;
  strategyTitle?: string | null;
  strategyDescription?: string | null;
  strategyItems?: { item?: string | null }[] | null;
  strategyMandate?: string | null;
  historyTimeline?:
    | {
        year?: string | null;
        title?: string | null;
        description?: string | null;
      }[]
    | null;
  historyHighlights?:
    | {
        year?: string | null;
        title?: string | null;
        description?: string | null;
      }[]
    | null;
  welcomeEyebrow?: string | null;
  welcomeTitle?: string | null;
  welcomeAuthorName?: string | null;
  welcomeAuthorTitle?: string | null;
  welcomeBody?: { paragraph?: string | null }[] | null;
  leadershipTitle?: string | null;
  leadershipDescription?: string | null;
  leadershipLanes?: { lane?: string | null }[] | null;
  leadershipEmptyTitle?: string | null;
  leadershipEmptyDescription?: string | null;
  whoWeAreTitle?: string | null;
  whoWeAreSummary?: string | null;
  whoWeArePoints?: { point?: string | null }[] | null;
  homeVisionTitle?: string | null;
  homeVisionBody?: { paragraph?: string | null }[] | null;
}

export interface WPAboutPageNode {
  aboutPageFields?: WPAboutPageFields | null;
}
