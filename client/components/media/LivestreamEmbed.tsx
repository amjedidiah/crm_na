function LivestreamEmbed({ url }: Readonly<{ url: string }>) {
  return (
    <div className="card-surface p-6">
      <p className="eyebrow">Livestream</p>
      <h2 className="mt-2 text-3xl">Primary livestream destination</h2>
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
