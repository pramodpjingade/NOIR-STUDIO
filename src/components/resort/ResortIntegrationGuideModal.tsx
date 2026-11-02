import React, { useEffect } from 'react';
import { X, Globe, Compass, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface ResortIntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResortIntegrationGuideModal: React.FC<ResortIntegrationGuideModalProps> = ({
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
            <Globe className="w-4 h-4 text-white" />
            <span>Multi-Property Resort Group Architecture Blueprint</span>
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
            Multi-Branch Architecture for Global Luxury Hospitality
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Operating a single luxury resort brand with branches across multiple cities and continents requires a unified central reservation system (CRS), localized multi-currency pricing, synchronized world clocks, and interactive destination routing.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>1. Central Reservation System (CRS) Multi-Property Sync</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The `ResortBookingDrawer` and `InteractiveItineraryBuilder` connect directly to enterprise multi-property APIs:
              <span className="block mt-1 font-mono text-[11px] text-neutral-300">
                • Oracle Opera Multi-Property Cloud (OHIP)<br />
                • Sabre SynXis Central Reservation Engine<br />
                • Amadeus Hospitality CentralCRS<br />
                • Leading Hotels of the World (LHW) API
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>2. Multi-Currency & Localized Tax Compliance</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time currency conversion across USD, EUR, CHF, and JPY with dynamic calculation of destination-specific levies (Japanese Onsen Tax, Swiss Kurtax, Italian Soggiorno, and Icelandic Carbon Offset).
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>3. Visual Asset Carriers → 4K Drone Sweeps by Branch</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The black placeholder carriers (`HeroBanner` and `ResortVillas`) feature standard 16:9, 16:10, and 4:3 ratios. When your drone aerials and interior photography are ready, simply place your MP4/WebM files in `/public/assets/resort/[branch]/`—all 3D hover physics and HUD overlays remain intact.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>4. Interactive Branch Routing & Dynamic Three.js Lighting</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Selecting Kyoto, Zermatt, Amalfi, Ubud, or Reykjavik reconfigures the page context instantly: updating local timezone clocks, live temperatures, signature villas, and custom itinerary options without full page reloads.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
          >
            Explore Multi-Branch Resort Demo
          </button>
        </div>
      </div>
    </div>
  );
};
