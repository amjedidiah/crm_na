import type { Church, ChurchServiceTime } from "@/lib/types";
import MapEmbed from "@/components/shared/MapEmbed";
import TextWithLinks from "@/components/shared/TextWithLinks";
import { phoneToTelHref } from "@/lib/utils";

const contactLinkClass =
  "text-(--color-fg-accent-text) underline-offset-2 transition-colors hover:underline";

const noteLinkClass =
  "text-(--color-fg-accent-text) underline-offset-2 transition-colors hover:underline break-all";

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
            <p className="text-sm text-(--color-fg-secondary)">
              <TextWithLinks text={time.note} linkClassName={noteLinkClass} />
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ChurchVisitInfo({ church }: Readonly<{ church: Church }>) {
  const hasContact =
    Boolean(church.address) ||
    Boolean(church.phone) ||
    Boolean(church.email) ||
    Boolean(church.website) ||
    Boolean(church.livestreamUrl);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-5">
        {hasContact ? (
          <div className="card-surface p-6">
            <h3 className="text-2xl">Visit information</h3>
            <div className="mt-4 space-y-2 text-(--color-fg-secondary)">
              {church.address ? <p>{church.address}</p> : null}
              {church.phone ? (
                <p>
                  <a href={phoneToTelHref(church.phone)} className={contactLinkClass}>
                    {church.phone}
                  </a>
                </p>
              ) : null}
              {church.email ? (
                <p>
                  <a href={`mailto:${church.email}`} className={contactLinkClass}>
                    {church.email}
                  </a>
                </p>
              ) : null}
              {church.website ? (
                <a
                  href={church.website}
                  className="font-display inline-block pt-2 text-xs tracking-[0.2em] uppercase text-(--color-fg-accent-text)"
                >
                  Visit church website
                </a>
              ) : null}
              {church.livestreamUrl ? (
                <p className="pt-2">
                  <a
                    href={church.livestreamUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactLinkClass}
                  >
                    Join online (livestream / Zoom)
                  </a>
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
        {church.serviceTimes.length > 0 ? (
          <ServiceTimes times={church.serviceTimes} />
        ) : null}
      </div>
      {church.address ? <MapEmbed query={church.address} /> : null}
    </div>
  );
}

export default ChurchVisitInfo;
