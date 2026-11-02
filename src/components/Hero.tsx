import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HeroBanner } from './HeroBanner';
import { SlideUpReveal } from './SlideUpReveal';

interface HeroProps {
  scrollProgress: number;
  onOpenInquiry: () => void;
  onOpenShowreelModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  scrollProgress,
  onOpenInquiry,
  onOpenShowreelModal,
}) => {
  // 3D parallax scroll calculations for Hero
  const heroParallax = Math.min(scrollProgress * 2.5, 1);
  const bannerScale = 1 - heroParallax * 0.04;
  const bannerTilt = heroParallax * 4;

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-transparent text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-neutral-900/30 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top Eyebrow Metadata (Slide-up entrance) */}
        <SlideUpReveal delay={0.05} distance={24}>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm font-medium tracking-wider uppercase text-neutral-400 mb-6">
            <span>Creative Direction</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Motion Engineering</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Spatial Web Architecture</span>
          </div>
        </SlideUpReveal>

        {/* Hero Headline (Slide-up entrance) */}
        <SlideUpReveal delay={0.15} distance={40} className="max-w-5xl mb-8">
          <h1
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4.25rem)' }}
            className="font-bold leading-[1.08] tracking-tight text-white"
          >
            Crafting fluid digital experiences & cinematic web identities.
          </h1>
        </SlideUpReveal>

        {/* Value Proposition Subtitle & Action Block (Slide-up entrance) */}
        <SlideUpReveal delay={0.25} distance={36} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-7">
            <p className="text-base md:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl">
              We partner with forward-thinking brands and institutions to conceive, architect, and code high-velocity digital products with relentless attention to typography, spatial rhythm, and kinetic nuance.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-start lg:justify-end gap-4">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-white/5 whitespace-nowrap"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenInquiry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 active:scale-[0.98] transition-all duration-200 whitespace-nowrap"
            >
              <span>Schedule Discovery Call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </SlideUpReveal>

        {/* Hero Banner Component (Slide-up entrance with 3D perspective) */}
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

        {/* Hero Sub-strip: Trust & Regional Trust Markers (Slide-up entrance) */}
        <SlideUpReveal delay={0.45} distance={20} className="mt-8 pt-6 border-t border-neutral-900/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-neutral-400" />
              <span>Available for Select Q2/Q3 Collaborations</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>Direct Studio · Paris & Tokyo</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>Independent & Founder-Led</span>
            </div>
          </div>
        </SlideUpReveal>
      </div>
    </section>
  );
};
