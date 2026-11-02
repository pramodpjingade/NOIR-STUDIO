import React, { useState } from 'react';
import { Eye, Zap, Flame, ShieldCheck } from 'lucide-react';
import { SlideUpReveal, StaggerContainer, StaggerItem } from './SlideUpReveal';

export const Philosophy: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Intentional Choreography',
      desc: 'Animations are never superficial embellishments. Every tween, velocity curve, and transition guides user focus and creates spatial orientation.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Sub-16ms Frame Budget',
      desc: 'We engineer exclusively for hardware-accelerated compositor layers (transform, opacity). Zero jank, zero layout thrashing.',
    },
    {
      icon: <Flame className="w-5 h-5" />,
      title: 'Cinematic Visual Hierarchy',
      desc: 'We balance stark obsidian tones with precise typographic hierarchy and tactile feedback, turning passive browsing into an immersive ritual.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: 'Architectural Longevity',
      desc: 'Built on clean TypeScript, standards-compliant CSS, and modular React patterns designed to scale effortlessly without maintenance debt.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Quote & Manifesto (Slide-up reveal) */}
          <SlideUpReveal distance={40} className="lg:col-span-6">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Studio Manifesto
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              "We believe digital products should feel as weighty, tactile, and unforgettable as physical architecture."
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed max-w-lg mb-8">
              In an internet flooded with interchangeable templates and disposable AI noise, we take the opposite stance: rigorous craft, bespoke art direction, and tactile motion that endures.
            </p>

            <div className="inline-flex items-center gap-3 py-2 px-3 bg-neutral-950/80 backdrop-blur-xs border border-neutral-850 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 bg-white" />
              <span>PRINCIPLE: CRAFT IS UNCOMPROMISING</span>
            </div>
          </SlideUpReveal>

          {/* Right Interactive Pillars (Staggered Slide-up) */}
          <StaggerContainer
            staggerChildren={0.12}
            delayChildren={0.15}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {pillars.map((pillar, idx) => (
              <StaggerItem key={idx}>
                <div
                  onMouseEnter={() => setActivePillar(idx)}
                  className={`p-6 border transition-all duration-300 flex flex-col justify-between min-h-[220px] cursor-default ${
                    activePillar === idx
                      ? 'bg-neutral-900 border-neutral-700 shadow-xl'
                      : 'bg-neutral-950/70 backdrop-blur-xs border-neutral-850 hover:border-neutral-750'
                  }`}
                >
                  <div>
                    <div
                      className={`p-2.5 w-fit border mb-4 transition-colors ${
                        activePillar === idx
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                      }`}
                    >
                      {pillar.icon}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase pt-4 border-t border-neutral-850/60">
                    Pillar 0{idx + 1}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};
