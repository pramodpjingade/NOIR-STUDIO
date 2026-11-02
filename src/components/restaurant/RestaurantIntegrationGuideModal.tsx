import React, { useEffect } from 'react';
import { X, Flame, Utensils, Cpu, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface RestaurantIntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RestaurantIntegrationGuideModal: React.FC<RestaurantIntegrationGuideModalProps> = ({
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
            <Flame className="w-4 h-4 text-white" />
            <span>Restaurant & Reservation Platform Integration Architecture</span>
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
            How This Architecture Powers Michelin-Caliber Restaurants
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            From two-star tasting counters to global hospitality groups, this framework provides sub-200ms latency, 3D scroll physics, and instant API integration with modern restaurant reservation engines and POS hardware.
          </p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card 1 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>1. Reservation Engine Integration (SevenRooms, Resy, Tock)</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The `TableReservationDrawer` connects seamlessly with leading table management APIs:
              <span className="block mt-1 font-mono text-[11px] text-neutral-300">
                • SevenRooms REST API (Direct table inventory & guest profiles)<br />
                • Resy OS Webhook Sync (Real-time seat availability)<br />
                • Tock API (Pre-paid tasting menu tickets & cancellation policies)<br />
                • OpenTable GuestCenter API
              </span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>2. Visual Asset Carriers → 4K Plating & Hearth Video</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The black placeholder carriers (`HeroBanner` and `RestaurantMenu`) are built for drop-in high-speed culinary media:
              drop in 60 FPS ProRes clips of binchotan embers, broth pouring, and micro-herb tweezing. All 3D tilt hover physics and HUD overlays adapt automatically.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>3. Live Point-of-Sale (POS) & Wine Inventory Sync</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The Sommelier Pairing data dynamically queries live cellar inventories from POS systems (Toast, Lightspeed, or Revel). When a rare Burgundy bottle is sold out, the pairing automatically updates across all dish inspection modals.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 bg-black border border-neutral-850 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>4. Real-time Service Sittings & Timezone Synchronization</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              The live dual clocks for Tokyo (Ginza) and Paris (Saint-Germain) compute current table service status (e.g., "Lunch Service in Progress" vs "Dark for Foraging"), informing guests when the next reservation batch unlocks.
            </p>
          </div>
        </div>

        {/* Component Mapping */}
        <div className="p-5 bg-neutral-900/60 border border-neutral-800 mb-8 font-mono text-xs text-neutral-300">
          <div className="text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
            Restaurant Component Mapping
          </div>
          <div className="space-y-1.5 text-neutral-300">
            <div className="flex justify-between border-b border-neutral-800 pb-1 text-white">
              <span>Studio Component</span>
              <span>Restaurant Web Component</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Hero & HeroBanner</span>
              <span>Live Binchotan Fire Hearth Master Reel</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">FeaturedWorks</span>
              <span>Eight-Course Degustation Tasting Menu</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">Capabilities</span>
              <span>Hearth, Fermentation Lab & Curated Cellar</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral-400">InquiryDrawer</span>
              <span>TableReservationDrawer (Time Slot, Tier, Wine Pairing)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
          >
            Explore Restaurant Demo
          </button>
        </div>
      </div>
    </div>
  );
};
