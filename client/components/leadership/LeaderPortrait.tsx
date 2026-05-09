import Image from "next/image";
import type { Leader } from "@/lib/types";

function LeaderPortrait({
  leader,
  priority = false,
}: Readonly<{
  leader: Leader;
  priority?: boolean;
}>) {
  const src = leader.imageSrc ?? "https://i.ibb.co/DP3Wjy63/avatar.png";
  const alt = leader.imageAlt ?? `Portrait placeholder for ${leader.name}`;

  return (
    <div className="relative overflow-hidden rounded-card-lg border border-solid border-subtle bg-portrait-well">
      <Image
        src={src}
        alt={alt}
        width={960}
        height={1200}
        priority={priority}
        className="aspect-4/5 h-full w-full object-cover"
      />
    </div>
  );
}

export default LeaderPortrait;
