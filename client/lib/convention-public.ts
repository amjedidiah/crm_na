const DEFAULT_SITE_URL = "http://localhost:3000";
const DEFAULT_CONVENTION_REGISTRATION_URL =
  "https://crmusa2026-convention.crm-na.org/#register";

/** Public production site for CRM USA National Convention 2026 (registration, info). */
export const CONVENTION_REGISTRATION_URL =
  process.env.NEXT_PUBLIC_CONVENTION_REGISTRATION_URL ??
  DEFAULT_CONVENTION_REGISTRATION_URL;

function getPublicSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
}

export function toAbsoluteSiteUrl(pathOrUrl: string) {
  try {
    return new URL(pathOrUrl).toString();
  } catch {
    return new URL(pathOrUrl, getPublicSiteUrl()).toString();
  }
}

/** Apex hostname for the public CRM NA site — `returnTo` always uses the `www.` host. */
const CRM_NA_PUBLIC_HOST = "crm-na.org";

function withWwwCrmNaHost(absoluteUrl: string): string {
  try {
    const u = new URL(absoluteUrl);
    if (u.hostname === CRM_NA_PUBLIC_HOST) {
      u.hostname = `www.${CRM_NA_PUBLIC_HOST}`;
    }
    return u.toString();
  } catch {
    return absoluteUrl;
  }
}

export function buildConventionRegistrationUrl(options?: {
  returnTo?: string;
}) {
  const url = new URL(CONVENTION_REGISTRATION_URL);
  const returnTo = options?.returnTo?.trim();

  if (returnTo) {
    url.searchParams.set(
      "returnTo",
      withWwwCrmNaHost(toAbsoluteSiteUrl(returnTo)),
    );
  }

  return url.toString();
}
