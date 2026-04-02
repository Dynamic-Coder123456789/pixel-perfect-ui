import remoteMonitoring from "@/assets/remote-monitoring.jpg";

const RemoteMonitoringSection = () => {
  return (
    <section id="remote-monitoring" className="relative px-2 sm:px-4 py-4 w-full mx-auto">
      {/* Gradient background wrapper */}
      <div className="gradient-bg rounded-3xl p-2">
        <div className="section-container relative min-h-[700px] flex flex-col items-center px-8 py-12 overflow-hidden">
          {/* Brain/top background visual */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden rounded-t-3xl opacity-30">
            <img src={remoteMonitoring} alt="DNA background" className="w-full h-full object-cover" style={{ filter: 'blur(2px) hue-rotate(220deg)' }} />
          </div>

          {/* Heading */}
          <div className="text-center z-10 max-w-2xl mt-8">
            <h2 className="text-3xl md:text-4xl lg:text-[2.8rem] font-medium leading-tight text-card-foreground tracking-tight">
              <span className="pill-hero">Remote 📡</span> Patient
              <br />Monitoring Solution
            </h2>
            <p className="mt-4 text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              With real-time data collection and analysis, healthcare professionals can monitor patients' conditions and intervene when necessary.
            </p>
          </div>

          {/* Tablet mockup */}
          <div className="relative z-10 mt-8 w-full max-w-[700px]">
            <div className="rounded-2xl border-[6px] border-card-foreground/70 bg-card-foreground/5 overflow-hidden shadow-2xl aspect-[4/3]">
              {/* Replace this placeholder image with actual assets later */}
              <img src={remoteMonitoring} alt="Dashboard mockup" className="w-full h-full object-cover" />
            </div>

            {/* Navigation arrows */}
            <button className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-card-foreground hover:scale-110 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-card-foreground hover:scale-110 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Floating spheres inside container */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute left-[5%] top-[35%] w-[120px] h-[120px] rounded-full overflow-hidden animate-float z-[5] opacity-60">
            <img src={remoteMonitoring} alt="DNA sphere" className="w-full h-full object-cover rounded-full" />
          </div>
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute right-[8%] top-[25%] w-[60px] h-[60px] rounded-full overflow-hidden animate-float-delay z-[5] opacity-50">
            <img src={remoteMonitoring} alt="DNA sphere" className="w-full h-full object-cover rounded-full" />
          </div>

          {/* Bottom glow visual */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden rounded-b-3xl opacity-40">
            <img src={remoteMonitoring} alt="DNA glow" className="w-full h-full object-cover" style={{ filter: 'blur(4px) hue-rotate(280deg) saturate(1.5)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoteMonitoringSection;
