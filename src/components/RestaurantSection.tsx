import Link from 'next/link';

export default function RestaurantSection() {
  return (
    <section className="py-16 md:py-24 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">In-house Restaurant</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6 leading-tight">
              Fresh, homestyle food,
              <br />
              served with a smile
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our in-house restaurant serves vegetarian and non-vegetarian food throughout the day.
              Start your morning with breakfast, enjoy a hearty lunch, or wind down with a warm dinner.
            </p>
            <p className="text-gray-600 leading-relaxed mb-2">Hungry but staying in your room? No problem.</p>
            <ul className="space-y-2 mb-8">
              {['Vegetarian & Non-vegetarian', 'Breakfast · Lunch · Dinner', 'Room dining / food ordering'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/restaurant" className="inline-flex items-center gap-2 text-white bg-[#1a2744] hover:bg-[#243556] font-semibold px-6 py-3 rounded-lg transition-colors w-fit">
                Restaurant Menu
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-[#1a2744] font-semibold hover:underline w-fit">
                Order to your room
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 bg-gradient-to-br from-[#1a2744] to-[#243556] rounded-2xl aspect-[4/3] flex items-center justify-center">
              <span className="text-white/80 text-sm font-medium">Restaurant · Image 1</span>
            </div>
            <div className="bg-[#c9a96e]/30 rounded-2xl aspect-[4/3] flex items-center justify-center">
              <span className="text-[#8a6d3b] text-xs font-medium text-center px-2">Food · Image 2</span>
            </div>
            <div className="col-span-1 bg-[#e8e2d5] rounded-2xl aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500 text-xs font-medium text-center px-2">Dining · Image 3</span>
            </div>
            <div className="col-span-2 bg-[#e8e2d5] rounded-2xl aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500 text-xs font-medium">Meals · Image 4</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}