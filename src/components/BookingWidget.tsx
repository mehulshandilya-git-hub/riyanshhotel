'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTodayString, getTomorrowString } from '@/lib/utils';

export default function BookingWidget() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(getTomorrowString());
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (checkOut <= checkIn) {
      setError('Check-out date must be after check-in date.');
      return;
    }
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <section className="bg-[#faf8f4] py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-[#1a2744] mb-1">Find Your Perfect Room</h2>
          <p className="text-gray-500 mb-8">Search available rooms and book your stay at Hotel Riyansh</p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-semibold text-[#1a2744] mb-1.5">Check-in</label>
              <input
                type="date"
                value={checkIn}
                min={getTodayString()}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#1a2744] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e] [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1a2744] mb-1.5">Check-out</label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || getTomorrowString()}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#1a2744] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e] [color-scheme:dark]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1a2744] mb-1.5">Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full bg-[#1a2744] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e] [color-scheme:dark]"
              >
                {Array.from({ length: 9 }, (_, i) => i + 2).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1a2744] mb-1.5">Rooms</label>
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full bg-[#1a2744] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a96e] [color-scheme:dark]"
              >
                {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Room' : 'Rooms'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-[#c9a96e] hover:bg-[#b8963d] text-white font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
              >
                Search Rooms
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>
      </div>
    </section>
  );
}
