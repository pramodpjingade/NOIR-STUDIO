import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Droplets, Mountain, Waves, Sparkles } from 'lucide-react';
import { ResortBranch, BranchExperience } from '../../types/resort';
import { BRANCH_EXPERIENCES } from '../../data/resortContent';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

interface ResortExperiencesProps {
  activeBranch: ResortBranch;
}

export const ResortExperiences: React.FC<ResortExperiencesProps> = ({ activeBranch }) => {
  const experiences = BRANCH_EXPERIENCES.filter((e) => e.branchId === activeBranch.id);
  const [activeExpId, setActiveExpId] = useState<string>(
    experiences.length > 0 ? experiences[0].id : ''
  );

  const activeExp =
    experiences.find((e) => e.id === activeExpId) || (experiences.length > 0 ? experiences[0] : null);

  return (
    <section id="resort-experiences" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <SlideUpReveal distance={36} className="max-w-2xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Curated Experiences in {activeBranch.city}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Immersive wellness and off-grid explorations.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            Every branch features bespoke rituals rooted in centuries of indigenous wisdom, natural thermal springs, and private wilderness expeditions.
          </p>
        </SlideUpReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered List */}
          <StaggerContainer staggerChildren={0.1} delayChildren={0.1} className="lg:col-span-5 flex flex-col space-y-3">
            {experiences.map((exp) => {
              const isActive = exp.id === (activeExp?.id || '');
              return (
                <StaggerItem key={exp.id}>
                  <button
                    onClick={() => setActiveExpId(exp.id)}
                    className={`w-full group text-left p-6 border transition-all duration-200 ${
                      isActive
                        ? 'bg-neutral-900 border-neutral-700 shadow-xl'
                        : 'bg-black/40 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                        {exp.index}.
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-white translate-x-1'
                            : 'text-neutral-600 group-hover:text-neutral-400'
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-lg md:text-xl font-bold tracking-tight transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                      {exp.tagline}
                    </p>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right Column: Detailed Experience Bento Box */}
          {activeExp && (
            <SlideUpReveal delay={0.2} distance={48} className="lg:col-span-7">
              <div className="bg-black border border-neutral-800 p-8 md:p-12 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-850">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-neutral-900 border border-neutral-800">
                        <Compass className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                          {activeBranch.city} Signature Experience {activeExp.index}
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {activeExp.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-lg md:text-xl text-neutral-200 font-medium leading-relaxed mb-4">
                      "{activeExp.tagline}"
                    </p>
                    <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                      {activeExp.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                      Experience Highlights
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeExp.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-neutral-300"
                        >
                          <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Schedule Strip */}
                <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
                  <span className="uppercase tracking-widest text-neutral-400">Access Schedule</span>
                  <span className="text-white">{activeExp.schedule}</span>
                </div>
              </div>
            </SlideUpReveal>
          )}
        </div>
      </div>
    </section>
  );
};
