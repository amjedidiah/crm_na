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
        <span className="text-(--color-fg-accent-text)">{icon}</span>
        <h2 className="font-display text-sm tracking-[0.18em] uppercase text-(--color-fg-primary)">
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
        <p className="font-display text-sm tracking-[0.22em] uppercase text-(--color-fg-secondary)">
          {devotional.dayLabel}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl">{devotional.title}</h1>
      </div>

      <div className="rounded-[1.8rem] bg-(--color-bg-emphasis) p-8 text-center text-(--color-fg-inverse)">
        <p className="font-display text-sm tracking-[0.22em] uppercase text-(--color-fg-accent-strong)">
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
              className={`text-lg leading-8 text-(--color-fg-secondary) ${
                index === 0
                  ? "first-letter:mr-3 first-letter:float-left first-letter:text-6xl first-letter:leading-none first-letter:text-(--color-fg-accent-text)"
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
        <p className="text-lg leading-8 italic text-(--color-fg-secondary)">
          {devotional.memoryVerse}
        </p>
      </DevotionalSection>

      <DevotionalSection icon={<Target className="size-5" />} label="Action Point">
        <p className="text-lg leading-8 text-(--color-fg-secondary)">
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
                className="flex gap-3 text-lg leading-8 text-(--color-fg-secondary)"
              >
                <span className="font-display text-(--color-fg-accent-text)">
                  {index + 1}.
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </DevotionalSection>
      ) : null}

      <div className="rounded-[1.4rem] border border-(--color-border-subtle) p-5">
        <p className="text-sm text-(--color-fg-secondary)">
          <span className="font-semibold text-(--color-fg-primary)">
            Bible in One Year:
          </span>{" "}
          {devotional.bibleReading}
        </p>
      </div>
    </article>
  );
}

export default DevotionalContent;
