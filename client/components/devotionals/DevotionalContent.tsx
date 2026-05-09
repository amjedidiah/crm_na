import { BookMarked, BookOpen, HandHelping, Target } from "lucide-react";
import type { Devotional } from "@/lib/types";

function DevotionalSection({
  icon,
  label,
  children,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <div className="card-surface space-y-4 p-6">
      <div className="flex items-center gap-3">
        <span className="text-(--text-accent)">{icon}</span>
        <h2 className="font-display text-sm tracking-[0.18em] uppercase text-(--text-primary)">
          {label}
        </h2>
      </div>
      {children}
    </div>
  );
}

function DevotionalContent({
  devotional,
}: Readonly<{ devotional: Devotional }>) {
  return (
    <article className="mx-auto max-w-4xl space-y-6">
      <div className="text-center">
        <p className="font-display text-sm tracking-[0.22em] uppercase text-(--text-secondary)">
          {devotional.dayLabel}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl">{devotional.title}</h1>
      </div>

      <div className="rounded-[1.8rem] bg-(--surface-inverse) p-8 text-center text-(--text-on-inverse)">
        <p className="font-display text-sm tracking-[0.22em] uppercase text-(--text-brand-strong)">
          {devotional.scriptureRef}
        </p>
        <blockquote className="mt-4 text-2xl leading-relaxed italic md:text-3xl">
          {devotional.scriptureText}
        </blockquote>
      </div>

      <DevotionalSection icon={<BookOpen className="size-5" />} label="Message">
        <div className="space-y-4">
          {devotional.message.map((paragraph, index) => (
            <p
              key={`${devotional.date}-message-${index.toString()}`}
              className={`text-lg leading-8 text-(--text-secondary) ${
                index === 0
                  ? "first-letter:mr-3 first-letter:float-left first-letter:text-6xl first-letter:leading-none first-letter:text-(--text-accent)"
                  : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </DevotionalSection>

      <DevotionalSection
        icon={<BookMarked className="size-5" />}
        label="Memory Verse"
      >
        <p className="text-lg leading-8 italic text-(--text-secondary)">
          {devotional.memoryVerse}
        </p>
      </DevotionalSection>

      <DevotionalSection icon={<Target className="size-5" />} label="Action Point">
        <p className="text-lg leading-8 text-(--text-secondary)">
          {devotional.actionPoint}
        </p>
      </DevotionalSection>

      {devotional.prayerPoints.length ? (
        <DevotionalSection
          icon={<HandHelping className="size-5" />}
          label="Prayer Points"
        >
          <ol className="space-y-3">
            {devotional.prayerPoints.map((point, index) => (
              <li
                key={`${devotional.date}-prayer-${index.toString()}`}
                className="flex gap-3 text-lg leading-8 text-(--text-secondary)"
              >
                <span className="font-display text-(--text-accent)">
                  {index + 1}.
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </DevotionalSection>
      ) : null}

      <div className="rounded-[1.4rem] border border-(--border-default) p-5">
        <p className="text-sm text-(--text-secondary)">
          <span className="font-semibold text-(--text-primary)">
            Bible in One Year:
          </span>{" "}
          {devotional.bibleReading}
        </p>
      </div>
    </article>
  );
}

export default DevotionalContent;
