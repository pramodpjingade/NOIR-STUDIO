import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Layers } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/content';
import { SlideUpReveal, StaggerContainer, StaggerItem } from './SlideUpReveal';

interface FeaturedWorksProps {
  scrollProgress?: number;
  onSelectProject: (project: Project) => void;
}

export const FeaturedWorks: React.FC<FeaturedWorksProps> = ({
  scrollProgress = 0,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [cardMousePos, setCardMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const categories = [
    'All',
    'Creative Direction',
    'Interactive 3D',
    'Motion Identity',
    'Editorial Commerce',
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardMousePos({ x, y });
    setHoveredCardId(id);
  };

  return (
    <section id="works" className="py-24 md:py-32 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header (Slide-up reveal) */}
        <SlideUpReveal distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-900/80">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Portfolio 2024–2026
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Selected Works & Case Studies
              </h2>
            </div>

            {/* Functional interactive category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950/90 backdrop-blur-md border border-neutral-850 rounded-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors duration-200 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-white text-black font-semibold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </SlideUpReveal>

        {/* Projects Grid with Staggered Slide-Up Entrance */}
        <StaggerContainer
          staggerChildren={0.14}
          delayChildren={0.08}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredCardId === project.id;
            const tiltX = isHovered ? cardMousePos.y * -10 : 0;
            const tiltY = isHovered ? cardMousePos.x * 10 : 0;

            return (
              <StaggerItem key={project.id}>
                <article
                  onClick={() => onSelectProject(project)}
                  onMouseMove={(e) => handleCardMouseMove(e, project.id)}
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
                    style={{
                      transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${isHovered ? 12 : 0}px)`,
                      transition: isHovered
                        ? 'transform 0.12s ease-out'
                        : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="relative w-full aspect-[16/10] bg-[#070707]/95 backdrop-blur-sm border border-neutral-800/90 group-hover:border-neutral-500 transition-colors duration-300 overflow-hidden mb-6 flex flex-col justify-between p-4 md:p-6 shadow-2xl shadow-black/90 will-change-transform"
                  >
                    {/* Subtle scanline and grid background pattern */}
                    <div className="absolute inset-0 media-placeholder-pattern opacity-60 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Carrier HUD metadata */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 tracking-wider">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-white/40 group-hover:bg-white transition-colors" />
                        <span>REF_{String(idx + 1).padStart(2, '0')}</span>
                        <span className="text-neutral-700">/</span>
                        <span className="text-neutral-400">{project.aspectRatio}</span>
                      </div>
                      <div className="text-[10px] uppercase text-neutral-400 tracking-widest">
                        Asset Slot
                      </div>
                    </div>

                    {/* Center Kinetic Wireframe / Placeholder Graphic */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center border border-white/10 group-hover:border-white/50 transition-colors duration-300 bg-black/60 backdrop-blur-xs">
                        <Layers className="w-6 h-6 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        {/* Animated corner accents on hover */}
                        <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/60" />
                        <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/60" />
                        <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/60" />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/60" />
                      </div>

                      <span className="mt-3 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Visual Asset Holder
                      </span>
                    </div>

                    {/* Bottom Carrier HUD metadata & Hover Action Banner */}
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-850 pt-3">
                      <span className="text-neutral-400 font-medium">
                        {project.stats.label}: <span className="text-white tabular-nums">{project.stats.value}</span>
                      </span>

                      <div className="flex items-center gap-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-xs uppercase tracking-wider">Inspect Brief</span>
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Text Block & Content Metadata */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
                      <span>{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-neutral-200 transition-colors">
                        {project.title}
                      </h3>
                      <div className="p-2 border border-neutral-850 text-neutral-400 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-200 shrink-0">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-neutral-400 leading-relaxed font-normal">
                      {project.description}
                    </p>

                    {/* Deliverables summary */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400 font-mono">
                      {project.deliverables.map((d, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5">
                          <span className="text-neutral-700">/</span>
                          <span>{d}</span>
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
