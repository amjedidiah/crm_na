function LivestreamEmbed({
  url,
  title = "Primary livestream destination",
  description,
}: Readonly<{
  url: string;
  title?: string;
  description?: string;
}>) {
  return (
    <div className="card-surface p-6">
      <p className="eyebrow">Livestream</p>
      <h2 className="mt-2 text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-lg leading-8 text-(--color-fg-secondary)">
          {description}
        </p>
      ) : null}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-block text-(--color-fg-accent) underline"
      >
        Open stream
      </a>
    </div>
  );
}

export default LivestreamEmbed;
