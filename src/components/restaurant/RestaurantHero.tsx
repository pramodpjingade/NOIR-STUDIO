import React, { useState } from 'react';
import { Calendar, Users, ArrowUpRight, ChevronDown, Clock } from 'lucide-react';
import { HeroBanner } from '../HeroBanner';
import { SlideUpReveal } from '../SlideUpReveal';

interface RestaurantHeroProps {
  scrollProgress: number;
  onOpenBooking: () => void;
  onOpenShowreelModal: () => void;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({
  scrollProgress,
  onOpenBooking,
  onOpenShowreelModal,
}) => {
  const [date, setDate] = useState('2026-11-18');
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [guests, setGuests] = useState('2 Guests');
  const [seatingArea, setSeatingArea] = useState("Chef's Counter");

  const heroParallax = Math.min(scrollProgress * 2.5, 1);
  const bannerScale = 1 - heroParallax * 0.04;
  const bannerTilt = heroParallax * 4;

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-neutral-900/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Eyebrow */}
        <SlideUpReveal delay={0.05} distance={24}>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase text-neutral-400 mb-6 font-mono">
            <span>Two Michelin Stars 2026</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Green Star for Sustainability</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>18-Seat Intimate Hearth</span>
          </div>
        </SlideUpReveal>

        {/* Headline */}
        <SlideUpReveal delay={0.15} distance={40} className="max-w-5xl mb-8">
          <h1
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)' }}
            className="font-bold leading-[1.08] tracking-tight text-white"
          >
            Sensory gastronomy forged over white binchotan fire and wild mountain terroir.
          </h1>
        </SlideUpReveal>

        {/* Narrative */}
        <SlideUpReveal delay={0.25} distance={36} className="max-w-3xl mb-12">
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
            An eight-course blind degustation menu curated daily around dawn foraging expeditions, 30-kilometer local terroir, and 1,000°C infrared charcoal firecraft.
          </p>
        </SlideUpReveal>

        {/* Fast Table Reservation Strip */}
        <SlideUpReveal delay={0.3} distance={40} className="mb-12">
          <div className="p-4 md:p-6 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Date */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Reservation Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Service Time
                </label>
                <div className="relative">
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="18:00">18:00 (Early Hearth)</option>
                    <option value="18:30">18:30 (Counter Seating)</option>
                    <option value="19:30">19:30 (Peak Degustation)</option>
                    <option value="20:30">20:30 (Late Sitting)</option>
                    <option value="21:15">21:15 (Omakase Cellar)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                    <option value="1 Guest">1 Guest (Counter Solo)</option>
                    <option value="2 Guests">2 Guests (Tasting Table)</option>
                    <option value="4 Guests">4 Guests (Atelier Booth)</option>
                    <option value="6 Guests">6 Guests (Private Cellar)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Seating Preference */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Seating Experience
                </label>
                <div className="relative">
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Chef's Counter">Chef's Counter (Live Hearth)</option>
                    <option value="Main Atelier">Main Atelier Room</option>
                    <option value="Private Wine Salon">Private Wine Salon</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Check Table Action */}
              <div>
                <button
                  onClick={onOpenBooking}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 shadow-md whitespace-nowrap"
                >
                  <span>Find a Table</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </SlideUpReveal>

        {/* Master Live-Fire Culinary Reel Banner */}
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

        {/* Sub-strip */}
        <SlideUpReveal delay={0.45} distance={20} className="mt-8 pt-6 border-t border-neutral-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neutral-400" />
              <span>Reservations Released 30 Days in Advance at 10:00 JST / CET</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>Tokyo (Ginza) & Paris (Saint-Germain)</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>Head Chef Kenji Mori</span>
            </div>
          </div>
        </SlideUpReveal>
      </div>
    </section>
  );
};
