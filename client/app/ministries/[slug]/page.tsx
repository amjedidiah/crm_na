import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MinistryDetailContent from "@/components/ministries/MinistryDetailContent";
import BackToListingLink from "@/components/shared/BackToListingLink";
import PageHeader from "@/components/shared/PageHeader";
import { getEvents, getLeaders, getMinistries, getMinistry } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { ministries } = await import("@/lib/mock-data");
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>): Promise<Metadata> {
  const { slug } = await params;
  const ministry = await getMinistry(slug);
  if (!ministry) {
    return { title: "Ministry" };
  }
  return {
    title: ministry.name,
    description: ministry.summary,
    openGraph: {
      title: ministry.name,
      description: ministry.summary,
    },
  };
}

async function MinistryDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const [ministry, allMinistries, allLeaders] = await Promise.all([
    getMinistry(slug),
    getMinistries(),
    getLeaders(),
  ]);

  if (!ministry) {
    notFound();
  }

  const leaderOrder = new Map(
    ministry.leaderIds.map((id, index) => [id, index]),
  );
  const leaders = allLeaders
    .filter((leader) => ministry.leaderIds.includes(leader.id))
    .sort(
      (a, b) =>
        (leaderOrder.get(a.id) ?? 0) - (leaderOrder.get(b.id) ?? 0),
    );
  const events = (await getEvents()).filter(
    (event) => event.ministrySlug === ministry.slug,
  );

  return (
    <div className="overflow-x-clip bg-page-canvas text-(--text-primary)">
      <PageHeader
        leading={
          <BackToListingLink href="/ministries">Ministries</BackToListingLink>
        }
        eyebrow="Ministry"
        title={ministry.name}
        description={ministry.summary}
      />
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-page-top-glow opacity-80"
        />
        <MinistryDetailContent
          ministry={ministry}
          leaders={leaders}
          events={events}
          allMinistries={allMinistries}
        />
      </div>
    </div>
  );
}

export default MinistryDetailPage;
