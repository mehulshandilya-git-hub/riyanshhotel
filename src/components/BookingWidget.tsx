'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTodayString, getTomorrowString } from '@/lib/utils';

export default function BookingWidget() {
  const router = useRouter();
  const [location, setLocation] = useState('Hansdiha');
  const [checkIn, setCheckIn] = useState(getTodayString());
  const [checkOut, setCheckOut] = useState(getTomorrowString());
  const [guests, setGuests] = useState(2);
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
      rooms: '1',
    });
    router.push(`/book?${params.toString()}`);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-[#1a2744]/5">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-0 divide-y md:divide-y-0 lg:divide-x divide-gray-100 p-1">
        <div className="lg:col-span-3 px-5 py-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-[#1a2744] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="Hansdiha">Hansdiha</option>
            <option value="Hansdiha">Hansdiha, Jharkhand</option>
          </select>
        </div>

        <div className="lg:col-span-4 px-5 py-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Stay Dates
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={checkIn}
              min={getTodayString()}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-1/2 bg-transparent text-[#1a2744] font-semibold focus:outline-none text-sm [color-scheme:light] border-0 p-0"
              aria-label="Check-in date"
            />
            <span className="text-gray-300">—</span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || getTomorrowString()}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-1/2 bg-transparent text-[#1a2744] font-semibold focus:outline-none text-sm [color-scheme:light] border-0 p-0"
              aria-label="Check-out date"
            />
          </div>
        </div>

        <div className="lg:col-span-2 px-5 py-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
            <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-transparent text-[#1a2744] font-semibold focus:outline-none cursor-pointer"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2 px-4 py-4 flex items-stretch">
          <button
            type="submit"
            className="w-full bg-[#c9a96e] hover:bg-[#b8963d] text-white font-semibold rounded-xl px-6 py-3 transition-colors flex items-center justify-center gap-2"
          >
            Search
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-sm px-5 pb-3">{error}</p>}
    </div>
  );
}