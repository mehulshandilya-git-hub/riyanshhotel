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
    <section className="py-20 md:py-28 bg-[#100e0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Rooms &amp; Suites</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight">
              Rooms for every family and budget
            </h2>
          </div>
          <Link href="/rooms" className="btn-gold shrink-0">
            View all rooms
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="card group bg-[#17140f] flex flex-col"
            >
              <div className="relative bg-gradient-to-br from-[#211b13] via-[#1a1711] to-[#0d0b08] aspect-[16/10] flex items-center justify-center border-b border-[#221d14]">
                <div className="absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_30%_30%,#c9a96e,transparent_60%)]" />
                <svg className="w-14 h-14 text-[#c9a96e] opacity-60 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                <span
                  className={`absolute top-4 left-4 text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full uppercase ${
                    room.category === 'ac'
                      ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a]'
                      : 'bg-[#17140f] text-[#c6bda7] border border-[#312b1e]'
                  }`}
                >
                  {room.category === 'ac' ? 'AC Room' : 'Non-AC Room'}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-display text-xl text-[#f2ecdf]">{room.name}</h3>
                </div>
                <p className="mb-2">
                  <span className="text-2xl font-display text-[#c9a96e]">{formatPrice(room.price)}</span>
                  <span className="text-sm text-[#6f6755]"> / night</span>
                </p>
                <div className="rule-gold w-full mb-4" />
                <p className="text-sm text-[#8f8672] leading-relaxed mb-5 line-clamp-2 flex-1">{room.description}</p>
                <Link
                  href={`/book?roomType=${room.id}&guests=2&rooms=1`}
                  className="w-full inline-flex items-center justify-center gap-2 border border-[#3a3427] hover:border-[#c9a96e] hover:bg-[#c9a96e]/10 text-[#c6bda7] hover:text-[#dcbd85] font-semibold rounded-lg px-4 py-2.5 transition-colors text-sm"
                >
                  View Room
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}