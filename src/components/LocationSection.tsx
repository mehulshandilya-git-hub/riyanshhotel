import { HOTEL_INFO } from '@/types';

export default function LocationSection() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-[#c9a96e] font-medium tracking-[0.15em] uppercase text-sm mb-3">
            Find Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Our Location
          </h2>
          <div className="w-16 h-1 bg-[#c9a96e] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#1a2744] rounded-2xl overflow-hidden aspect-[16/10] flex items-center justify-center relative">
            <div className="text-center text-gray-400 px-8">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#c9a96e] opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-sm font-medium">Map Placeholder</p>
              <p className="text-xs opacity-60 mt-1">Hansdiha, Dumka Road, Jharkhand</p>
            </div>
          </div>

          <div className="bg-[#faf8f4] rounded-2xl p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">Hotel Address</h3>
                <p className="text-gray-600 leading-relaxed">{HOTEL_INFO.address}</p>
              </div>

              <div className="w-full h-px bg-gray-200" />

              <div>
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">How to Reach</h3>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        We are located <span className="font-semibold text-[#1a2744]">opposite Austria Petrol Pump</span> on
                        Dumka Road, Hansdiha. Look for the petrol pump landmark — our hotel is directly across the road.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1a2744] mb-2">Timings</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Check-in</span>
                    <span className="font-semibold text-[#1a2744]">{HOTEL_INFO.checkInTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Check-out</span>
                    <span className="font-semibold text-[#1a2744]">{HOTEL_INFO.checkOutTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
