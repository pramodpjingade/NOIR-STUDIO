import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sparkles, Bed, Maximize, Eye } from 'lucide-react';
import { HotelSuite } from '../../types/hotel';
import { HOTEL_SUITES } from '../../data/hotelContent';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

interface HotelSuitesProps {
  onSelectSuite: (suite: HotelSuite) => void;
  onBookSuite: (suite: HotelSuite) => void;
}

export const HotelSuites: React.FC<HotelSuitesProps> = ({
  onSelectSuite,
  onBookSuite,
}) => {
  const [activeTier, setActiveTier] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const tiers = ['All', 'Penthouse', 'Pavilion Suite', 'Signature Villa', 'Horizon Sanctuary'];

  const filteredSuites =
    activeTier === 'All'
      ? HOTEL_SUITES
      : HOTEL_SUITES.filter((s) => s.tier === activeTier);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardMousePos({ x, y });
    setHoveredCardId(id);
  };

  return (
    <section id="suites" className="py-24 md:py-32 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <SlideUpReveal distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-900/80">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Twenty-Four Architectural Sanctuaries
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Suites, Pavilions & Private Villas
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950/90 backdrop-blur-md border border-neutral-850">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 whitespace-nowrap ${
                    activeTier === tier
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </SlideUpReveal>

        {/* Suites Grid with 3D Perspective Tilt */}
        <StaggerContainer
          staggerChildren={0.14}
          delayChildren={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {filteredSuites.map((suite, idx) => {
            const isHovered = hoveredCardId === suite.id;
            const tiltX = isHovered ? cardMousePos.y * -10 : 0;
            const tiltY = isHovered ? cardMousePos.x * 10 : 0;

            return (
              <StaggerItem key={suite.id}>
                <article
                  onMouseMove={(e) => handleCardMouseMove(e, suite.id)}
                  onMouseLeave={() => {
                    setHoveredCardId(null);
                    setCardMousePos({ x: 0, y: 0 });
                  }}
                  style={{
                    perspective: 1000,
                  }}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  {/* Visual Asset Carrier (Black placeholder with 3D perspective hover physics) */}
                  <div
                    onClick={() => onSelectSuite(suite)}
                    style={{
                      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${isHovered ? 12 : 0}px)`,
                      transition: isHovered
                        ? 'transform 0.12s ease-out'
                        : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="relative w-full aspect-[16/10] bg-[#070707]/95 backdrop-blur-sm border border-neutral-800/90 group-hover:border-neutral-500 transition-colors duration-300 overflow-hidden mb-6 flex flex-col justify-between p-4 md:p-6 shadow-2xl shadow-black/90 will-change-transform"
                  >
                    {/* Scanline pattern */}
                    <div className="absolute inset-0 media-placeholder-pattern opacity-60 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                    {/* Top HUD */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white/40 group-hover:bg-white transition-colors" />
                        <span>SUITE_{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-neutral-700">/</span>
                        <span className="text-white">{suite.tier}</span>
                      </div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-widest">
                        4K Suite Asset Slot
                      </div>
                    </div>

                    {/* Center Icon Wireframe */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-white/10 group-hover:border-white/50 transition-colors duration-300 bg-black/60 backdrop-blur-xs">
                        <Sparkles className="w-6 h-6 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/60" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/60" />
                        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/60" />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/60" />
                      </div>

                      <span className="mt-3 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        {suite.name} Carrier
                      </span>
                    </div>

                    {/* Bottom HUD */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-850 pt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">
                          ${suite.pricePerNight.toLocaleString()}{' '}
                          <span className="text-neutral-500 font-normal">/ Night</span>
                        </span>
                        <span className="text-neutral-700">·</span>
                        <span className="text-neutral-400">{suite.sizeSqm} m²</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-xs uppercase tracking-wider">Inspect Floorplan</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details Block */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                      <span>{suite.capacity}</span>
                      <span aria-hidden="true">·</span>
                      <span>{suite.bedType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{suite.view}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3
                        onClick={() => onSelectSuite(suite)}
                        className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors"
                      >
                        {suite.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookSuite(suite);
                        }}
                        className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-sm text-neutral-400 leading-relaxed font-normal mb-3">
                      {suite.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 font-mono">
                      {suite.highlights.map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <span className="text-neutral-700">✦</span>
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
