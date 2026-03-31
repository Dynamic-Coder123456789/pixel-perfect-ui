import { useState } from "react";
import aiDiagnostics from "@/assets/ai-diagnostics.jpg";

const AIMedicineSection = () => {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section id="ai-medicine" className="relative px-4 sm:px-6 py-12 max-w-[1600px] mx-auto">
      <div className="section-container relative min-h-[750px] flex flex-col items-center px-8 py-10 overflow-hidden">
        {/* Inner navbar */}
        <div className="flex items-center justify-between w-full pb-6 z-10">
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
            <span>En</span>
            <span className="opacity-50">De</span>
            <span className="font-medium text-card-foreground cursor-pointer">Menu +</span>
          </div>
        </div>

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

        {/* Center visual */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-8">
          {/* Phone with body visual */}
          <div className="relative z-10 w-[220px] h-[400px] rounded-[28px] border-[6px] border-card-foreground/80 bg-card-foreground/10 overflow-hidden">
            {/* Replace this placeholder image with actual assets later */}
            <img src={aiDiagnostics} alt="DNA visualization" className="w-full h-full object-cover" />
          </div>

          {/* Floating spheres */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute right-[15%] top-[10%] w-[140px] h-[140px] rounded-full overflow-hidden animate-float opacity-80">
            <img src={aiDiagnostics} alt="DNA sphere" className="w-full h-full object-cover rounded-full" />
          </div>
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute left-[20%] bottom-[5%] w-[80px] h-[80px] rounded-full overflow-hidden animate-float-delay opacity-70">
            <img src={aiDiagnostics} alt="DNA sphere" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>

        {/* Left: Interactive symptom checker label */}
        <div className="absolute left-8 bottom-[20%] z-10">
          <h3 className="text-xl font-semibold text-card-foreground">Interactive<br />symptom<br />checker</h3>
          <div className="mt-3 w-10 h-10 rounded-full bg-card-foreground flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 12h4l3-9 4 18 3-9h4" />
            </svg>
          </div>
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
