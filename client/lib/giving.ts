export const GIVING_METHOD_IDS = ["zeffy", "zelle"] as const;

export type GivingMethodId = (typeof GIVING_METHOD_IDS)[number];

export type GivingMethodIcon = "credit-card" | "smartphone";

export interface GivingMethod {
  id: GivingMethodId;
  title: string;
  description: string;
  icon: GivingMethodIcon;
  /** Exactly one method should be primary site-wide CTA (Zeffy). */
  primary?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  /** Short lines shown under the title (recipient, memo hints, etc.). */
  detailLines?: string[];
  /** Optional Zelle QR image URL (same rail as Zelle, not a separate method). */
  qrImageSrc?: string;
  qrImageAlt?: string;
}

export interface GivingCategory {
  id: string;
  title: string;
  description: string;
}

export interface GivingFAQItem {
  id: string;
  question: string;
  /** Plain text; use blank lines for paragraph breaks. */
  answer: string;
}

export interface GivingContent {
  methods: GivingMethod[];
  categories: GivingCategory[];
  faq: GivingFAQItem[];
}

export function isAllowedGivingMethodId(id: string): id is GivingMethodId {
  return (GIVING_METHOD_IDS as readonly string[]).includes(id);
}

export function isGivingMethodValid(method: GivingMethod): boolean {
  if (!isAllowedGivingMethodId(method.id)) {
    return false;
  }
  if (method.id === "zeffy") {
    const href = method.ctaHref?.trim();
    return Boolean(href?.startsWith("https://"));
  }
  const lines = (method.detailLines ?? []).map((l) => l.trim()).filter(Boolean);
  return lines.length > 0;
}

export function filterValidGivingMethods(
  methods: readonly GivingMethod[],
): GivingMethod[] {
  return methods.filter(isGivingMethodValid);
}

export function isFullyEmptyGivingContent(content: GivingContent): boolean {
  return (
    content.methods.length === 0 &&
    content.categories.length === 0 &&
    content.faq.length === 0
  );
}

export function getPrimaryZeffyHref(
  methods: readonly GivingMethod[],
): string | null {
  const zeffy = filterValidGivingMethods([...methods]).find(
    (m) => m.id === "zeffy",
  );
  const href = zeffy?.ctaHref?.trim();
  return href?.startsWith("https://") ? href : null;
}
