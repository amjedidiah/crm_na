import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Event } from "@/lib/types";

interface EventLinkProps
  extends Omit<ComponentPropsWithoutRef<"a">, "children" | "href"> {
  event: Pick<Event, "slug" | "registrationUrl">;
  children: ReactNode;
}

function EventLink({
  event,
  children,
  className,
  ...props
}: Readonly<EventLinkProps>) {
  const href = event.registrationUrl ?? `/events/${event.slug}`;

  if (event.registrationUrl) {
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

export default EventLink;
