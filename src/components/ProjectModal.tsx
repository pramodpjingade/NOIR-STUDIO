import React, { useEffect } from 'react';
import { X, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenInquiry,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl p-6 md:p-10 my-auto text-white select-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-850">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span>Project Brief</span>
            <span className="text-neutral-700">·</span>
            <span>{project.category}</span>
            <span className="text-neutral-700">·</span>
            <span className="text-white">{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Project Title & Client Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-2">
            {project.title}
          </h2>
          <p className="text-sm md:text-base font-mono text-neutral-400">
            Commissioned by <span className="text-white">{project.client}</span>
          </p>
        </div>

        {/* Large Black Visual Asset Placeholder Canvas */}
        <div className="relative w-full aspect-[16/9] bg-[#070707] border border-neutral-800 mb-8 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
          <div className="absolute inset-0 media-placeholder-pattern opacity-80 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>CARRIER // 4K 16:9 REEL</span>
            <span className="text-neutral-400">{project.stats.label}: {project.stats.value}</span>
          </div>

          <div className="relative z-10 my-auto text-center flex flex-col items-center">
            <div className="w-16 h-16 border border-white/20 flex items-center justify-center bg-black/60 mb-3">
              <Cpu className="w-8 h-8 text-neutral-300" />
            </div>
            <div className="text-sm font-medium text-white tracking-wide">
              {project.title} — Cinematic Asset Slot
            </div>
            <div className="text-xs text-neutral-400 font-mono mt-1">
              Black visual placeholder reserved for high-res production assets
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-neutral-850 pt-3">
            <span>CHOREOGRAPHY: 60 FPS</span>
            <span>STATUS: DELIVERED</span>
          </div>
        </div>

        {/* Narrative & Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8 pb-8 border-b border-neutral-850">
          <div className="md:col-span-7">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Overview & Objectives
            </h4>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
              {project.description} We structured the creative execution around frictionless spatial hierarchy, bespoke responsive interactions, and instant perceptual feedback.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-400">
            Ready to build something alike?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors whitespace-nowrap"
            >
              <span>Inquire Similar Scope</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
