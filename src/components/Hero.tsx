'use client';

import Link from 'next/link';
import BookingWidget from './BookingWidget';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl } from '@/lib/utils';

export default function Hero() {
  return (
    <section className="relative bg-[#1a2744] text-white overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/background-video-main.mp4" type="video/mp4" />
      </video>

      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24">
        <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
          Hotel Riyansh · Hansdiha
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight max-w-2xl">
          Comfortable stays in Hansdiha
          <br />
          <span className="text-[#c9a96e]">for every traveler</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
          A family-friendly hotel on Dumka Road. Clean rooms, honest prices, 24-hour check-in.
        </p>

        <BookingWidget />

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
          <svg className="w-4 h-4 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          <span>
            Best rate when you book directly. Call us:{' '}
            <Link href={getPhoneUrl(HOTEL_INFO.phone)} className="font-semibold text-[#c9a96e] hover:underline">
              {HOTEL_INFO.phone}
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}