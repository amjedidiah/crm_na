import type { Church } from "@/lib/types";

export const DIRECTORY_REGION_FILTERS = [
  "All",
  "USA",
  "Canada",
  "Mexico",
] as const;

export type DirectoryRegionFilter = (typeof DIRECTORY_REGION_FILTERS)[number];

export function sortChurchesByDirectoryOrder(churches: Church[]): Church[] {
  return [...churches].sort((a, b) => a.directoryOrder - b.directoryOrder);
}

export function churchHasStaticSlugRoute(church: Church): boolean {
  return church.mode === "internal-page" || church.mode === "slug-redirect";
}

export function churchShouldAppearInSitemap(church: Church): boolean {
  return church.mode === "internal-page";
}

export function getStaticParamSlugs(churches: Church[]): { slug: string }[] {
  return sortChurchesByDirectoryOrder(churches)
    .filter(churchHasStaticSlugRoute)
    .map((c) => ({ slug: c.slug }));
}

export function assertSlugRedirectHasWebsite(
  church: Church,
): asserts church is Church & { website: string } {
  if (church.mode !== "slug-redirect") {
    return;
  }
  if (!church.website) {
    throw new Error(
      `Church "${church.slug}" is slug-redirect but missing website URL.`,
    );
  }
}

export function assertExternalLinkOnlyHasWebsite(church: Church): void {
  if (church.mode !== "external-link-only") {
    return;
  }
  if (!church.website) {
    throw new Error(
      `Church "${church.slug}" is external-link-only but missing website URL.`,
    );
  }
}

/** Spotlight grid: internal detail pages and branches whose slug redirects outward. */
export function getSpotlightChurches(churches: Church[]): Church[] {
  return sortChurchesByDirectoryOrder(churches).filter(
    (c) => c.mode === "internal-page" || c.mode === "slug-redirect",
  );
}

/** Secondary list: external website cards and listing-only branches. */
export function getSecondaryChurches(churches: Church[]): Church[] {
  return sortChurchesByDirectoryOrder(churches).filter(
    (c) => c.mode === "external-link-only" || c.mode === "listing-only",
  );
}

/** Branch profile / outbound site CTAs on the directory; others use Contact CRM NA. */
export function isDirectoryBranchLinkChurch(church: Church): boolean {
  return church.mode === "internal-page" || church.mode === "slug-redirect";
}

export function filterChurchesByDirectoryRegion(
  churches: Church[],
  filter: DirectoryRegionFilter,
): Church[] {
  if (filter === "All") {
    return churches;
  }
  return churches.filter((c) => c.region === filter);
}

export function isInternalChurchPage(church: Church): boolean {
  return church.mode === "internal-page";
}

/** Home featured strip: first internal and slug-redirect branches by directory order. */
export function getFeaturedChurchesForHome(churches: Church[]): Church[] {
  return sortChurchesByDirectoryOrder(churches)
    .filter((c) => c.mode === "internal-page" || c.mode === "slug-redirect")
    .slice(0, 4);
}

export function getChurchListingHref(
  church: Church,
): { href: string; external: boolean } | null {
  switch (church.mode) {
    case "listing-only":
      return null;
    case "internal-page":
      return { href: `/churches/${church.slug}`, external: false };
    case "slug-redirect":
    case "external-link-only":
      if (!church.website) {
        return null;
      }
      return { href: church.website, external: true };
  }
}
