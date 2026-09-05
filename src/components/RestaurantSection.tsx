import Link from 'next/link';

export default function RestaurantSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0907]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="eyebrow mb-4">In-house Restaurant</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight mb-6">
              Good food, <span className="gold-gradient-text italic">right here</span>.
            </h2>
            <p className="text-[#8f8672] leading-relaxed mb-8 max-w-lg">
              Fresh vegetarian and non-vegetarian meals, breakfast to dinner — in the restaurant or straight to your room.
            </p>
            <Link href="/restaurant" className="btn-gold">
              Explore Restaurant
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="relative bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] rounded-3xl aspect-[4/5] flex items-center justify-center border border-[#221d14] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_70%_20%,#c9a96e,transparent_55%)]" />
            <div className="relative text-center px-10">
              <svg className="w-20 h-20 mx-auto mb-6 text-[#c9a96e] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
              </svg>
              <p className="font-display text-2xl md:text-3xl text-[#f2ecdf]">The Restaurant</p>
              <div className="rule-gold w-16 mx-auto mt-4" />
              <p className="text-sm text-[#8f8672] leading-relaxed mt-4">
                Breakfast · Lunch · Dinner
                <br />
                Room dining available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}