'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RoomType } from '@/types';
import { roomService } from '@/services/roomService';
import { formatPrice } from '@/lib/utils';

export default function FeaturedRooms() {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    roomService.getRoomTypes().then((types) => setRooms(types.slice(0, 3)));
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] font-medium tracking-[0.15em] uppercase text-sm mb-3">
            Our Rooms
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Featured Room Types
          </h2>
          <div className="w-16 h-1 bg-[#c9a96e] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="bg-[#1a2744] aspect-[16/10] flex items-center justify-center relative overflow-hidden">
                <svg className="w-14 h-14 text-[#c9a96e] opacity-40 group-hover:opacity-60 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                <span
                  className={`absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full ${
                    room.category === 'ac'
                      ? 'bg-[#c9a96e] text-white'
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {room.category === 'ac' ? 'AC' : 'Non-AC'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1a2744] mb-1">{room.name}</h3>
                <p className="text-2xl font-bold text-[#c9a96e] mb-3">
                  {formatPrice(room.price)}
                  <span className="text-sm font-normal text-gray-400"> / night</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-[#faf8f4] text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="text-xs text-gray-400 px-2.5 py-1">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#1a2744] hover:bg-[#243556] text-white font-semibold rounded-lg px-8 py-3 transition-colors"
          >
            View All Rooms
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
