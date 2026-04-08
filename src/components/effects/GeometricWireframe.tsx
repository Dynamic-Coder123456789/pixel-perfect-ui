import { useRef, useEffect, useCallback } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  label: number;
  labelTimer: number;
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
  pointCount = 20,
  color = "rgba(255, 255, 255, 0.55)",
  glowColor = "rgba(255, 255, 255, 0.08)",
}: GeometricWireframeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pointsRef = useRef<Point[]>([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const timeRef = useRef(0);

  const initPoints = useCallback(
    (cx: number, cy: number) => {
      const pts: Point[] = [];
      for (let i = 0; i < pointCount; i++) {
        const angle = (Math.PI * 2 * i) / pointCount + (Math.random() - 0.5) * 0.8;
        const r = circleRadius * (0.2 + Math.random() * 0.7);
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        pts.push({
          x, y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          baseX: x, baseY: y,
          label: Math.floor(Math.random() * 90 + 10),
          labelTimer: Math.random() * 60,
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
      if (pointsRef.current.length === 0) {
        initPoints(rect.width / 2, rect.height / 2);
      }
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
      timeRef.current++;

      ctx.clearRect(0, 0, w, h);

      const pts = pointsRef.current;
      const t = timeRef.current;

      for (const p of pts) {
        // Organic drift
        p.vx += Math.sin(t * 0.02 + p.baseX * 0.01) * 0.03;
        p.vy += Math.cos(t * 0.02 + p.baseY * 0.01) * 0.03;

        // Mouse attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 1 && dist < circleRadius * 2) {
          const force = 0.15 / (1 + dist * 0.01);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Spring to base
        p.vx += (p.baseX - p.x) * 0.003;
        p.vy += (p.baseY - p.y) * 0.003;

        // Damping
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;

        // Clamp to circle
        const toCx = p.x - cx;
        const toCy = p.y - cy;
        const d = Math.sqrt(toCx * toCx + toCy * toCy);
        if (d > circleRadius) {
          p.x = cx + (toCx / d) * circleRadius;
          p.y = cy + (toCy / d) * circleRadius;
          p.vx *= -0.3;
          p.vy *= -0.3;
        }

        // Cycle labels
        p.labelTimer--;
        if (p.labelTimer <= 0) {
          p.label = Math.floor(Math.random() * 90 + 10);
          p.labelTimer = 30 + Math.random() * 90;
        }
      }

      // Draw connections - constantly shifting based on proximity
      ctx.lineWidth = 0.7;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = circleRadius * 0.85;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.5;
            ctx.strokeStyle = color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();

            // Midpoint measurement tick marks
            if (dist < maxDist * 0.6 && (i + j) % 4 === 0) {
              const mx = (pts[i].x + pts[j].x) / 2;
              const my = (pts[i].y + pts[j].y) / 2;
              const angle = Math.atan2(dy, dx) + Math.PI / 2;
              const tickLen = 4;
              ctx.globalAlpha = alpha * 0.8;
              ctx.beginPath();
              ctx.moveTo(mx - Math.cos(angle) * tickLen, my - Math.sin(angle) * tickLen);
              ctx.lineTo(mx + Math.cos(angle) * tickLen, my + Math.sin(angle) * tickLen);
              ctx.stroke();
            }
          }
        }
      }

      // Draw points and labels
      ctx.globalAlpha = 1;
      for (const p of pts) {
        // Dot
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = "9px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.globalAlpha = 0.7;
        ctx.fillText(String(p.label), p.x + 7, p.y - 7);
      }

      // Glow
      ctx.globalAlpha = 1;
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, circleRadius * 1.2);
      grd.addColorStop(0, glowColor);
      grd.addColorStop(0.5, "rgba(255, 255, 255, 0.03)");
      grd.addColorStop(1, "rgba(255, 255, 255, 0)");
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
