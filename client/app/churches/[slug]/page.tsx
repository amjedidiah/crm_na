import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ChurchDetailContent from "@/components/churches/ChurchDetailContent";
import BackToListingLink from "@/components/shared/BackToListingLink";
import PageHeader from "@/components/shared/PageHeader";
import {
  assertSlugRedirectHasWebsite,
  getStaticParamSlugs,
  isInternalChurchPage,
} from "@/lib/church-utils";
import { getChurch, getLeaders } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { churches } = await import("@/lib/mock-data");
  return getStaticParamSlugs(churches);
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const church = await getChurch(slug);
  if (!church || !isInternalChurchPage(church)) {
    return { title: "Church" };
  }
  return {
    title: church.name,
    description: church.summary,
    openGraph: {
      title: church.name,
      description: church.summary,
    },
  };
}

async function ChurchDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const church = await getChurch(slug);

  if (!church) {
    notFound();
  }

  if (church.mode === "listing-only" || church.mode === "external-link-only") {
    notFound();
  }

  if (church.mode === "slug-redirect") {
    assertSlugRedirectHasWebsite(church);
    permanentRedirect(church.website);
  }

  if (!isInternalChurchPage(church)) {
    notFound();
  }

  const leaders = (await getLeaders()).filter(
    (leader) =>
      leader.churchSlug === church.slug ||
      (church.pastorId ? leader.id === church.pastorId : false),
  );

  return (
    <div className="overflow-x-clip bg-page-canvas text-fg-primary">
      <PageHeader
        leading={
          <BackToListingLink href="/churches">Churches directory</BackToListingLink>
        }
        eyebrow="Church"
        title={church.name}
        description={church.summary}
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-8 h-52 bg-gradient-page-warm-top-glow"
        />
        <ChurchDetailContent church={church} leaders={leaders} />
      </div>
    </div>
  );
}

export default ChurchDetailPage;
