import { useState } from "react";
import { ProjectCard, type Project } from "./ProjectCard";
import { AlertCircle, Terminal, X } from "lucide-react";

const projects: Project[] = [
  {
    index: "01 / 04",
    title: "SaaS Analytics Dashboard",
    subtitle: "Enterprise-Grade B2B Product",
    year: "2026",
    tags: ["Next.js", "Zustand", "Recharts", "a11y"],
    description:
      "A high-performance analytics interface resolving complex data clutter. Engineered with advanced multi-tier filtering, fully accessible keyboard-navigable data tables, and scalable state management to sync charts in real-time.",
    gradient: "linear-gradient(135deg, rgba(180,200,255,0.08), rgba(40,50,80,0.12))",
    isComingSoon: true,
  },
  {
    index: "02 / 04",
    title: "AI Productivity Agent",
    subtitle: "Active Development",
    year: "2026",
    tags: ["TypeScript", "AI API", "Tiptap", "UX Optimization"],
    description:
      "An intelligent workspace combining natural language processing with rich text editing. Optimized for API latency through optimistic UI updates and custom skeleton systems, handling intensive background auto-saves seamlessly.",
    gradient: "linear-gradient(135deg, rgba(230,200,170,0.06), rgba(80,55,40,0.1))",
    isComingSoon: true,
  },
  {
    index: "03 / 04",
    title: "Core Web Vitals Storefront",
    subtitle: "Architecting Phase",
    year: "2026",
    tags: ["Next.js", "WCAG", "Lighthouse", "Tailwind"],
    description:
      "A conversion-focused commerce storefront engineered for absolute speed. Achieved flawless 90+ Core Web Vitals scores using aggressive image optimization (AVIF), debounced search streams, and fully WCAG-compliant screen reader layout trees.",
    gradient: "linear-gradient(135deg, rgba(200,255,200,0.06), rgba(40,80,50,0.1))",
    isComingSoon: true,
  },
  {
    index: "04 / 04",
    title: "Design System Architecture",
    subtitle: "System Compilation",
    year: "2026",
    tags: ["React", "Storybook", "Tailwind v4", "Architecture"],
    description:
      "A highly atomic, framework-agnostic UI kit built to eliminate design inconsistency. Features a flawless light/dark mode orchestrator via CSS variables, accompanied by an interactive Storybook playground showcasing strict props types.",
    gradient: "linear-gradient(135deg, rgba(255,180,180,0.06), rgba(80,40,40,0.1))",
    isComingSoon: true,
  },
];

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 pt-32 pb-[20%] md:pb-[25%]">
      <div className="mb-20 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Selected work · 2026
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl text-white">
            A small catalogue of <span className="italic font-light">considered things.</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-16 md:gap-y-32">
        {projects.map((p, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div
              key={p.title}
              onClick={() => setActiveProject(p)}
              className={[
                "flex w-full cursor-pointer transition-transform duration-500",
                isLeft ? "md:justify-start" : "md:justify-end md:translate-y-[50%]",
              ].join(" ")}
            >
              <ProjectCard project={p} side={isLeft ? "left" : "right"} />
            </div>
          );
        })}
      </div>

      {}
      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!activeProject}
        className={[
          "fixed top-4 right-4 bottom-4 w-[calc(100%-32px)] sm:w-[460px] bg-slate-950/40 backdrop-blur-xl",
          "border border-white/10 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out",
          "flex flex-col justify-between",
          activeProject
            ? "translate-x-0 opacity-100 z-50"
            : "translate-x-8 opacity-0 z-0 pointer-events-none",
        ].join(" ")}
      >
        {activeProject && (
          <>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-foreground font-mono text-xs tracking-wider">
                  <span>{activeProject.index}</span>
                  <span className="text-white/20">/</span>
                  <span className="text-white/60">{activeProject.year}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(null);
                  }}
                  aria-label="Close details"
                  className="p-2 rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:bg-white hover:text-black transition-all duration-300 outline-none focus-visible:bg-white focus-visible:text-black"
                >
                  <X size={14} />
                </button>
              </div>

              <div
                className="w-full h-32 rounded-2xl relative overflow-hidden border border-white/5"
                style={{ background: activeProject.gradient }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
                <span className="absolute bottom-3 left-4 text-[9px] font-mono tracking-[0.2em] text-white/50 uppercase">
                  {activeProject.subtitle}
                </span>
              </div>

              {/* INDIKATOR UNDER CONSTRUCTION */}
              {activeProject.isComingSoon && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] p-3.5 text-amber-400/90">
                  <AlertCircle size={16} className="animate-pulse shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
                      Under Construction
                    </span>
                    <span className="text-[11px] text-muted-foreground/80 leading-normal">
                      This architectural module is currently being compiled. Stay tuned for
                      production deployment.
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  {activeProject.title}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeProject.description}
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-5 mt-6">
              <div className="flex items-center gap-2 mb-3 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                <Terminal size={12} className="text-white/40" />
                <span>Target Stack:</span>
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Backdrop overlay background blur effect */}
      {activeProject && (
        <div
          onClick={() => setActiveProject(null)}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-500"
        />
      )}
    </section>
  );
}
