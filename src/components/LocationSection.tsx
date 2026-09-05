import Link from 'next/link';
import { HOTEL_INFO } from '@/types';

export default function LocationSection() {
  return (
    <section className="py-20 md:py-28 bg-[#100e0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Location &amp; Directions</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] mb-6">
            Find us on <span className="gold-gradient-text italic">Dumka Road</span>
          </h2>
          <div className="rule-gold w-24 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] rounded-3xl overflow-hidden aspect-[16/10] flex items-center justify-center border border-[#221d14]">
            <div className="text-center px-8">
              <svg className="w-16 h-16 mx-auto mb-5 text-[#c9a96e] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-display text-xl text-[#f2ecdf] mb-1">{HOTEL_INFO.name}</p>
              <p className="text-sm text-[#8f8672]">Dumka Road · Hansdiha, Jharkhand</p>
            </div>
          </div>

          <div className="bg-[#14120e] border border-[#221d14] rounded-2xl p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold mb-2">Hotel Address</h3>
                <p className="text-[#c6bda7] leading-relaxed">{HOTEL_INFO.address}</p>
              </div>

              <div className="rule-gold w-full" />

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold mb-2">How to Reach</h3>
                <div className="bg-[#17140f] rounded-xl p-4 border border-[#221d14]">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#120f0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <p className="text-sm text-[#c6bda7] leading-relaxed">
                      Located <span className="font-semibold text-[#dcbd85]">opposite Austria Petrol Pump</span> on
                      Dumka Road, Hansdiha. Look for the petrol pump landmark — the hotel is directly across the road.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold mb-2">Timings</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-[#221d14] pb-2">
                    <span className="text-[#8f8672]">Check-in</span>
                    <span className="font-medium text-[#f2ecdf]">{HOTEL_INFO.checkInTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8f8672]">Check-out</span>
                    <span className="font-medium text-[#f2ecdf]">{HOTEL_INFO.checkOutTime}</span>
                  </div>
                </div>
              </div>

              <Link href="/contact" className="btn-primary w-full justify-center">
                View map &amp; contact
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}