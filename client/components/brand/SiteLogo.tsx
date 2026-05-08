import Image from "next/image";

interface SiteLogoProps {
  variant?: "on-dark" | "on-light";
  className?: string;
}

function SiteLogo({
  variant = "on-dark",
  className = "",
}: Readonly<SiteLogoProps>) {
  return (
    <Image
      src={variant === "on-dark" ? "/logo-dark.svg" : "/logo-light.svg"}
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className={className}
    />
  );
}

export default SiteLogo;
