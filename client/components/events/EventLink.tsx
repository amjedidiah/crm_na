import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Event } from "@/lib/types";
import { getEventListingHref } from "@/lib/event-utils";

interface EventLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "children" | "href"> {
  event: Pick<Event, "slug" | "mode" | "externalUrl">;
  children: ReactNode;
}

function EventLink({
  event,
  children,
  className,
  ...props
}: Readonly<EventLinkProps>) {
  const target = getEventListingHref(event);

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

export default EventLink;
