import { useState, useEffect, useRef } from "react";

export function RocketScroll() {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolling(true);

      // Deteksi arah scroll berdasarkan selisih posisi Y
      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }

      lastScrollY.current = currentScrollY;

      // Hentikan efek semburan api/trail jika user berhenti scroll selama 150ms
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      className={[
        "pointer-events-none z-40 transition-all duration-500 ease-in-out will-change-transform",
        // Aturan Responsifitas:
        // Desktop (>md) & Mobile Sangat Kecil (<sm): Fixed tepat di tengah layar.
        // Layar Sedang/Tablet (sm ke md): Diubah ke absolute tersembunyi/lokal agar tidak menumpuk grid.
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block",
        "sm:absolute sm:top-[120vh] sm:opacity-20 md:fixed md:top-1/2 md:opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex flex-col items-center transition-transform duration-500 ease-in-out",
          direction === "down" ? "rotate-180" : "rotate-0", // Kepala berputar ke bawah saat scroll down
        ].join(" ")}
      >
        {/* Efek Semburan Api / Trail Ekor Roket Kustom (Aesthetic & Ringan) */}
        <div
          className={[
            "absolute w-[2px] rounded-full bg-gradient-to-t from-transparent to-white/40 blur-[1px] transition-all duration-300",
            direction === "down" ? "bottom-full mb-2" : "top-full mt-2",
            isScrolling ? "h-14 opacity-100" : "h-0 opacity-0", // Memanjang hanya saat berjalan
          ].join(" ")}
        />

        {/* Struktur Ikon Roket SVG Premium Minimalis */}
        <svg
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/60 shadow-sm drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
        >
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 4.5h4c0-1 1.5-3 2.5-4.5" />
          <path d="M12 2C9 5 8 11 8 16h8c0-5-1-11-4-14z" />
          <path d="M19.5 16.5c1.5 1.25 2.5 3.5 2.5 4.5h-4c0-1-1.5-3-2.5-4.5" />
        </svg>
      </div>
    </div>
  );
}
