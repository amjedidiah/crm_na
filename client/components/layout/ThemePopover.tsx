"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import ThemeSegmentedControl from "@/components/layout/ThemeSegmentedControl";
import { cn } from "@/lib/utils";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function ThemeTriggerGlyph({
  resolvedTheme,
  theme,
}: Readonly<{
  resolvedTheme?: string;
  theme?: string;
}>) {
  const iconProps = {
    "aria-hidden": true as const,
    className: "size-5",
    strokeWidth: 1.75,
  };

  if (theme === "system") {
    return <Laptop {...iconProps} />;
  }

  if (resolvedTheme === "dark") {
    return <Moon {...iconProps} />;
  }

  return <Sun {...iconProps} />;
}

interface ThemePopoverProps {
  /** Navbar over hero: trigger sits on dark imagery */
  transparent: boolean;
}

function ThemePopover({ transparent }: Readonly<ThemePopoverProps>) {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, theme } = useTheme();
  const dialogId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!mounted) {
    return <div className="size-10 shrink-0 rounded-md" aria-hidden />;
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        aria-controls={dialogId}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "flex size-10 items-center justify-center rounded-md border transition-colors",
          transparent
            ? "border-(--text-on-inverse-muted) text-(--text-on-inverse-bright) hover:border-(--text-brand-strong) hover:text-(--text-brand-strong)"
            : "border-(--border-default) text-(--text-primary) hover:border-(--text-accent) hover:text-(--text-accent)",
        )}
        type="button"
        onClick={() => {
          setOpen((previous) => !previous);
        }}
      >
        <ThemeTriggerGlyph resolvedTheme={resolvedTheme} theme={theme} />
        <span className="sr-only">Color theme</span>
      </button>
      {open ? (
        <div
          className={cn(
            "absolute right-0 top-full z-60 mt-2 min-w-50 rounded-lg border p-3 shadow-lg",
            "border-(--border-default) bg-(--surface-page-elevated) text-(--text-primary) backdrop-blur-md",
          )}
          id={dialogId}
        >
          <ThemeSegmentedControl
            transparent={false}
            onSelectionChange={() => {
              setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ThemePopover;
