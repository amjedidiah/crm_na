import Image from "next/image";
import type { Event, Leader, Ministry } from "@/lib/types";
import GalleryPreview from "@/components/gallery/GalleryPreview";
import MinistryCallToAction from "@/components/ministries/MinistryCallToAction";
import MinistryEvents from "@/components/ministries/MinistryEvents";
import MinistryMediaBlock from "@/components/ministries/MinistryMediaBlock";
import MinistryNavigation from "@/components/ministries/MinistryNavigation";
import SectionHeader from "@/components/shared/SectionHeader";

function leaderInitialsFromName(name: string): string {
  const stripped = name.replace(/^(pastor|dr\.?|rev\.?|mr\.?|mrs\.?|ms\.?)\s+/i, "");
  const parts = stripped.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0]?.[0];
    const b = parts.at(-1)?.[0];
    if (a && b) {
      return `${a}${b}`.toUpperCase();
    }
  }
  const compact = stripped.replaceAll(/\s+/g, "");
  return compact.slice(0, 2).toUpperCase() || "?";
}

function MinistryLeaderProfile({ leader }: Readonly<{ leader: Leader }>) {
  const alt =
    leader.imageAlt?.trim() ||
    `${leader.name}, ${leader.title}`;
  const initials = leaderInitialsFromName(leader.name);

  return (
    <article className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
      <div className="mx-auto shrink-0 sm:mx-0">
        {leader.imageSrc ? (
          <div className="overflow-hidden rounded-xl border border-(--border-default)">
            <Image
              src={leader.imageSrc}
              alt={alt}
              width={144}
              height={144}
              className="aspect-square h-32 w-32 object-cover sm:h-36 sm:w-36"
              sizes="(max-width: 640px) 128px, 144px"
            />
          </div>
        ) : (
          <div
            className="flex aspect-square h-32 w-32 items-center justify-center rounded-xl border border-(--border-default) bg-surface-subtle font-display text-2xl tracking-wide text-(--text-brand) sm:h-36 sm:w-36"
            aria-hidden
          >
            {initials}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <h3 className="text-2xl leading-tight">{leader.name}</h3>
        <p className="mt-1 text-(--text-secondary)">{leader.title}</p>
        {leader.bio.trim() ? (
          <p className="mt-3 text-base leading-7 text-(--text-secondary)">
            {leader.bio}
          </p>
        ) : null}
      </div>
    </article>
  );
}

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
                  className="text-lg leading-8 text-(--text-secondary)"
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
              <div className="mt-6 space-y-8">
                {leaders.map((leader) => (
                  <MinistryLeaderProfile key={leader.id} leader={leader} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-(--text-secondary) leading-7">
                Leader listings are being refreshed for this ministry. Contact the
                ministry team and we will connect you with the right steward.
              </p>
            )}
          </div>
          <div className="card-surface p-6">
            <h2 className="text-3xl">Meeting rhythm</h2>
            {ministry.meetingSchedule.length > 0 ? (
              <ul className="mt-4 space-y-3 text-(--text-secondary)">
                {ministry.meetingSchedule.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-(--text-secondary) leading-7">
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
