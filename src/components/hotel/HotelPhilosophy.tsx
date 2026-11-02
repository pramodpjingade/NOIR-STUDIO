import React, { useState } from 'react';
import { Mountain, Waves, VolumeX, HeartHandshake } from 'lucide-react';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

export const HotelPhilosophy: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      icon: <Mountain className="w-5 h-5" />,
      title: 'Biophilic Integration',
      desc: 'Constructed from local volcanic basalt, charred yakisugi cedar, and natural lime plaster that weather gracefully alongside the ancient forest.',
    },
    {
      icon: <Waves className="w-5 h-5" />,
      title: 'Geothermal Autonomy',
      desc: '100% powered by deep earth thermal currents. All space heating, domestic water, and onsen mineral pools operate with zero carbon emissions.',
    },
    {
      icon: <VolumeX className="w-5 h-5" />,
      title: 'Acoustic Sanctuary',
      desc: 'Engineered for absolute silence. Decibel levels in suites remain under 22 dB, allowing the murmur of mountain streams and pine needles to prevail.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      title: 'Intuitive Omotenashi',
      desc: 'Service that never intrudes yet leaves no desire unanswered. A 4-to-1 staff ratio dedicated to effortless, silent choreography.',
    },
  ];

  return (
    <section id="architecture" className="py-24 md:py-32 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Quote */}
          <SlideUpReveal distance={40} className="lg:col-span-6">
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">
              Architectural Manifesto
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              "We believe profound silence, untouched nature, and thoughtful architecture are the rarest luxuries of modern life."
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed max-w-lg mb-8">
              Conceived in collaboration with Pritzker-laureate architects, The Sanctuary is designed not to impose on the terrain, but to quietly disappear within it.
            </p>

            <div className="inline-flex items-center gap-3 py-2 px-3 bg-neutral-950/80 backdrop-blur-xs border border-neutral-850 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 bg-white" />
              <span>PRINCIPLE: ARCHITECTURE IN DIALOGUE WITH NATURE</span>
            </div>
          </SlideUpReveal>

          {/* Right Interactive Pillars */}
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
                    Sanctuary Principle 0{idx + 1}
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
