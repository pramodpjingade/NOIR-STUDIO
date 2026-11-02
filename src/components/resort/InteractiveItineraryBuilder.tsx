import React, { useState } from 'react';
import { Sparkles, Calendar, Plus, Check, Compass, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ResortBranch } from '../../types/resort';
import { RESORT_BRANCHES, ITINERARY_ADDONS } from '../../data/resortContent';
import { SlideUpReveal } from '../SlideUpReveal';

interface InteractiveItineraryBuilderProps {
  activeBranch: ResortBranch;
  onSelectBranch: (branch: ResortBranch) => void;
  onOpenBooking: () => void;
}

export const InteractiveItineraryBuilder: React.FC<InteractiveItineraryBuilderProps> = ({
  activeBranch,
  onSelectBranch,
  onOpenBooking,
}) => {
  const [nights, setNights] = useState<number>(5);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'addon-heli',
    'addon-spa',
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const villaCostPerNight = activeBranch.startingRate;
  const baseStayCost = villaCostPerNight * nights;
  const addonsTotal = selectedAddons.reduce((acc, currId) => {
    const item = ITINERARY_ADDONS.find((a) => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);
  const estimatedTotal = baseStayCost + addonsTotal;

  return (
    <section id="itinerary-planner" className="py-24 md:py-32 bg-neutral-950 text-white border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <SlideUpReveal distance={40}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-neutral-900">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                Interactive Customizer
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Bespoke Sanctuary Itinerary Planner
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md">
              Configure your stay across any global branch, select signature experiences, and calculate transparent pricing in real time.
            </p>
          </div>
        </SlideUpReveal>

        {/* Interactive Planner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls: Branch & Stay Length */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Branch Selector */}
            <div className="p-6 bg-black border border-neutral-850">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                Step 1: Choose Resort Destination
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RESORT_BRANCHES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onSelectBranch(b)}
                    className={`p-3 text-left border transition-all text-xs font-mono ${
                      activeBranch.id === b.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    <div className="font-bold">{b.city}</div>
                    <div className="text-[10px] opacity-70">${b.startingRate}/nt</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interactive Length of Stay Slider */}
            <div className="p-6 bg-black border border-neutral-850">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Step 2: Length of Sanctuary Stay
                </label>
                <span className="text-sm font-mono font-bold text-white tabular-nums bg-neutral-900 px-3 py-1 border border-neutral-800">
                  {nights} Nights
                </span>
              </div>

              <input
                type="range"
                min={2}
                max={14}
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-none appearance-none cursor-pointer accent-white"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-2">
                <span>2 Nights (Weekend Retreat)</span>
                <span>7 Nights (Full Reset)</span>
                <span>14 Nights (Grand Residency)</span>
              </div>
            </div>

            {/* 3. Bespoke Experiences Checklist */}
            <div className="p-6 bg-black border border-neutral-850">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                Step 3: Curated Concierge Inclusions
              </label>

              <div className="space-y-3">
                {ITINERARY_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                        isChecked
                          ? 'bg-neutral-900/90 border-neutral-600'
                          : 'bg-neutral-950/60 border-neutral-850 hover:border-neutral-750'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-4 h-4 mt-0.5 border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-white border-white text-black' : 'border-neutral-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white mb-0.5">
                            {addon.title}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold text-white whitespace-nowrap">
                        +${addon.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Summary Bento Box */}
          <div className="lg:col-span-5 bg-black border border-neutral-800 p-8 shadow-2xl relative sticky top-28">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-850">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Live Custom Itinerary
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase bg-neutral-900 border border-neutral-800 px-2 py-0.5 text-neutral-300">
                {activeBranch.city} Branch
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono mb-8">
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Destination:</span>
                <span className="text-white font-semibold">{activeBranch.name}</span>
              </div>

              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Duration:</span>
                <span className="text-white">{nights} Nights (${villaCostPerNight.toLocaleString()}/nt)</span>
              </div>

              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Base Accommodation:</span>
                <span className="text-white">${baseStayCost.toLocaleString()}</span>
              </div>

              {selectedAddons.length > 0 && (
                <div className="border-b border-neutral-850 pb-2 space-y-1">
                  <div className="text-neutral-400">Selected Curated Inclusions:</div>
                  {selectedAddons.map((id) => {
                    const item = ITINERARY_ADDONS.find((a) => a.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between text-neutral-300 text-[11px] pl-2">
                        <span className="truncate max-w-[200px]">· {item.title}</span>
                        <span>${item.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">100% Carbon Offset:</span>
                <span className="text-emerald-400 font-semibold">Complimentary</span>
              </div>

              <div className="pt-2 flex justify-between text-base font-bold text-white">
                <span>Estimated Stay Total:</span>
                <span className="tabular-nums">${estimatedTotal.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors active:scale-[0.98]"
            >
              <span>Lock In Customized Itinerary</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="mt-4 text-center text-[10px] font-mono text-neutral-500">
              Guaranteed best direct rate · Flexible 14-day cancellation policy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
