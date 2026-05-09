import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Church } from "@/lib/types";

interface ChurchLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "children" | "href"> {
  church: Pick<Church, "slug" | "website">;
  children: ReactNode;
}

function ChurchLink({
  church,
  children,
  className,
  ...props
}: Readonly<ChurchLinkProps>) {
  const href = church.website ?? `/churches/${church.slug}`;

  if (church.website) {
    return (
      <a
        href={href}
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
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

export default ChurchLink;
