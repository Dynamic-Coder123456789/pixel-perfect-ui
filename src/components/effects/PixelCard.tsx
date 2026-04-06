import { useRef, useEffect, useCallback, type ReactNode } from "react";

interface PixelCardProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  gap?: number;
  speed?: number;
}

const PixelCard = ({
  children,
  className = "",
  colors = ["#3b82f6", "#06b6d4", "#8b5cf6"],
  gap = 6,
  speed = 30,
}: PixelCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isHovered = useRef(false);
  const pixelsRef = useRef<Array<{ x: number; y: number; color: string; alpha: number; target: number }>>([]);

  const initPixels = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const cols = Math.floor(canvas.width / gap);
    const rows = Math.floor(canvas.height / gap);
    const pixels: typeof pixelsRef.current = [];

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        pixels.push({
          x: x * gap,
          y: y * gap,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0,
          target: 0,
        });
      }
    }
    pixelsRef.current = pixels;
  }, [gap, colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initPixels();
    };
    resize();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = pixelsRef.current;
      const lerpSpeed = speed / 1000;

      for (const p of pixels) {
        if (isHovered.current) {
          p.target = Math.random() > 0.97 ? (Math.random() * 0.6 + 0.1) : p.target;
        } else {
          p.target = 0;
        }
        p.alpha += (p.target - p.alpha) * lerpSpeed;

        if (p.alpha > 0.01) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fillRect(p.x, p.y, gap - 1, gap - 1);
        }
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [gap, speed, initPixels]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PixelCard;
