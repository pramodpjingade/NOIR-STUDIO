import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sparkles, MapPin } from 'lucide-react';
import { ResortBranch, ResortVilla } from '../../types/resort';
import { RESORT_VILLAS } from '../../data/resortContent';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

interface ResortVillasProps {
  activeBranch: ResortBranch;
  onSelectVilla: (villa: ResortVilla) => void;
  onBookVilla: (villa: ResortVilla) => void;
}

export const ResortVillas: React.FC<ResortVillasProps> = ({
  activeBranch,
  onSelectVilla,
  onBookVilla,
}) => {
  const [activeTier, setActiveTier] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const branchVillas = RESORT_VILLAS.filter((v) => v.branchId === activeBranch.id);

  const tiers = ['All', 'Signature Villa', 'Penthouse', 'Horizon Sanctuary'];
  const filteredVillas =
    activeTier === 'All'
      ? branchVillas
      : branchVillas.filter((v) => v.tier === activeTier);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardMousePos({ x, y });
    setHoveredCardId(id);
  };

  return (
    <section id="villas" className="py-24 md:py-32 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <SlideUpReveal distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-900/80">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Accommodations in {activeBranch.city}, {activeBranch.country}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Villas, Penthouses & Pavilions
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

        {/* Villas Grid with 3D Perspective Tilt */}
        <StaggerContainer
          staggerChildren={0.14}
          delayChildren={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {filteredVillas.map((villa, idx) => {
            const isHovered = hoveredCardId === villa.id;
            const tiltX = isHovered ? cardMousePos.y * -10 : 0;
            const tiltY = isHovered ? cardMousePos.x * 10 : 0;

            return (
              <StaggerItem key={villa.id}>
                <article
                  onMouseMove={(e) => handleCardMouseMove(e, villa.id)}
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
                    onClick={() => onSelectVilla(villa)}
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
                        <span>{activeBranch.city.toUpperCase()}_{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-neutral-700">/</span>
                        <span className="text-white">{villa.tier}</span>
                      </div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-widest">
                        Villa Asset Slot
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
                        {villa.name}
                      </span>
                    </div>

                    {/* Bottom HUD */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-850 pt-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">
                          ${villa.pricePerNight.toLocaleString()}{' '}
                          <span className="text-neutral-500 font-normal">/ Night</span>
                        </span>
                        <span className="text-neutral-700">·</span>
                        <span className="text-neutral-400">{villa.sizeSqm} m²</span>
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
                      <span>{villa.capacity}</span>
                      <span aria-hidden="true">·</span>
                      <span>{villa.bedType}</span>
                      <span aria-hidden="true">·</span>
                      <span>{villa.view}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3
                        onClick={() => onSelectVilla(villa)}
                        className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors"
                      >
                        {villa.name}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookVilla(villa);
                        }}
                        className="px-4 py-2 bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors shrink-0 flex items-center gap-1.5"
                      >
                        <span>Reserve</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-sm text-neutral-400 leading-relaxed font-normal mb-3">
                      {villa.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 font-mono">
                      {villa.highlights.map((h, i) => (
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
