import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-paper/85 backdrop-blur-md border-b border-softline">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ink rounded-md flex items-center justify-center">
            <span className="text-paper font-display text-xl italic leading-none">w</span>
          </div>
          <span className="font-display text-2xl tracking-tight">WorkBuddy</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10 text-sm">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>How It Works</Link>
          <Link to="/customers" className={`nav-link ${isActive('/customers') ? 'active' : ''}`}>Customers</Link>
          <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        </div>

        {/* Desktop CTA */}
        <Link to="/free-report" className="hidden md:block btn-primary px-5 py-2.5 rounded-full text-sm font-medium">
          Get My Free Report
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-paper border-t border-softline px-6 py-6 space-y-4">
          <Link to="/" className="block text-lg text-ink hover:text-rust transition-colors">How It Works</Link>
          <Link to="/customers" className="block text-lg text-ink hover:text-rust transition-colors">Customers</Link>
          <Link to="/pricing" className="block text-lg text-ink hover:text-rust transition-colors">Pricing</Link>
          <Link to="/about" className="block text-lg text-ink hover:text-rust transition-colors">About</Link>
          <Link to="/free-report" className="block btn-primary text-center px-5 py-3 rounded-full text-base font-medium">
            Get My Free Report
          </Link>
        </div>
      )}
    </nav>
  );
};
