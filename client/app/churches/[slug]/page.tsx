import { notFound } from "next/navigation";
import ChurchDetailContent from "@/components/churches/ChurchDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { getChurch, getLeaders } from "@/lib/wordpress";

export async function generateStaticParams() {
  const { churches } = await import("@/lib/mock-data");
  return churches.map((church) => ({ slug: church.slug }));
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

  const leaders = (await getLeaders()).filter(
    (leader) =>
      leader.churchSlug === church.slug || leader.id === church.pastorId,
  );

  return (
    <>
      <PageHeader
        eyebrow="Church"
        title={church.name}
        description={church.summary}
      />
      <ChurchDetailContent church={church} leaders={leaders} />
    </>
  );
}

export default ChurchDetailPage;
