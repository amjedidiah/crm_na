import type { GivingCategory } from "@/lib/giving";

interface GivingCategoriesProps {
  readonly categories: readonly GivingCategory[];
}

function GivingCategories({ categories }: Readonly<GivingCategoriesProps>) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="section-padding border-t border-(--color-border-subtle)">
      <div className="container-shell space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow text-(--color-fg-accent)">Where it goes</p>
          <h2 className="text-4xl font-display leading-tight text-(--color-fg-primary) md:text-5xl">
            Giving categories
          </h2>
          <p className="text-lg leading-8 text-(--color-fg-secondary)">
            Your generosity strengthens the wider CRM North America family — from local branches to national gatherings.
          </p>
        </div>
        <ul className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat.id}>
              <article className="card-surface h-full space-y-3 p-6">
                <h3 className="text-lg font-display text-(--color-fg-primary)">{cat.title}</h3>
                <p className="text-sm leading-7 text-(--color-fg-secondary)">{cat.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default GivingCategories;
