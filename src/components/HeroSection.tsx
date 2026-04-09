import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeometricWireframe from "./effects/GeometricWireframe";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface HeroSectionProps {
  onSplineLoad?: () => void;
}

const HeroSection = ({ onSplineLoad }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#1a1a1a" }}
    >
      {/* Spline 3D background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
           <Spline
              scene="https://prod.spline.design/YOl931tzqWq5hdc2/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
              onLoad={() => onSplineLoad?.()}
            />
        </Suspense>
      </div>

      {/* Soft center glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 55%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Geometric wireframe - mouse interactive */}
      <div className="absolute inset-0 z-[2]">
        <GeometricWireframe
          circleRadius={220}
          pointCount={20}
          color="rgba(255, 255, 255, 0.55)"
          glowColor="rgba(255, 255, 255, 0.08)"
        />
      </div>

      {/* Top-left: Logo + info */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-2xl font-black tracking-widest uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.9)", fontFamily: "monospace" }}
        >
          Synaptic.
        </h2>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "monospace" }}>
          // Copyright © 2026
        </p>
        <p className="text-xs mt-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
          Vedant Wankhede.
          <br />
          All Rights Reserved.
        </p>
      </motion.div>

      {/* Top-right: Manifesto */}
      <motion.div
        className="absolute top-8 right-8 z-10 text-right max-w-[260px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
          ///// Manifesto
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "monospace" }}>
          Our mission is to
          <br />
          revolutionize healthcare
          <br />
          through AI-driven
          <br />
          diagnostics and
          <br />
          personalized medicine.
        </p>
      </motion.div>

      {/* Bottom-left: Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
          Scroll down to
          <br />
          discover.
        </p>
      </motion.div>

      {/* Black box to hide Spline watermark */}
      <div className="absolute bottom-0 right-0 z-[5] w-[200px] h-[70px] bg-black" />

      {/* Bottom-right: CTA */}
      <motion.div
        className="absolute bottom-8 right-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-2.5 text-xs font-medium tracking-wider uppercase border transition-all duration-300 hover:bg-white/10"
          style={{
            color: "rgba(255,255,255,0.7)",
            borderColor: "rgba(255,255,255,0.25)",
            fontFamily: "monospace",
            borderRadius: "2px",
          }}
        >
          Get Started →
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
