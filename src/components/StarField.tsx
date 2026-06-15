import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; r: number; tw: number };
type Comet = { x: number; y: number; vx: number; vy: number; life: number; max: number };

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
      h = 0;
    let stars: Star[] = [];
    const comets: Comet[] = [];
    let raf = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Jumlah partikel dikunci maksimal 200 agar laptop tetap dingin
      const count = Math.min(200, Math.floor((w * h) / 9500));
      stars = Array.from({ length: count }, () => {
        // OPTIMASI BIMA SAKTI: Mengarahkan koordinat bintang agar 65% mengelompok diagonal tengah
        const isMilkyWay = Math.random() < 0.65;
        let x = Math.random() * w;
        let y = Math.random() * h;

        if (isMilkyWay) {
          // Membuat garis imajiner sabuk galaksi dari pojok kiri bawah ke kanan atas
          const factor = Math.random();
          x = factor * w + (Math.random() - 0.5) * (w * 0.25);
          y = (1 - factor) * h + (Math.random() - 0.5) * (h * 0.25);
        }

        return {
          x,
          y,
          z: Math.random() * 0.8 + 0.2,
          r: Math.random() * 1.4 + 0.2, // sedikit variasi ukuran bintang fajar
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.5;
      const y = Math.random() * h * 0.6;
      const x = fromLeft ? -50 : w + 50;
      const angle = fromLeft
        ? Math.PI / 6 + Math.random() * 0.2
        : Math.PI - Math.PI / 6 - Math.random() * 0.2;
      const speed = 9 + Math.random() * 6;
      comets.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 90 + Math.random() * 60,
      });
    };

    let lastComet = 0;
    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // 1. OPTIMASI NEBULA LAYER 1 (Deep Cosmic Purple - Statis Ringan)
      const nebula1 = ctx.createRadialGradient(
        w * 0.3,
        h * 0.4,
        0,
        w * 0.3,
        h * 0.4,
        Math.max(w, h) * 0.5,
      );
      nebula1.addColorStop(0, "rgba(76, 29, 149, 0.08)"); // Ungu transparan tipis
      nebula1.addColorStop(0.6, "rgba(15, 23, 42, 0.0)");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      // 2. OPTIMASI NEBULA LAYER 2 (Cosmic Blue/Cyan - Mengikuti Pusat Bima Sakti)
      const nebula2 = ctx.createRadialGradient(
        w * 0.7,
        h * 0.6,
        0,
        w * 0.7,
        h * 0.6,
        Math.max(w, h) * 0.4,
      );
      nebula2.addColorStop(0, "rgba(6, 182, 212, 0.05)"); // Cyan plasma tipis
      nebula2.addColorStop(0.5, "rgba(0, 0, 0, 0.0)");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      // 3. VIGNETTE bawaan asli agar pinggiran tetap sinematik gelap
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.2);
      g.addColorStop(0, "rgba(10,10,15,0.1)");
      g.addColorStop(1, "rgba(10,10,10,0.85)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Urusan Rendering Bintang & Mouse Interaction (Dipertahankan karena sudah sangat optimal)
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active;
      for (const s of stars) {
        s.tw += 0.015; // Kecepatan kelap-kelip diperhalus sedikit
        let px = s.x,
          py = s.y;
        if (active) {
          const dx = s.x - mx;
          const dy = s.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22500) {
            const f = (1 - d2 / 22500) * 12 * s.z;
            px += (dx / Math.sqrt(d2 + 0.001)) * f;
            py += (dy / Math.sqrt(d2 + 0.001)) * f;
          }
        }
        const a = 0.4 + Math.sin(s.tw) * 0.5;
        ctx.globalAlpha = a * s.z;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
        s.x += 0.015 * s.z; // Pergeseran drift lambat bima sakti
        if (s.x > w + 5) s.x = -5;
      }
      ctx.globalAlpha = 1;

      // Animasi Komet bawaan asli
      if (t - lastComet > 4500 + Math.random() * 5000) {
        spawnComet();
        lastComet = t;
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life++;
        const tailLen = 180;
        const tx = c.x - c.vx * (tailLen / 10);
        const ty = c.y - c.vy * (tailLen / 10);
        const grad = ctx.createLinearGradient(tx, ty, c.x, c.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(0.7, "rgba(186,230,255,0.4)");
        grad.addColorStop(1, "rgba(255,255,255,1)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath();
        ctx.arc(c.x, c.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (c.life > c.max || c.x < -100 || c.x > w + 100 || c.y > h + 100) {
          comets.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    if (reduced) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = 0.7 * s.z;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ width: "100vw", height: "100vh", zIndex: 0 }}
      aria-hidden
    />
  );
}
