import type { ReactNode } from "react";

interface GlassIconProps {
  icon: ReactNode;
  color?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onClick?: () => void;
}

const sizes = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const GlassIcon = ({
  icon,
  color = "59, 130, 246",
  label,
  size = "md",
  active = false,
  onClick,
}: GlassIconProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center justify-center rounded-xl
        backdrop-blur-md border transition-all duration-300
        hover:scale-110 hover:shadow-lg group
        ${sizes[size]}
        ${
          active
            ? "bg-white/15 border-white/30 shadow-lg"
            : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
        }
      `}
      style={{
        boxShadow: active
          ? `0 0 20px rgba(${color}, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)`
          : "inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      title={label}
    >
      <div
        className="transition-all duration-300"
        style={{
          color: active ? `rgb(${color})` : undefined,
          filter: active ? `drop-shadow(0 0 6px rgba(${color}, 0.5))` : undefined,
        }}
      >
        {icon}
      </div>
      {/* Glass reflection */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent" />
      </div>
    </button>
  );
};

export default GlassIcon;
