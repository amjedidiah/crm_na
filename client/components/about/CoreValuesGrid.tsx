import { coreValues } from "@/lib/mock-data";

function CoreValuesGrid({ id }: Readonly<{ id?: string }>) {
  return (
    <section id={id} className="section-padding">
      <div className="container-shell grid gap-6 md:grid-cols-2">
        {coreValues.map((value) => (
          <article key={value.title} className="card-surface space-y-4 p-8">
            <p className="eyebrow">{value.scripture}</p>
            <h2 className="text-4xl">{value.title}</h2>
            <p className="text-lg leading-8 text-(--color-fg-secondary)">
              {value.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default CoreValuesGrid;
