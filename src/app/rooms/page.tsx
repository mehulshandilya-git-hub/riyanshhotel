'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { RoomType } from '@/types';
import { formatPrice } from '@/lib/utils';
import { roomService } from '@/services/roomService';

type FilterTab = 'all' | 'ac' | 'non_ac';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');

  useEffect(() => {
    roomService.getRoomTypes().then((data) => {
      setRooms(data);
      setLoading(false);
    });
  }, []);

  const filtered = rooms.filter((r) => {
    if (activeFilter === 'all') return true;
    return r.category === activeFilter;
  });

  const filters: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All Rooms' },
    { key: 'ac', label: 'AC Rooms' },
    { key: 'non_ac', label: 'Non-AC Rooms' },
  ];

  return (
    <>
      <Navbar />

      <section className="relative bg-[#1a2744] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] via-[#243556] to-[#17213a] opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-16 md:pt-20 md:pb-20">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">Rooms</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl leading-tight">
            Rooms for every family and budget
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Choose from our range of comfortable AC and Non-AC rooms. All prices include GST —
            the price you see is the price you pay.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Best Price Direct
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Prices include GST
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-[#1a2744] text-white shadow-md'
                    : 'bg-[#faf8f4] text-gray-600 hover:bg-[#efe9dd]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">Loading rooms...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">No rooms found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((room) => (
                <div
                  key={room.id}
                  className="bg-[#faf8f4] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="relative bg-gradient-to-br from-[#1a2744] to-[#243556] aspect-[16/10] flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#c9a96e] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span
                      className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                        room.category === 'ac' ? 'bg-[#c9a96e] text-white' : 'bg-white/90 text-[#1a2744]'
                      }`}
                    >
                      {room.category === 'ac' ? 'AC Room' : 'Non-AC Room'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-[#1a2744] mb-1">{room.name}</h3>
                    <p className="text-2xl font-bold text-[#c9a96e] mb-3">
                      {formatPrice(room.price)}
                      <span className="text-sm font-normal text-gray-400"> / night</span>
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs bg-white text-gray-600 px-2.5 py-1 rounded-full border border-gray-100">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/book?roomType=${room.id}&guests=2&rooms=1`}
                      className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-[#1a2744] hover:bg-[#243556] text-white font-semibold rounded-lg px-4 py-3 transition-colors text-sm"
                    >
                      Check Availability
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-[#1a2744] text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#c9a96e]/20 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Traveling with a group?</h3>
                <p className="text-gray-300 text-sm">
                  We can connect multiple rooms for families and small groups. Just ask us when you book.
                </p>
              </div>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#b8963d] text-white font-semibold px-8 py-3 rounded-xl transition-colors shrink-0"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}