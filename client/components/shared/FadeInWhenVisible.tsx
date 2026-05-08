"use client";

import { useRef, type PropsWithChildren } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Motion from "@/components/shared/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface FadeInWhenVisibleProps extends PropsWithChildren {
  className?: string;
}

function FadeInWhenVisible({
  children,
  className,
}: Readonly<FadeInWhenVisibleProps>) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-48px 0px" });
  const visible = Boolean(reduceMotion || isInView);

  return (
    <Motion
      ref={ref}
      className={cn(className)}
      initial={
        reduceMotion ? false : { opacity: 0, y: 36, filter: "blur(6px)" }
      }
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 36, filter: "blur(6px)" }
      }
      transition={{
        duration: reduceMotion ? 0.01 : 0.62,
        ease,
      }}
    >
      {children}
    </Motion>
  );
}

export default FadeInWhenVisible;
