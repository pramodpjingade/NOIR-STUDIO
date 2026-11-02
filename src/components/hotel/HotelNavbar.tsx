import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Calendar, BookOpen, Layers } from 'lucide-react';

interface HotelNavbarProps {
  onOpenBooking: () => void;
  onOpenGuide: () => void;
  onToggleDemoMode: () => void;
  currentMode: 'hotel' | 'studio';
}

export const HotelNavbar: React.FC<HotelNavbarProps> = ({
  onOpenBooking,
  onOpenGuide,
  onToggleDemoMode,
  currentMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Suites & Villas', href: '#suites' },
    { label: 'Wellness & Spa', href: '#experiences' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Accolades', href: '#hotel-metrics' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        {/* Zone 1: Single Brand Wordmark element */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-neutral-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-neutral-100 rounded-none rotate-45" />
            <span>THE SANCTUARY</span>
          </a>

          {/* Quick Demo Switcher Badge */}
          <button
            onClick={onToggleDemoMode}
            className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-neutral-900 border border-neutral-750 text-neutral-300 hover:border-neutral-500 transition-colors"
            title="Click to toggle between Hotel and Creative Studio views"
          >
            <Layers className="w-3 h-3 text-white" />
            <span>Hotel View</span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-200 whitespace-nowrap shrink-0 py-1 text-[13px] tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Integration Guide */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenGuide}
            className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center gap-1.5"
            title="View Hotel Integration Architecture"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Integration Blueprint</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-none hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 shadow-md whitespace-nowrap shrink-0"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Suite</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-6 py-6 transition-all duration-300">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-850">
              <span className="text-xs font-mono text-neutral-400">Current View: Hotel Demo</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleDemoMode();
                }}
                className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-neutral-750 text-white"
              >
                Switch to Studio
              </button>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-300 hover:text-white py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenGuide();
                }}
                className="w-full py-2.5 text-xs font-mono uppercase tracking-wider text-neutral-300 border border-neutral-800 flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Integration Blueprint</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Suite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
