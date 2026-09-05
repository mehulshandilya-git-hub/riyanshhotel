'use client';

import Link from 'next/link';
import BookingWidget from './BookingWidget';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils';

const trustBadges = [
  'Families & Groups',
  'Best Price Direct',
  'Great Location',
  '24h Support',
  'Restaurant & Dining',
];

export default function Hero() {
  return (
    <section className="relative bg-[#1a2744] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] via-[#243556] to-[#17213a] opacity-95" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-[#c9a96e] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-24">
        <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
          Welcome to Hotel Riyansh, Hansdiha
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight max-w-3xl">
          Comfortable Stays in Hansdiha
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
          A family-friendly hotel on Dumka Road for families, tourists and travelers.
          Clean rooms, honest prices, and 24-hour check-in.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-full"
            >
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {badge}
            </span>
          ))}
        </div>

        <BookingWidget />

        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#b8963d] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Book Directly for the Best Rate
          </Link>
          <a
            href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to book a room at Hotel Riyansh.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-[#c9a96e]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
          <span className="text-gray-300 text-sm flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call: <a href={getPhoneUrl(HOTEL_INFO.phone)} className="hover:text-[#c9a96e]">{HOTEL_INFO.phone}</a>
          </span>
        </div>
      </div>
    </section>
  );
}