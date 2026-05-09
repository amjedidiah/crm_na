interface MapEmbedProps {
  query: string;
}

function MapEmbed({ query }: Readonly<MapEmbedProps>) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <div className="overflow-hidden border border-(--border-default)">
      <iframe
        title="Location map"
        src={src}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapEmbed;
