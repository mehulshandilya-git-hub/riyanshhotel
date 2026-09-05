import Link from 'next/link';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl } from '@/lib/utils';

const dishes = [
  { name: 'Breakfast', note: 'Parathas · Poha · Chai' },
  { name: 'Lunch', note: 'Thalis · Dal · Rotis' },
  { name: 'Dinner', note: 'North Indian · Chinese' },
  { name: 'Beverages', note: 'Chai · Lassi · Juices' },
];

export default function RestaurantSection() {
  return (
    <section className="py-20 md:py-28 bg-[#100e0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="eyebrow mb-4">In-house Restaurant</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] mb-6 leading-tight">
              Homestyle food, served <span className="gold-gradient-text italic">all day</span>
            </h2>
            <p className="text-[#8f8672] leading-relaxed mb-8 max-w-lg">
              From a warm breakfast to a hearty dinner, our kitchen serves fresh vegetarian and
              non-vegetarian meals — in the restaurant or straight to your room.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {dishes.map((d) => (
                <div key={d.name} className="bg-[#17140f] border border-[#221d14] rounded-xl px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-display text-[#f2ecdf] text-lg">{d.name}</p>
                    <p className="text-xs text-[#8f8672] mt-0.5">{d.note}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#c9a96e] shrink-0" />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/restaurant" className="btn-primary">
                Restaurant Menu
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <a href={getPhoneUrl(HOTEL_INFO.phone)} className="btn-dark">
                Room Dining: Call us
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] rounded-3xl aspect-[4/5] flex items-center justify-center border border-[#221d14] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_70%_20%,#c9a96e,transparent_55%)]" />
              <div className="text-center px-10">
                <svg className="w-20 h-20 mx-auto mb-6 text-[#c9a96e] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                </svg>
                <p className="font-display text-2xl text-[#f2ecdf] mb-2">The Restaurant</p>
                <div className="rule-gold w-16 mx-auto mb-4" />
                <p className="text-sm text-[#8f8672] leading-relaxed">
                  Vegetarian &amp; Non-vegetarian meals
                  <br />
                  Breakfast · Lunch · Dinner
                  <br />
                  Room dining available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}