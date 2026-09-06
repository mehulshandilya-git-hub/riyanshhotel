import Link from 'next/link';
import { HOTEL_INFO } from '@/types';

export default function LocationSection() {
  return (
    <section className="py-20 md:py-28 bg-[#100e0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative bg-[#17140f] rounded-3xl overflow-hidden aspect-[16/10] border border-[#221d14]">
            <img
              src="/images/hotel-riyansh.jpg"
              alt="Hotel Riyansh, Dumka Road, Hansdiha"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907]/80 via-[#0a0907]/20 to-transparent" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-8">
              <svg className="w-12 h-12 mb-4 text-[#c9a96e] opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-display text-xl text-[#f2ecdf] mb-1">{HOTEL_INFO.name}</p>
              <p className="text-sm text-[#c6bda7]">Dumka Road · Hansdiha, Jharkhand</p>
            </div>
          </div>

          <div className="bg-[#14120e] border border-[#221d14] rounded-2xl p-8 flex flex-col justify-center">
            <p className="eyebrow mb-4">Location</p>
            <h2 className="font-display text-2xl md:text-4xl font-semibold text-[#f2ecdf] leading-tight mb-4">
              Dumka Road, <span className="gold-gradient-text italic">Hansdiha</span>
            </h2>
            <p className="text-[#8f8672] leading-relaxed mb-2">
              {HOTEL_INFO.address}
            </p>
            <p className="text-[#c6bda7] mb-8">
              <span className="text-[#a58659] font-medium">Landmark:</span> Opposite Austria Petrol Pump
            </p>
            <Link href="/contact" className="btn-primary w-full justify-center">
              Get Directions
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}