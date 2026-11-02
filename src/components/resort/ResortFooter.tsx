import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { SlideUpReveal } from '../SlideUpReveal';
import { RESORT_BRANCHES } from '../../data/resortContent';

interface ResortFooterProps {
  onOpenBooking: () => void;
}

export const ResortFooter: React.FC<ResortFooterProps> = ({ onOpenBooking }) => {
  const [clocks, setClocks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const updated: { [key: string]: string } = {};

      RESORT_BRANCHES.forEach((branch) => {
        updated[branch.id] = now.toLocaleTimeString('en-GB', {
          timeZone: branch.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
      });

      setClocks(updated);
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
        {/* Top Call to Action Row */}
        <SlideUpReveal distance={40}>
          <div className="pb-16 mb-16 border-b border-neutral-900 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Worldwide Reservations
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
                Ready to escape to one of our five global sanctuaries?
              </h2>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shadow-2xl active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Reserve Sanctuary Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </SlideUpReveal>

        {/* Global Synchronized Branch Clocks Strip */}
        <SlideUpReveal delay={0.1} distance={30} className="mb-16">
          <div className="p-6 bg-neutral-950 border border-neutral-850">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-white" />
              <span>Worldwide Synchronized Destination Clocks & Climate</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs font-mono">
              {RESORT_BRANCHES.map((b) => (
                <div key={b.id} className="p-3 bg-black/60 border border-neutral-850/80">
                  <div className="text-white font-bold mb-1 flex items-center justify-between">
                    <span>{b.city}</span>
                    <span className="text-[10px] text-neutral-400 font-normal">{b.temperature}</span>
                  </div>
                  <div className="text-neutral-300 text-sm tabular-nums">
                    {clocks[b.id] || '12:00:00'}
                  </div>
                  <div className="text-[10px] text-neutral-500 mt-1 truncate">
                    {b.climate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideUpReveal>

        {/* 4 Columns */}
        <SlideUpReveal delay={0.2} distance={32}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Identity */}
            <div>
              <a href="#" className="text-lg font-bold tracking-tight text-white mb-4 block">
                AURA RESORTS
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Global collection of architectural sanctuaries across Japan, Switzerland, Italy, Indonesia, and Iceland. Forbes 5-Star rated worldwide.
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Global Portfolio
              </div>
              <ul className="space-y-2.5 text-xs font-mono">
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors">
                    The Kyoto Sanctuary (Japan)
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors">
                    The Alpine Monolith (Switzerland)
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors">
                    The Cliffside Estate (Italy)
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors">
                    The Ayung Haven (Indonesia)
                  </a>
                </li>
                <li>
                  <a href="#destinations" className="hover:text-white transition-colors">
                    The Geothermal Fjord (Iceland)
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Sustainability & Architecture */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Architecture & Planet
              </div>
              <div className="space-y-2 text-xs font-mono text-neutral-400">
                <div>100% Geothermal & Solar Microgrids</div>
                <div>Pritzker Laureate Architecture</div>
                <div>Zero Single-Use Plastics Worldwide</div>
                <div>14 Hectares Protected per Branch</div>
              </div>
            </div>

            {/* Column 4: Private Global Concierge */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Private Concierge Desk
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <a
                    href="mailto:concierge@aura-resorts.com"
                    className="text-white hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>concierge@aura-resorts.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="w-3 h-3" />
                  <span>+41 27 966 8800 (Global Direct)</span>
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  24/7 Global Flight & Helicopter Dispatch
                </div>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Bottom Strip */}
        <SlideUpReveal delay={0.25} distance={20}>
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div>
              © {new Date().getFullYear()} Aura Resorts & Sanctuaries Worldwide. All rights reserved.
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
