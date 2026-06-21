export const POST_TYPE_TAGS: Record<string, string[]> = {
  church: ["churches"],
  leader: ["leaders", "churches", "ministries", "about"],
  ministry: ["ministries"],
  event: ["events"],
  media_item: ["gallery"],
  page: ["about"],
};

export const POST_TYPE_ITEM_PREFIX: Record<string, string> = {
  church: "church",
  leader: "leader",
  ministry: "ministry",
  event: "event",
  media_item: "gallery",
  page: "page",
};

export const ALL_REVALIDATION_TAGS = [
  "churches",
  "leaders",
  "ministries",
  "events",
  "gallery",
  "about",
];

export function getItemRevalidationTag(
  postType: string | undefined,
  slug: string | undefined,
): string | undefined {
  if (!slug || !postType) return undefined;

  const prefix = POST_TYPE_ITEM_PREFIX[postType];
  return prefix ? `${prefix}-${slug}` : undefined;
}

export function resolveRevalidationTags(
  postType?: string,
  slug?: string,
): string[] {
  const tags = postType ? (POST_TYPE_TAGS[postType] ?? ALL_REVALIDATION_TAGS) : ALL_REVALIDATION_TAGS;
  const resolved = [...tags];

  const itemTag = getItemRevalidationTag(postType, slug);
  if (itemTag) {
    resolved.push(itemTag);
  }

  return resolved;
}
