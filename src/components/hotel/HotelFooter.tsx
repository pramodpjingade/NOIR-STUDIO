import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { SlideUpReveal } from '../SlideUpReveal';

interface HotelFooterProps {
  onOpenBooking: () => void;
}

export const HotelFooter: React.FC<HotelFooterProps> = ({ onOpenBooking }) => {
  const [kyotoTime, setKyotoTime] = useState('');
  const [zermattTime, setZermattTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setKyotoTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setZermattTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Zurich',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-neutral-400 border-t border-neutral-900 pt-20 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Top CTA Row */}
        <SlideUpReveal distance={40}>
          <div className="pb-16 mb-16 border-b border-neutral-900 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Estate Reservations
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
                Ready to escape into silence? Reserve your sanctuary.
              </h2>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shadow-2xl active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Reserve Suite Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </SlideUpReveal>

        {/* 4 Footer Columns */}
        <SlideUpReveal delay={0.15} distance={32}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Estate Identity */}
            <div>
              <a href="#" className="text-lg font-bold tracking-tight text-white mb-4 block">
                THE SANCTUARY
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Ultra-luxury architectural retreat and subterranean geothermal baths. Member of Relais & Châteaux. Honored with Three Michelin Keys.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Directory
              </div>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#suites" className="hover:text-white transition-colors">
                    Suites & Pavilions
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-white transition-colors">
                    Thermal Baths & Spa
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-white transition-colors">
                    Michelin Gastronomy
                  </a>
                </li>
                <li>
                  <a href="#architecture" className="hover:text-white transition-colors">
                    Architectural Heritage
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Live Clocks & Weather */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Estates Clocks
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="border-b border-neutral-900 pb-2 flex justify-between">
                  <span className="text-neutral-400">Kyoto Estate (16°C Mists)</span>
                  <span className="text-white tabular-nums">{kyotoTime || '20:15:00'}</span>
                </div>
                <div className="border-b border-neutral-900 pb-2 flex justify-between">
                  <span className="text-neutral-400">Zermatt Estate (4°C Alpine)</span>
                  <span className="text-white tabular-nums">{zermattTime || '12:15:00'}</span>
                </div>
              </div>
            </div>

            {/* Column 4: Private Concierge */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Estate Concierge
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <a
                    href="mailto:concierge@thesanctuary-estates.com"
                    className="text-white hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>concierge@thesanctuary-estates.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="w-3 h-3" />
                  <span>+81 (0) 75 889 1200</span>
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  24/7 dedicated guest concierge line
                </div>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Bottom Strip */}
        <SlideUpReveal delay={0.25} distance={20}>
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div>
              © {new Date().getFullYear()} The Sanctuary Hotel & Residences. All rights reserved.
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 hover:text-white transition-colors cursor-pointer p-1"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </SlideUpReveal>
      </div>
    </footer>
  );
};
