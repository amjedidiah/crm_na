import SectionHeader from "@/components/shared/SectionHeader";

interface ComingSoonProps {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: Readonly<ComingSoonProps>) {
  return (
    <section className="section-padding">
      <div className="container-shell">
        <div className="card-surface p-8 md:p-12">
          <SectionHeader
            eyebrow="Scaffolded"
            title={title}
            description={description}
          />
        </div>
      </div>
    </section>
  );
}

export default ComingSoon;
