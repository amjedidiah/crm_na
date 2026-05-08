interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: Readonly<SectionHeaderProps>) {
  return (
    <div className="space-y-3">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="text-4xl md:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
