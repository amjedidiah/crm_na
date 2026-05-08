"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

function Motion({ children, ...props }: Readonly<MotionProps>) {
  const { className, ...motionProps } = props;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("text-(--color-fg-primary)", className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export default Motion;
