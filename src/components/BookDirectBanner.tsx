import Link from 'next/link';
import { HOTEL_INFO } from '@/types';

export default function BookDirectBanner() {
  return (
    <section className="relative overflow-hidden bg-[#0a0907]">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_50%,#c9a96e,transparent_40%),radial-gradient(circle_at_80%_50%,#c9a96e,transparent_40%)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">Begin your stay</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#f2ecdf] leading-tight">
              Book your stay <span className="gold-gradient-text italic">directly with us</span>
            </h2>
            <p className="text-[#8f8672] text-lg mt-3">
              The best rate is always the direct one. Choose a room, check our availability, and
              reserve over WhatsApp — or simply call us at {HOTEL_INFO.phone}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/book"
              className="btn-primary !px-9 !py-4 text-base"
            >
              Book Your Stay
            </Link>
            <Link href="/rooms" className="btn-gold !px-9 !py-4 text-base">
              View Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}