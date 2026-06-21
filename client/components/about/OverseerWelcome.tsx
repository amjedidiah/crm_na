import LeaderPortrait from "@/components/leadership/LeaderPortrait";
import SectionHeader from "@/components/shared/SectionHeader";
import type { AboutWelcomeMessageContent } from "@/lib/wordpress/about-types";
import type { Leader } from "@/lib/types";

function OverseerWelcome({
  id,
  overseer,
  welcomeMessage,
}: Readonly<{
  id?: string;
  overseer?: Leader | null;
  welcomeMessage: AboutWelcomeMessageContent;
}>) {
  const paragraphs = welcomeMessage.body.map((paragraph) => (
    <p key={paragraph} className="text-lg leading-8 text-fg-secondary">
      {paragraph}
    </p>
  ));

  return (
    <section id={id} className="section-padding scroll-anchor-target">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeader
          eyebrow={welcomeMessage.eyebrow}
          title={welcomeMessage.title}
          description={`${welcomeMessage.authorName} · ${welcomeMessage.authorTitle}`}
        />
        <article className="card-surface p-8">
          {overseer ? (
            <div className="grid gap-8 md:grid-cols-[minmax(0,220px)_1fr] md:items-start">
              <LeaderPortrait leader={overseer} priority />
              <div className="space-y-5">{paragraphs}</div>
            </div>
          ) : (
            <div className="space-y-5">{paragraphs}</div>
          )}
        </article>
      </div>
    </section>
  );
}

export default OverseerWelcome;
