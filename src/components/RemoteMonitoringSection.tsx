const PLACEHOLDER = "https://via.placeholder.com/1200x800";

const RemoteMonitoringSection = () => {
  return (
    <section className="relative px-6 py-12 max-w-[1400px] mx-auto">
      {/* Gradient background wrapper */}
      <div className="gradient-bg rounded-3xl p-2">
        <div className="section-container relative min-h-[700px] flex flex-col items-center px-8 py-12 overflow-visible">
          {/* Brain/top background visual */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute top-0 left-0 right-0 h-[200px] overflow-hidden rounded-t-3xl opacity-30">
            <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover" style={{ filter: 'blur(2px) hue-rotate(220deg)' }} />
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
              <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover" />
            </div>

            {/* Navigation arrows */}
            <button className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-card-foreground transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-card-foreground transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Bottom glow visual */}
          {/* Replace this placeholder image with actual assets later */}
          <div className="absolute bottom-0 left-0 right-0 h-[200px] overflow-hidden rounded-b-3xl opacity-40">
            <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover" style={{ filter: 'blur(4px) hue-rotate(280deg) saturate(1.5)' }} />
          </div>
        </div>
      </div>

      {/* Left floating sphere */}
      {/* Replace this placeholder image with actual assets later */}
      <div className="absolute left-[-20px] top-[35%] w-[120px] h-[120px] rounded-full overflow-hidden animate-float z-20">
        <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover rounded-full" />
      </div>

      {/* Right small sphere */}
      {/* Replace this placeholder image with actual assets later */}
      <div className="absolute right-[5%] top-[25%] w-[60px] h-[60px] rounded-full overflow-hidden animate-float-delay z-20 opacity-70">
        <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover rounded-full" />
      </div>

      {/* Right floating medication card */}
      <div className="absolute right-0 bottom-[8%] translate-x-6 z-20 float-card p-5 max-w-[300px] animate-float-slow">
        <h4 className="font-semibold text-card-foreground text-sm mb-4">Medication</h4>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 border-b border-border pb-2">
          {['Mon 20', 'Tue 21', 'Wed 22', 'Thu 23', 'Fri 24', 'Sat 25', 'Sun 26'].map(d => (
            <span key={d} className="flex-1 text-center">{d}</span>
          ))}
        </div>
        <div className="space-y-3">
          {[
            { name: 'Albufin', dose: '20mg', badges: [{ text: '1', color: 'bg-primary' }] },
            { name: 'Vitamin D', dose: '100mg', badges: [{ text: '2', color: 'bg-primary' }] },
            { name: 'Omega 3', dose: '500mg', badges: [{ text: '2', color: 'bg-blue-400' }] },
            { name: 'Ibuprofen', dose: '15mg', badges: [] },
            { name: 'Aspirin', dose: '100mg', badges: [{ text: '2', color: 'bg-primary' }, { text: '1', color: 'bg-green-500' }] },
          ].map(med => (
            <div key={med.name} className="flex items-center gap-2 border-b border-dashed border-border/50 pb-2">
              <span className="w-4 h-4 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
              </span>
              <span className="text-xs font-medium text-card-foreground">{med.name}</span>
              <span className="text-[10px] text-muted-foreground">{med.dose}</span>
              <div className="ml-auto flex items-center gap-1">
                {med.badges.map((b, i) => (
                  <span key={i} className={`w-5 h-5 rounded-full ${b.color} text-[9px] text-card flex items-center justify-center font-medium`}>{b.text}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RemoteMonitoringSection;
