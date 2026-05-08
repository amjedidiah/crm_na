import Link from "next/link";
import { ArrowRight, HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";

function PrayerRequestBanner() {
  return (
    <section className="section-padding py-14 md:py-20">
      <div className="container-shell">
        <Link
          href="/contact?purpose=prayer-request"
          className={cn(
            "group relative flex flex-col items-center gap-5 overflow-hidden rounded-sm border border-(--color-border-subtle)",
            "bg-(--color-bg-emphasis-strong) px-8 py-8 transition-transform duration-300 md:flex-row md:items-center md:gap-10 md:p-10",
            "hover:-translate-y-0.5 hover:shadow-lg",
          )}
        >
          <div className="bg-(--color-bg-accent-soft) flex size-14 shrink-0 items-center justify-center rounded-full">
            <HandHeart className="text-(--color-fg-accent-strong) size-7" aria-hidden />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl text-(--color-fg-inverse) md:text-3xl">
              We would love to pray with you
            </h3>
            <p className="text-(--color-fg-inverse-soft) mt-3 max-w-2xl text-base leading-7">
              When life is heavy, tender, or full of thanksgiving, our leaders and intercessors are
              honored to stand with you in faith. Share a request and we will carry it to the Lord
              together.
            </p>
          </div>
          <span className="text-(--color-fg-inverse) font-display flex shrink-0 items-center gap-2 text-xs tracking-[0.2em] uppercase transition-transform group-hover:translate-x-1">
            Submit a prayer request
            <ArrowRight className="size-4" aria-hidden />
          </span>
          <div className="bg-(--color-bg-accent-soft) pointer-events-none absolute top-0 right-0 h-full w-40 opacity-40" />
        </Link>
      </div>
    </section>
  );
}

export default PrayerRequestBanner;
