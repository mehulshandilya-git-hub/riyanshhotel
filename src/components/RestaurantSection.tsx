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

          <div className="relative bg-[#17140f] rounded-3xl aspect-[4/5] border border-[#221d14] overflow-hidden">
            <img
              src="/images/restaurant.jpg"
              alt="The Restaurant at Hotel Riyansh"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0907]/70 via-transparent to-transparent" />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-10">
              <p className="font-display text-4xl md:text-5xl text-[#f2ecdf] italic">The Restaurant</p>
              <div className="rule-gold w-16 mt-5" />
              <p className="text-sm text-[#c6bda7] leading-relaxed mt-4">
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