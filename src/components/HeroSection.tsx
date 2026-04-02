import { Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

const Spline = lazy(() => import("@splinetool/react-spline"));

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section id="hero" className="relative px-2 sm:px-4 pb-4 w-full mx-auto">
      {/* Main container */}
      <div className="section-container relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Heading */}
        <div className="text-center z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-medium leading-tight text-card-foreground tracking-tight">
            Revolutionizing <span className="pill-hero">healthcare</span>
            <br />with AI and biotechnology
          </h1>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Empowering individuals and healthcare professionals with advanced diagnostic tools and personalized treatment plans.
          </p>
          {/* Get started button */}
          <div className="mt-6 flex justify-center">
            <button
              className="btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Get started
            </button>
          </div>
        </div>

        {/* Spline 3D background */}
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden">
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
