import { Cpu, Terminal, Layers, Code2, Database, ShieldAlert, GitBranch } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Concept & Research",
    desc: "Menganalisis kebutuhan pengguna, menentukan arah visual gelap sinematik, serta merancang pondasi UX yang efisien.",
  },
  {
    num: "02",
    title: "Production & Code",
    desc: "Menyusun komponen menggunakan React, TypeScript, dan Tailwind CSS dengan arsitektur modular standar industri.",
  },
  {
    num: "03",
    title: "Optimization & Launch",
    desc: "Melakukan audit performa loading (LCP/FID), memastikan responsivitas penuh, lalu meluncurkan web ke server global.",
  },
];

const tools = [
  { name: "React", icon: Cpu },
  { name: "TypeScript", icon: Terminal },
  { name: "Tailwind", icon: Layers },
  { name: "Next.js", icon: Code2 },
  { name: "Node.js", icon: Database },
  { name: "Git", icon: GitBranch },
  { name: "NextAuth", icon: ShieldAlert },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative mx-auto max-w-5xl px-6 py-32 border-t border-white/5">
      <div className="mb-16 text-center sm:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
          / Workflow
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          How I bring ideas to life.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.num}
            className="glass-card rounded-2xl p-6 border border-white/5 bg-white/[0.01] space-y-4"
          >
            <span className="font-mono text-xs tracking-wider text-muted-foreground/40 block">
              PHASE // {step.num}
            </span>
            <h3 className="text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>

      {}
      <div className="mt-32 w-full overflow-hidden relative py-4">
        <p className="text-center font-mono text-[9px] uppercase tracking-[0.4em] text-muted-foreground/50 mb-8">
          // EXPERTLY USING INDUSTRY STANDARDS
        </p>

        {/* Efek gradasi pudar kiri kanan transparan */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-transparent via-transparent to-transparent z-10 pointer-events-none" />

        {/* Track Marquee*/}
        <div className="flex w-max gap-16 animate-marquee whitespace-nowrap loop-track">
          <div className="flex gap-16 items-center justify-around shrink-0">
            {tools.map((t, idx) => (
              <div
                key={`t1-${idx}`}
                className="flex items-center gap-3 opacity-30 hover:opacity-80 transition-opacity duration-300 group"
              >
                <t.icon
                  size={18}
                  className="text-muted-foreground group-hover:text-orange-400 transition-colors"
                />
                <span className="font-mono text-xs tracking-widest text-muted-foreground font-medium">
                  {t.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-16 items-center justify-around shrink-0" aria-hidden="true">
            {tools.map((t, idx) => (
              <div
                key={`t2-${idx}`}
                className="flex items-center gap-3 opacity-30 hover:opacity-80 transition-opacity duration-300 group"
              >
                <t.icon
                  size={18}
                  className="text-muted-foreground group-hover:text-orange-400 transition-colors"
                />
                <span className="font-mono text-xs tracking-widest text-muted-foreground font-medium">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeRun {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marqueeRun 25s linear infinite;
        }
        .loop-track {
          will-change: transform;
        }
      `}</style>
    </section>
  );
}
