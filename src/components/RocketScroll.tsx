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

      if (currentScrollY > lastScrollY.current) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setDirection("up");
      }

      lastScrollY.current = currentScrollY;

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
        "pointer-events-none z-10 transition-all duration-500 ease-in-out will-change-transform", // <- KELAS z-40 DI SINI SUDAH DIGANTI JADI z-10
        "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block",
        "sm:absolute sm:top-[120vh] sm:opacity-20 md:fixed md:top-1/2 md:opacity-100",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-[20px] h-[24px] flex items-center justify-center transition-transform duration-500 ease-in-out",
          direction === "down" ? "rotate-180" : "rotate-0",
        ].join(" ")}
      >
        {/* ==========================================
            SISTEM BADAI PARTIKEL ABSTRAK (DENSE ATOMS)
            Setiap komponen dideklarasikan manual demi keacakan tingkat tinggi
            ========================================== */}
        {isScrolling && (
          <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen z-20">
            {/* --- KLUSTER 1: INTI KEPALA (Runcing Tengah) --- */}
            <div
              className="absolute top-0 left-[9px] w-[2px] h-[3px] bg-white blur-[0.2px] animate-burn-fast"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-[2px] left-[8px] w-[4px] h-[4px] bg-orange-400 blur-[0.4px] animate-burn-fast"
              style={{ animationDelay: "0.03s" }}
            />
            <div
              className="absolute top-[1px] left-[10px] w-[3px] h-[5px] bg-amber-400 blur-[0.3px] animate-burn-medium"
              style={{ animationDelay: "0.06s" }}
            />
            <div
              className="absolute top-0 left-[10px] w-[2px] h-[4px] bg-red-500/80 animate-burn-slow"
              style={{ animationDelay: "0.02s" }}
            />

            {/* --- KLUSTER 2: LAMBUNG KIRI (Menempel Alur Sayap) --- */}
            <div
              className="absolute top-[4px] left-[7px] w-[2.5px] h-[5px] bg-orange-400 animate-flow-left-slow"
              style={{ animationDelay: "0.01s" }}
            />
            <div
              className="absolute top-[6px] left-[6px] w-[3px] h-[4px] bg-amber-500 blur-[0.2px] animate-flow-left-fast"
              style={{ animationDelay: "0.04s" }}
            />
            <div
              className="absolute top-[8px] left-[5px] w-[2px] h-[6px] bg-red-400 animate-flow-left-medium"
              style={{ animationDelay: "0.07s" }}
            />
            <div
              className="absolute top-[10px] left-[4px] w-[3.5px] h-[4px] bg-orange-500 blur-[0.3px] animate-flow-left-fast"
              style={{ animationDelay: "0.02s" }}
            />
            <div
              className="absolute top-[12px] left-[3px] w-[2px] h-[5px] bg-amber-300 animate-flow-left-slow"
              style={{ animationDelay: "0.09s" }}
            />
            <div
              className="absolute top-[14px] left-[2px] w-[4px] h-[3px] bg-red-600/60 animate-flow-left-medium"
              style={{ animationDelay: "0.05s" }}
            />
            <div
              className="absolute top-[16px] left-[1px] w-[3px] h-[6px] bg-orange-400 animate-flow-left-fast"
              style={{ animationDelay: "0.12s" }}
            />

            {/* --- KLUSTER 3: LAMBUNG KANAN (Menempel Alur Sayap - Sisi yang Kurang Rapi) --- */}
            {/* Kita buat super padat dan asimetris agar efek kotaknya pecah total */}
            <div
              className="absolute top-[4px] left-[11px] w-[2.5px] h-[4px] bg-orange-400 animate-flow-right-slow"
              style={{ animationDelay: "0.02s" }}
            />
            <div
              className="absolute top-[6px] left-[12px] w-[3px] h-[5px] bg-amber-400 blur-[0.2px] animate-flow-right-fast"
              style={{ animationDelay: "0.05s" }}
            />
            <div
              className="absolute top-[7px] left-[13px] w-[2px] h-[4px] bg-white blur-[0.1px] animate-flow-right-medium"
              style={{ animationDelay: "0.01s" }}
            />
            <div
              className="absolute top-[9px] left-[13px] w-[3.5px] h-[6px] bg-orange-500 animate-flow-right-slow"
              style={{ animationDelay: "0.08s" }}
            />
            <div
              className="absolute top-[11px] left-[14px] w-[2px] h-[4px] bg-red-500 blur-[0.3px] animate-flow-right-fast"
              style={{ animationDelay: "0.03s" }}
            />
            <div
              className="absolute top-[13px] left-[15px] w-[4px] h-[5px] bg-amber-500 animate-flow-right-medium"
              style={{ animationDelay: "0.11s" }}
            />
            <div
              className="absolute top-[15px] left-[16px] w-[2.5px] h-[4px] bg-orange-400 animate-flow-right-slow"
              style={{ animationDelay: "0.06s" }}
            />
            <div
              className="absolute top-[17px] left-[17px] w-[3px] h-[6px] bg-red-600/70 animate-flow-right-fast"
              style={{ animationDelay: "0.14s" }}
            />

            {/* --- KLUSTER 4: CORE combustion (Mengisi Bagian Tengah Dalam Bodi) --- */}
            <div
              className="absolute top-[5px] left-[9px] w-[3px] h-[6px] bg-orange-500/80 blur-[0.5px] animate-burn-medium"
              style={{ animationDelay: "0.0s" }}
            />
            <div
              className="absolute top-[9px] left-[8px] w-[4px] h-[7px] bg-amber-500/60 blur-[0.6px] animate-burn-slow"
              style={{ animationDelay: "0.04s" }}
            />
            <div
              className="absolute top-[12px] left-[10px] w-[3px] h-[5px] bg-red-500/50 blur-[0.4px] animate-burn-fast"
              style={{ animationDelay: "0.08s" }}
            />
          </div>
        )}

        {/* Ikon Rocket SVG Premium */}
        <svg
          width="20"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={[
            "transition-colors duration-300 z-10",
            isScrolling ? "text-orange-100" : "text-white/70",
          ].join(" ")}
          style={{
            filter: isScrolling
              ? "drop-shadow(0 0 5px rgba(245, 90, 10, 0.7)) drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))"
              : "drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))",
          }}
        >
          <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 4.5h4c0-1 1.5-3 2.5-4.5" />
          <path d="M12 2C9 5 8 11 8 16h8c0-5-1-11-4-14z" />
          <path d="M19.5 16.5c1.5 1.25 2.5 3.5 2.5 4.5h-4c0-1-1.5-3-2.5-4.5" />
        </svg>
      </div>

      {/* SCRIPT TIMING KENDALI FISIKA PLASMA (KONTROL PENUH) */}
      <style>{`
        /* --- Animasi Tengah (Mengalir Lurus ke Ekor) --- */
        @keyframes burnFast {
          0% { transform: translateY(0) scaleX(1) scaleY(1.3); opacity: 1; }
          100% { transform: translateY(26px) scale(0.1); opacity: 0; }
        }
        @keyframes burnMedium {
          0% { transform: translateY(0) scale(1.1); opacity: 1; }
          100% { transform: translateY(24px) scale(0.15); opacity: 0; }
        }
        @keyframes burnSlow {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          100% { transform: translateY(22px) scale(0.2); opacity: 0; }
        }

        /* --- Animasi Lambung Kiri (Mengalir Miring Keluar Mengikuti Sayap) --- */
        @keyframes flowLeftFast {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(18px) translateX(-5px) rotate(-120deg) scale(0.1); opacity: 0; }
        }
        @keyframes flowLeftMedium {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(16px) translateX(-3px) rotate(-60deg) scale(0.2); opacity: 0; }
        }
        @keyframes flowLeftSlow {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(14px) translateX(-2px) rotate(-30deg) scale(0.25); opacity: 0; }
        }

        /* --- Animasi Lambung Kanan (Solusi Sisi Kanan Agar Tidak Kotak) --- */
        /* Partikel dipaksa membelok diagonal ke luar (translateX positif) dan berputar tajam */
        @keyframes flowRightFast {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; filter: brightness(1.5); }
          100% { transform: translateY(18px) translateX(6px) rotate(140deg) scale(0.1); opacity: 0; }
        }
        @keyframes flowRightMedium {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(15px) translateX(4px) rotate(80deg) scale(0.15); opacity: 0; }
        }
        @keyframes flowRightSlow {
          0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(13px) translateX(2.5px) rotate(45deg) scale(0.2); opacity: 0; }
        }

        /* Helper Class Utilities untuk mapping animasi */
        .animate-burn-fast { animation: burnFast 0.14s linear infinite; }
        .animate-burn-medium { animation: burnMedium 0.18s linear infinite; }
        .animate-burn-slow { animation: burnSlow 0.22s linear infinite; }
        
        .animate-flow-left-fast { animation: flowLeftFast 0.15s linear infinite; }
        .animate-flow-left-medium { animation: flowLeftMedium 0.2s linear infinite; }
        .animate-flow-left-slow { animation: flowLeftSlow 0.25s linear infinite; }

        .animate-flow-right-fast { animation: flowRightFast 0.14s linear infinite; }
        .animate-flow-right-medium { animation: flowRightMedium 0.19s linear infinite; }
        .animate-flow-right-slow { animation: flowRightSlow 0.24s linear infinite; }
      `}</style>
    </div>
  );
}
