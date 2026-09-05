import Link from 'next/link';

const stats = [
  {
    value: 'Est. 2025',
    label: 'Established',
    text: 'A new family-friendly hotel in the heart of Hansdiha.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    ),
  },
  {
    value: '24h',
    label: 'Check-in Service',
    text: 'Check in any time of day. Please call us before you arrive.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
  },
  {
    value: '6',
    label: 'Room Types',
    text: 'AC and Non-AC rooms to suit families, tourists and travelers.',
    link: '/rooms',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    ),
  },
  {
    value: '8+',
    label: 'Facilities',
    text: 'Parking, Wi-Fi, restaurant, room service and more.',
    link: '/facilities',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">Why Book with Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744]">
            Simple, honest stays for every traveler
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#c9a96e]/10 text-[#c9a96e] flex items-center justify-center mx-auto mb-4">
                {s.icon}
              </div>
              <div className="text-3xl font-bold text-[#1a2744]">{s.value}</div>
              <div className="text-[#c9a96e] font-semibold text-sm uppercase tracking-wider mt-1">{s.label}</div>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{s.text}</p>
              {s.link && (
                <Link href={s.link} className="inline-block mt-3 text-sm font-semibold text-[#c9a96e] hover:underline">
                  Learn more ›
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}