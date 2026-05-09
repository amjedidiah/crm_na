import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
  /** Applied when `href` is set (e.g. external payment links). */
  target?: string;
  rel?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-accent text-fg-on-accent border border-brand hover:bg-[var(--interactive-hover)]",
  outline:
    "border border-brand text-fg-accent-strong hover:bg-brand-accent hover:text-fg-on-accent",
};

function Button({
  variant = "primary",
  href,
  target,
  rel,
  className,
  children,
  ...props
}: Readonly<ButtonProps>) {
  const classes = cn(
    "font-display inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.24em] uppercase transition-colors",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
}

export default Button;
