import Link from "next/link";
import type { ReactNode } from "react";
import type { Church } from "@/lib/types";
import { contactHrefForChurchListing } from "@/lib/contact-hrefs";
import {
  getChurchListingHref,
  isDirectoryBranchLinkChurch,
} from "@/lib/church-utils";
import ChurchLink from "@/components/churches/ChurchLink";

function branchCtaLabel(church: Church): string {
  return church.mode === "internal-page"
    ? "View church page"
    : "Open church website";
}

function branchListingCta(church: Church): ReactNode {
  const target = getChurchListingHref(church);
  if (target) {
    return (
      <ChurchLink
        church={church}
        className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
      >
        {branchCtaLabel(church)}
      </ChurchLink>
    );
  }
  return (
    <p className="font-display text-xs tracking-[0.2em] uppercase text-(--color-fg-secondary)">
      {branchCtaLabel(church)}
    </p>
  );
}

function ChurchCard({ church }: Readonly<{ church: Church }>) {
  const branchLink = isDirectoryBranchLinkChurch(church);

  const cta = branchLink ? (
    branchListingCta(church)
  ) : (
    <Link
      href={contactHrefForChurchListing(church.slug)}
      className="font-display inline-block text-xs tracking-[0.2em] uppercase text-(--color-fg-accent)"
    >
      Contact CRM NA for details
    </Link>
  );

  return (
    <article className="card-surface flex h-full flex-col gap-4 p-6">
      <p className="eyebrow">{church.region}</p>
      <h3 className="text-3xl">{church.name}</h3>
      <p className="text-(--color-fg-secondary)">
        {church.city}, {church.stateOrProvince}
      </p>
      <p className="text-(--color-fg-secondary)">{church.summary}</p>
      <div className="mt-auto pt-4">{cta}</div>
    </article>
  );
}

export default ChurchCard;
