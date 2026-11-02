import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Send, ChevronDown, Check, Sparkles, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { ResortBranch } from '../../types/resort';
import { RESORT_BRANCHES } from '../../data/resortContent';

export interface SearchBookingParams {
  branch: ResortBranch;
  destinationLabel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

interface FloatingSearchNavProps {
  activeBranch: ResortBranch;
  onSelectBranch: (branch: ResortBranch) => void;
  onSearch: (params: SearchBookingParams) => void;
  className?: string;
  isFloatingDock?: boolean;
}

export const FloatingSearchNav: React.FC<FloatingSearchNavProps> = ({
  activeBranch,
  onSelectBranch,
  onSearch,
  className = '',
  isFloatingDock = false,
}) => {
  // Active active destination label (default matches screenshot: 'Qatar', synced to activeBranch)
  const [destinationLabel, setDestinationLabel] = useState<string>(activeBranch.city || 'Qatar');
  const [isEditingDestination, setIsEditingDestination] = useState<boolean>(false);
  const [customDestinationInput, setCustomDestinationInput] = useState<string>(activeBranch.city || 'Qatar');

  // Dates state
  const [checkIn, setCheckIn] = useState<string>('2026-11-20');
  const [checkOut, setCheckOut] = useState<string>('2026-11-25');

  // Visitors state
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [roomsCount, setRoomsCount] = useState<number>(1);

  // Active open popover panel
  const [activePopover, setActivePopover] = useState<'destination' | 'checkin' | 'checkout' | 'visitors' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync destinationLabel when activeBranch changes externally
  useEffect(() => {
    setDestinationLabel(activeBranch.city);
    setCustomDestinationInput(activeBranch.city);
  }, [activeBranch]);

  // Click outside listener to close popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePopover(null);
        setIsEditingDestination(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBranchSelect = (branch: ResortBranch) => {
    onSelectBranch(branch);
    setDestinationLabel(branch.city);
    setCustomDestinationInput(branch.city);
    setActivePopover(null);
  };

  const handleCustomDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customDestinationInput.trim()) {
      setDestinationLabel(customDestinationInput.trim());
      setIsEditingDestination(false);
      setActivePopover(null);
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Add date';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const handleSearchClick = () => {
    setActivePopover(null);
    onSearch({
      branch: activeBranch,
      destinationLabel,
      checkIn,
      checkOut,
      guests: guestsCount,
    });
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-5xl mx-auto ${className}`}>
      {/* Outer White Capsule Pill Bar */}
      <div
        className={`bg-white text-black rounded-3xl md:rounded-full shadow-2xl shadow-black/50 border border-neutral-200/90 p-2 md:p-3 md:px-7 transition-all duration-300 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 md:gap-4 ${
          isFloatingDock ? 'backdrop-blur-xl bg-white/95 ring-1 ring-black/5' : ''
        }`}
      >
        {/* SEGMENT 1: DESTINATION (MapPin + "Qatar" / "Kyoto" + "Choose the destination") */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'destination' ? null : 'destination')}
            className={`w-full flex items-center gap-3.5 px-3 py-2 md:px-4 md:py-2 text-left rounded-2xl md:rounded-full transition-all duration-200 cursor-pointer ${
              activePopover === 'destination' ? 'bg-neutral-100 shadow-inner' : 'hover:bg-neutral-50'
            }`}
          >
            <div className="shrink-0 text-neutral-600">
              <MapPin className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[15px] md:text-base font-bold text-neutral-900 tracking-tight leading-snug truncate flex items-center gap-1.5">
                {destinationLabel}
                <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
              </span>
              <span className="text-xs text-neutral-500 font-normal leading-tight truncate">
                Choose the destination
              </span>
            </div>
          </button>

          {/* DESTINATION POPOVER */}
          {activePopover === 'destination' && (
            <div className="absolute top-full left-0 mt-3 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-3">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                  Select Sanctuary Branch
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingDestination(!isEditingDestination)}
                  className="text-xs font-medium text-neutral-600 hover:text-black underline underline-offset-2"
                >
                  {isEditingDestination ? 'View branches' : 'Custom name'}
                </button>
              </div>

              {isEditingDestination ? (
                <form onSubmit={handleCustomDestinationSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs text-neutral-500 mb-1">Alter Destination Name:</label>
                    <input
                      type="text"
                      value={customDestinationInput}
                      onChange={(e) => setCustomDestinationInput(e.target.value)}
                      placeholder="e.g. Qatar, Dubai, French Riviera..."
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-black"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-neutral-800 transition-colors"
                    >
                      Apply Destination Name
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {RESORT_BRANCHES.map((b) => {
                    const isSelected = activeBranch.id === b.id || destinationLabel === b.city;
                    return (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => handleBranchSelect(b)}
                        className={`p-2.5 text-left rounded-xl border transition-all duration-150 flex items-start justify-between gap-1 ${
                          isSelected
                            ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                            : 'bg-neutral-50 text-neutral-900 border-neutral-200/80 hover:bg-neutral-100'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold leading-tight">{b.city}</div>
                          <div className={`text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {b.country} · {b.temperature}
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Subtle Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-neutral-200 shrink-0" />

        {/* SEGMENT 2: CHECK IN (Calendar + "Check in" + "Add date") */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'checkin' ? null : 'checkin')}
            className={`w-full flex items-center gap-3.5 px-3 py-2 md:px-4 md:py-2 text-left rounded-2xl md:rounded-full transition-all duration-200 cursor-pointer ${
              activePopover === 'checkin' ? 'bg-neutral-100 shadow-inner' : 'hover:bg-neutral-50'
            }`}
          >
            <div className="shrink-0 text-neutral-600">
              <Calendar className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[15px] md:text-base font-bold text-neutral-900 tracking-tight leading-snug truncate">
                Check in
              </span>
              <span className="text-xs text-neutral-500 font-normal leading-tight truncate">
                {checkIn ? formatDisplayDate(checkIn) : 'Add date'}
              </span>
            </div>
          </button>

          {/* CHECK IN POPOVER */}
          {activePopover === 'checkin' && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-3">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                  Select Check-in Date
                </span>
                <span className="text-xs font-medium text-neutral-600">{formatDisplayDate(checkIn)}</span>
              </div>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setActivePopover('checkout');
                }}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-black mb-3"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setCheckIn(today);
                    setActivePopover('checkout');
                  }}
                  className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-medium rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCheckIn('2026-11-20');
                    setActivePopover('checkout');
                  }}
                  className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-medium rounded-lg transition-colors"
                >
                  Nov 20, 2026
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subtle Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-neutral-200 shrink-0" />

        {/* SEGMENT 3: CHECK OUT (Calendar + "Check out" + "Add date") */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'checkout' ? null : 'checkout')}
            className={`w-full flex items-center gap-3.5 px-3 py-2 md:px-4 md:py-2 text-left rounded-2xl md:rounded-full transition-all duration-200 cursor-pointer ${
              activePopover === 'checkout' ? 'bg-neutral-100 shadow-inner' : 'hover:bg-neutral-50'
            }`}
          >
            <div className="shrink-0 text-neutral-600">
              <Calendar className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[15px] md:text-base font-bold text-neutral-900 tracking-tight leading-snug truncate">
                Check out
              </span>
              <span className="text-xs text-neutral-500 font-normal leading-tight truncate">
                {checkOut ? formatDisplayDate(checkOut) : 'Add date'}
              </span>
            </div>
          </button>

          {/* CHECK OUT POPOVER */}
          {activePopover === 'checkout' && (
            <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 mb-3">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                  Select Check-out Date
                </span>
                <span className="text-xs font-medium text-neutral-600">{formatDisplayDate(checkOut)}</span>
              </div>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setActivePopover(null);
                }}
                className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono text-neutral-900 focus:outline-none focus:border-black mb-3"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCheckOut('2026-11-25');
                    setActivePopover(null);
                  }}
                  className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-medium rounded-lg transition-colors"
                >
                  5 Nights (Nov 25)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCheckOut('2026-11-27');
                    setActivePopover(null);
                  }}
                  className="flex-1 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-medium rounded-lg transition-colors"
                >
                  7 Nights (Nov 27)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subtle Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-neutral-200 shrink-0" />

        {/* SEGMENT 4: VISITORS (Users + "Visitors" + "Add guests") */}
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setActivePopover(activePopover === 'visitors' ? null : 'visitors')}
            className={`w-full flex items-center gap-3.5 px-3 py-2 md:px-4 md:py-2 text-left rounded-2xl md:rounded-full transition-all duration-200 cursor-pointer ${
              activePopover === 'visitors' ? 'bg-neutral-100 shadow-inner' : 'hover:bg-neutral-50'
            }`}
          >
            <div className="shrink-0 text-neutral-600">
              <Users className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div className="flex flex-col min-w-0 pr-1">
              <span className="text-[15px] md:text-base font-bold text-neutral-900 tracking-tight leading-snug truncate">
                Visitors
              </span>
              <span className="text-xs text-neutral-500 font-normal leading-tight truncate">
                {guestsCount > 0 ? `${guestsCount} Guest${guestsCount > 1 ? 's' : ''}` : 'Add guests'}
              </span>
            </div>
          </button>

          {/* VISITORS POPOVER */}
          {activePopover === 'visitors' && (
            <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="pb-2 border-b border-neutral-100 mb-3">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                  Sanctuary Visitors
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Adults & Guests</div>
                    <div className="text-[10px] text-neutral-500">Ages 12+</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={guestsCount <= 1}
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{guestsCount}</span>
                    <button
                      type="button"
                      disabled={guestsCount >= 8}
                      onClick={() => setGuestsCount(Math.min(8, guestsCount + 1))}
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                  <div>
                    <div className="text-xs font-bold text-neutral-900">Villas / Suites</div>
                    <div className="text-[10px] text-neutral-500">Private residences</div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={roomsCount <= 1}
                      onClick={() => setRoomsCount(Math.max(1, roomsCount - 1))}
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{roomsCount}</span>
                    <button
                      type="button"
                      disabled={roomsCount >= 4}
                      onClick={() => setRoomsCount(Math.min(4, roomsCount + 1))}
                      className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePopover(null)}
                  className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors mt-2"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FAR RIGHT: CIRCULAR BLACK BUTTON WITH ANGLED NAVIGATION ARROW */}
        <div className="shrink-0 flex items-center justify-center pt-1 md:pt-0">
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Search destination and check availability"
            className="w-12 h-12 md:w-12 md:h-12 bg-black hover:bg-neutral-800 text-white rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-lg cursor-pointer group"
            title={`Check Availability for ${destinationLabel}`}
          >
            {/* Angled navigation arrowhead / paper plane icon exactly matching screenshot */}
            <Send className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
};
