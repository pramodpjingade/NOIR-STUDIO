import React from 'react';
import { ResortBranch } from '../../types/resort';
import { HeroBanner } from '../HeroBanner';
import { SlideUpReveal } from '../SlideUpReveal';
import { FloatingSearchNav, SearchBookingParams } from './FloatingSearchNav';

interface ResortHeroProps {
  activeBranch: ResortBranch;
  onSelectBranch: (branch: ResortBranch) => void;
  scrollProgress: number;
  onOpenBooking: (params?: SearchBookingParams) => void;
  onOpenShowreelModal: () => void;
}

export const ResortHero: React.FC<ResortHeroProps> = ({
  activeBranch,
  onSelectBranch,
  scrollProgress,
  onOpenBooking,
  onOpenShowreelModal,
}) => {
  const heroParallax = Math.min(scrollProgress * 2.5, 1);
  const bannerScale = 1 - heroParallax * 0.04;
  const bannerTilt = heroParallax * 4;

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-neutral-900/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">


        {/* Eyebrow */}
        <SlideUpReveal delay={0.1} distance={24}>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase text-neutral-400 mb-6 font-mono">
            <span>{activeBranch.name}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{activeBranch.climate}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{activeBranch.altitude}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{activeBranch.coordinates}</span>
          </div>
        </SlideUpReveal>

        {/* Headline */}
        <SlideUpReveal delay={0.18} distance={40} className="max-w-5xl mb-8">
          <h1
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)' }}
            className="font-bold leading-[1.08] tracking-tight text-white"
          >
            Architectural sanctuaries carved into the world’s most pristine landscapes.
          </h1>
        </SlideUpReveal>

        {/* Active Branch Description */}
        <SlideUpReveal delay={0.25} distance={36} className="max-w-3xl mb-12">
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal">
            {activeBranch.description} From ${activeBranch.startingRate.toLocaleString()} per night, with complimentary private helicopter or chauffeur arrival from {activeBranch.flightHub}.
          </p>
        </SlideUpReveal>

        {/* Sleek Floating White Capsule Search & Navigation Bar (Exact Recreation of Reference Screenshot) */}
        <SlideUpReveal delay={0.3} distance={36} className="mb-14">
          <FloatingSearchNav
            activeBranch={activeBranch}
            onSelectBranch={onSelectBranch}
            onSearch={(params) => onOpenBooking(params)}
          />
        </SlideUpReveal>

        {/* Master Active Branch Drone Reel Banner */}
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

        {/* Branch Sub-strip */}
        <SlideUpReveal delay={0.45} distance={20} className="mt-8 pt-6 border-t border-neutral-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neutral-400" />
              <span>Complimentary Private Heli/Transit from {activeBranch.flightHub}</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>Forbes 5-Star Worldwide Collection</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>100% Geothermal & Solar Microgrid</span>
            </div>
          </div>
        </SlideUpReveal>
      </div>
    </section>
  );
};
