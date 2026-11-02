import React from 'react';
import { SlideUpReveal } from './SlideUpReveal';

export const MarqueeBanner: React.FC = () => {
  const items1 = [
    'Creative Direction',
    'Interactive Architecture',
    '3D Experiences',
    'Typography in Motion',
    'Spatial Computing',
    'Digital Commerce',
    'Kinetic Design Systems',
  ];

  const items2 = [
    '60 FPS Motion Fidelity',
    'Sub-200ms Latency',
    'Custom GLSL Shaders',
    'Bespoke Interaction Physics',
    'Craft Over Noise',
    'Fluid Micro-interactions',
    'High Performance Web',
  ];

  return (
    <SlideUpReveal distance={30} duration={0.6}>
      <section className="py-8 bg-neutral-950/80 backdrop-blur-xs border-y border-neutral-900 overflow-hidden select-none">
        {/* Track 1: Forward Marquee */}
        <div className="relative flex overflow-x-hidden group mb-4">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs md:text-sm font-mono tracking-widest uppercase text-neutral-400 group-hover:text-neutral-200 transition-colors">
            {items1.concat(items1).concat(items1).map((item, idx) => (
              <React.Fragment key={`t1-${idx}`}>
                <span className="hover:text-white transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-neutral-700">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Track 2: Reverse Marquee */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee-reverse flex items-center gap-8 whitespace-nowrap text-xs md:text-sm font-mono tracking-widest uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
            {items2.concat(items2).concat(items2).map((item, idx) => (
              <React.Fragment key={`t2-${idx}`}>
                <span className="hover:text-white transition-colors cursor-default">
                  {item}
                </span>
                <span className="text-neutral-800">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </SlideUpReveal>
  );
};
