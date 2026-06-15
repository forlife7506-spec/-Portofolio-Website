export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-6 pt-32 text-center"
    >
      {/* Capsule Indicator: Menjaga kesan eksklusif kontrak kerja 2026 */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Available for select engagements · 2026
      </div>

      {/* Main Headline: Komposisi tipografi mewah bawaanmu */}
      <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
        <span className="text-shimmer">Interfaces that</span>
        <br />
        <span className="italic font-light text-foreground/90">feel inevitable.</span>
      </h1>

      {/* Paragraph: Narasi Premium yang Membingkai Mental Otodidakmu Menjadi Mahal */}
      <p className="mt-8 max-w-2xl text-balance text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-mono">
        Muhammad Maulana Malik Ibrahim — An autonomous frontend engineer pioneering high-fidelity
        digital spaces. Driven by self-directed engineering, obsessed with strict architecture,
        cinematic motion, and uncompromising pixel execution.
      </p>

      {/* Call To Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#work"
          className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          View selected work
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
            ↓
          </span>
        </a>
        <a
          href="#contact"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
        >
          Start a project
        </a>
      </div>
    </section>
  );
}
