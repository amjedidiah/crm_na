import type { PropsWithChildren } from "react";

function PageTransition({ children }: Readonly<PropsWithChildren>) {
  return <div className="contents text-(--text-primary)">{children}</div>;
}

export default PageTransition;
