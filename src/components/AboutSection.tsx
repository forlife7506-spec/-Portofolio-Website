import { Code2, Cpu, Layout, Blocks, Terminal } from "lucide-react";

// Data Tech Stack dengan Icon Lucide bawaan agar ringan & aesthetic
const techStack = [
  { name: "React / Next.js", icon: <Blocks size={16} /> },
  { name: "TypeScript", icon: <Terminal size={16} /> },
  { name: "Tailwind CSS", icon: <Layout size={16} /> },
  { name: "Vite / Bun", icon: <Cpu size={16} /> },
  { name: "TanStack Router", icon: <Code2 size={16} /> },
];

export function AboutSection() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32">
      {/* Grid Utama: 1 Kolom di Mobile, 2 Kolom Sejajar di Desktop (md) */}
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
        {}
        <div className="flex justify-center md:col-span-5">
          <div className="group relative h-80 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] sm:h-96 sm:w-72">
            {}
            <img
              src="/Profil-malik.jpg"
              alt="Muhammad Maulana Malik Ibrahim"
              loading="lazy"
              className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 group-hover:grayscale-0"
            />

            {/* Efek Bingkai Ambient Glow di dalam foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 rounded-3xl border border-white/5 tracking-tighter shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
          </div>
        </div>

        {/* SISI KANAN: Teks Perkenalan & Tech Stack */}
        <div className="space-y-6 text-center sm:text-left md:col-span-7">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              / Biography
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl text-foreground">
              Driven by autonomy. Forged in{" "}
              <span className="text-shimmer font-medium">production-grade code.</span>
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            I don't rely on traditional academic frameworks to define what I can build. As a fully{" "}
            <span className="text-foreground font-medium">Self-Directed Frontend Engineer</span>, my
            technical foundation was constructed outside the conventional classroom—forged through
            open-source documentation, relentless trial-and-error, and an uncompromising deep dive
            into the modern web ecosystem.
          </p>

          <p className="text-xs leading-relaxed text-muted-foreground/80 sm:text-sm">
            My non-traditional background is my absolute leverage. It proves I possess the rare
            autonomy to research, adapt, and deploy complex architectures independently. I translate
            raw business requirements into fluid, high-fidelity digital interfaces that are fast,
            modular, and optimized globally.
          </p>

          {/* Bagian Tech Stack Mandiri */}
          <div className="pt-4 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 block text-center sm:text-left">
              Current Core Stack:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-3.5 py-1.5 text-xs text-muted-foreground transition-all duration-300 hover:border-white/15 hover:bg-white/5 hover:text-foreground select-none"
                >
                  <span className="text-white/50">{tech.icon}</span>
                  <span className="font-medium tracking-tight">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
