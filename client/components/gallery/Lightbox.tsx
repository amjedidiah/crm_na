"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Motion from "@/components/shared/Motion";
import { clampGalleryIndex } from "@/lib/gallery-utils";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/types";

const FOCUSABLE_SELECTOR = [
  'button:not([disabled]):not([aria-hidden="true"])',
  'a[href]:not([disabled]):not([aria-hidden="true"])',
  'input:not([disabled]):not([aria-hidden="true"])',
  'select:not([disabled]):not([aria-hidden="true"])',
  'textarea:not([disabled]):not([aria-hidden="true"])',
  '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
].join(", ");

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (element) =>
      !element.hasAttribute("hidden") &&
      element.getAttribute("aria-hidden") !== "true",
  );
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

function LightboxSlide({ image }: Readonly<{ image: GalleryImage }>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Motion
      className="relative z-2 h-[70vh] w-[90vw] sm:h-[80vh] sm:w-[85vw]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {loaded ? null : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="size-10 animate-spin rounded-full border-2 border-(--text-on-inverse-muted) border-t-(--text-on-inverse)"
            aria-hidden
          />
        </div>
      )}

      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={cn(
          "object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        sizes="90vw"
        priority
        unoptimized
        onLoad={() => setLoaded(true)}
      />

      {image.caption ? (
        <div className="absolute right-0 bottom-0 left-0 bg-linear-to-t from-black/80 to-transparent p-4 pt-12">
          <p className="text-sm leading-6 text-(--text-on-inverse)">
            {image.caption}
          </p>
        </div>
      ) : null}
    </Motion>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: Readonly<LightboxProps>) {
  const counterId = useId();
  const safeIndex = clampGalleryIndex(currentIndex, images.length);
  const image = images[safeIndex];

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef(0);

  const hasPrevious = safeIndex > 0;
  const hasNext = safeIndex < images.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowRight" && hasNext) {
        onNext();
      } else if (event.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      }
    }

    globalThis.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      globalThis.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious, hasNext, hasPrevious]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const container = dialogRef.current;
    if (!container) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") {
        return;
      }
      const root = dialogRef.current;
      if (!root) {
        return;
      }
      const nodes = getFocusableElements(root);
      if (nodes.length === 0) {
        return;
      }
      const first = nodes[0];
      const last = nodes.at(-1);
      const active = document.activeElement;
      if (!active || !root.contains(active)) {
        return;
      }
      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last?.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [safeIndex, hasPrevious, hasNext, images.length]);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const deltaX = event.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0 && hasNext) {
          onNext();
        } else if (deltaX > 0 && hasPrevious) {
          onPrevious();
        }
      }
    },
    [hasNext, hasPrevious, onNext, onPrevious],
  );

  if (images.length === 0 || !image) {
    return null;
  }

  return (
    <Motion
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      aria-describedby={counterId}
      tabIndex={-1}
      className="fixed inset-0 z-100 flex items-center justify-center outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-0 right-0 left-0 z-20 flex items-center justify-between p-4 text-(--text-on-inverse)">
        <span
          id={counterId}
          aria-live="polite"
          aria-atomic="true"
          className="text-sm font-medium text-(--text-on-inverse-muted)"
        >
          Image {safeIndex + 1} of {images.length}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-full p-2 text-(--text-on-inverse-muted) transition-colors hover-wash-on-inverse hover:text-(--text-on-inverse)"
          aria-label="Close photo viewer"
        >
          <X className="size-6" aria-hidden />
        </button>
      </div>

      {hasPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          className="absolute left-2 z-20 cursor-pointer rounded-full p-2 text-(--text-on-inverse-muted) transition-colors hover-wash-on-inverse hover:text-(--text-on-inverse) sm:left-4"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-8" aria-hidden />
        </button>
      ) : null}

      {hasNext ? (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 z-20 cursor-pointer rounded-full p-2 text-(--text-on-inverse-muted) transition-colors hover-wash-on-inverse hover:text-(--text-on-inverse) sm:right-4"
          aria-label="Next image"
        >
          <ChevronRight className="size-8" aria-hidden />
        </button>
      ) : null}

      <AnimatePresence mode="wait">
        <LightboxSlide key={safeIndex} image={image} />
      </AnimatePresence>

      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 z-0 cursor-default border-0 bg-black/92 p-0"
        aria-label="Close photo viewer (dismiss overlay)"
      />
    </Motion>
  );
}

export default Lightbox;
