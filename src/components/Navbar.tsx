import { useState, useEffect } from "react";
import { Moon, Sun, Orbit, Sparkles } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [dark, setDark] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi Logika Ganti Tema (Light / Dark Mode)
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  // Fungsi Smooth Scroll ke Paling Atas (0,0)
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>
      <header className="fixed left-1/2 top-5 z-50 -translate-x-1/2 px-4 transition-all duration-300">
        <nav
          aria-label="Primary"
          className={`glass-capsule flex items-center justify-between gap-1 rounded-full px-2 py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out ${
            isOpen ? "w-[92vw] sm:w-auto" : "w-[240px] sm:w-auto"
          }`}
        >
          {/* Logo / Tombol Bintang Scroll To Top */}
          <a
            href="#top"
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 text-foreground hover:bg-white/5 transition-colors group"
          >
            <Sparkles
              size={16}
              className="text-white animate-pulse group-hover:rotate-45 transition-transform duration-300"
            />
            <span className="text-sm font-semibold tracking-tight selection:bg-transparent">
              Nova
            </span>
          </a>

          {/* Menu Navigasi: Otomatis muncul berjejer saat memanjang di mobile */}
          <ul
            className={`items-center gap-1 sm:flex transition-all duration-300 ${
              isOpen ? "flex opacity-100 scale-100" : "hidden sm:flex opacity-0 sm:opacity-100"
            }`}
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-3 py-1.5 text-xs sm:text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground block"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Sisi Kanan: Kontrol Tema & Icon Orbit Pengganti Hamburger */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:bg-white/10 hover:rotate-12"
            >
              {dark ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            {/* Icon Orbit Pemanjang Navbar (Hanya muncul di Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className={`grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-foreground transition-all hover:bg-white/10 sm:hidden ${
                isOpen ? "rotate-180 text-white border-white/30" : ""
              }`}
            >
              <Orbit size={16} />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
