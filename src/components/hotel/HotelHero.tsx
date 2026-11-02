import React, { useState } from 'react';
import { Calendar, Users, ArrowUpRight, ChevronDown } from 'lucide-react';
import { HeroBanner } from '../HeroBanner';
import { SlideUpReveal } from '../SlideUpReveal';

interface HotelHeroProps {
  scrollProgress: number;
  onOpenBooking: () => void;
  onOpenShowreelModal: () => void;
}

export const HotelHero: React.FC<HotelHeroProps> = ({
  scrollProgress,
  onOpenBooking,
  onOpenShowreelModal,
}) => {
  const [checkIn, setCheckIn] = useState('2026-11-15');
  const [checkOut, setCheckOut] = useState('2026-11-19');
  const [guests, setGuests] = useState('2 Guests');
  const [suiteCategory, setSuiteCategory] = useState('All Suites');

  const heroParallax = Math.min(scrollProgress * 2.5, 1);
  const bannerScale = 1 - heroParallax * 0.04;
  const bannerTilt = heroParallax * 4;

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-neutral-900/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top Eyebrow Metadata */}
        <SlideUpReveal delay={0.05} distance={24}>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase text-neutral-400 mb-6 font-mono">
            <span>Kyoto & Alpine Estates</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>3 Michelin Keys Distinction</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>14 Hectares Private Forest</span>
          </div>
        </SlideUpReveal>

        {/* Hero Headline */}
        <SlideUpReveal delay={0.15} distance={40} className="max-w-5xl mb-8">
          <h1
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)' }}
            className="font-bold leading-[1.08] tracking-tight text-white"
          >
            An architectural sanctuary carved into the stillness of ancient forests.
          </h1>
        </SlideUpReveal>

        {/* Narrative & Value Proposition */}
        <SlideUpReveal delay={0.25} distance={36} className="max-w-3xl mb-12">
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
            Where minimalist charred cedar geometry meets subterranean geothermal baths. Twenty-four private pavilions meticulously curated for contemplative luxury and Michelin-starred culinary artistry.
          </p>
        </SlideUpReveal>

        {/* Luxury Hotel Fast Reservation Strip */}
        <SlideUpReveal delay={0.3} distance={40} className="mb-12">
          <div className="p-4 md:p-6 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Check-In */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Check-In
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Check-Out */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Check-Out
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Guests */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Guests
                </label>
                <div className="relative">
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="4 Guests">4 Guests (Family)</option>
                    <option value="6 Guests">6 Guests (Villa Full)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Suite Preference */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Sanctuary Tier
                </label>
                <div className="relative">
                  <select
                    value={suiteCategory}
                    onChange={(e) => setSuiteCategory(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="All Suites">All Suites & Villas</option>
                    <option value="Grand Penthouse">Grand Penthouse</option>
                    <option value="Garden Pavilion">Garden Pavilion</option>
                    <option value="Forest Villa">Forest Villa</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Check Availability CTA */}
              <div>
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 shadow-md whitespace-nowrap"
                >
                  <span>Check Availability</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Master Suite Drone Reel Banner (Slide-up entrance with 3D perspective) */}
        <SlideUpReveal delay={0.35} distance={60} className="w-full">
          <div
            style={{
              transform: `perspective(1200px) scale(${bannerScale}) rotateX(${bannerTilt}deg)`,
              transformOrigin: 'center top',
              transition: 'transform 0.15s ease-out',
            }}
            className="w-full will-change-transform"
          >
            <HeroBanner onOpenShowreelModal={onOpenShowreelModal} />
          </div>
        </SlideUpReveal>

        {/* Hotel Sub-strip: Trust & Services */}
        <SlideUpReveal delay={0.45} distance={20} className="mt-8 pt-6 border-t border-neutral-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neutral-400" />
              <span>Complimentary Private Helicopter Transfer from KIX / GVA</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>Relais & Châteaux Associate</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>100% Geothermal Powered</span>
            </div>
          </div>
        </SlideUpReveal>
      </div>
    </section>
  );
};
