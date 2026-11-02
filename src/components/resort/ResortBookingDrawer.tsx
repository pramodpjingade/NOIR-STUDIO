import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Shield, Users, Compass, Globe, Sparkles } from 'lucide-react';
import { ResortBranch, ResortVilla } from '../../types/resort';
import { RESORT_BRANCHES, RESORT_VILLAS, ITINERARY_ADDONS } from '../../data/resortContent';

interface ResortBookingDrawerProps {
  isOpen: boolean;
  activeBranch: ResortBranch;
  selectedVilla: ResortVilla | null;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  onClose: () => void;
}

export const ResortBookingDrawer: React.FC<ResortBookingDrawerProps> = ({
  isOpen,
  activeBranch,
  selectedVilla,
  initialCheckIn,
  initialCheckOut,
  initialGuests,
  onClose,
}) => {
  const [branchId, setBranchId] = useState<string>(activeBranch.id);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'CHF' | 'JPY'>('USD');
  const [checkIn, setCheckIn] = useState(initialCheckIn || '2026-11-20');
  const [checkOut, setCheckOut] = useState(initialCheckOut || '2026-11-25');
  const [guests, setGuests] = useState(initialGuests || 2);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-heli']);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Currency multiplier
  const currencyRate = {
    USD: 1.0,
    EUR: 0.92,
    CHF: 0.88,
    JPY: 154.0,
  }[currency];

  const currencySymbol = {
    USD: '$',
    EUR: '€',
    CHF: '₣',
    JPY: '¥',
  }[currency];

  const currentBranch =
    RESORT_BRANCHES.find((b) => b.id === branchId) || activeBranch;

  const branchVillas = RESORT_VILLAS.filter((v) => v.branchId === currentBranch.id);
  const [villaId, setVillaId] = useState<string>(
    selectedVilla && selectedVilla.branchId === currentBranch.id
      ? selectedVilla.id
      : branchVillas[0]?.id || ''
  );

  useEffect(() => {
    if (selectedVilla) {
      setBranchId(selectedVilla.branchId);
      setVillaId(selectedVilla.id);
    } else {
      setBranchId(activeBranch.id);
      const first = RESORT_VILLAS.find((v) => v.branchId === activeBranch.id);
      if (first) setVillaId(first.id);
    }
    if (initialCheckIn) setCheckIn(initialCheckIn);
    if (initialCheckOut) setCheckOut(initialCheckOut);
    if (initialGuests) setGuests(initialGuests);
  }, [selectedVilla, activeBranch, isOpen, initialCheckIn, initialCheckOut, initialGuests]);

  // Keep villa updated when branch changes
  const handleBranchChange = (newBranchId: string) => {
    setBranchId(newBranchId);
    const first = RESORT_VILLAS.find((v) => v.branchId === newBranchId);
    if (first) setVillaId(first.id);
  };

  if (!isOpen) return null;

  const currentVilla =
    RESORT_VILLAS.find((v) => v.id === villaId) || branchVillas[0] || RESORT_VILLAS[0];

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(1, d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const basePriceUSD = currentVilla.pricePerNight * nights;
  const addonsTotalUSD = selectedAddons.reduce((acc, currId) => {
    const item = ITINERARY_ADDONS.find((a) => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);
  const taxUSD = Math.round(basePriceUSD * 0.1);
  const totalAmountUSD = basePriceUSD + addonsTotalUSD + taxUSD;

  const totalConverted = Math.round(totalAmountUSD * currencyRate);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please specify guest name and primary email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const code = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
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
            <Globe className="w-3.5 h-3.5 text-white" />
            <span>Global Sanctuary Central Reservations</span>
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
              Global Sanctuary Voucher Confirmed
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              Welcome to {currentBranch.name}
            </h3>
            <p className="text-xs font-mono text-neutral-300 mb-6 bg-neutral-900 border border-neutral-800 px-4 py-2">
              RESERVATION CODE: <span className="text-white font-bold">{confirmationCode}</span>
            </p>

            <div className="w-full max-w-md bg-black border border-neutral-800 p-6 text-left mb-8 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Guest Name:</span>
                <span className="text-white font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Destination:</span>
                <span className="text-white">{currentBranch.city}, {currentBranch.country}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Villa / Suite:</span>
                <span className="text-white">{currentVilla.name}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Dates:</span>
                <span className="text-white">{checkIn} → {checkOut} ({nights} Nights)</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Total Investment:</span>
                <span className="text-white font-bold">
                  {currencySymbol}{totalConverted.toLocaleString()} {currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Private Arrival Transit:</span>
                <span className="text-white">Confirmed from {currentBranch.flightHub}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed mb-6 font-mono">
              A private flight manifest and personalized butler itinerary have been dispatched to {email}.
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">
                  Reserve a Global Sanctuary
                </h2>
                <p className="text-xs text-neutral-400">
                  Select destination branch, choose villa, and customize your stay.
                </p>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 self-start sm:self-auto">
                {(['USD', 'EUR', 'CHF', 'JPY'] as const).map((cur) => (
                  <button
                    type="button"
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-2.5 py-1 text-[11px] font-mono transition-colors ${
                      currency === cur
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-300 font-mono">
                {errorMsg}
              </div>
            )}

            {/* Branch Selector Grid */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Resort Destination Branch *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {RESORT_BRANCHES.map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => handleBranchChange(b.id)}
                    className={`p-2.5 text-left border transition-all ${
                      branchId === b.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold leading-tight">{b.city}</div>
                    <div className="text-[10px] font-mono opacity-70">{b.country}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Villa Choice for Selected Branch */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Accommodations in {currentBranch.city}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {branchVillas.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => setVillaId(v.id)}
                    className={`p-3 text-left border transition-all ${
                      villaId === v.id
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold mb-1">{v.name}</div>
                    <div className="text-[11px] font-mono flex justify-between opacity-80">
                      <span>{v.sizeSqm} m² · {v.capacity}</span>
                      <span>
                        {currencySymbol}
                        {Math.round(v.pricePerNight * currencyRate).toLocaleString()} / nt
                      </span>
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
                  <option value={2}>2 Guests (Couple Sanctuary)</option>
                  <option value={4}>4 Guests (Family Villa)</option>
                  <option value={6}>6 Guests (Residency Full)</option>
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
                  placeholder="Alexander Wright"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@global-holdings.com"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Add-ons Checklist */}
            <div className="p-4 bg-neutral-900/50 border border-neutral-850 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Curated Concierge Services
              </div>
              {ITINERARY_ADDONS.map((addon) => (
                <label key={addon.id} className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                    className="accent-white cursor-pointer"
                  />
                  <span>
                    {addon.title} (+{currencySymbol}
                    {Math.round(addon.price * currencyRate).toLocaleString()})
                  </span>
                </label>
              ))}
            </div>

            {/* Live Pricing Summary */}
            <div className="p-4 bg-black border border-neutral-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>
                  {currentVilla.name} ({nights} nights)
                </span>
                <span className="text-white">
                  {currencySymbol}
                  {Math.round(basePriceUSD * currencyRate).toLocaleString()}
                </span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Concierge Inclusions</span>
                  <span className="text-white">
                    {currencySymbol}
                    {Math.round(addonsTotalUSD * currencyRate).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Local Eco-Tax & Carbon Offset</span>
                <span className="text-white">
                  {currencySymbol}
                  {Math.round(taxUSD * currencyRate).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-850 flex justify-between text-sm font-bold text-white">
                <span>Total Due:</span>
                <span className="tabular-nums">
                  {currencySymbol}
                  {totalConverted.toLocaleString()} {currency}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-neutral-850 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                Complimentary 14-day cancellation policy
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
