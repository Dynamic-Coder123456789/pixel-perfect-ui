import { useRef, useState, useCallback, type ReactNode } from "react";

interface BorderGlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderRadius?: number;
  glowIntensity?: number;
}

const BorderGlowCard = ({
  children,
  className = "",
  glowColor = "200, 100%, 60%",
  borderRadius = 20,
  glowIntensity = 0.8,
}: BorderGlowCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setGlowStyle({
        background: `radial-gradient(600px circle at ${x}px ${y}px, hsla(${glowColor}, ${glowIntensity * 0.15}), transparent 40%)`,
        opacity: 1,
      });
    },
    [glowColor, glowIntensity]
  );

  const handleMouseLeave = useCallback(() => {
    setGlowStyle({ opacity: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      style={{ borderRadius }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow border effect */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          ...glowStyle,
          borderRadius,
        }}
      />
      {/* Animated border */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          borderRadius,
          boxShadow: `inset 0 0 0 1px hsla(${glowColor}, 0.3), 0 0 30px -10px hsla(${glowColor}, 0.2)`,
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default BorderGlowCard;
