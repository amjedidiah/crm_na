import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import GiveEmptyState from "@/components/give/GiveEmptyState";
import GiveHero from "@/components/give/GiveHero";
import GivingCategories from "@/components/give/GivingCategories";
import GivingFAQ from "@/components/give/GivingFAQ";
import ScriptureIntro from "@/components/give/ScriptureIntro";
import WaysToGive from "@/components/give/WaysToGive";
import Button from "@/components/shared/Button";
import { givingContent } from "@/lib/giving-data";
import {
  getPrimaryZeffyHref,
  isFullyEmptyGivingContent,
} from "@/lib/giving";
import { SITE_NAME } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Give",
  description: `Support ${SITE_NAME} through Zeffy or Zelle — the same payment channels used for CRM USA national convention registration.`,
  alternates: {
    canonical: "/give",
  },
};

function GivePage() {
  const content = givingContent;

  if (isFullyEmptyGivingContent(content)) {
    return <GiveEmptyState />;
  }

  const zeffyHref = getPrimaryZeffyHref(content.methods);

  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <GiveHero
        eyebrow="Give"
        title="Partner with CRM North America"
        description="Your generosity helps churches disciple families, train leaders, and host gatherings across the United States, Canada, and Mexico. Give online through Zeffy (card) or Zelle — aligned with CRM USA’s convention payment setup."
      >
        {zeffyHref ? (
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href={zeffyHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shadow-accent-cta"
              aria-label="Give through Zeffy (opens donation form in a new tab)"
            >
              Give through Zeffy
              <ArrowUpRight className="size-4" aria-hidden />
            </Button>
            <p className="font-display text-[0.6rem] tracking-[0.24em] uppercase text-fg-inverse-muted">
              Secure card checkout · Opens in a new tab
            </p>
          </div>
        ) : null}
      </GiveHero>

      <ScriptureIntro />
      <WaysToGive methods={content.methods} />
      <GivingCategories categories={content.categories} />
      <GivingFAQ items={content.faq} />
    </div>
  );
}

export default GivePage;
