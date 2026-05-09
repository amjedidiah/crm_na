import { Crown, HandHeart, HeartHandshake, Users } from "lucide-react";

function MinistryVisualIcon({
  slug,
  className,
  strokeWidth = 1.15,
}: Readonly<{
  slug: string;
  className?: string;
  strokeWidth?: number;
}>) {
  const shared = {
    className,
    strokeWidth,
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "youths":
      return <Users {...shared} />;
    case "cwl-charismatic-women-league":
      return <HeartHandshake {...shared} />;
    case "kings-men":
      return <Crown {...shared} />;
    default:
      return <HandHeart {...shared} />;
  }
}

export default MinistryVisualIcon;
