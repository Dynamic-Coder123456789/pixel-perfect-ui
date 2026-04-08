import { useEffect, useRef, useState } from "react";

interface Point {
  id: number;
  x: number;
  y: number;
  label: string;
}

const PREDEFINED_POINTS: Point[] = [
  { id: 1, x: 0.5, y: 0.35, label: "Frontal Lobe" },
  { id: 2, x: 0.55, y: 0.4, label: "Motor Cortex" },
  { id: 3, x: 0.45, y: 0.4, label: "Broca's Area" },
  { id: 4, x: 0.65, y: 0.45, label: "Parietal Lobe" },
  { id: 5, x: 0.35, y: 0.45, label: "Prefrontal" },
  { id: 6, x: 0.7, y: 0.55, label: "Temporal Lobe" },
  { id: 7, x: 0.3, y: 0.55, label: "Wernicke's Area" },
  { id: 8, x: 0.5, y: 0.65, label: "Occipital Lobe" },
  { id: 9, x: 0.5, y: 0.5, label: "Thalamus" },
  { id: 10, x: 0.5, y: 0.58, label: "Cerebellum" },
  { id: 11, x: 0.55, y: 0.52, label: "Hippocampus" },
  { id: 12, x: 0.45, y: 0.52, label: "Amygdala" },
  { id: 13, x: 0.6, y: 0.35, label: "Superior Frontal" },
  { id: 14, x: 0.4, y: 0.35, label: "Medial Frontal" },
  { id: 15, x: 0.75, y: 0.5, label: "Insular Cortex" },
  { id: 16, x: 0.25, y: 0.5, label: "Cingulate" },
  { id: 17, x: 0.5, y: 0.48, label: "Basal Ganglia" },
  { id: 18, x: 0.65, y: 0.6, label: "Brainstem" },
];

interface NearbyPoint extends Point {
  distance: number;
}

const InteractivePointTracker = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [nearbyPoints, setNearbyPoints] = useState<NearbyPoint[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      setCursorPos({ x, y });

      const distances = PREDEFINED_POINTS.map((point) => ({
        ...point,
        distance: Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)),
      }));

      const sorted = distances.sort((a, b) => a.distance - b.distance).slice(0, 5);
      setNearbyPoints(sorted);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[3] cursor-crosshair"
      style={{ pointerEvents: "auto" }}
    >
      {/* All points visualization (subtle) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {PREDEFINED_POINTS.map((point) => (
          <circle
            key={point.id}
            cx={point.x * 100 + "%"}
            cy={point.y * 100 + "%"}
            r="3"
            fill="rgba(255, 255, 255, 0.15)"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Nearby points with labels */}
      <div className="absolute inset-0 pointer-events-none">
        {nearbyPoints.map((point, idx) => (
          <div
            key={point.id}
            className="absolute flex flex-col items-center"
            style={{
              left: point.x * 100 + "%",
              top: point.y * 100 + "%",
              transform: "translate(-50%, -50%)",
              opacity: 1 - idx * 0.15,
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: `rgba(255, 100, 150, ${1 - idx * 0.2})`,
                  boxShadow: `0 0 ${10 - idx * 2}px rgba(255, 100, 150, ${0.6 - idx * 0.1})`,
                }}
              />
              <span
                className="text-xs font-mono font-bold whitespace-nowrap"
                style={{
                  color: `rgba(255, 200, 150, ${1 - idx * 0.2})`,
                  textShadow: "0 0 8px rgba(0, 0, 0, 0.8)",
                }}
              >
                {Math.round(point.distance * 1000)}
              </span>
              {idx < 2 && (
                <span
                  className="text-xs font-mono whitespace-nowrap"
                  style={{
                    color: `rgba(200, 200, 255, ${0.7 - idx * 0.2})`,
                    fontSize: "10px",
                  }}
                >
                  {point.label}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right sidebar info panel */}
      <div
        className="absolute top-8 right-8 z-20 rounded-lg backdrop-blur-md border"
        style={{
          background: "rgba(10, 10, 10, 0.7)",
          borderColor: "rgba(255, 255, 255, 0.1)",
          padding: "16px",
          width: "240px",
          maxHeight: "300px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            color: "rgba(255, 255, 255, 0.4)",
            fontFamily: "monospace",
            marginBottom: "12px",
          }}
        >
          // NEAREST LANDMARKS
        </p>
        <div className="space-y-2">
          {nearbyPoints.map((point, idx) => (
            <div
              key={point.id}
              className="text-xs"
              style={{
                color: `rgba(255, 150, 150, ${1 - idx * 0.2})`,
                opacity: 1 - idx * 0.15,
                fontFamily: "monospace",
              }}
            >
              <div style={{ fontSize: "9px", color: `rgba(200, 200, 255, ${0.8 - idx * 0.2})` }}>
                {point.label}
              </div>
              <div style={{ fontSize: "11px", fontWeight: "bold" }}>
                {Math.round(point.distance * 1000)} units
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractivePointTracker;
