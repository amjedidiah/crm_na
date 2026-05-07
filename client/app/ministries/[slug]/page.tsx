import { notFound } from "next/navigation";
import MinistryDetailContent from "@/components/ministries/MinistryDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { getEvents, getLeaders, getMinistry } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { ministries } = await import("@/lib/mock-data");
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

async function MinistryDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const ministry = await getMinistry(slug);

  if (!ministry) {
    notFound();
  }

  const leaders = (await getLeaders()).filter((leader) =>
    ministry.leaderIds.includes(leader.id),
  );
  const events = (await getEvents()).filter(
    (event) => event.ministrySlug === ministry.slug,
  );

  return (
    <>
      <PageHeader
        eyebrow="Ministry"
        title={ministry.name}
        description={ministry.summary}
      />
      <MinistryDetailContent
        ministry={ministry}
        leaders={leaders}
        events={events}
      />
    </>
  );
}

export default MinistryDetailPage;
