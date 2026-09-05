import Link from 'next/link';

export default function ExperienceSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#0a0907] to-[#080705]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] rounded-3xl border border-[#221d14] overflow-hidden px-8 py-16 md:py-20 text-center">
          <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(circle_at_50%_0%,#c9a96e,transparent_50%)]" />
          <div className="relative">
            <p className="eyebrow mb-4">Explore Hansdiha</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight mb-4">
              Discover <span className="gold-gradient-text italic">Hansdiha</span>.
            </h2>
            <p className="text-[#8f8672] leading-relaxed max-w-xl mx-auto mb-8">
              Temples, countryside and day trips — ask our team for the best spots around the Dumka region.
            </p>
            <Link href="/explore-hansdiha" className="btn-gold">
              Explore Hansdiha
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}