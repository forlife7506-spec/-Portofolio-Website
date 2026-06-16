import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  r: number;
  tw: number;
  speed: number;
  color: string;
};
type Comet = { x: number; y: number; vx: number; vy: number; life: number; max: number };

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    let nebulaTime = 0;

    const starColors = [
      "rgba(255, 255, 255, ", // Putih murni
      "rgba(235, 245, 255, ", // Berlian biru muda
      "rgba(255, 240, 225, ", // Warm ivory
      "rgba(255, 225, 200, ", // Soft amber
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(350, Math.floor((w * h) / 3500));

      stars = Array.from({ length: count }, () => {
        const x = Math.random() * w;
        const y = Math.random() * h;

        const isBackground = Math.random() < 0.4;
        const radius = isBackground ? Math.random() * 0.5 + 0.1 : Math.random() * 1.2 + 0.4;

        return {
          x,
          y,
          baseX: x,
          baseY: y,
          r: radius,
          tw: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        };
      });
    };

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.5;
      const y = Math.random() * h * 0.4;
      const x = fromLeft ? -50 : w + 50;
      const angle = fromLeft ? Math.PI / 7 : Math.PI - Math.PI / 7;

      const speed = 3 + Math.random() * 8;

      comets.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        max: 140,
      });
    };

    let lastComet = 0;

    const tick = (t: number) => {
      ctx.fillStyle = "#07070a";
      ctx.fillRect(0, 0, w, h);

      nebulaTime += 0.0015;
      const nX1 = w * 0.5 + Math.cos(nebulaTime) * 30;
      const nY1 = h * 0.5 + Math.sin(nebulaTime) * 20;
      const neb1 = ctx.createRadialGradient(nX1, nY1, 10, nX1, nY1, Math.max(w, h) * 0.7);
      neb1.addColorStop(0, "rgba(24, 28, 56, 0.75)");
      neb1.addColorStop(0.5, "rgba(15, 18, 36, 0.3)");
      neb1.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, w, h);

      const nX2 = w * 0.4 + Math.sin(nebulaTime * 0.7) * 40;
      const nY2 = h * 0.6 + Math.cos(nebulaTime * 0.7) * 30;
      const neb2 = ctx.createRadialGradient(nX2, nY2, 0, nX2, nY2, Math.max(w, h) * 0.45);
      neb2.addColorStop(0, "rgba(79, 70, 115, 0.35)");
      neb2.addColorStop(0.5, "rgba(40, 35, 60, 0.1)");
      neb2.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, w, h);

      const nX3 = w * 0.55 + Math.cos(nebulaTime * 0.5) * 20;
      const nY3 = h * 0.45 + Math.sin(nebulaTime * 0.5) * 20;
      const neb3 = ctx.createRadialGradient(nX3, nY3, 5, nX3, nY3, Math.max(w, h) * 0.3);
      neb3.addColorStop(0, "rgba(180, 140, 105, 0.25)");
      neb3.addColorStop(0.6, "rgba(90, 70, 55, 0.05)");
      neb3.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = neb3;
      ctx.fillRect(0, 0, w, h);

      const vig = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.8);
      vig.addColorStop(0, "rgba(0, 0, 0, 0)");
      vig.addColorStop(0.7, "rgba(5, 5, 8, 0.4)");
      vig.addColorStop(1, "rgba(2, 2, 4, 0.95)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        s.tw += s.speed;

        const driftX = Math.sin(s.tw) * 2;
        const driftY = Math.cos(s.tw) * 2;

        const px = s.baseX + driftX;
        const py = s.baseY + driftY;

        const twinkle = 0.3 + Math.sin(s.tw) * 0.6;

        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${twinkle})`;
        ctx.fill();
      }

      if (t - lastComet > 2000 + Math.random() * 5000) {
        const spawnCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < spawnCount; i++) {
          spawnComet();
        }
        lastComet = t;
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.x += c.vx;
        c.y += c.vy;
        c.life++;

        const tailLen = 120;
        const tx = c.x - c.vx * (tailLen / 10);
        const ty = c.y - c.vy * (tailLen / 10);

        const grad = ctx.createLinearGradient(tx, ty, c.x, c.y);
        grad.addColorStop(0, "rgba(255,255,255,0)");
        grad.addColorStop(1, "rgba(210, 225, 245, 0.25)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();

        if (c.life > c.max || c.x < -100 || c.x > w + 100 || c.y > h + 100) {
          comets.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    resize();

    if (reduced) {
      ctx.fillStyle = "#07070a";
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        ctx.fillStyle = `${s.color}0.5)`;
        ctx.beginPath();
        ctx.arc(s.baseX, s.baseY, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
