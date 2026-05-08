import type { Church, ChurchServiceTime } from "@/lib/types";
import MapEmbed from "@/components/shared/MapEmbed";

function ServiceTimes({ times }: Readonly<{ times: ChurchServiceTime[] }>) {
  return (
    <div className="space-y-3">
      {times.map((time) => (
        <div key={`${time.label}-${time.day}`} className="card-surface p-4">
          <h4 className="text-xl">{time.label}</h4>
          <p className="text-(--color-fg-secondary)">
            {time.day} — {time.time}
          </p>
          {time.note ? (
            <p className="text-sm text-(--color-fg-secondary)">{time.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ChurchVisitInfo({ church }: Readonly<{ church: Church }>) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        <div className="card-surface p-6">
          <h3 className="text-2xl">Visit information</h3>
          <div className="mt-4 space-y-2 text-(--color-fg-secondary)">
            <p>{church.address}</p>
            <p>{church.phone}</p>
            <p>{church.email}</p>
          </div>
        </div>
        <ServiceTimes times={church.serviceTimes} />
      </div>
      <MapEmbed query={church.address} />
    </div>
  );
}

export default ChurchVisitInfo;
