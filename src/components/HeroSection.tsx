const PLACEHOLDER = "https://via.placeholder.com/1200x800";

const HeroSection = () => {
  return (
    <section className="relative px-6 pb-8 max-w-[1400px] mx-auto">
      {/* Main container */}
      <div className="section-container relative min-h-[700px] flex flex-col items-center overflow-visible">
        {/* Inner navbar */}
        <div className="flex items-center justify-between w-full px-8 pt-6 pb-4 z-10">
          <div className="flex items-center gap-2 text-card-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <circle cx="12" cy="12" r="5" stroke="hsl(var(--accent))" strokeWidth="2" />
            </svg>
            <span className="text-sm font-medium text-card-foreground">genomic</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="relative">For partners <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-primary" /></span>
            <span>For investors</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>En</span>
            <span className="opacity-50">De</span>
            <span className="font-medium text-card-foreground">Menu +</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mt-8 z-10 px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] font-medium leading-tight text-card-foreground tracking-tight">
            Revolutionizing <span className="pill-hero">healthcare</span>
            <br />with ai and biotechnology
          </h1>
          <p className="mt-4 text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
            Empowering individuals and healthcare professionals with advanced diagnostic tools and personalized treatment plans.
          </p>
        </div>

        {/* Phone mockup + DNA background */}
        <div className="relative w-full flex-1 flex items-center justify-center mt-6">
          {/* DNA/background visual */}
          {/* Replace this placeholder image with actual assets later */}
          <img
            src={PLACEHOLDER}
            alt="placeholder"
            className="absolute inset-x-0 bottom-0 w-full h-[420px] object-cover rounded-b-3xl opacity-90"
          />

          {/* Phone mockup */}
          <div className="relative z-10 w-[180px] h-[360px] rounded-[28px] border-[6px] border-card-foreground/80 bg-card overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 bg-card-foreground/80 rounded-b-xl" />
            <div className="flex items-center justify-center h-full">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="hsl(var(--card-foreground))" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="5" stroke="hsl(var(--card-foreground))" strokeWidth="1.5" />
              </svg>
              <span className="ml-2 text-xs font-medium text-card-foreground">genomic</span>
            </div>
          </div>
        </div>

        {/* Get started button */}
        <div className="relative z-10 pb-8 -mt-4">
          <button className="btn-primary">Get started</button>
        </div>
      </div>

      {/* Left floating card */}
      <div className="absolute left-0 top-[55%] -translate-x-4 z-20 float-card p-6 max-w-[220px] animate-float">
        <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <h3 className="font-semibold text-card-foreground text-sm mb-2">AI-Powered diagnostics</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our tools analyze vast amounts of genomic data to identify potential health issues early.
        </p>
      </div>

      {/* Right floating video card */}
      <div className="absolute right-0 top-[60%] translate-x-2 z-20 float-card w-[180px] h-[140px] overflow-hidden animate-float-delay">
        {/* Replace this placeholder image with actual assets later */}
        <img src={PLACEHOLDER} alt="placeholder" className="w-full h-full object-cover rounded-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--card-foreground))">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-2 left-2 text-[10px] text-card bg-card-foreground/60 rounded px-1.5 py-0.5">01:56</div>
      </div>
    </section>
  );
};

export default HeroSection;
