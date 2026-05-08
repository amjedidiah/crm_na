import Image from "next/image";

interface SiteLogoProps {
  variant?: "on-dark" | "on-light";
  className?: string;
}

function SiteLogo({
  className = "",
}: Readonly<SiteLogoProps>) {
  return (
    <Image
      src="/crm-logo.png"
      alt=""
      aria-hidden="true"
      width={650}
      height={650}
      className={className}
    />
  );
}

export default SiteLogo;
