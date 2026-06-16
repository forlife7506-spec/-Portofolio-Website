import { useState, useEffect } from "react";
import { Moon, Sun, Orbit, Sparkles } from "lucide-react";

// Urutan Link Baru: About -> Work -> Process -> Contact
const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [dark, setDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Sinkronisasi Deteksi Kelas Root HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [dark]);

  // Fungsi Gulir Halus ke Bagian Paling Atas Layar
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      // Mengalkulasi offset top
      const offsetPosition = element.offsetTop - 90;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Memicu animasi interpolasi linear bawaan browser
      });
    }
  };

  return (
    <>
      <a href="#about" className="skip-link">
        Skip to content
      </a>

      <header className="fixed left-1/2 top-5 z-50 -translate-x-1/2 px-4 transition-all duration-300">
        <nav
          aria-label="Primary"
          className={[
            "flex items-center justify-between gap-1 rounded-full px-2 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out",
            // Glassmorphism Adaptif: Menyesuaikan skema warna gelap & terang premium
            "border border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/40",
            isOpen ? "w-[92vw] sm:w-auto" : "w-[240px] sm:w-auto",
          ].join(" ")}
        >
          {/* Logo / Tombol Bintang Scroll To Top */}
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-slate-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
          >
            <Sparkles
              size={16}
              className="text-amber-500 dark:text-white animate-pulse group-hover:rotate-45 transition-transform duration-300"
            />
            <span className="text-sm font-semibold tracking-tight selection:bg-transparent">
              Nova
            </span>
          </a>

          {/* Menu Navigasi*/}
          <ul
            className={[
              "items-center gap-1 sm:flex transition-all duration-300",
              isOpen ? "flex opacity-100 scale-100" : "hidden sm:flex opacity-0 sm:opacity-100",
            ].join(" ")}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleScrollToSection(e, l.href)}
                  className={[
                    "rounded-full px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-300 block",
                    "text-slate-600 hover:bg-black/5 hover:text-slate-900",
                    "dark:text-muted-foreground dark:hover:bg-white/5 dark:hover:text-white",
                  ].join(" ")}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Sisi Kanan: Kontrol Tema & Icon Orbit Hamburger */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className={[
                "grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 outline-none",
                "border-black/10 bg-black/5 text-slate-800 hover:bg-black/10 hover:rotate-12",
                "dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
              ].join(" ")}
            >
              {dark ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Icon Orbit Pemanjang Navbar (Mobile Only) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={[
                "grid h-9 w-9 place-items-center rounded-full border transition-all sm:hidden outline-none",
                "border-black/10 bg-black/5 text-slate-800 hover:bg-black/10",
                "dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
                isOpen ? "rotate-180 border-slate-400 dark:border-white/30" : "",
              ].join(" ")}
            >
              <Orbit size={16} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
