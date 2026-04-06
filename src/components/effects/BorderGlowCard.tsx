import { useRef, useState, useCallback, useEffect, type ReactNode } from "react";

interface BorderGlowCardProps {
  children?: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

// ── helpers ──────────────────────────────────────────────────────────────────

function parseHSL(hslStr: string): { h: number; s: number; l: number } {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRADIENT_KEYS = ["--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four", "--gradient-five", "--gradient-six", "--gradient-seven"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]): Record<string, string> {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x: number) { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number)  { return x * x * x; }

interface AnimateOpts {
  start?: number; end?: number; duration?: number; delay?: number;
  ease?: (t: number) => number; onUpdate: (v: number) => void; onEnd?: () => void;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateOpts) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else onEnd?.();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

// ── component ─────────────────────────────────────────────────────────────────

const BorderGlowCard = ({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#060010",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}: BorderGlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [edgeProximity, setEdgeProximity] = useState(0);
  const [cursorAngle, setCursorAngle]     = useState(0);

  // ── geometry helpers ───────────────────────────────────────────────────────

  const getCenter = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenter]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenter(el);
    const dx = x - cx, dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }, [getCenter]);

  // ── pointer handler ────────────────────────────────────────────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setEdgeProximity(getEdgeProximity(card, x, y));
    setCursorAngle(getCursorAngle(card, x, y));
  }, [getEdgeProximity, getCursorAngle]);

  const handleMouseLeave = useCallback(() => setEdgeProximity(0), []);

  // ── entrance animation ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!animated) return;
    const angleStart = 110, angleEnd = 465;

    animateValue({ duration: 500,
      onUpdate: v => setEdgeProximity(v / 100) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50,
      onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart) });
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100,
      onUpdate: v => setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart) });
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => setEdgeProximity(v / 100) });
  }, [animated]);

  // ── derived styles ─────────────────────────────────────────────────────────

  const glowVars     = buildGlowVars(glowColor, glowIntensity);
  const gradientVars = buildGradientVars(colors);

  // Conic border ring — tight cone that follows the cursor angle
  const conicBorder = `conic-gradient(
    from ${cursorAngle - coneSpread}deg at 50% 50%,
    transparent 0deg,
    var(--glow-color) ${coneSpread}deg,
    var(--glow-color) ${coneSpread * 2}deg,
    transparent ${coneSpread * 3}deg
  )`;

  // Ambient radial fill inside the card
  const ambientFill = Object.values(gradientVars)
    .filter((_, i) => i < 7)
    .join(", ");

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      style={{
        borderRadius,
        backgroundColor,
        padding: glowRadius,
        ...glowVars,
        ...gradientVars,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── ambient gradient fill ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          background: ambientFill,
          opacity: fillOpacity * edgeProximity,
          transition: "opacity 0.4s ease",
          zIndex: 0,
        }}
      />

      {/* ── conic border ring ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: -1,
          borderRadius: borderRadius + 1,
          background: conicBorder,
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          opacity: edgeProximity,
          transition: "opacity 0.3s ease",
          zIndex: 10,
        }}
      />

      {/* ── outer glow halo ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          boxShadow: `0 0 ${glowRadius * 2}px -${glowRadius / 2}px var(--glow-color-30)`,
          opacity: edgeProximity,
          transition: "opacity 0.4s ease",
          zIndex: 10,
        }}
      />

      {/* ── inset border line ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius,
          boxShadow: `inset 0 0 0 1px var(--glow-color-20)`,
          opacity: edgeProximity,
          transition: "opacity 0.3s ease",
          zIndex: 10,
        }}
      />

      {/* ── content ── */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default BorderGlowCard;
