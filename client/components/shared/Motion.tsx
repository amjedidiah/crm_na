"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

/** Default element is `div`; omit `as` entirely for this variant (`as?: never`). */
type DefaultDivMotionProps = HTMLMotionProps<"div"> & { as?: never };

type MotionProps =
  | DefaultDivMotionProps
  | (HTMLMotionProps<"article"> & { as: "article"; children?: ReactNode })
  | (HTMLMotionProps<"section"> & { as: "section"; children?: ReactNode })
  | (HTMLMotionProps<"span"> & { as: "span"; children?: ReactNode })
  | (HTMLMotionProps<"h1"> & { as: "h1"; children?: ReactNode })
  | (HTMLMotionProps<"h2"> & { as: "h2"; children?: ReactNode })
  | (HTMLMotionProps<"p"> & { as: "p"; children?: ReactNode })
  | (HTMLMotionProps<"ul"> & { as: "ul"; children?: ReactNode })
  | (HTMLMotionProps<"li"> & { as: "li"; children?: ReactNode });

function Motion(props: MotionProps) {
  if (!("as" in props)) {
    return <motion.div {...props} />;
  }

  // `as` may be present but undefined at runtime (e.g. `as={undefined}`).
  if (props.as === undefined) {
    const { as: _a, ...rest } = props as HTMLMotionProps<"div"> & { as: undefined };
    return <motion.div {...rest} />;
  }

  switch (props.as) {
    case "article": {
      const { as: _a, ...rest } = props;
      return <motion.article {...rest} />;
    }
    case "section": {
      const { as: _a, ...rest } = props;
      return <motion.section {...rest} />;
    }
    case "span": {
      const { as: _a, ...rest } = props;
      return <motion.span {...rest} />;
    }
    case "h1": {
      const { as: _a, ...rest } = props;
      return <motion.h1 {...rest} />;
    }
    case "h2": {
      const { as: _a, ...rest } = props;
      return <motion.h2 {...rest} />;
    }
    case "p": {
      const { as: _a, ...rest } = props;
      return <motion.p {...rest} />;
    }
    case "ul": {
      const { as: _a, ...rest } = props;
      return <motion.ul {...rest} />;
    }
    case "li": {
      const { as: _a, ...rest } = props;
      return <motion.li {...rest} />;
    }
  }
}

export default Motion;
export type { MotionProps };
