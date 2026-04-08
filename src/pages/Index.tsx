import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import AIMedicineSection from "@/components/AIMedicineSection";

const Index = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      {!splineLoaded && (
        <div className="fixed inset-0 z-50 bg-[#1a1a1a] flex items-center justify-center">
          <p className="text-xs text-white/40 animate-pulse" style={{ fontFamily: "monospace" }}>
            Loading...
          </p>
        </div>
      )}
      <div className={`min-h-screen bg-background overflow-x-hidden transition-opacity duration-700 ${splineLoaded ? "opacity-100" : "opacity-0"}`}>
        <HeroSection onSplineLoad={() => setSplineLoaded(true)} />
        <AIMedicineSection />
      </div>
    </>
  );
};

export default Index;
