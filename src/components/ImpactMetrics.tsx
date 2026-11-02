import React from 'react';
import { Trophy } from 'lucide-react';
import { STATS } from '../data/content';
import { SlideUpReveal, StaggerContainer, StaggerItem } from './SlideUpReveal';

export const ImpactMetrics: React.FC = () => {
  const accolades = [
    { name: 'Awwwards', count: '8x Site of the Day', year: '2024–2026' },
    { name: 'FWA', count: '5x Site of the Day', year: '2025–2026' },
    { name: 'Red Dot Award', count: 'Best of the Best', year: '2025' },
    { name: 'Webby Awards', count: 'Best Visual Design Nominee', year: '2025' },
  ];

  return (
    <section id="metrics" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header (Slide-up reveal) */}
        <SlideUpReveal distance={36}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-900">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Demonstrated Performance
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Metrics & Quantified Impact
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Every engagement is measured against hard business outcomes: engagement dwell time, organic conversion lift, and benchmark rendering speed.
            </p>
          </div>
        </SlideUpReveal>

        {/* 4 Quantitative Metric Cards (Staggered Slide-up) */}
        <StaggerContainer
          staggerChildren={0.12}
          delayChildren={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {STATS.map((stat, idx) => (
            <StaggerItem key={idx}>
              <div className="p-6 md:p-8 bg-black border border-neutral-850 hover:border-neutral-750 transition-colors flex flex-col justify-between h-full">
                <div className="text-[11px] font-mono text-neutral-400 tracking-wider uppercase mb-6">
                  Metric 0{idx + 1}
                </div>
                <div>
                  <div className="text-3xl md:text-5xl font-bold tracking-tight text-white font-mono tabular-nums mb-3">
                    {stat.metric}
                  </div>
                  <div className="text-sm font-semibold text-neutral-200 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    {stat.sub}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Accolades & Industry Recognition Strip (Slide-up reveal) */}
        <SlideUpReveal delay={0.2} distance={40}>
          <div className="p-8 bg-black/60 border border-neutral-850 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-neutral-900 border border-neutral-800 text-white">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Industry Peer Recognition
                </div>
                <div className="text-base font-bold text-white">
                  Honored by global design juries
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full lg:w-auto">
              {accolades.map((item, i) => (
                <div key={i} className="border-l border-neutral-800 pl-4">
                  <div className="text-xs font-bold text-white tracking-wide">
                    {item.name}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {item.count}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    {item.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideUpReveal>
      </div>
    </section>
  );
};
