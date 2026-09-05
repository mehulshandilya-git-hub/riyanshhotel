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
    <section className="bg-[#faf8f4] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">Our Rooms</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4 leading-tight">
            Traveling with family or a group?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We can connect multiple rooms for families and small groups. Just
            ask us when you book — we will do our best to keep you together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-[#faf8f4] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="bg-gradient-to-br from-[#1a2744] to-[#243556] aspect-[16/10] flex items-center justify-center relative">
                <svg className="w-14 h-14 text-[#c9a96e] opacity-40 group-hover:opacity-60 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                <span
                  className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${
                    room.category === 'ac' ? 'bg-[#c9a96e] text-white' : 'bg-white/90 text-[#1a2744]'
                  }`}
                >
                  {room.category === 'ac' ? 'AC Room' : 'Non-AC Room'}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#1a2744] mb-1">{room.name}</h3>
                <p className="text-2xl font-bold text-[#c9a96e] mb-4">
                  {formatPrice(room.price)}
                  <span className="text-sm font-normal text-gray-400"> / night</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-white text-gray-600 px-2.5 py-1 rounded-full border border-gray-100"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="text-xs text-gray-400 px-2.5 py-1">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
                <Link
                  href={`/book?roomType=${room.id}&guests=2&rooms=1`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1a2744] hover:bg-[#243556] text-white font-semibold rounded-lg px-4 py-2.5 transition-colors text-sm"
                >
                  Check Availability
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-[#1a2744] font-semibold hover:gap-3 transition-all"
          >
            View all rooms & prices
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}