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
    { key: 'all', label: 'All' },
    { key: 'ac', label: 'AC Rooms' },
    { key: 'non_ac', label: 'Non-AC Rooms' },
  ];

  return (
    <>
      <Navbar />

      <section className="bg-[#1a2744] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Rooms</h1>
          <div className="w-16 h-1 bg-[#c9a96e] mx-auto mb-4 rounded" />
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our range of comfortable AC and Non-AC rooms designed to suit every budget.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-[#1a2744] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((room) => (
                <div key={room.id} className="card animate-fadeIn">
                  <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span
                      className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
                        room.category === 'ac'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {room.category === 'ac' ? 'AC' : 'Non-AC'}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1a2744] mb-2">{room.name}</h3>
                    <p className="text-[#c9a96e] font-bold text-lg mb-3">
                      {formatPrice(room.price)} <span className="text-sm font-normal text-gray-400">/ night</span>
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {room.amenities.map((amenity) => (
                        <span key={amenity} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <Link href="/book" className="btn-gold w-full text-sm !py-2.5">
                      Book This Room
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
