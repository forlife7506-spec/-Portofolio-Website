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
    </section>
  );
}
