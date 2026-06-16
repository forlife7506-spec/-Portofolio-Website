import React from "react";

export function Hero() {
  // Fungsi Pendeteksi Smooth Scroll Mikro dengan Deselerasi Organik
  const handleScrollToSection = (e: React.MouseEvent<HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);

    if (element) {
      // Offset 90px agar pas meluncur, judul section berikutnya tidak tertutup tinggi Navbar Kapsul kamu
      const offsetPosition = element.offsetTop - 90;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Memicu animasi interpolasi bawaan browser
      });
    }
  };

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

      {/* Main Headline: Komposisi tipografi */}
      <h1 className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl">
        <span className="text-shimmer">Interfaces that</span>
        <br />
        <span className="italic font-light text-foreground/90">feel inevitable.</span>
      </h1>

      {/* Paragraph: Narasi */}
      <p className="mt-8 max-w-2xl text-balance text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-mono">
        Muhammad Maulana Malik Ibrahim — An autonomous frontend engineer pioneering high-fidelity
        digital spaces. Driven by self-directed engineering, obsessed with strict architecture,
        cinematic motion, and uncompromising pixel execution.
      </p>

      {/* Call To Actions*/}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {/* Tombol 1 */}
        <button
          type="button"
          onClick={(e) => handleScrollToSection(e, "work")}
          aria-label="Scroll smoothly to look at Muhammad Maulana's selected design and code work"
          className="group relative overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-md transition-all duration-300 ease-out hover:scale-[1.04] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          View selected work
          <span className="ml-2 inline-block transition-transform duration-300 ease-out group-hover:translate-y-1">
            ↓
          </span>
        </button>

        {/* Tombol 2 */}
        <button
          type="button"
          onClick={(e) => handleScrollToSection(e, "contact")}
          aria-label="Scroll smoothly down to contact section to start a new digital project together"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all duration-300 ease-out hover:bg-white/10 hover:scale-[1.04] active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black"
        >
          Start a project
        </button>
      </div>
    </section>
  );
}
