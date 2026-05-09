import SectionHeader from "@/components/shared/SectionHeader";
import {
  aboutMission,
  aboutStrategy,
  aboutVision,
} from "@/lib/about-content";

function VisionMissionStrategy() {
  return (
    <section className="dark-strip section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-live-top-glow opacity-70"
      />
      <div className="container-shell relative space-y-10">
        <SectionHeader
          eyebrow="Vision · Mission · Strategy"
          title="One revival mandate, expressed with clarity."
          description="CRM NA describes its calling as harvest preparation, relational discipleship, and practical ministry that reaches both church and society."
          inverse
        />
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <div
            id="vision"
            className="scroll-anchor-target flex flex-col p-8 panel-inverse-card"
          >
            <p className="eyebrow text-fg-accent-strong">Vision</p>
            <h3 className="mt-3 text-2xl leading-snug text-fg-inverse">
              {aboutVision.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-fg-inverse-muted">
              {aboutVision.description}
            </p>
            <div className="mt-6 space-y-4 border-t border-solid border-t-accent-soft pt-6">
              {aboutVision.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-7 text-fg-inverse-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div
            id="mission"
            className="scroll-anchor-target flex flex-col p-8 panel-inverse-card"
          >
            <p className="eyebrow text-fg-accent-strong">Mission</p>
            <h3 className="mt-3 text-xl leading-snug text-fg-inverse md:text-2xl">
              Molding believers, influencing the world.
            </h3>
            <p className="mt-4 text-sm leading-7 text-fg-inverse-muted">
              {aboutMission.description}
            </p>
            <div className="mt-6 space-y-4 border-t border-solid border-t-accent-soft pt-6">
              <p className="text-base font-medium leading-7 text-fg-inverse-soft">
                {aboutMission.title}
              </p>
              <ul className="space-y-3">
                {aboutMission.commitments.map((commitment) => (
                  <li key={commitment} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                    />
                    <span className="text-base leading-7 text-fg-inverse-soft">
                      {commitment}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            id="strategy"
            className="scroll-anchor-target flex flex-col p-8 panel-inverse-card"
          >
            <p className="eyebrow text-fg-accent-strong">Our strategy</p>
            <h3 className="mt-3 text-2xl leading-snug text-fg-inverse">
              {aboutStrategy.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-fg-inverse-muted">
              {aboutStrategy.description}
            </p>
            <ul className="mt-6 space-y-3 border-t border-solid border-t-accent-soft pt-6">
              {aboutStrategy.items.map((item) => (
                <li
                  key={item}
                  className="text-base leading-7 text-fg-inverse-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="panel-inverse-callout mt-6 p-4 text-sm leading-7 text-fg-inverse-soft">
              {aboutStrategy.mandate}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMissionStrategy;
