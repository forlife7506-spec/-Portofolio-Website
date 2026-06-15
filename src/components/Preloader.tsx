import { useState, useEffect } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Animasi angka counter 0 - 100 dengan speed dinamis agar terasa natural
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Beri jeda sedikit setelah 100% agar user sempat melihat, lalu mulai fade out
          setTimeout(() => setFadeOut(true), 400);
          // Picu fungsi onComplete untuk membuka halaman utama setelah animasi selesai
          setTimeout(() => onComplete(), 1000);
          return 1000; // Dikunci di batas atas
        }
        // Naik acak antara 2 sampai 7 persen setiap tick-nya
        const increment = Math.floor(Math.random() * 6) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 45); // Kecepatan interval loading

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-all duration-700 ease-in-out ${
        fadeOut ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      {/* Container Konten Tengah */}
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Teks Shimmer Aesthetic (Memanfaatkan utility CSS kamu yang sudah ada) */}
        <h1 className="text-shimmer font-display text-4xl font-bold tracking-[0.2em] sm:text-5xl uppercase">
          Nova
        </h1>
        {/* Progress Bar Minimalis */}
        <div className="relative h-[1px] w-40 overflow-hidden bg-white/10 rounded-full sm:w-48">
          <div
            className="h-full bg-white shadow-[0_0_8px_1px_rgba(255,255,255,0.6)] transition-all duration-100 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Persentase Angka */}
        <span className="font-sans text-xs tracking-widest text-muted-foreground/80 font-medium selection:bg-transparent">
          {Math.min(progress, 100)}%
        </span>
      </div>

      {/* Teks Kaki Kecil */}
      <div className="absolute bottom-8 font-sans text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase selection:bg-transparent">
        Initializing System
      </div>
    </div>
  );
}
