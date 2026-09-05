'use client';

import Link from 'next/link';

const experiences = [
  {
    title: 'Temples & Pilgrimage',
    description:
      'The Hansdiha region is dotted with temples and sacred sites worth visiting. Our team can point you in the right direction.',
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  },
  {
    title: 'Countryside & Villages',
    description:
      'Walk through the surrounding villages, meet the locals, and enjoy the unhurried pace of rural Jharkhand life.',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 14h.01M15 14h.01',
  },
  {
    title: 'Day Trips from Hansdiha',
    description:
      'From the natural beauty of Rajmahal to the banks of the Ganges, Hansdiha is a peaceful base for exploring the Dumka region.',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#0a0907] to-[#080705]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Explore Hansdiha</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight">
              Simple adventures, just outside <span className="gold-gradient-text italic">our door</span>
            </h2>
          </div>
          <Link href="/explore-hansdiha" className="btn-gold shrink-0">
            Explore the area
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <Link
              key={e.title}
              href="/explore-hansdiha"
              className="group bg-[#17140f] border border-[#221d14] hover:border-[#3a3427] rounded-2xl p-8 transition-colors"
            >
              <div className="w-12 h-12 border border-[#3a3427] rounded-xl flex items-center justify-center mb-5 group-hover:border-[#c9a96e] transition-colors">
                <svg className="w-6 h-6 text-[#c9a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={e.icon} />
                </svg>
              </div>
              <h3 className="font-display text-xl text-[#f2ecdf] mb-3">{e.title}</h3>
              <p className="text-sm text-[#8f8672] leading-relaxed mb-5">{e.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a96e] group-hover:gap-3 transition-all">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}