import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const facilities = [
  {
    name: 'Parking',
    description: 'Secure on-premises parking space available for guests arriving by car or two-wheeler. Park your vehicle worry-free during your stay.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
  },
  {
    name: 'Wi-Fi',
    description: 'Complimentary high-speed Wi-Fi access available in all rooms and common areas. Stay connected with friends, family, or work during your stay.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
      </svg>
    ),
  },
  {
    name: 'Room Service',
    description: 'Enjoy the comfort of dining in your room. Order from our in-house restaurant menu and have your meals delivered right to your doorstep.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    name: 'TV',
    description: 'Each room is equipped with a television with access to popular cable and satellite channels for your entertainment and relaxation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Geyser / Hot Water',
    description: 'Round-the-clock hot water supply through geysers installed in every bathroom. Enjoy a warm and refreshing bathing experience any time.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
  },
  {
    name: 'Attached Bathroom',
    description: 'Every room comes with a clean, well-maintained attached bathroom with tiled interiors, mirror, and essential toiletries.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'AC',
    description: 'Air conditioning available in select rooms to keep you cool and comfortable during the warm months. Choose from our range of AC rooms.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: 'In-house Restaurant',
    description: 'A fully operational in-house restaurant serving breakfast, lunch, dinner, and beverages with both veg and non-veg options available daily.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25v14.25m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-[#0a0907] text-white overflow-hidden border-b border-[#17130c]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0907] via-[#100e0b] to-[#080705]" />
        <div className="absolute inset-0 opacity-[0.09]">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28">
          <p className="eyebrow mb-4">Facilities</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-5 max-w-3xl leading-[1.1]">Our Facilities</h1>
          <p className="text-[#c6bda7] text-lg max-w-2xl leading-relaxed">
            Everything you need for a comfortable and hassle-free stay at Hotel Riyansh.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Parking · Wi-Fi · Room Service
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              In-house Restaurant
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#0a0907]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {facilities.map((facility) => (
              <div
                key={facility.name}
                className="bg-[#14120e] border border-[#221d14] rounded-xl p-6 hover:border-[#3a3427] hover:shadow-gold transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#211b13] to-[#17140f] text-[#c9a96e] rounded-full flex items-center justify-center mb-4 border border-[#312b1e]">
                  {facility.icon}
                </div>
                <h3 className="font-display text-lg text-[#f2ecdf] mb-2">{facility.name}</h3>
                <p className="text-sm text-[#8f8672] leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] border border-[#312b1e] rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <div className="w-10 h-10 bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-[#120f0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-xl text-[#f2ecdf] mb-2">All facilities are available for hotel guests</h3>
            <p className="text-[#8f8672] text-sm">
              Every amenity listed above is included with your stay. No hidden charges.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}