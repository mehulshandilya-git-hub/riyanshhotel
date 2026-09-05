import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HOTEL_INFO } from '@/types';

const values = [
  {
    title: 'Comfort',
    description: 'Clean rooms, quality bedding, and modern amenities ensure you feel at home from the moment you check in.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Convenience',
    description: 'Prime location on Dumka Road, easy booking, 24-hour check-in, and flexible payment options for a hassle-free experience.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Hospitality',
    description: 'Warm, friendly staff who treat every guest like family. We are always ready to help with anything you need.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Value',
    description: 'Quality accommodation at honest prices. We believe everyone deserves a comfortable stay without breaking the bank.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-[#1a2744] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2744] via-[#243556] to-[#17213a] opacity-95" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#c9a96e] rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-16 md:pt-20 md:pb-20">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 max-w-3xl leading-tight">About Hotel Riyansh</h1>
          <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
            A family-friendly hotel built with a passion for hospitality on Dumka Road, Hansdiha.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Est. {HOTEL_INFO.established}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-sm px-3 py-1.5 rounded-full">
              <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Family-friendly
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2744] mb-4">Welcome to Hotel Riyansh</h2>
              <div className="w-12 h-0.5 bg-[#c9a96e] mb-6" />
              <p className="text-gray-500 leading-relaxed mb-4">
                Established in <strong className="text-[#1a2744]">{HOTEL_INFO.established}</strong>, Hotel Riyansh
                is a budget and mid-range hotel located on <strong className="text-[#1a2744]">Dumka Road,
                opposite Austria Petrol Pump, Hansdiha - 814145</strong>, Jharkhand.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                We are a family-friendly hotel dedicated to providing comfortable and affordable stays for
                families, tourists, pilgrims, and business travellers visiting Hansdiha and the surrounding areas.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Whether you are passing through Dumka Road or visiting Hansdiha for work or leisure,
                Hotel Riyansh offers a clean, safe, and welcoming environment for your stay.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#1a2744] to-[#243556] rounded-2xl p-10 text-white flex flex-col items-center justify-center text-center min-h-[300px]">
              <span className="text-[#c9a96e] text-6xl font-bold mb-2">{HOTEL_INFO.established}</span>
              <span className="text-gray-300 text-lg tracking-widest uppercase mb-1">Established</span>
              <div className="w-12 h-0.5 bg-[#c9a96e] my-4" />
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {HOTEL_INFO.address}
              </p>
            </div>
          </div>

          <div className="bg-[#faf8f4] rounded-2xl p-8 md:p-12 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-4">Our Mission</h2>
              <div className="w-12 h-0.5 bg-[#c9a96e] mx-auto mb-6" />
              <p className="text-gray-500 leading-relaxed text-lg">
                To provide clean, comfortable, and affordable accommodation to every guest who walks
                through our doors. We strive to make Hotel Riyansh a home away from home by delivering
                personalised service, maintaining high hygiene standards, and offering modern amenities
                at honest prices.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a2744] mb-4">Our Values</h2>
              <div className="w-12 h-0.5 bg-[#c9a96e] mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => (
                <div key={val.title} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-50">
                  <div className="w-14 h-14 bg-[#c9a96e]/10 text-[#c9a96e] rounded-full flex items-center justify-center mx-auto mb-4">
                    {val.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2744] mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
