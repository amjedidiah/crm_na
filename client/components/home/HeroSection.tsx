import Button from "@/components/shared/Button";
import { SITE_DESCRIPTION } from "@/lib/mock-data";

function HeroSection() {
  return (
    <section className="hero-panel section-padding">
      <div className="container-shell space-y-8 py-12">
        <p className="eyebrow">CRM North America</p>
        <h1 className="max-w-5xl text-6xl leading-none md:text-8xl">
          Revival centers, ministries, and media shaped by a clearer digital
          home.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-(--cream)/80 md:text-xl">
          {SITE_DESCRIPTION}
        </p>
        <div className="flex flex-wrap gap-4">
          <Button href="/churches">Find a church</Button>
          <Button href="/watch-us-live" variant="outline">
            Watch us live
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
