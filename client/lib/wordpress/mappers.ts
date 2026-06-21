import type { AboutContentBundle } from "@/lib/wordpress/about-types";
import type {
  WPAboutPageFields,
  WPChurchNode,
  WPEventNode,
  WPImage,
  WPImageNode,
  WPLeaderNode,
  WPLeaderRefs,
  WPMediaItemNode,
  WPMinistryNode,
} from "@/lib/wordpress/wp-types";
import type {
  Church,
  ChurchMode,
  ChurchProgram,
  ChurchServiceTime,
  Event,
  EventMode,
  GalleryAlbum,
  GalleryCategory,
  GalleryImage,
  Leader,
  Ministry,
  Region,
  TimelineEntry,
} from "@/lib/types";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replaceAll('&nbsp;', " ")
    .replaceAll('&amp;', "&")
    .replaceAll('&lt;', "<")
    .replaceAll('&gt;', ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function htmlToParagraphs(content: string | null | undefined): string[] {
  if (!content?.trim()) return [];
  const text = stripHtml(content);
  const parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

function repeaterText(
  rows: { [key: string]: string | null | undefined }[] | null | undefined,
  key: string,
): string[] {
  if (!rows?.length) return [];
  return rows
    .map((row) => row[key]?.trim())
    .filter((value): value is string => Boolean(value));
}

function mapImageNode(
  node: WPImageNode | null | undefined,
  fallbackAlt = "",
): GalleryImage | undefined {
  if (!node?.sourceUrl) return undefined;
  return {
    src: node.sourceUrl,
    alt: node.altText?.trim() || fallbackAlt,
  };
}

function mapWpImage(
  image: WPImage | null | undefined,
  fallbackAlt = "",
): GalleryImage | undefined {
  return mapImageNode(image?.node ?? undefined, fallbackAlt);
}

function mapGalleryNodes(
  nodes: WPImageNode[] | null | undefined,
  fallbackAlt = "",
): GalleryImage[] {
  if (!nodes?.length) return [];
  return nodes
    .map((node) => mapImageNode(node, fallbackAlt))
    .filter((img): img is GalleryImage => Boolean(img));
}

function firstSlug(refs: WPLeaderRefs | null | undefined): string | undefined {
  return refs?.nodes?.[0]?.slug;
}

function allSlugs(refs: WPLeaderRefs | null | undefined): string[] {
  return refs?.nodes?.map((node) => node.slug).filter(Boolean) ?? [];
}

function asRegion(value: string | null | undefined): Region {
  if (value === "Canada" || value === "Mexico") return value;
  return "USA";
}

function asChurchMode(value: string | null | undefined): ChurchMode {
  const modes: ChurchMode[] = [
    "internal-page",
    "slug-redirect",
    "external-link-only",
    "listing-only",
  ];
  return modes.includes(value as ChurchMode)
    ? (value as ChurchMode)
    : "internal-page";
}

function asEventMode(value: string | null | undefined): EventMode {
  return value === "slug-redirect" ? "slug-redirect" : "internal-page";
}

function asGalleryCategory(
  value: string | null | undefined,
): Exclude<GalleryCategory, "all"> {
  if (value === "events" || value === "ministries") return value;
  return "general";
}

function trimOr(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

function trimOrUndefined(value: string | null | undefined): string | undefined {
  return value?.trim() || undefined;
}

function optionalRegion(value: string | null | undefined): Region | undefined {
  return value ? asRegion(value) : undefined;
}

function mapLeaderTextFields(
  node: WPLeaderNode,
  details: WPLeaderNode["leaderDetails"],
): Pick<Leader, "id" | "name" | "title" | "bio"> {
  return {
    id: node.slug,
    name: node.title,
    title: trimOr(details?.title, node.title),
    bio: trimOr(details?.bio, ""),
  };
}

function mapLeaderPhoto(
  details: WPLeaderNode["leaderDetails"],
  title: string,
): Pick<Leader, "imageSrc" | "imageAlt"> {
  const photo = mapWpImage(details?.photo, title);
  return {
    imageSrc: photo?.src,
    imageAlt: photo?.alt,
  };
}

function mapLeaderRelations(
  details: WPLeaderNode["leaderDetails"],
): Pick<Leader, "region" | "churchSlug" | "ministrySlug"> {
  return {
    region: optionalRegion(details?.region),
    churchSlug: firstSlug(details?.church),
    ministrySlug: firstSlug(details?.ministry),
  };
}

function buildLeaderRecord(node: WPLeaderNode): Leader {
  const details = node.leaderDetails;
  return {
    ...mapLeaderTextFields(node, details),
    ...mapLeaderPhoto(details, node.title),
    ...mapLeaderRelations(details),
  };
}

export function mapLeader(node: WPLeaderNode): Leader {
  return buildLeaderRecord(node);
}

type WPChurchDetails = NonNullable<WPChurchNode["churchDetails"]>;

function mapChurchStory(
  node: WPChurchNode,
  details: WPChurchNode["churchDetails"],
): string[] {
  const storyFromRepeater = repeaterText(details?.storyParagraphs ?? null, "paragraph");
  return storyFromRepeater.length > 0
    ? storyFromRepeater
    : htmlToParagraphs(node.content);
}

function mapChurchServiceTimes(
  rows: WPChurchDetails["serviceTimes"],
): ChurchServiceTime[] {
  return (
    rows?.map((row) => ({
      label: trimOr(row.label, ""),
      day: trimOr(row.day, ""),
      time: trimOr(row.time, ""),
      note: trimOrUndefined(row.note),
    })) ?? []
  );
}

function mapChurchPrograms(rows: WPChurchDetails["programs"]): ChurchProgram[] {
  return (
    rows?.map((row) => ({
      title: trimOr(row.title, ""),
      cadence: trimOr(row.cadence, ""),
      note: trimOrUndefined(row.note),
    })) ?? []
  );
}

function mapChurchListingFields(
  node: WPChurchNode,
  details: WPChurchNode["churchDetails"],
): Pick<
  Church,
  "slug" | "name" | "mode" | "directoryOrder" | "legacyPath" | "region" | "summary"
> {
  return {
    slug: node.slug,
    name: node.title,
    mode: asChurchMode(details?.mode),
    directoryOrder: details?.directoryOrder ?? 999,
    legacyPath: trimOrUndefined(details?.legacyPath),
    region: asRegion(details?.region),
    summary: trimOr(details?.summary, ""),
  };
}

function mapChurchLocationFields(
  details: WPChurchNode["churchDetails"],
): Pick<Church, "city" | "stateOrProvince" | "country" | "address"> {
  return {
    city: trimOr(details?.city, ""),
    stateOrProvince: trimOr(details?.stateOrProvince, ""),
    country: trimOr(details?.country, ""),
    address: trimOr(details?.address, ""),
  };
}

function mapChurchContactFields(
  details: WPChurchNode["churchDetails"],
): Pick<Church, "phone" | "email" | "website" | "livestreamUrl"> {
  return {
    phone: trimOr(details?.phone, ""),
    email: trimOr(details?.email, ""),
    website: trimOrUndefined(details?.website),
    livestreamUrl: trimOrUndefined(details?.livestreamUrl),
  };
}

function mapChurchLeaderFields(
  details: WPChurchNode["churchDetails"],
): Pick<Church, "pastorId" | "leaderIds"> {
  const secondaryLeaderIds = allSlugs(details?.secondaryLeaders);
  return {
    pastorId: firstSlug(details?.primaryLeader),
    leaderIds: secondaryLeaderIds.length > 0 ? secondaryLeaderIds : undefined,
  };
}

function buildChurchRecord(node: WPChurchNode): Church {
  const details = node.churchDetails;
  return {
    ...mapChurchListingFields(node, details),
    ...mapChurchLocationFields(details),
    story: mapChurchStory(node, details),
    ...mapChurchContactFields(details),
    ...mapChurchLeaderFields(details),
    serviceTimes: mapChurchServiceTimes(details?.serviceTimes),
    programs: mapChurchPrograms(details?.programs),
  };
}

export function mapChurch(node: WPChurchNode): Church {
  return buildChurchRecord(node);
}

function plainTextSummary(
  excerpt: string | null | undefined,
  content: string | null | undefined,
  maxLength = 280,
): string {
  const fromExcerpt = excerpt?.trim();
  const text = fromExcerpt ? stripHtml(fromExcerpt) : stripHtml(content ?? "");
  return text.slice(0, maxLength);
}

function mapMinistryIdentityFields(
  node: WPMinistryNode,
  details: WPMinistryNode["ministryDetails"],
): Pick<Ministry, "slug" | "name" | "legacyPath" | "email"> {
  return {
    slug: node.slug,
    name: node.title,
    legacyPath: trimOrUndefined(details?.legacyPath),
    email: trimOrUndefined(details?.email),
  };
}

function mapMinistryContentFields(
  node: WPMinistryNode,
  details: WPMinistryNode["ministryDetails"],
): Pick<Ministry, "summary" | "description" | "meetingSchedule" | "focusAreas"> {
  return {
    summary: plainTextSummary(node.excerpt, node.content),
    description: htmlToParagraphs(node.content),
    meetingSchedule: repeaterText(details?.meetingSchedule ?? null, "line"),
    focusAreas: repeaterText(details?.focusAreas ?? null, "area"),
  };
}

function mapMinistryMediaFields(
  node: WPMinistryNode,
  details: WPMinistryNode["ministryDetails"],
): Pick<Ministry, "imageSrc" | "galleryImages"> {
  const featured = mapWpImage(node.featuredImage, node.title);
  const galleryImages = mapGalleryNodes(details?.photoGallery?.nodes, node.title);

  return {
    imageSrc: featured?.src,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
  };
}

function buildMinistryRecord(node: WPMinistryNode): Ministry {
  const details = node.ministryDetails;
  return {
    ...mapMinistryIdentityFields(node, details),
    ...mapMinistryContentFields(node, details),
    leaderIds: allSlugs(details?.leaders),
    ...mapMinistryMediaFields(node, details),
  };
}

export function mapMinistry(node: WPMinistryNode): Ministry {
  return buildMinistryRecord(node);
}

function mapEventIdentityFields(
  node: WPEventNode,
  details: WPEventNode["eventDetails"],
): Pick<Event, "slug" | "mode" | "title"> {
  return {
    slug: node.slug,
    mode: asEventMode(details?.mode),
    title: node.title,
  };
}

function mapEventContentFields(
  node: WPEventNode,
): Pick<Event, "summary" | "description"> {
  return {
    summary: plainTextSummary(node.excerpt, node.content),
    description: htmlToParagraphs(node.content),
  };
}

function mapEventScheduleFields(
  details: WPEventNode["eventDetails"],
): Pick<Event, "startDate" | "endDate" | "location" | "email"> {
  return {
    startDate: trimOr(details?.startDate, ""),
    endDate: trimOrUndefined(details?.endDate),
    location: trimOr(details?.location, ""),
    email: trimOrUndefined(details?.email),
  };
}

function mapEventRelationFields(
  details: WPEventNode["eventDetails"],
): Pick<
  Event,
  "churchSlug" | "ministrySlug" | "externalUrl" | "registrationUrl" | "livestreamUrl"
> {
  return {
    churchSlug: firstSlug(details?.church),
    ministrySlug: firstSlug(details?.ministry),
    externalUrl: trimOrUndefined(details?.externalUrl),
    registrationUrl: trimOrUndefined(details?.registrationUrl),
    livestreamUrl: trimOrUndefined(details?.livestreamUrl),
  };
}

function mapEventMediaFields(
  node: WPEventNode,
  details: WPEventNode["eventDetails"],
): Pick<Event, "imageSrc" | "galleryImages"> {
  const featured = mapWpImage(node.featuredImage, node.title);
  const galleryImages = mapGalleryNodes(details?.galleryImages?.nodes, node.title);

  return {
    imageSrc: featured?.src,
    galleryImages: galleryImages.length > 0 ? galleryImages : undefined,
  };
}

function buildEventRecord(node: WPEventNode): Event {
  const details = node.eventDetails;
  return {
    ...mapEventIdentityFields(node, details),
    ...mapEventContentFields(node),
    ...mapEventScheduleFields(details),
    ...mapEventRelationFields(details),
    ...mapEventMediaFields(node, details),
  };
}

export function mapEvent(node: WPEventNode): Event {
  return buildEventRecord(node);
}

type WPMediaItemDetails = NonNullable<WPMediaItemNode["mediaItemDetails"]>;

function mediaItemGalleryNodes(
  details: WPMediaItemNode["mediaItemDetails"],
  title: string,
): GalleryImage[] {
  return mapGalleryNodes(details?.galleryImages?.nodes, title);
}

function mediaItemCoverImage(
  details: WPMediaItemNode["mediaItemDetails"],
  title: string,
): GalleryImage | undefined {
  return mapWpImage(details?.coverImage, title) ?? mediaItemGalleryNodes(details, title)[0];
}

function mediaItemAlbumImages(
  details: WPMediaItemDetails,
  title: string,
  cover: GalleryImage,
): GalleryImage[] {
  const images = mediaItemGalleryNodes(details, title);
  return images.length > 0 ? images : [cover];
}

function buildMediaGalleryAlbum(
  node: WPMediaItemNode,
  details: WPMediaItemDetails,
  cover: GalleryImage,
  images: GalleryImage[],
): GalleryAlbum {
  return {
    id: `media-${node.slug}`,
    slug: node.slug,
    title: node.title,
    date: details.albumDate?.trim() || undefined,
    category: asGalleryCategory(details.category),
    coverImage: cover,
    images,
    sourceHref: details.sourceHref?.trim() || undefined,
  };
}

export function mapMediaItemToGalleryAlbum(
  node: WPMediaItemNode,
): GalleryAlbum | null {
  const details = node.mediaItemDetails;
  const cover = mediaItemCoverImage(details, node.title);

  if (!cover || !details) return null;

  return buildMediaGalleryAlbum(
    node,
    details,
    cover,
    mediaItemAlbumImages(details, node.title, cover),
  );
}

export function buildGalleryAlbumsFromRecords(
  events: Event[],
  ministries: Ministry[],
  standalone: GalleryAlbum[],
): GalleryAlbum[] {
  const eventAlbums: GalleryAlbum[] = events
    .filter((event) => event.galleryImages?.length)
    .map((event) => ({
      id: `event-${event.slug}`,
      slug: event.slug,
      title: event.title,
      date: event.startDate,
      category: "events" as const,
      coverImage: event.galleryImages![0],
      images: event.galleryImages!,
      sourceHref: `/events/${event.slug}`,
    }));

  const ministryAlbums: GalleryAlbum[] = ministries
    .filter((ministry) => ministry.galleryImages?.length)
    .map((ministry) => ({
      id: `ministry-${ministry.slug}`,
      slug: ministry.slug,
      title: ministry.name,
      category: "ministries" as const,
      coverImage: ministry.galleryImages![0],
      images: ministry.galleryImages!,
      sourceHref: `/ministries/${ministry.slug}`,
    }));

  return [...eventAlbums, ...ministryAlbums, ...standalone];
}

function mapTimeline(
  rows:
    | {
        year?: string | null;
        title?: string | null;
        description?: string | null;
      }[]
    | null
    | undefined,
): TimelineEntry[] {
  if (!rows?.length) return [];
  return rows
    .map((row) => ({
      year: row.year?.trim() || "",
      title: row.title?.trim() || "",
      description: row.description?.trim() || "",
    }))
    .filter((row) => row.year && row.title);
}

function pickText(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback;
}

function pickRepeater(
  rows: Parameters<typeof repeaterText>[0],
  key: string,
  fallback: string[],
): string[] {
  const items = repeaterText(rows, key);
  return items.length > 0 ? items : fallback;
}

function pickTimelineRows(
  rows: Parameters<typeof mapTimeline>[0],
  fallback: TimelineEntry[],
): TimelineEntry[] {
  const items = mapTimeline(rows);
  return items.length > 0 ? items : fallback;
}

function mapOverviewFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["overview"],
): AboutContentBundle["overview"] {
  return {
    title: pickText(fields.overviewTitle, fallback.title),
    description: pickText(fields.overviewDescription, fallback.description),
    paragraphs: pickRepeater(
      fields.overviewParagraphs ?? null,
      "paragraph",
      fallback.paragraphs,
    ),
    featurePoints: pickRepeater(
      fields.overviewFeaturePoints ?? null,
      "point",
      fallback.featurePoints,
    ),
  };
}

function mapVisionFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["vision"],
): AboutContentBundle["vision"] {
  return {
    title: pickText(fields.visionTitle, fallback.title),
    description: pickText(fields.visionDescription, fallback.description),
    body: pickRepeater(fields.visionBody ?? null, "paragraph", fallback.body),
  };
}

function mapMissionFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["mission"],
): AboutContentBundle["mission"] {
  return {
    title: pickText(fields.missionTitle, fallback.title),
    description: pickText(fields.missionDescription, fallback.description),
    commitments: pickRepeater(
      fields.missionCommitments ?? null,
      "commitment",
      fallback.commitments,
    ),
  };
}

function mapStrategyFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["strategy"],
): AboutContentBundle["strategy"] {
  return {
    title: pickText(fields.strategyTitle, fallback.title),
    description: pickText(fields.strategyDescription, fallback.description),
    items: pickRepeater(fields.strategyItems ?? null, "item", fallback.items),
    mandate: pickText(fields.strategyMandate, fallback.mandate),
  };
}

function mapWelcomeMessageFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["welcomeMessage"],
): AboutContentBundle["welcomeMessage"] {
  return {
    eyebrow: pickText(fields.welcomeEyebrow, fallback.eyebrow),
    title: pickText(fields.welcomeTitle, fallback.title),
    authorName: pickText(fields.welcomeAuthorName, fallback.authorName),
    authorTitle: pickText(fields.welcomeAuthorTitle, fallback.authorTitle),
    body: pickRepeater(fields.welcomeBody ?? null, "paragraph", fallback.body),
  };
}

function mapLeadershipIntroFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["leadershipIntro"],
): AboutContentBundle["leadershipIntro"] {
  return {
    title: pickText(fields.leadershipTitle, fallback.title),
    description: pickText(fields.leadershipDescription, fallback.description),
    lanes: pickRepeater(fields.leadershipLanes ?? null, "lane", fallback.lanes),
    emptyTitle: pickText(fields.leadershipEmptyTitle, fallback.emptyTitle),
    emptyDescription: pickText(
      fields.leadershipEmptyDescription,
      fallback.emptyDescription,
    ),
  };
}

function mapWhoWeAreIntroFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["whoWeAreIntro"],
): AboutContentBundle["whoWeAreIntro"] {
  return {
    title: pickText(fields.whoWeAreTitle, fallback.title),
    summary: pickText(fields.whoWeAreSummary, fallback.summary),
    points: pickRepeater(fields.whoWeArePoints ?? null, "point", fallback.points),
  };
}

function mapVisionSnippetFields(
  fields: WPAboutPageFields,
  fallback: AboutContentBundle["visionSnippet"],
): AboutContentBundle["visionSnippet"] {
  return {
    title: pickText(fields.homeVisionTitle, fallback.title),
    body: pickRepeater(
      fields.homeVisionBody ?? null,
      "paragraph",
      fallback.body,
    ),
  };
}

export function mapAboutPageFields(
  fields: WPAboutPageFields | null | undefined,
  fallback: AboutContentBundle,
): AboutContentBundle {
  if (!fields) return fallback;

  return {
    overview: mapOverviewFields(fields, fallback.overview),
    vision: mapVisionFields(fields, fallback.vision),
    mission: mapMissionFields(fields, fallback.mission),
    strategy: mapStrategyFields(fields, fallback.strategy),
    historyTimeline: pickTimelineRows(
      fields.historyTimeline,
      fallback.historyTimeline,
    ),
    historyHighlights: pickTimelineRows(
      fields.historyHighlights,
      fallback.historyHighlights,
    ),
    welcomeMessage: mapWelcomeMessageFields(fields, fallback.welcomeMessage),
    leadershipIntro: mapLeadershipIntroFields(fields, fallback.leadershipIntro),
    whoWeAreIntro: mapWhoWeAreIntroFields(fields, fallback.whoWeAreIntro),
    visionSnippet: mapVisionSnippetFields(fields, fallback.visionSnippet),
  };
}
