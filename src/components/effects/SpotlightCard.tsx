import { useRef, useState, useCallback, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "59, 130, 246",
  spotlightRadius = 350,
}: SpotlightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setSpotlight({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        visible: true,
      });
    },
    []
  );

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, visible: false }))}
    >
      {/* Spotlight */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 z-0"
        style={{
          left: spotlight.x - spotlightRadius,
          top: spotlight.y - spotlightRadius,
          width: spotlightRadius * 2,
          height: spotlightRadius * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${spotlightColor}, 0.12) 0%, transparent 70%)`,
          opacity: spotlight.visible ? 1 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default SpotlightCard;
