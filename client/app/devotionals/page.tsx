import { Suspense } from "react";
import { BookOpen } from "lucide-react";
import { connection } from "next/server";
import DevotionalContent from "@/components/devotionals/DevotionalContent";
import FadeInWhenVisible from "@/components/shared/FadeInWhenVisible";
import PageHeader from "@/components/shared/PageHeader";
import { getTodaysDevotional } from "@/lib/devotionals";

async function DevotionalBody() {
  await connection();
  const devotional = getTodaysDevotional();

  if (!devotional) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <BookOpen
          className="size-16 text-(--text-secondary)"
          strokeWidth={1.5}
        />
        <p className="text-2xl">No devotional for today</p>
        <p className="max-w-sm text-sm text-(--text-secondary)">
          Check back soon for the next daily reading.
        </p>
      </div>
    );
  }

  return <DevotionalContent devotional={devotional} />;
}

function DevotionalSkeleton() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse space-y-6">
      <div className="h-36 rounded-[1.8rem] bg-(--surface-muted)" />
      <div className="h-72 rounded-[1.8rem] bg-(--surface-muted)" />
      <div className="h-24 rounded-[1.8rem] bg-(--surface-muted)" />
      <div className="h-24 rounded-[1.8rem] bg-(--surface-muted)" />
    </div>
  );
}

function DevotionalsPage() {
  return (
    <div className="bg-(--surface-page) text-(--text-primary)">
      <PageHeader
        eyebrow="Devotionals"
        title="Daily Devotional"
        description="A daily word of faith, hope, and encouragement for CRM North America."
      />
      <FadeInWhenVisible>
        <section className="section-padding">
          <div className="container-shell">
            <Suspense fallback={<DevotionalSkeleton />}>
              <DevotionalBody />
            </Suspense>
          </div>
        </section>
      </FadeInWhenVisible>
    </div>
  );
}

export default DevotionalsPage;
