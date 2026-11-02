import React, { useState } from 'react';
import { ArrowRight, Check, Compass, Code2, Box, Palette } from 'lucide-react';
import { CAPABILITIES } from '../data/content';
import { SlideUpReveal, StaggerContainer, StaggerItem } from './SlideUpReveal';

export const Capabilities: React.FC = () => {
  const [activeCapId, setActiveCapId] = useState<string>(CAPABILITIES[0].id);

  const activeCap =
    CAPABILITIES.find((c) => c.id === activeCapId) || CAPABILITIES[0];

  const getIcon = (idx: string) => {
    switch (idx) {
      case '01':
        return <Palette className="w-5 h-5 text-white" />;
      case '02':
        return <Compass className="w-5 h-5 text-white" />;
      case '03':
        return <Box className="w-5 h-5 text-white" />;
      case '04':
        return <Code2 className="w-5 h-5 text-white" />;
      default:
        return <Code2 className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Heading (Slide-up reveal) */}
        <SlideUpReveal distance={36} className="max-w-2xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            Areas of Excellence
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering artful motion with mathematical precision.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            We bridge high-concept art direction with cutting-edge browser performance. No heavy boilerplate, no sluggish interactions.
          </p>
        </SlideUpReveal>

        {/* Asymmetric Capabilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Service Selector List (Staggered Slide-up) */}
          <StaggerContainer staggerChildren={0.1} delayChildren={0.1} className="lg:col-span-5 flex flex-col space-y-3">
            {CAPABILITIES.map((cap) => {
              const isActive = cap.id === activeCapId;
              return (
                <StaggerItem key={cap.id}>
                  <button
                    onClick={() => setActiveCapId(cap.id)}
                    className={`w-full group text-left p-6 border transition-all duration-200 ${
                      isActive
                        ? 'bg-neutral-900 border-neutral-700 shadow-xl'
                        : 'bg-black/40 border-neutral-850 hover:border-neutral-750 hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-neutral-400 font-semibold tracking-wider">
                        {cap.index}.
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
                      {cap.title}
                    </h3>
                    <p className="mt-2 text-xs text-neutral-400 line-clamp-2">
                      {cap.tagline}
                    </p>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right Column: Detailed Capability Showcase Bento Box (Slide-up reveal) */}
          <SlideUpReveal delay={0.2} distance={48} className="lg:col-span-7">
            <div className="bg-black border border-neutral-800 p-8 md:p-12 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
              {/* Top metadata badge */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-850">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800">
                      {getIcon(activeCap.index)}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        Practice Module {activeCap.index}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {activeCap.title}
                      </h4>
                    </div>
                  </div>
                </div>

                {/* Tagline & Deep Summary */}
                <div className="mb-8">
                  <p className="text-lg md:text-xl text-neutral-200 font-medium leading-relaxed mb-4">
                    "{activeCap.tagline}"
                  </p>
                  <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-normal">
                    {activeCap.summary}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="mb-8">
                  <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
                    Core Deliverables & Outputs
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeCap.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-neutral-300"
                      >
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Toolchain Strip */}
              <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                  Toolchain
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeCap.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-[11px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SlideUpReveal>
        </div>
      </div>
    </section>
  );
};
