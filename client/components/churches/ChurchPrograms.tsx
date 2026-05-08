import type { ChurchProgram } from "@/lib/types";

function ChurchPrograms({ programs }: Readonly<{ programs: ChurchProgram[] }>) {
  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <div key={program.title} className="card-surface p-5">
          <h3 className="text-2xl">{program.title}</h3>
          <p className="text-(--color-fg-secondary)">{program.cadence}</p>
          {program.note ? (
            <p className="text-sm text-(--color-fg-secondary)">
              {program.note}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default ChurchPrograms;
