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

      <section className="relative bg-[#0a0907] text-white overflow-hidden border-b border-[#17130c]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0907] via-[#100e0b] to-[#080705]" />
        <div className="absolute inset-0 opacity-[0.09]">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28">
          <p className="eyebrow mb-4">Rooms</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-5 max-w-3xl leading-[1.1]">
            Rooms for every family and budget
          </h1>
          <p className="text-[#c6bda7] text-lg max-w-2xl leading-relaxed">
            Choose from our range of comfortable AC and Non-AC rooms. All prices include GST —
            the price you see is the price you pay.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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

      <section className="py-12 md:py-20 bg-[#0a0907]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a] shadow-md'
                    : 'bg-[#17140f] text-[#8f8672] hover:bg-[#1f1b14]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-[#8f8672]">Loading rooms...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#8f8672]">No rooms found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((room) => (
                <div
                  key={room.id}
                  className="bg-[#14120e] border border-[#221d14] rounded-2xl overflow-hidden hover:border-[#3a3427] hover:shadow-gold transition-all flex flex-col"
                >
                  <div className="relative bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] aspect-[16/10] flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#c9a96e] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span
                      className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                        room.category === 'ac' ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a]' : 'bg-[#f2ecdf] text-[#0a0907]'
                      }`}
                    >
                      {room.category === 'ac' ? 'AC Room' : 'Non-AC Room'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-xl font-semibold text-[#f2ecdf] mb-1">{room.name}</h3>
                    <p className="text-2xl font-bold text-[#c9a96e] mb-3">
                      {formatPrice(room.price)}
                      <span className="text-sm font-normal text-[#8f8672]"> / night</span>
                    </p>
                    <p className="text-[#8f8672] text-sm leading-relaxed mb-4">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <span key={amenity} className="text-xs bg-[#17140f] text-[#c6bda7] px-2.5 py-1 rounded-full border border-[#221d14]">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-xs text-[#8f8672] px-1 self-center">
                          +{room.amenities.length - 4}
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/book?roomType=${room.id}&guests=2&rooms=1`}
                      className="mt-auto w-full inline-flex items-center justify-center gap-2 btn-gold font-semibold rounded-lg px-4 py-3 transition-colors text-sm"
                    >
                      Check Availability
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] border border-[#221d14] rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dcbd85] to-[#c9a96e]/40 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h3 className="font-display text-lg text-[#f2ecdf]">Traveling with a group?</h3>
                <p className="text-[#8f8672] text-sm">
                  We can connect multiple rooms for families and small groups. Just ask us when you book.
                </p>
              </div>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 btn-primary font-semibold px-8 py-3 rounded-xl transition-colors shrink-0"
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