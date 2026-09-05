import Link from 'next/link';

export default function BookDirectBanner() {
  return (
    <section className="bg-[#1a2744]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#c9a96e]/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg md:text-xl">Best Rate Guarantee.</h3>
              <p className="text-gray-300 text-sm">Book directly with Hotel Riyansh for the best available rate.</p>
            </div>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-[#c9a96e] hover:bg-[#b8963d] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Check Availability
          </Link>
        </div>
      </div>
    </section>
  );
}