import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Clock, Users, Flame, Wine, Sparkles } from 'lucide-react';

interface TableReservationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableReservationDrawer: React.FC<TableReservationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [date, setDate] = useState('2026-11-18');
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState<'Chef Counter (Front Row)' | 'Main Atelier' | 'Private Wine Cellar'>('Chef Counter (Front Row)');
  const [menuTier, setMenuTier] = useState<'Signature 8-Course Degustation' | 'Prestige Imperial Truffle Tasting'>('Signature 8-Course Degustation');
  const [winePairing, setWinePairing] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const basePricePerPerson = menuTier === 'Signature 8-Course Degustation' ? 295 : 420;
  const winePricePerPerson = winePairing ? 190 : 0;
  const subtotal = (basePricePerPerson + winePricePerPerson) * guests;
  const serviceCharge = Math.round(subtotal * 0.1);
  const totalAmount = subtotal + serviceCharge;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Please specify guest name and contact email.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    const code = `NTR-${Math.floor(100000 + Math.random() * 900000)}`;
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
        className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 p-6 md:p-10 text-white my-auto select-text shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-850">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5 text-white" />
            <span>Atelier Table Reservation Concierge</span>
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
              Table Reservation Confirmed
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
              We Await You at Noir Atelier
            </h3>
            <p className="text-xs font-mono text-neutral-300 mb-6 bg-neutral-900 border border-neutral-800 px-4 py-2">
              CONFIRMATION CODE: <span className="text-white font-bold">{confirmationCode}</span>
            </p>

            <div className="w-full max-w-md bg-black border border-neutral-800 p-6 text-left mb-8 space-y-3 text-xs font-mono">
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Guest:</span>
                <span className="text-white font-semibold">{fullName}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Date & Time:</span>
                <span className="text-white">{date} at {timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Party Size:</span>
                <span className="text-white">{guests} {guests === 1 ? 'Guest' : 'Guests'} ({seatingArea})</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Menu Tier:</span>
                <span className="text-white">{menuTier}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-850 pb-2">
                <span className="text-neutral-400">Sommelier Pairing:</span>
                <span className="text-white">{winePairing ? 'Grand Cru Pairing Included' : 'A la Carte Beverage'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Estimation:</span>
                <span className="text-white font-bold">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed mb-6 font-mono">
              A dining confirmation and arrival instructions have been dispatched to {email}.
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
                Reserve an Atelier Table
              </h2>
              <p className="text-xs text-neutral-400">
                Eighteen counter seats facing the binchotan hearth. Reservations open 30 days in advance.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 text-xs text-red-300 font-mono">
                {errorMsg}
              </div>
            )}

            {/* Date, Time Slot, and Party Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs font-mono text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                >
                  <option value="18:00">18:00 (Early Hearth)</option>
                  <option value="18:30">18:30 (Counter Seating)</option>
                  <option value="19:30">19:30 (Peak Tasting)</option>
                  <option value="20:30">20:30 (Late Sitting)</option>
                  <option value="21:15">21:15 (Omakase Cellar)</option>
                </select>
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
                  <option value={1}>1 Guest (Counter Solo)</option>
                  <option value={2}>2 Guests (Tasting Couple)</option>
                  <option value={4}>4 Guests (Atelier Table)</option>
                  <option value={6}>6 Guests (Wine Salon)</option>
                </select>
              </div>
            </div>

            {/* Seating Experience */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['Chef Counter (Front Row)', 'Main Atelier', 'Private Wine Cellar'] as const).map((area) => (
                  <button
                    type="button"
                    key={area}
                    onClick={() => setSeatingArea(area)}
                    className={`p-3 text-left border text-xs font-mono transition-colors ${
                      seatingArea === area
                        ? 'bg-white text-black border-white font-semibold'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Tier Selection */}
            <div>
              <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                Tasting Menu Selection
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setMenuTier('Signature 8-Course Degustation')}
                  className={`p-3.5 text-left border transition-colors ${
                    menuTier === 'Signature 8-Course Degustation'
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">
                    Signature 8-Course Degustation
                  </div>
                  <div className="text-[11px] font-mono opacity-80">
                    $295 / person · Terroir & Binchotan Charcoal
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setMenuTier('Prestige Imperial Truffle Tasting')}
                  className={`p-3.5 text-left border transition-colors ${
                    menuTier === 'Prestige Imperial Truffle Tasting'
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold mb-1">
                    Prestige Imperial Truffle Tasting
                  </div>
                  <div className="text-[11px] font-mono opacity-80">
                    $420 / person · Winter Truffle & A5 Wagyu
                  </div>
                </button>
              </div>
            </div>

            {/* Guest Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Primary Guest Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jean-Luc Moreau"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guest@atelier-gastronomy.com"
                  className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  required
                />
              </div>
            </div>

            {/* Sommelier Add-on & Allergens */}
            <div className="p-4 bg-neutral-900/50 border border-neutral-850 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={winePairing}
                  onChange={(e) => setWinePairing(e.target.checked)}
                  className="accent-white cursor-pointer"
                />
                <span>Include Grand Cru & Grower Sake Pairing (+$190 / person)</span>
              </label>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                  Dietary Restrictions / Allergens
                </label>
                <input
                  type="text"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  placeholder="e.g. Shellfish allergy, no alliums, gluten sensitivity..."
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 bg-black border border-neutral-800 text-xs font-mono space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>{menuTier} (${basePricePerPerson} × {guests})</span>
                <span className="text-white">${basePricePerPerson * guests}</span>
              </div>
              {winePairing && (
                <div className="flex justify-between text-neutral-400">
                  <span>Grand Cru Wine Pairing (${winePricePerPerson} × {guests})</span>
                  <span className="text-white">${winePricePerPerson * guests}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Hospitality Service & Sommelier Care (10%)</span>
                <span className="text-white">${serviceCharge}</span>
              </div>
              <div className="pt-2 border-t border-neutral-850 flex justify-between text-sm font-bold text-white">
                <span>Total Due:</span>
                <span className="tabular-nums">${totalAmount.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-neutral-850 flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                Zero cancellation fee up to 48 hours prior
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-colors"
              >
                <span>Confirm Table Reservation</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
