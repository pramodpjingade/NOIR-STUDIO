import React, { useEffect } from 'react';
import { X, CheckCircle2, Layers, Cpu, Code2, Sparkles, ArrowRight } from 'lucide-react';

interface IntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationGuideModal: React.FC<IntegrationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 shadow-2xl p-6 md:p-10 my-auto text-white select-text max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-850">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-white" />
            <span>Hotel Integration Blueprint & Architectural Mapping</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            How This Website Integrates With Luxury Hotel Platforms
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            This demo demonstrates how the exact same 3D spatial scroll engine, cinematic video banner, and modular animation system map directly into a high-converting, ultra-luxury hospitality experience.
          </p>
        </div>

        {/* 4 Pillars of Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Item 1 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>1. Visual Asset Carriers → 4K Drone & Interior Video</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The black placeholder carriers (`HeroBanner` and `HotelSuites`) have standard aspect ratios (16:9, 16:10, 4:3). When your creative assets arrive, simply drop your 4K MP4 loops or WebP photos into the slot—all 3D cursor tilt, timecode HUDs, and scanline overlays remain functional.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>2. 3D Spatial Reactor → Estate Map / 3D Floorplans</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The Three.js `SpatialScrollScene` running in the background can be swapped with a 3D topographic terrain map of the hotel estate or interactive 3D suite floorplans that rotate and zoom as the user scrolls between pavilions.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>3. Reservation Engine Integration (PMS APIs)</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The `BookingDrawer` connects via REST/GraphQL API to hotel booking engines:
              <span className="block mt-1 font-mono text-[11px] text-neutral-300">
                • SynXis / Sabre Hospitality API<br />
                • Oracle Opera Cloud (OHIP REST API)<br />
                • Cloudbeds / Mews API<br />
                • Stripe Checkout for direct deposit holds
              </span>
            </p>
          </div>

          {/* Item 4 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>4. Dynamic Terroir Clocks & Local Weather</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The synchronized time and weather counters in the footer and hero show guests the exact local time and mist/snow conditions at each estate destination in real time.
            </p>
          </div>
        </div>

        {/* Code Architecture Mapping */}
        <div className="p-5 bg-neutral-900/60 border border-neutral-800 mb-8 font-mono text-xs text-neutral-300">
          <div className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
            Component Mapping Table
          </div>
          <div className="space-y-1.5 text-neutral-300">
            <div className="flex justify-between border-b border-neutral-800 pb-1 text-white">
              <span>Studio Component</span>
              <span>Hotel Web Component</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Hero & HeroBanner</span>
              <span>Estate Master Suite & Drone Reel</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">FeaturedWorks (Projects)</span>
              <span>HotelSuites (Villas, Penthouses, Rates)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Capabilities (Practice)</span>
              <span>HotelAmenities (Thermal Spa, Michelin Kaiseki)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Philosophy (Manifesto)</span>
              <span>Architectural Heritage & Biophilic Design</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">InquiryDrawer</span>
              <span>BookingDrawer (Live Nights, Guests & Voucher)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
          >
            Explore Hotel Demo
          </button>
        </div>
      </div>
    </div>
  );
};
