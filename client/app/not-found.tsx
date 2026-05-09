import Link from "next/link";

function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-shell space-y-4 text-center">
        <p className="eyebrow">Page Not Found</p>
        <h1 className="text-5xl">
          This route is not part of the CRM NA scaffold.
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-(--text-secondary)">
          The initial implementation keeps the canonical route map narrow and
          uses redirects for the legacy flat URLs.
        </p>
        <Link
          className="font-display text-sm tracking-[0.2em] text-(--text-brand) uppercase"
          href="/"
        >
          Return home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
