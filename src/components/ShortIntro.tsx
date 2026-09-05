import Link from 'next/link';

export default function ShortIntro() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0907]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="eyebrow mb-4">Welcome to Hotel Riyansh</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight mb-6">
          A comfortable stay in the heart of <span className="gold-gradient-text italic">Hansdiha</span>.
        </h2>
        <div className="rule-gold w-24 mx-auto mb-6" />
        <p className="text-[#8f8672] text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Clean rooms, warm hospitality and honest prices on Dumka Road — a calm base for families, tourists and travelers.
        </p>
        <Link href="/about" className="btn-gold">
          Explore Hotel
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </section>
  );
}