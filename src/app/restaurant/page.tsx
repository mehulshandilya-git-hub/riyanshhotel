import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl } from '@/lib/utils';

const menuCategories = [
  {
    name: 'Breakfast',
    description: 'Start your morning with freshly prepared breakfast items including parathas, poha, bread omelette, chai, and more.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: 'Lunch',
    description: 'Enjoy wholesome Indian thalis, rice dishes, dal, seasonal vegetables, and a variety of rotis for a satisfying midday meal.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A1.5 1.5 0 003 15.546" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2v8m0 0l3-3m-3 3L9 7" />
      </svg>
    ),
  },
  {
    name: 'Dinner',
    description: 'Relish a hearty dinner with North Indian cuisine, Chinese dishes, tandoori specials, and regional favourites prepared fresh.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 0012 21a9.005 9.005 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    name: 'Beverages',
    description: 'Refreshing chai, coffee, cold drinks, lassi, fresh juices and seasonal specials available throughout the day.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      </svg>
    ),
  },
];

export default function RestaurantPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-[#1a2744] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] via-[#243556] to-[#17213a] opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-16 md:pt-20 md:pb-20">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">Restaurant</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl leading-tight">Our Restaurant</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            Savour delicious home-style food at our in-house restaurant with both vegetarian and non-vegetarian options.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Veg & Non-veg
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Room Dining Available
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-4">About Our Restaurant</h2>
            <div className="w-12 h-0.5 bg-[#c9a96e] mx-auto mb-4" />
            <p className="text-gray-500 leading-relaxed">
              Hotel Riyansh features an in-house restaurant serving fresh, hygienic, and flavourful meals
              prepared by experienced cooks. We offer a variety of <strong>vegetarian and non-vegetarian</strong> dishes
              to suit every palate. Whether you are starting your day with a wholesome breakfast or winding
              down with a comforting dinner, our kitchen has something for everyone.
            </p>
          </div>

          <div className="bg-[#faf8f4] rounded-2xl p-8 md:p-12 mb-12">
            <p className="text-center text-gray-600 font-medium mb-8">
              Both <span className="text-green-600 font-bold">Veg</span> and <span className="text-red-500 font-bold">Non-Veg</span> options are available across all meal categories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuCategories.map((cat) => (
                <div key={cat.name} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-[#1a2744] text-[#c9a96e] rounded-full flex items-center justify-center mx-auto mb-4">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2744] mb-2">{cat.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-[#c9a96e] rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-[#c9a96e]/10 text-[#c9a96e] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1a2744] mb-2">Room Dining</h3>
            <p className="text-gray-500 mb-4">
              Order food to your room by calling us directly. Our staff will deliver your meal promptly.
            </p>
            <a href={getPhoneUrl(HOTEL_INFO.phone)} className="btn-primary">
              Call to Order: {HOTEL_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
