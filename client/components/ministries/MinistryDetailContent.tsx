import type { Event, Leader, Ministry } from "@/lib/types";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import MinistryCallToAction from "@/components/ministries/MinistryCallToAction";
import MinistryEvents from "@/components/ministries/MinistryEvents";
import MinistryMediaBlock from "@/components/ministries/MinistryMediaBlock";
import MinistryNavigation from "@/components/ministries/MinistryNavigation";
import SectionHeader from "@/components/shared/SectionHeader";

function MinistryDetailContent({
  ministry,
  leaders,
  events,
  allMinistries,
}: Readonly<{
  ministry: Ministry;
  leaders: Leader[];
  events: Event[];
  allMinistries: Ministry[];
}>) {
  const narrative =
    ministry.description.length > 0
      ? ministry.description
      : [
          "We are updating the full narrative for this ministry. Contact the ministry team for the latest stories, rhythms, and opportunities to serve.",
        ];

  return (
    <section className="section-padding">
      <div className="container-shell space-y-14">
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Overview"
            title="How this ministry serves"
            description="Read the heart behind the lane, then connect with leaders for the rhythms that fit your season."
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <MinistryMediaBlock ministry={ministry} />
            <div className="space-y-4">
              {narrative.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-8 text-(--color-fg-secondary)"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="text-3xl">Leaders</h2>
            {leaders.length > 0 ? (
              <div className="mt-4 space-y-4">
                {leaders.map((leader) => (
                  <div key={leader.id}>
                    <h3 className="text-2xl">{leader.name}</h3>
                    <p className="text-(--color-fg-secondary)">{leader.title}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-(--color-fg-secondary) leading-7">
                Leader listings are being refreshed for this ministry. Contact the
                ministry team and we will connect you with the right steward.
              </p>
            )}
          </div>
          <div className="card-surface p-6">
            <h2 className="text-3xl">Meeting rhythm</h2>
            {ministry.meetingSchedule.length > 0 ? (
              <ul className="mt-4 space-y-3 text-(--color-fg-secondary)">
                {ministry.meetingSchedule.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-(--color-fg-secondary) leading-7">
                Gathering times are being confirmed. Reach out through the
                contact page and we will send the latest schedule for this lane.
              </p>
            )}
          </div>
        </div>

        <MinistryEvents events={events} ministryName={ministry.name} />

        {ministry.galleryImages?.length ? (
          <div className="card-surface p-6">
            <GalleryPreview
              images={ministry.galleryImages}
              href={`/gallery/${ministry.slug}`}
              title="Photos from this ministry"
            />
          </div>
        ) : null}

        <MinistryCallToAction
          ministryContext={{ name: ministry.name, slug: ministry.slug }}
        />

        <MinistryNavigation currentSlug={ministry.slug} ministries={allMinistries} />
      </div>
    </section>
  );
}

export default MinistryDetailContent;
