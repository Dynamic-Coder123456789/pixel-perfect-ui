import { useRef, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

interface GeometricWireframeProps {
  className?: string;
  circleRadius?: number;
  pointCount?: number;
  color?: string;
  glowColor?: string;
}

const GeometricWireframe = ({
  className = "",
  circleRadius = 200,
  pointCount = 18,
  color = "rgba(255, 255, 255, 0.6)",
  glowColor = "rgba(255, 255, 255, 0.15)",
}: GeometricWireframeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initPoints = useCallback(
    (cx: number, cy: number) => {
      const pts: Point[] = [];
      for (let i = 0; i < pointCount; i++) {
        const angle = (Math.PI * 2 * i) / pointCount + (Math.random() - 0.5) * 0.5;
        const r = circleRadius * (0.3 + Math.random() * 0.65);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        pts.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
        });
      }
      pointsRef.current = pts;
    },
    [pointCount, circleRadius]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };
      initPoints(rect.width / 2, rect.height / 2);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      const { w, h } = sizeRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      const pts = pointsRef.current;

      // Update points - attracted toward mouse within circle
      for (const p of pts) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Mouse attraction
        if (dist > 1) {
          p.vx += (dx / dist) * 0.08;
          p.vy += (dy / dist) * 0.08;
        }

        // Spring back to base
        p.vx += (p.baseX - p.x) * 0.005;
        p.vy += (p.baseY - p.y) * 0.005;

        // Damping
        p.vx *= 0.95;
        p.vy *= 0.95;

        p.x += p.vx;
        p.y += p.vy;

        // Clamp to circle
        const toCx = p.x - cx;
        const toCy = p.y - cy;
        const d = Math.sqrt(toCx * toCx + toCy * toCy);
        if (d > circleRadius) {
          p.x = cx + (toCx / d) * circleRadius;
          p.y = cy + (toCy / d) * circleRadius;
          p.vx *= -0.5;
          p.vy *= -0.5;
        }
      }

      // Draw connections (Delaunay-like triangulation via proximity)
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = circleRadius * 0.9;
          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            ctx.globalAlpha = alpha * 0.5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw points with labels
      ctx.globalAlpha = 1;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Point dot
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Small label number
        if (i % 3 === 0) {
          ctx.font = "10px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.fillText(String(Math.floor(10 + i * 3.7)), p.x + 6, p.y - 6);
        }
      }

      // Center glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, circleRadius * 1.2);
      grd.addColorStop(0, glowColor);
      grd.addColorStop(0.5, "rgba(255, 255, 255, 0.05)");
      grd.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [initPoints, circleRadius, color, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
};

export default GeometricWireframe;
