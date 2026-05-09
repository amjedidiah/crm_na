import Image from "next/image";

interface SiteLogoProps {
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
