import Link from 'next/link';

export default function RestaurantSection() {
  return (
    <section className="py-16 md:py-24 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">In-house Restaurant</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6 leading-tight">
              Fresh, homestyle food, served throughout the day
            </h2>
            <ul className="space-y-3 mb-8">
              {[
                'Vegetarian & Non-vegetarian meals',
                'Breakfast · Lunch · Dinner',
                'Room dining / food ordering',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/restaurant" className="inline-flex items-center gap-2 text-white bg-[#1a2744] hover:bg-[#243556] font-semibold px-6 py-3 rounded-lg transition-colors">
              Restaurant Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#1a2744] to-[#243556] rounded-2xl aspect-[4/3] flex items-center justify-center">
            <div className="text-center text-gray-300 px-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#c9a96e] opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
              </svg>
              <p className="text-sm font-medium">In-house Restaurant</p>
              <p className="text-xs opacity-60 mt-1">Hotel Riyansh · Hansdiha</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}