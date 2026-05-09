"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { buildConventionRegistrationUrl } from "@/lib/convention-public";

/** Same return-target logic as `ConventionRegistrationBanner` — single source for register links. */
export function useConventionRegistrationHref(): string {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const returnTo = search === "" ? pathname : `${pathname}?${search}`;
  return buildConventionRegistrationUrl({ returnTo });
}
