import Link from 'next/link';

export default function RestaurantSection() {
  return (
    <section className="bg-[#faf8f4] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="bg-[#1a2744] rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative">
              <div className="text-center text-gray-400 px-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#c9a96e] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-sm font-medium">In-house Restaurant</p>
                <p className="text-xs opacity-60 mt-1">Fresh & Delicious</p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#c9a96e] text-white rounded-lg px-4 py-3 text-center">
                <p className="font-semibold text-sm">Open for Breakfast, Lunch & Dinner</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#c9a96e] rounded-xl opacity-20 -z-10" />
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-[#c9a96e] font-medium tracking-[0.15em] uppercase text-sm mb-3">
              Dining
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6 leading-tight">
              In-House Restaurant
            </h2>
            <div className="w-16 h-1 bg-[#c9a96e] mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Enjoy a delightful dining experience at our in-house restaurant. We serve a variety of
              <span className="font-semibold text-[#1a2744]"> vegetarian and non-vegetarian</span> dishes
              prepared with fresh, locally sourced ingredients.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Start your day with a wholesome breakfast, or unwind in the comfort of your room with our
              <span className="font-semibold text-[#1a2744]"> room dining service</span>. Our menu is
              crafted to suit every palate, from traditional home-style meals to popular regional favourites.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Pure vegetarian & non-vegetarian options
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Breakfast, lunch & dinner service
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-[#c9a96e] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                In-room dining available
              </li>
            </ul>

            <Link
              href="/restaurant"
              className="inline-flex items-center gap-2 bg-[#1a2744] hover:bg-[#243556] text-white font-semibold rounded-lg px-8 py-3 transition-colors"
            >
              View Menu
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
