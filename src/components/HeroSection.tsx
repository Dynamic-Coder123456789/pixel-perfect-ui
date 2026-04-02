import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="relative w-full">
      {/* Main container - full viewport */}
      <div className="section-container relative min-h-screen flex flex-col items-center overflow-hidden">
        {/* Inner navbar */}
        <motion.div
          className="flex items-center justify-between w-full px-8 pt-6 pb-4 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-card-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="hsl(var(--accent))" strokeWidth="2" />
            </svg>
            <span className="text-sm font-medium text-card-foreground">genomic</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="relative cursor-pointer hover:text-card-foreground transition-colors">For partners <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-primary" /></span>
            <span className="cursor-pointer hover:text-card-foreground transition-colors">For investors</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-card-foreground transition-colors">En</span>
            <span className="opacity-50">De</span>
            <span className="font-medium text-card-foreground cursor-pointer">Menu +</span>
          </div>
        </motion.div>

        {/* Heading */}
        <div className="flex-1 flex flex-col items-center justify-center text-center z-10 px-4">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-tight text-card-foreground tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionizing <span className="pill-hero">healthcare</span>
            <br />with AI and biotechnology
          </motion.h1>
          <motion.p
            className="mt-4 text-muted-foreground text-sm max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Empowering individuals and healthcare professionals with advanced diagnostic tools and personalized treatment plans.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Get started
            </button>
          </motion.div>
        </div>

        {/* Spline 3D background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Suspense fallback={<div className="w-full h-full bg-card" />}>
            <Spline
              scene="https://prod.spline.design/phYv9pSDh3VjEFWm/scene.splinecode"
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
