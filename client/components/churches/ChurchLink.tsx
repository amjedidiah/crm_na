import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Church } from "@/lib/types";
import { getChurchListingHref } from "@/lib/church-utils";

interface ChurchLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "children" | "href"> {
  church: Church;
  children: ReactNode;
}

function ChurchLink({
  church,
  children,
  className,
  ...props
}: Readonly<ChurchLinkProps>) {
  const target = getChurchListingHref(church);

  if (!target) {
    return (
      <span className={className} {...props}>
        {children}
      </span>
    );
  }

  if (target.external) {
    return (
      <a
        href={target.href}
        className={className}
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={target.href} className={className} {...props}>
      {children}
    </Link>
  );
}

export default ChurchLink;
