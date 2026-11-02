import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import { SlideUpReveal } from '../SlideUpReveal';

interface RestaurantFooterProps {
  onOpenBooking: () => void;
}

export const RestaurantFooter: React.FC<RestaurantFooterProps> = ({ onOpenBooking }) => {
  const [tokyoTime, setTokyoTime] = useState('');
  const [parisTime, setParisTime] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTokyoTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setParisTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Paris',
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
        {/* Top Call to Action Row */}
        <SlideUpReveal distance={40}>
          <div className="pb-16 mb-16 border-b border-neutral-900 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Experience Noir Atelier
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-xl">
                Ready to experience two-star sensory dining?
              </h2>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors shadow-2xl active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <span>Reserve Counter Seat</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </SlideUpReveal>

        {/* 4 Columns */}
        <SlideUpReveal delay={0.15} distance={32}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Column 1: Identity */}
            <div>
              <a href="#" className="text-lg font-bold tracking-tight text-white mb-4 block">
                NOIR ATELIER
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
                Two Michelin-starred open hearth gastronomy. Member of Les Grandes Tables du Monde. Rooted in Kishu binchotan firecraft and wild mountain botany.
              </p>
            </div>

            {/* Column 2: Hours & Sittings */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Service Hours
              </div>
              <ul className="space-y-2 text-xs font-mono">
                <li className="flex justify-between border-b border-neutral-900 pb-1">
                  <span className="text-neutral-400">Wednesday – Sunday:</span>
                  <span className="text-white">18:00 & 20:30</span>
                </li>
                <li className="flex justify-between border-b border-neutral-900 pb-1">
                  <span className="text-neutral-400">Saturday Lunch:</span>
                  <span className="text-white">12:30 (One Sitting)</span>
                </li>
                <li className="flex justify-between pb-1 text-neutral-400">
                  <span>Monday & Tuesday:</span>
                  <span>Closed for Foraging</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Live Clocks */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Atelier Locations
              </div>
              <div className="space-y-3 text-xs font-mono">
                <div className="border-b border-neutral-900 pb-2 flex justify-between">
                  <span className="text-neutral-400">Tokyo (Ginza 6-Chome)</span>
                  <span className="text-white tabular-nums">{tokyoTime || '20:30:00'}</span>
                </div>
                <div className="border-b border-neutral-900 pb-2 flex justify-between">
                  <span className="text-neutral-400">Paris (Rue de Seine)</span>
                  <span className="text-white tabular-nums">{parisTime || '12:30:00'}</span>
                </div>
              </div>
            </div>

            {/* Column 4: Maître d' Dispatch */}
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-white mb-4">
                Guest Relations
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div>
                  <a
                    href="mailto:reservations@noir-atelier.com"
                    className="text-white hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3" />
                    <span>reservations@noir-atelier.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Phone className="w-3 h-3" />
                  <span>+81 (0) 3 5537 9920</span>
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  Dress Code: Smart Elegant (Jackets Recommended)
                </div>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Bottom Strip */}
        <SlideUpReveal delay={0.25} distance={20}>
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div>
              © {new Date().getFullYear()} Noir Atelier Gastronomy Inc. All rights reserved.
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
