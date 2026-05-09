import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Use on dark bands (e.g. `dark-strip`) so headings and body copy stay legible. */
  inverse?: boolean;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
}: Readonly<SectionHeaderProps>) {
  return (
    <div className={cn("space-y-3", inverse && "text-fg-inverse")}>
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow",
            inverse && "text-fg-accent-strong",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl md:text-5xl">{title}</h2>
      {description ? (
        <p
          className={cn(
            "max-w-3xl text-lg leading-8",
            inverse ? "text-fg-inverse-soft" : "text-fg-secondary",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
