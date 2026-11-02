import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Shield, Users, CreditCard, Sparkles } from 'lucide-react';
import { HotelSuite } from '../../types/hotel';
import { HOTEL_SUITES } from '../../data/hotelContent';

interface BookingDrawerProps {
  isOpen: boolean;
  selectedSuite: HotelSuite | null;
  onClose: () => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  selectedSuite,
  onClose,
}) => {
  const [suiteId, setSuiteId] = useState<string>(
    selectedSuite ? selectedSuite.id : HOTEL_SUITES[0].id
  );
  const [checkIn, setCheckIn] = useState('2026-11-15');
  const [checkOut, setCheckOut] = useState('2026-11-19');
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [spaPackage, setSpaPackage] = useState(true);
  const [airportTransfer, setAirportTransfer] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedSuite) {
      setSuiteId(selectedSuite.id);
    }
  }, [selectedSuite]);

  if (!isOpen) return null;

  const currentSuite =
    HOTEL_SUITES.find((s) => s.id === suiteId) || HOTEL_SUITES[0];

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(1, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const basePrice = currentSuite.pricePerNight * nights;
  const spaCost = spaPackage ? 450 : 0;
  const transferCost = airportTransfer ? 0 : 0; // Complimentary
  const taxesAndService = Math.round(basePrice * 0.12);
  const totalAmount = basePrice + spaCost + taxesAndService;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please enter your full name and contact email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address for confirmation dispatch.');
      return;
    }

    const code = `SNC-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);
    setIsConfirmed(true);
    setErrorMsg('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-neutral-950 border border-neutral-800 p-6 md:p-10 text-white my-auto select-text shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-850">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Direct Reservation Concierge</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isConfirmed ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 border border-white flex items-center justify-center bg-white text-black mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-1">
              Reservation Voucher Confirmed
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Welcome to The Sanctuary
            </h3>
            <p className="text-xs font-mono text-neutral-300 mb-6 bg-neutral-900 border border-neutral-800 px-4 py-2">
              BOOKING REF: <span className="text-white font-bold">{confirmationCode}</span>
            </p>

            <div className="w-full max-w-md bg-black border border-neutral-800 p-6 text-left mb-8 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Guest:</span>
                <span className="text-white font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Sanctuary:</span>
                <span className="text-white">{currentSuite.name}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Dates:</span>
                <span className="text-white">{checkIn} → {checkOut} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Total Investment:</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Helicopter Arrival:</span>
                <span className="text-white">{airportTransfer ? 'Scheduled (Complimentary)' : 'Standard'}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed mb-6 font-mono">
              A bespoke itinerary and personal butler contact have been dispatched to {email}.
            </p>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
            >
              Close Voucher
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
                Reserve Your Private Sanctuary
              </h2>
              <p className="text-xs text-neutral-400">
                Guaranteed best rate, direct estate concierge contact, and complimentary helicopter transfer included.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-300 font-mono">
                {errorMsg}
              </div>
            )}

            {/* Suite Selection */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Selected Suite / Villa
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {HOTEL_SUITES.map((suite) => (
                  <button
                    type="button"
                    key={suite.id}
                    onClick={() => setSuiteId(suite.id)}
                    className={`text-left p-3 border transition-colors ${
                      suiteId === suite.id
                        ? 'bg-white text-black border-white'
                        : 'bg-neutral-900/80 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight mb-1">
                      {suite.name}
                    </div>
                    <div className="text-[11px] font-mono flex items-center justify-between">
                      <span>{suite.sizeSqm} m²</span>
                      <span className="font-semibold">${suite.pricePerNight} / night</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dates & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Check-In *
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Check-Out *
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Guests *
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value={1}>1 Guest (Solo Retreat)</option>
                  <option value={2}>2 Guests (Couple)</option>
                  <option value={4}>4 Guests (Family/Group)</option>
                  <option value={6}>6 Guests (Villa Exclusive)</option>
                </select>
              </div>
            </div>

            {/* Guest Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Primary Guest Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Lord Sterling Vance"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Work / Contact Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@sanctuary-residence.com"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Curated Inclusions */}
            <div className="p-4 bg-neutral-900/50 border border-neutral-850 space-y-2.5">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Concierge Inclusions
              </div>
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={airportTransfer}
                  onChange={(e) => setAirportTransfer(e.target.checked)}
                  className="accent-white cursor-pointer"
                />
                <span>Private Helicopter Transfer from KIX / GVA (Complimentary)</span>
              </label>
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={spaPackage}
                  onChange={(e) => setSpaPackage(e.target.checked)}
                  className="accent-white cursor-pointer"
                />
                <span>Subterranean Thermal Bath & Sound Immersion Pass (+$450 total)</span>
              </label>
            </div>

            {/* Live Pricing Breakdown */}
            <div className="p-4 bg-black border border-neutral-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>
                  {currentSuite.name} (${currentSuite.pricePerNight.toLocaleString()} × {nights} nights)
                </span>
                <span className="text-white">${basePrice.toLocaleString()}</span>
              </div>
              {spaPackage && (
                <div className="flex justify-between text-neutral-400">
                  <span>Thermal Spa Pass</span>
                  <span className="text-white">${spaCost}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Local Resort Fee & Geothermal Tax (12%)</span>
                <span className="text-white">${taxesAndService.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-neutral-850 flex justify-between text-sm font-bold text-white">
                <span>Total Due:</span>
                <span className="tabular-nums">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-neutral-850 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                No immediate charge · Flexible 14-day cancellation
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
              >
                <span>Confirm Sanctuary Reservation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
