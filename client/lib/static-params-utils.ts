/**
 * Next.js Cache Components requires `generateStaticParams` to return at least one
 * entry at build time. When a CMS-backed collection is empty (or WordPress is
 * unreachable during build), we emit a synthetic `_placeholder` slug so the build
 * can validate the route. Detail pages call `notFound()` for that slug, so it
 * never appears in listings or sitemaps.
 */
export const STATIC_PARAMS_PLACEHOLDER_SLUG = "_placeholder" as const;

/** cacheComponents requires at least one static param at build time. */
export function staticParamsWithPlaceholder<T extends { slug: string }>(
  items: readonly T[],
): { slug: string }[] {
  if (!items.length) return [{ slug: STATIC_PARAMS_PLACEHOLDER_SLUG }];
  return items.map((item) => ({ slug: item.slug }));
}

export function isStaticParamsPlaceholder(slug: string): boolean {
  return slug === STATIC_PARAMS_PLACEHOLDER_SLUG;
}
