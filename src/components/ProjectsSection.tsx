import { ProjectCard, type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    index: "01 / 06",
    title: "Project Alpha",
    subtitle: "Sedang Dikerjakan",
    year: "2026",
    tags: ["Frontend", "React", "Tailwind"],
    description:
      "Proyek portofolio premium pertama sedang dalam tahap pengembangan intensif. Segera hadir.",
    gradient: "linear-gradient(135deg, rgba(180,200,255,0.08), rgba(40,50,80,0.12))",
    isComingSoon: true,
  },
  {
    index: "02 / 06",
    title: "Project Beta",
    subtitle: "Sedang Dikerjakan",
    year: "2026",
    tags: ["Web App", "TypeScript"],
    description:
      "Sistem aplikasi berbasis web interaktif dengan arsitektur modern. Masih dirancang.",
    gradient: "linear-gradient(135deg, rgba(230,200,170,0.08), rgba(80,55,40,0.12))",
    isComingSoon: true,
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="mb-20 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Selected work · 2026
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            A small catalogue of <span className="italic font-light">considered things.</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-10 md:gap-y-16">
        {projects.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={p.title}
              className={[
                "flex w-full justify-center",
                isLeft ? "md:justify-start md:pr-6" : "md:justify-end md:pl-6 md:mt-24",
              ].join(" ")}
            >
              <ProjectCard project={p} side={isLeft ? "left" : "right"} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
