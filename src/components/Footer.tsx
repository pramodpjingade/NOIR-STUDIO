import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { SlideUpReveal } from './SlideUpReveal';

interface FooterProps {
  onOpenInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  const [parisTime, setParisTime] = useState('');
  const [tokyoTime, setTokyoTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setParisTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setTokyoTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Tokyo',
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
        {/* Top Call to Action Row (Slide-up reveal) */}
        <SlideUpReveal distance={40}>
          <div className="pb-16 mb-16 border-b border-neutral-900 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Next Engagement
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
                Have a visionary project in mind? Let's build it.
              </h2>
            </div>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shadow-2xl active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </SlideUpReveal>

        {/* Middle Navigation & Studio Columns (Slide-up reveal) */}
        <SlideUpReveal delay={0.15} distance={32}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Studio Wordmark & Summary */}
            <div>
              <a href="#" className="text-lg font-bold tracking-tight text-white mb-4 block">
                NOIR STUDIO
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Independent creative direction and kinetic frontend engineering studio. Crafting fluid web environments for forward-looking brands.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Navigation
              </div>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#works" className="hover:text-white transition-colors">
                    Selected Works
                  </a>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-white transition-colors">
                    Areas of Excellence
                  </a>
                </li>
                <li>
                  <a href="#philosophy" className="hover:text-white transition-colors">
                    Studio Philosophy
                  </a>
                </li>
                <li>
                  <a href="#metrics" className="hover:text-white transition-colors">
                    Impact & Accolades
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Live Studio Clocks */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Studio Locations
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Paris (HQ)</span>
                  <span className="text-white tabular-nums">{parisTime || '12:00:00'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Tokyo (Studio)</span>
                  <span className="text-white tabular-nums">{tokyoTime || '20:00:00'}</span>
                </div>
              </div>
            </div>

            {/* Column 4: Social & Direct Dispatch */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Direct Contact
              </div>
              <div className="space-y-2.5 text-xs font-mono">
                <div>
                  <a
                    href="mailto:contact@noirstudio.design"
                    className="text-white hover:underline flex items-center gap-1.5"
                  >
                    <span>contact@noirstudio.design</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <div className="text-neutral-400">
                  Studio hours: 09:00 – 18:00 CET
                </div>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Bottom Strip: Copyright & Back to Top (Slide-up reveal) */}
        <SlideUpReveal delay={0.25} distance={20}>
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div>
              © {new Date().getFullYear()} Noir Studio Inc. All rights reserved.
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
