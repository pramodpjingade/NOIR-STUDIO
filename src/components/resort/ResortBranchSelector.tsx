import React from 'react';
import { ArrowUpRight, Globe, Thermometer, MapPin, Compass } from 'lucide-react';
import { ResortBranch } from '../../types/resort';
import { RESORT_BRANCHES } from '../../data/resortContent';
import { SlideUpReveal, StaggerContainer, StaggerItem } from '../SlideUpReveal';

interface ResortBranchSelectorProps {
  activeBranch: ResortBranch;
  onSelectBranch: (branch: ResortBranch) => void;
}

export const ResortBranchSelector: React.FC<ResortBranchSelectorProps> = ({
  activeBranch,
  onSelectBranch,
}) => {
  return (
    <section id="destinations" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <SlideUpReveal distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-900">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Worldwide Portfolio
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Five Global Sanctuaries
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Each branch is architecturally bespoke, designed by Pritzker laureates to disappear seamlessly into its unique geographical topography.
            </p>
          </div>
        </SlideUpReveal>

        {/* 5 Branches Interactive Grid */}
        <StaggerContainer
          staggerChildren={0.12}
          delayChildren={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {RESORT_BRANCHES.map((branch) => {
            const isActive = branch.id === activeBranch.id;

            return (
              <StaggerItem key={branch.id}>
                <div
                  onClick={() => onSelectBranch(branch)}
                  className={`p-6 md:p-8 border transition-all duration-300 flex flex-col justify-between h-full cursor-pointer relative group ${
                    isActive
                      ? 'bg-neutral-900 border-white shadow-2xl ring-1 ring-white/20'
                      : 'bg-black/60 border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900/50'
                  }`}
                >
                  {/* Top Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4 pb-3 border-b border-neutral-850">
                      <span className="flex items-center gap-1.5 text-white font-medium">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{branch.city}, {branch.country}</span>
                      </span>
                      <span className="tabular-nums text-neutral-300">{branch.temperature}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-neutral-200 transition-colors">
                      {branch.name}
                    </h3>

                    <p className="text-xs text-neutral-400 line-clamp-3 mb-6 leading-relaxed">
                      {branch.description}
                    </p>

                    {/* Technical stats */}
                    <div className="space-y-1.5 text-[11px] font-mono text-neutral-400 mb-6 bg-black/40 p-3 border border-neutral-850/80">
                      <div className="flex justify-between">
                        <span>Elevation:</span>
                        <span className="text-neutral-200">{branch.altitude}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Climate:</span>
                        <span className="text-neutral-200">{branch.climate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Arrival Transit:</span>
                        <span className="text-neutral-200 truncate max-w-[150px]">{branch.flightHub}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-4 border-t border-neutral-850 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-neutral-400 uppercase">From</div>
                      <div className="text-sm font-bold text-white font-mono">
                        ${branch.startingRate.toLocaleString()}{' '}
                        <span className="text-xs text-neutral-400 font-normal">/ night</span>
                      </div>
                    </div>

                    <div
                      className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-white text-black font-semibold'
                          : 'bg-neutral-900 text-neutral-300 group-hover:bg-neutral-800'
                      }`}
                    >
                      <span>{isActive ? 'Active Branch' : 'Select Branch'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
