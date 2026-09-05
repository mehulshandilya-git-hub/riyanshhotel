import Link from 'next/link';
import { HOTEL_INFO } from '@/types';

const facts = [
  { value: HOTEL_INFO.established, label: 'Established' },
  { value: '24h', label: 'Check-in' },
  { value: '8', label: 'Facilities' },
  { value: '₹800', label: 'Rooms from' },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0a0907]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow mb-4">Welcome to Hotel Riyansh</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] mb-6">
            A calm, comfortable base on <span className="gold-gradient-text italic">Dumka Road</span>
          </h2>
          <div className="rule-gold w-24 mx-auto mb-6" />
          <p className="text-[#8f8672] leading-relaxed text-lg">
            Between the natural beauty of Rajmahal and the banks of the Ganges, Hansdiha is a quiet
            corner of Jharkhand. Hotel Riyansh is a family-friendly hotel built around one simple idea —
            that every traveler deserves a clean, safe room at an honest price.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#221d14] border border-[#221d14] rounded-2xl overflow-hidden">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-[#100e0b] py-8 px-6 text-center">
              <p className="font-display text-2xl md:text-3xl text-[#c9a96e] mb-1">{fact.value}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8f8672]">{(fact as { label: string }).label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="btn-gold text-sm"
          >
            Find us on the map
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}