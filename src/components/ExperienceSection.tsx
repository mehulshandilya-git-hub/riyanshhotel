'use client';

import Link from 'next/link';

const experiences = [
  {
    title: 'Explore Hansdiha',
    titleJp: 'Day trips & local culture',
    description:
      'From the natural beauty of Rajmahal to the banks of the Ganges, Hansdiha is a peaceful base to explore the Dumka region.',
    href: '/about',
  },
  {
    title: 'Faith & Temples',
    titleJp: 'Sacred places nearby',
    description:
      'The area is dotted with temples and pilgrimage sites worth visiting. Our team can point you in the right direction.',
    href: '/contact',
  },
  {
    title: 'Into the Countryside',
    titleJp: 'Village walks',
    description:
      'Walk through the surrounding villages, meet the locals, and enjoy the pace of rural Jharkhand life.',
    href: '/about',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-16 md:py-24 bg-[#1a2744] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[#c9a96e] font-medium tracking-[0.25em] uppercase text-xs mb-3">Experience Hansdiha</p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Simple adventures, just outside our door
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((e) => (
            <Link
              key={e.title}
              href={e.href}
              className="group bg-white/5 hover:bg-white/10 rounded-2xl p-7 transition-colors"
            >
              <h3 className="text-xl font-bold mb-1">{e.title}</h3>
              <p className="text-[#c9a96e] text-sm mb-4">{e.titleJp}</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{e.description}</p>
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