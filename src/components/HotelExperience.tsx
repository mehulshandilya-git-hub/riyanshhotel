import Link from 'next/link';

const highlights = [
  {
    title: 'Comfort',
    description: 'Clean, well-kept rooms with everything you need.',
    icon: 'M3 10.5L12 3l9 7.5M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9',
  },
  {
    title: 'Hospitality',
    description: 'Warm, friendly service for families and travelers.',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Convenience',
    description: '24-hour check-in, parking, restaurant and more.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];

export default function HotelExperience() {
  return (
    <section className="py-20 md:py-28 bg-[#100e0b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="relative bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] rounded-3xl aspect-[4/5] flex items-center justify-center border border-[#221d14] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_30%_30%,#c9a96e,transparent_55%)]" />
            <div className="relative text-center px-10">
              <svg className="w-20 h-20 mx-auto mb-6 text-[#c9a96e] opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="font-display text-2xl md:text-3xl text-[#f2ecdf]">Stay. Dine. Relax.</p>
              <div className="rule-gold w-16 mx-auto mt-4" />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">The Hotel Experience</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight mb-6">
              Stay. Dine. <span className="gold-gradient-text italic">Relax.</span>
            </h2>
            <p className="text-[#8f8672] leading-relaxed mb-8 max-w-lg">
              Everything you need for an easy, comfortable stay — all under one roof.
            </p>

            <div className="space-y-5 mb-9">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-4">
                  <div className="w-11 h-11 border border-[#3a3427] rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={h.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-[#f2ecdf]">{h.title}</h3>
                    <p className="text-sm text-[#8f8672] mt-0.5">{h.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/facilities" className="btn-gold">
              Discover our facilities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}