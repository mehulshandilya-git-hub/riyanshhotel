import Link from 'next/link';

const facilities = [
  { icon: 'M9 19c-4.3 1.4-4.3-2.5-6-3m12 3c4.3 1.4 4.3-2.5 6-3M2 9c2.6 1.3 5.7 1.3 8 0-1-1.5-2-2-2-2S5.5 8 2 9zm20 0c-2.6 1.3-5.7 1.3-8 0 1-1.5 2-2 2-2s2 1 6 2zm-8 2v9m0-9c-1.5.3-2.5 1-3 2.5l3-2z', name: 'Parking' },
  { icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0', name: 'Wi-Fi' },
  { icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25', name: 'Room Service' },
  { icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', name: 'TV' },
  { icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', name: 'Geyser / Hot Water' },
  { icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', name: 'Attached Bathroom' },
  { icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', name: 'AC Rooms' },
  { icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25v14.25m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292', name: 'In-house Restaurant' },
];

export default function FacilitiesSection() {
  return (
    <section className="py-16 md:py-20 bg-[#0a0907] border-y border-[#17130c]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="lg:w-[30%] shrink-0">
            <p className="eyebrow mb-4">Facilities &amp; Amenities</p>
            <h2 className="font-display text-3xl md:text-4xl text-[#f2ecdf] mb-4 leading-tight">
              Everything you need, included
            </h2>
            <p className="text-[#8f8672] text-sm leading-relaxed mb-5">
              Every amenity at Hotel Riyansh is part of your stay. No hidden charges.
            </p>
            <Link href="/facilities" className="btn-gold text-sm">
              See all facilities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#221d14] border border-[#221d14] rounded-2xl overflow-hidden flex-1">
            {facilities.map((facility) => (
              <div key={facility.name} className="bg-[#100e0b] p-5 text-center hover:bg-[#17140f] transition-colors">
                <svg className="w-6 h-6 text-[#c9a96e] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={facility.icon} />
                </svg>
                <p className="text-xs text-[#c6bda7] leading-snug">{facility.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}