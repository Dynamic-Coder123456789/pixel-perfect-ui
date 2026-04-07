const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 py-5 w-full max-w-[1600px] mx-auto">
      {/* Left: Promo Website pill */}
      <div className="pill">Promo Website</div>

      {/* Center: Genomic logo pill */}
      <div
        className="pill-outline flex items-center gap-2 border-foreground/20 bg-card text-card-foreground px-5 py-2 cursor-pointer hover:scale-105 transition-transform"
        onClick={() => scrollTo('hero')}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="5" stroke="hsl(var(--accent))" strokeWidth="2" />
        </svg>
        <span className="font-semibold text-card-foreground">Synaptic</span>
      </div>

      {/* Right: Category pills */}
      <div className="flex items-center gap-3">
        <div className="pill cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollTo('hero')}>Biotech</div>
        <div className="pill cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollTo('ai-medicine')}>Healthcare</div>
        <div className="pill cursor-pointer hover:scale-105 transition-transform" onClick={() => scrollTo('remote-monitoring')}>AI-driven</div>
      </div>
    </nav>
  );
};

export default Navbar;
