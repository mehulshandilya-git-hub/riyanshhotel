import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HOTEL_INFO } from '@/types';

const pilgrimages = [
  {
    title: 'Temples & Sacred Sites',
    description:
      'Across the Dumka region you will find temples and pilgrimage sites that draw visitors from across Jharkhand and beyond. Our front desk can guide you on what to visit nearby.',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  {
    title: 'Faith & Local Culture',
    description:
      'Hansdiha sits in a region rich in Santhal culture and tradition. Respectful visits to village communities and local markets reveal a way of life that has stayed close to its roots.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
];

const countryside = [
  {
    title: 'Village Walks',
    description:
      'Short walks through surrounding villages let you meet local families, watch everyday rural life unfold, and enjoy open countryside just minutes from the hotel.',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01',
  },
  {
    title: 'The Pace of Rustic Life',
    description:
      'Mornings here start with birdsong and warm chai. It is the kind of slow, quiet stay that lets travelers truly switch off.',
    icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
  },
];

const dayTrips = [
  {
    title: 'Rajmahal & Its Hills',
    description:
      'The natural beauty of the Rajmahal hills is a short journey from Hansdiha — rolling forests, river views and quiet country roads.',
    icon: 'M3 17l6-6 4 4 8-8M14 7h7v7',
  },
  {
    title: 'The Banks of the Ganges',
    description:
      'A day trip to the Ganges lets you spend time along one of India\u2019s most sacred rivers, watching boats and the riverside rhythm of life.',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Dumka Town',
    description:
      'The district headquarters is an easy excursion for shopping, local food and exploring the everyday energy of a Jharkhand town.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
];

export default function ExploreHansdihaPage() {
  return (
    <>
      <Navbar />

      <section className="relative bg-[#0a0907] text-white overflow-hidden border-b border-[#17130c]">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_70%_10%,#c9a96e,transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-28 md:pb-28">
          <p className="eyebrow mb-4">Explore Hansdiha</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold max-w-3xl leading-[1.1] mb-6">
            Discover the land around <span className="gold-gradient-text italic">Hotel Riyansh</span>
          </h1>
          <p className="text-[#c6bda7] text-lg md:text-xl max-w-2xl leading-relaxed">
            Hansdiha is your quiet home base for the temples, villages and natural wonders of the
            Dumka region — where the hills of Rajmahal meet the plains of Jharkhand.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#0a0907]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4">Faith &amp; Pilgrimage</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf]">
              A land of temples and tradition
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pilgrimages.map((item) => (
              <div key={item.title} className="bg-[#14120e] border border-[#221d14] rounded-2xl p-8">
                <div className="w-12 h-12 border border-[#3a3427] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-[#f2ecdf] mb-3">{item.title}</h3>
                <p className="text-sm text-[#8f8672] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#100e0b]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4">Village &amp; Countryside</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf]">
              Slow mornings, open skies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {countryside.map((item) => (
              <div key={item.title} className="bg-[#17140f] border border-[#221d14] rounded-2xl p-8">
                <div className="w-12 h-12 border border-[#3a3427] rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-[#f2ecdf] mb-3">{item.title}</h3>
                <p className="text-sm text-[#8f8672] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#0a0907]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4">Day Trips</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf]">
              Day trips from Hansdiha
            </h2>
            <p className="text-[#8f8672] mt-4 leading-relaxed">
              Everything below is an easy excursion from the hotel. Ask our team when you arrive —
              we are happy to help you plan your day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dayTrips.map((item) => (
              <div key={item.title} className="group bg-gradient-to-b from-[#17140f] to-[#100e0b] border border-[#221d14] rounded-2xl p-8 hover:border-[#3a3427] transition-colors">
                <div className="w-14 h-14 bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <svg className="w-7 h-7 text-[#120f0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-[#f2ecdf] mb-3">{item.title}</h3>
                <p className="text-sm text-[#8f8672] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0907] border-y border-[#17130c]">
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_50%_0%,#c9a96e,transparent_45%)]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#f2ecdf] mb-4 leading-tight">
            Make Hotel Riyansh your base
          </h2>
          <p className="text-[#8f8672] text-lg max-w-xl mx-auto mb-8">
            Clean rooms, warm hospitality and 24-hour check-in. Call or WhatsApp us anytime —
            {HOTEL_INFO.phone}.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/book" className="btn-primary !px-9 !py-4 text-base">Book Your Stay</Link>
            <Link href="/contact" className="btn-gold !px-9 !py-4 text-base">Find Us on the Map</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}