import type { Event, Leader, Ministry } from "@/lib/types";
import MinistryEvents from "@/components/ministries/MinistryEvents";

function MinistryDetailContent({
  ministry,
  leaders,
  events,
}: Readonly<{
  ministry: Ministry;
  leaders: Leader[];
  events: Event[];
}>) {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-10">
        <div className="space-y-4">
          <p className="eyebrow">Ministry</p>
          <h1 className="text-5xl">{ministry.name}</h1>
          <p className="max-w-3xl text-lg leading-8 text-(--muted)">
            {ministry.summary}
          </p>
        </div>
        <div className="grid gap-4">
          {ministry.description.map((paragraph) => (
            <p
              key={paragraph}
              className="max-w-4xl text-lg leading-8 text-(--muted)"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-surface p-6">
            <h2 className="text-3xl">Leaders</h2>
            <div className="mt-4 space-y-4">
              {leaders.map((leader) => (
                <div key={leader.id}>
                  <h3 className="text-2xl">{leader.name}</h3>
                  <p className="text-(--muted)">{leader.title}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card-surface p-6">
            <h2 className="text-3xl">Meeting rhythm</h2>
            <ul className="mt-4 space-y-3 text-(--muted)">
              {ministry.meetingSchedule.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <MinistryEvents events={events} />
      </div>
    </section>
  );
}

export default MinistryDetailContent;
