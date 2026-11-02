import React, { useState } from 'react';
import { ArrowRight, Check, Droplets, Utensils, Compass, Coffee } from 'lucide-react';
import { HOTEL_EXPERIENCES } from '../../data/hotelContent';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

export const HotelAmenities: React.FC = () => {
  const [activeExpId, setActiveExpId] = useState<string>(HOTEL_EXPERIENCES[0].id);

  const activeExp =
    HOTEL_EXPERIENCES.find((e) => e.id === activeExpId) || HOTEL_EXPERIENCES[0];

  const getIcon = (idx: string) => {
    switch (idx) {
      case '01':
        return <Droplets className="w-5 h-5 text-white" />;
      case '02':
        return <Utensils className="w-5 h-5 text-white" />;
      case '03':
        return <Compass className="w-5 h-5 text-white" />;
      case '04':
        return <Coffee className="w-5 h-5 text-white" />;
      default:
        return <Droplets className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section id="experiences" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <SlideUpReveal distance={36} className="max-w-2xl mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
            The Estate Experience
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Centuries of geothermal wellness and gastronomic mastery.
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed">
            Every moment at The Sanctuary is choreographed around restorative silence, pristine forest air, and sensory immersion.
          </p>
        </SlideUpReveal>

        {/* Asymmetric Experiences Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Selector List (Staggered Slide-up) */}
          <StaggerContainer staggerChildren={0.1} delayChildren={0.1} className="lg:col-span-5 flex flex-col space-y-3">
            {HOTEL_EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeExpId;
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
          <SlideUpReveal delay={0.2} distance={48} className="lg:col-span-7">
            <div className="bg-black border border-neutral-800 p-8 md:p-12 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-neutral-850">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800">
                      {getIcon(activeExp.index)}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                        Estate Journey {activeExp.index}
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
                    Signature Amenities & Features
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeExp.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-neutral-300"
                      >
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Schedule Strip */}
              <div className="pt-6 border-t border-neutral-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
                <span className="uppercase tracking-widest text-neutral-400">Guest Access</span>
                <span className="text-white">{activeExp.schedule}</span>
              </div>
            </div>
          </SlideUpReveal>
        </div>
      </div>
    </section>
  );
};
