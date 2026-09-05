export default function AboutSection() {
  return (
    <section className="bg-[#faf8f4] py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#c9a96e] font-medium tracking-[0.15em] uppercase text-sm mb-3">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6 leading-tight">
              Welcome to Hotel Riyansh
            </h2>
            <div className="w-16 h-1 bg-[#c9a96e] mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              Established in <span className="font-semibold text-[#1a2744]">2025</span>, Hotel Riyansh
              is a family-friendly hotel located on <span className="font-semibold text-[#1a2744]">Dumka Road,
              opposite Austria Petrol Pump, Hansdiha</span> — a convenient stop for travelers, pilgrims,
              and families visiting the region.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer comfortable rooms at both budget and mid-range prices, ensuring every guest
              enjoys a clean, safe, and welcoming stay. Whether you are passing through Hansdiha or
              planning an extended visit, our hospitality team is here to make your experience memorable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With modern amenities, attentive service, and an in-house restaurant, Hotel Riyansh is
              your home away from home in Jharkhand.
            </p>
          </div>
          <div className="relative">
            <div className="bg-[#1a2744] rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-400 px-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#c9a96e] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-sm font-medium">Hotel Riyansh</p>
                <p className="text-xs opacity-60 mt-1">Hansdiha, Jharkhand</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#c9a96e] rounded-xl opacity-20 -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#c9a96e] rounded-xl opacity-15 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
