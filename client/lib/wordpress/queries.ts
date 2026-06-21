import { gql } from "graphql-request";

const CHURCH_FIELDS = gql`
  fragment ChurchFields on Church {
    slug
    title
    content
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    churchDetails {
      mode
      directoryOrder
      legacyPath
      region
      city
      stateOrProvince
      country
      summary
      storyParagraphs {
        paragraph
      }
      address
      phone
      email
      website
      livestreamUrl
      primaryLeader {
        nodes {
          slug
        }
      }
      secondaryLeaders {
        nodes {
          slug
        }
      }
      serviceTimes {
        label
        day
        time
        note
      }
      programs {
        title
        cadence
        note
      }
    }
  }
`;

const LEADER_FIELDS = gql`
  fragment LeaderFields on Leader {
    slug
    title
    leaderDetails {
      title
      bio
      photo {
        node {
          sourceUrl
          altText
        }
      }
      region
      church {
        nodes {
          slug
        }
      }
      ministry {
        nodes {
          slug
        }
      }
    }
  }
`;

const MINISTRY_FIELDS = gql`
  fragment MinistryFields on Ministry {
    slug
    title
    content
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    ministryDetails {
      email
      legacyPath
      leaders {
        nodes {
          slug
        }
      }
      meetingSchedule {
        line
      }
      focusAreas {
        area
      }
      photoGallery {
        nodes {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const EVENT_FIELDS = gql`
  fragment EventFields on Event {
    slug
    title
    content
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    eventDetails {
      mode
      startDate
      endDate
      location
      email
      church {
        nodes {
          slug
        }
      }
      ministry {
        nodes {
          slug
        }
      }
      externalUrl
      registrationUrl
      livestreamUrl
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const MEDIA_ITEM_FIELDS = gql`
  fragment MediaItemFields on MediaItem {
    slug
    title
    mediaItemDetails {
      albumDate
      category
      coverImage {
        node {
          sourceUrl
          altText
        }
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      sourceHref
    }
  }
`;

export const ALL_CHURCHES_QUERY = gql`
  ${CHURCH_FIELDS}
  query AllChurches {
    churches(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        ...ChurchFields
      }
    }
  }
`;

export const CHURCH_BY_SLUG_QUERY = gql`
  ${CHURCH_FIELDS}
  query ChurchBySlug($slug: ID!) {
    church(id: $slug, idType: SLUG) {
      ...ChurchFields
    }
  }
`;

export const ALL_LEADERS_QUERY = gql`
  ${LEADER_FIELDS}
  query AllLeaders {
    leaders(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        ...LeaderFields
      }
    }
  }
`;

export const ALL_MINISTRIES_QUERY = gql`
  ${MINISTRY_FIELDS}
  query AllMinistries {
    ministries(first: 100, where: { orderby: { field: TITLE, order: ASC } }) {
      nodes {
        ...MinistryFields
      }
    }
  }
`;

export const MINISTRY_BY_SLUG_QUERY = gql`
  ${MINISTRY_FIELDS}
  query MinistryBySlug($slug: ID!) {
    ministry(id: $slug, idType: SLUG) {
      ...MinistryFields
    }
  }
`;

export const ALL_EVENTS_QUERY = gql`
  ${EVENT_FIELDS}
  query AllEvents {
    events(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...EventFields
      }
    }
  }
`;

export const EVENT_BY_SLUG_QUERY = gql`
  ${EVENT_FIELDS}
  query EventBySlug($slug: ID!) {
    event(id: $slug, idType: SLUG) {
      ...EventFields
    }
  }
`;

export const ALL_MEDIA_ITEMS_QUERY = gql`
  ${MEDIA_ITEM_FIELDS}
  query AllMediaItems {
    mediaItems(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...MediaItemFields
      }
    }
  }
`;

export const MEDIA_ITEM_BY_SLUG_QUERY = gql`
  ${MEDIA_ITEM_FIELDS}
  query MediaItemBySlug($slug: ID!) {
    mediaItem(id: $slug, idType: SLUG) {
      ...MediaItemFields
    }
  }
`;

export const ABOUT_PAGE_QUERY = gql`
  query AboutPage {
    page(id: "about", idType: URI) {
      aboutPageFields {
        overviewTitle
        overviewDescription
        overviewParagraphs {
          paragraph
        }
        overviewFeaturePoints {
          point
        }
        visionTitle
        visionDescription
        visionBody {
          paragraph
        }
        missionTitle
        missionDescription
        missionCommitments {
          commitment
        }
        strategyTitle
        strategyDescription
        strategyItems {
          item
        }
        strategyMandate
        historyTimeline {
          year
          title
          description
        }
        historyHighlights {
          year
          title
          description
        }
        welcomeEyebrow
        welcomeTitle
        welcomeAuthorName
        welcomeAuthorTitle
        welcomeBody {
          paragraph
        }
        leadershipTitle
        leadershipDescription
        leadershipLanes {
          lane
        }
        leadershipEmptyTitle
        leadershipEmptyDescription
        whoWeAreTitle
        whoWeAreSummary
        whoWeArePoints {
          point
        }
        homeVisionTitle
        homeVisionBody {
          paragraph
        }
      }
    }
  }
`;
