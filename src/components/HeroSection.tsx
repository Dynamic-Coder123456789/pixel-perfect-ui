import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GeometricWireframe from "./effects/GeometricWireframe";
import video from "./cyberpunk-2077-night-city-moewalls-com (1).mp4";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface HeroSectionProps {
  onSplineLoad?: () => void;
  videoSrc?: string;
}

const MONO = "'Space Mono', monospace";
const DISPLAY = "'Space Grotesk', sans-serif";

const HeroSection = ({ onSplineLoad, videoSrc }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#1a1a1a" }}
    >
      {/* Video background — sits behind everything */}
      {videoSrc && (
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Spline 3D background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline
            scene="https://prod.spline.design/OxuPNsreCUwyfYta/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            onLoad={() => onSplineLoad?.()}
          />
        </Suspense>
      </div>

      {/* Top-left: Logo + info */}
      <motion.div
        className="absolute top-8 left-8 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo — Space Grotesk ExtraBold, all-caps, matches iGLOO style */}
        <h2
          className="uppercase mb-2 tracking-tight leading-none"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: "2rem",
            color: "rgba(255,255,255,0.95)",
            letterSpacing: "-0.01em",
          }}
        >
          Synaptic.
        </h2>

        {/* Copyright line */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.45)",
            marginTop: "2px",
          }}
        >
          // Copyright © 2026
        </p>

        {/* Author line */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.4)",
            marginTop: "10px",
            lineHeight: "1.7",
          }}
        >
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
        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "10px",
            letterSpacing: "0.05em",
          }}
        >
          ////// Manifesto
        </p>
        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.55)",
            lineHeight: "1.8",
          }}
        >
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
        <p
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: "1.7",
            marginBottom: "16px",
          }}
        >
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
          className="px-6 py-2.5 transition-all duration-300 hover:bg-white/10"
          style={{
            fontFamily: MONO,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "2px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Get Started →
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
