const reasons = [
  {
    title: 'Comfortable Rooms',
    description:
      'Clean, well-maintained rooms with modern amenities including AC, TV, Wi-Fi, geyser, and attached bathrooms for a relaxing stay.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
  },
  {
    title: 'Great Location',
    description:
      'Conveniently located on Dumka Road, opposite Austria Petrol Pump in Hansdiha — easily accessible for travelers and tourists.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Family-Friendly',
    description:
      'A warm and welcoming environment designed for families. We cater to guests of all ages with care and attention.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Value for Money',
    description:
      'Affordable rooms starting from just ₹800/night without compromising on quality, cleanliness, or essential amenities.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function WhyStaySection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] font-medium tracking-[0.15em] uppercase text-sm mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Why Stay With Us
          </h2>
          <div className="w-16 h-1 bg-[#c9a96e] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="text-center group">
              <div className="w-16 h-16 rounded-full bg-[#faf8f4] border-2 border-[#c9a96e] flex items-center justify-center text-[#c9a96e] mx-auto mb-5 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors">
                {reason.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1a2744] mb-3">{reason.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
