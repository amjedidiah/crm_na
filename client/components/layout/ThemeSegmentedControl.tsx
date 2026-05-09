"use client";

import { useTheme } from "next-themes";
import { useId, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light" as const, label: "Light" },
  { value: "dark" as const, label: "Dark" },
  { value: "system" as const, label: "System" },
];

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function themeSegmentLabelClasses(transparent: boolean, selected: boolean) {
  if (transparent) {
    if (selected) {
      return "bg-(--text-on-inverse)/18 text-(--text-brand-strong) ring-1 ring-(--text-brand-strong)/35";
    }
    return "text-(--text-on-inverse-soft) hover:bg-(--text-on-inverse)/10 hover:text-(--text-on-inverse-bright)";
  }
  if (selected) {
    return "bg-(--interactive-muted) text-(--text-accent) ring-1 ring-(--border-brand)/50";
  }
  return "text-(--text-secondary) hover:bg-(--interactive-muted)/70 hover:text-(--text-primary)";
}

function themeSegmentFocusRing(transparent: boolean) {
  return transparent
    ? "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-(--text-brand-strong) has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-transparent"
    : "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-(--text-accent) has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-transparent";
}

interface ThemeSegmentedControlProps {
  /** Navbar over hero: controls sit on dark imagery */
  transparent: boolean;
  className?: string;
  /** Called after the user selects a theme (e.g. close a popover). */
  onSelectionChange?: () => void;
}

function ThemeSegmentedControl({
  transparent,
  className,
  onSelectionChange,
}: Readonly<ThemeSegmentedControlProps>) {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();
  const groupName = useId();

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 min-w-46 rounded-md border border-transparent",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <fieldset className={cn("min-w-0 border-0 p-0", className)}>
      <legend className="sr-only">Color theme</legend>
      <div
        className={cn(
          "flex max-w-full rounded-md border p-0.5",
          transparent
            ? "border-(--text-on-inverse-muted) bg-(--text-on-inverse)/5"
            : "border-(--border-default) bg-(--surface-muted)/40",
        )}
        role="radiogroup"
      >
        {OPTIONS.map(({ value, label }) => {
          const selected = theme === value;

          return (
            <label
              key={value}
              className={cn(
                "font-display cursor-pointer rounded px-2 py-1.5 text-[10px] tracking-[0.12em] uppercase transition-colors outline-none",
                themeSegmentFocusRing(transparent),
                themeSegmentLabelClasses(transparent, selected),
              )}
            >
              <input
                checked={selected}
                className="sr-only"
                name={groupName}
                type="radio"
                value={value}
                onChange={() => {
                  setTheme(value);
                  onSelectionChange?.();
                }}
              />
              {label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default ThemeSegmentedControl;
