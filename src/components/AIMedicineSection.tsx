import { useState } from "react";
import aiDiagnostics from "@/assets/ai-diagnostics.jpg";

const AIMedicineSection = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section id="ai-medicine" className="relative px-2 sm:px-4 py-4 w-full mx-auto">
      <div className="section-container relative flex flex-col items-center px-8 py-10 overflow-hidden" style={{ minHeight: 'min(1080px, 100vh)', aspectRatio: '16/9' }}>
        {/* Heading */}
        <div className="text-center z-10 max-w-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-medium leading-tight text-card-foreground tracking-tight">
            Leading with <span className="pill-hero">AI</span> in Medicine:
            <br />Innovating Today For a Healthier Tomorrow
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-3 mt-8 z-10">
          <button className="btn-ghost-pill border-primary text-primary bg-primary/5">Symptom checker</button>
          <button className="btn-ghost-pill">Genomic data analytics</button>
          <button
            className="btn-ghost-pill"
            onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Remote patient monitoring
          </button>
        </div>

        {/* Right: Description */}
        <div className="absolute right-8 bottom-[18%] z-10 max-w-[220px]">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our AI-powered symptom checker lets users input symptoms and get immediate, data-driven suggestions for potential conditions and next steps.
          </p>
          <button
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline transition-all"
            onClick={() => document.getElementById('remote-monitoring')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn more <span>›</span>
          </button>
        </div>

        {/* Try demo button */}
        <div className="relative z-10 pb-4 mt-auto">
          <button className="btn-ghost-pill bg-secondary" onClick={() => setShowDemo(true)}>
            Try demo <span>›</span>
          </button>
        </div>
      </div>

      {/* Bottom info row */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Information on<br />remote monitoring</h3>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">Continuous monitoring</h4>
          <p className="text-xs text-foreground/60">Real-time health data collection and analysis.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">Patient engagement</h4>
          <p className="text-xs text-foreground/60">Tools to keep patients engaged and informed about their health.</p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm mb-1">Timely Interventions</h4>
          <p className="text-xs text-foreground/60">Immediate alerts to healthcare providers for potential health issues.</p>
        </div>
      </div>

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setShowDemo(false)}>
          <div className="bg-card rounded-2xl p-8 max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-card-foreground mb-3">Symptom Checker Demo</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your symptoms below to receive AI-powered diagnostic suggestions and recommended next steps.
            </p>
            <textarea
              className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              rows={3}
              placeholder="Describe your symptoms..."
            />
            <div className="flex gap-3 mt-4">
              <button className="btn-primary flex-1">Analyze</button>
              <button className="btn-ghost-pill" onClick={() => setShowDemo(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AIMedicineSection;

