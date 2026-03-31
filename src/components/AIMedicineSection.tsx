import { useState } from "react";
import Spline from "@splinetool/react-spline/next";

const AIMedicineSection = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section
      id="ai-medicine"
      className="relative px-4 sm:px-6 py-12 max-w-[1600px] mx-auto overflow-hidden"
    >
      {/* ✅ Spline Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-70">
        <Spline scene="https://prod.spline.design/mM5NaLoi32-wIXDb/scene.splinecode" />
      </div>

      {/* ✅ MAIN CONTAINER (fixed visibility) */}
      <div className="section-container relative z-10 min-h-[750px] flex flex-col items-center px-8 py-10 overflow-hidden bg-white/90 backdrop-blur-xl rounded-[28px] shadow-2xl">
        
        {/* Inner navbar */}
        <div className="flex items-center justify-between w-full pb-6">
          <div className="flex items-center gap-2 text-card-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="hsl(var(--accent))" strokeWidth="2" />
            </svg>
            <span className="text-sm font-medium text-card-foreground">genomic</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="relative cursor-pointer hover:text-card-foreground transition-colors">
              For partners
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            <span className="cursor-pointer hover:text-card-foreground transition-colors">
              For investors
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>En</span>
            <span className="opacity-50">De</span>
            <span className="font-medium text-card-foreground cursor-pointer">
              Menu +
            </span>
          </div>
        </div>

        {/* Heading (slightly improved style) */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-medium leading-tight text-gray-900 tracking-tight">
            Leading with{" "}
            <span className="px-3 py-1 bg-black text-white rounded-full text-lg">
              AI ✦
            </span>{" "}
            in Medicine:
            <br />
            Innovating Today For a Healthier Tomorrow
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mt-8">
          <button className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm shadow-sm">
            Symptom checker
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm">
            Genomic data analytics
          </button>
          <button
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm"
            onClick={() =>
              document
                .getElementById("remote-monitoring")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Remote patient monitoring
          </button>
        </div>

        {/* Right Description */}
        <div className="absolute right-8 bottom-[18%] max-w-[220px]">
          <p className="text-xs text-gray-600 leading-relaxed">
            Our AI-powered symptom checker lets users input symptoms and get
            immediate, data-driven suggestions for potential conditions and next
            steps.
          </p>
          <button
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline transition-all"
            onClick={() =>
              document
                .getElementById("remote-monitoring")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn more <span>›</span>
          </button>
        </div>

        {/* Try demo button */}
        <div className="relative pb-4 mt-auto">
          <button
            className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm shadow"
            onClick={() => setShowDemo(true)}
          >
            Try demo <span>›</span>
          </button>
        </div>
      </div>

      {/* Bottom info row */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Information on
            <br />
            remote monitoring
          </h3>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">
            Continuous monitoring
          </h4>
          <p className="text-xs text-foreground/60">
            Real-time health data collection and analysis.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">
            Patient engagement
          </h4>
          <p className="text-xs text-foreground/60">
            Tools to keep patients engaged and informed about their health.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">
            Timely Interventions
          </h4>
          <p className="text-xs text-foreground/60">
            Immediate alerts to healthcare providers for potential health issues.
          </p>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-3">
              Symptom Checker Demo
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Enter your symptoms below to receive AI-powered diagnostic
              suggestions and recommended next steps.
            </p>

            <textarea
              className="w-full rounded-xl border p-3 text-sm"
              rows={3}
              placeholder="Describe your symptoms..."
            />

            <div className="flex gap-3 mt-4">
              <button className="bg-blue-600 text-white rounded-xl px-4 py-2 flex-1">
                Analyze
              </button>
              <button
                className="border rounded-xl px-4 py-2"
                onClick={() => setShowDemo(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIMedicineSection;
