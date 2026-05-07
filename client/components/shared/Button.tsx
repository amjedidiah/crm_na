import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-2)] border border-[var(--gold)]",
  outline:
    "border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--navy)]",
};

function Button({
  variant = "primary",
  href,
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
      <Link href={href} className={classes}>
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
