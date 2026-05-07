import MinistryDetailContent from "@/components/ministries/MinistryDetailContent";
import PageHeader from "@/components/shared/PageHeader";
import { getEvents, getLeaders, getMinistry } from "@/lib/wordpress";

async function YouthsPage() {
  const ministry = await getMinistry("youths");

  if (!ministry) {
    return null;
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
        eyebrow="Youths"
        title="CRM NA Youth Ministry"
        description="The youths route stays prominent in the initial public route map while still being ministry-backed content."
      />
      <MinistryDetailContent
        ministry={ministry}
        leaders={leaders}
        events={events}
      />
    </>
  );
}

export default YouthsPage;
