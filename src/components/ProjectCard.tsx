import { ArrowUpRight, Lock } from "lucide-react";

export type Project = {
  index: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  description: string;
  gradient: string;
  isComingSoon?: boolean;
};

export function ProjectCard({ project, side }: { project: Project; side: "left" | "right" }) {
  const isLeft = side === "left";
  const isComingSoon = project.isComingSoon;

  return (
    <div
      className={[
        "group relative block w-full max-w-[410px] overflow-hidden rounded-3xl",
        "glass-card transition-all duration-500 hover:-translate-y-2 hover:border-white/15 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]",
        "focus-visible:-translate-y-2 focus-visible:border-white/30",
        "pl-7 pr-4 sm:pr-7 md:pl-7 md:pr-7",
      ].join(" ")}
      style={{ aspectRatio: "3 / 4.2" }}
    >
      <div
        className={[
          "absolute top-6 bottom-6 w-[3px] rounded-full transition-all duration-300 bg-white/20",
          "left-3 md:left-3",
          !isLeft ? "md:left-auto md:right-3" : "",
        ].join(" ")}
      />

      <div className="relative flex h-full flex-col p-4 sm:p-7 md:p-7">
        <div className="flex items-start justify-between text-xs text-muted-foreground">
          <span className="font-mono tracking-widest">{project.index}</span>
          <span className="font-mono tracking-widest">{project.year}</span>
        </div>

        <div
          className="relative my-6 flex-1 overflow-hidden rounded-2xl border border-white/5"
          style={{ background: project.gradient }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)",
            }}
          />

          {isComingSoon ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-[2px]">
              <Lock size={16} className="text-muted-foreground animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Under Construction
              </span>
            </div>
          ) : (
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                {project.subtitle}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-balance text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <ul className="flex flex-wrap gap-1.5 max-w-[80%]">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>

          {!isComingSoon && (
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:rotate-45 group-hover:bg-white group-hover:text-black"
            >
              <ArrowUpRight size={14} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
