import Link from 'next/link';
import { HOTEL_INFO } from '@/types';
import { getWhatsAppUrl } from '@/lib/utils';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0a0907]">
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle_at_20%_50%,#c9a96e,transparent_40%),radial-gradient(circle_at_80%_50%,#c9a96e,transparent_40%)]" />
      <div className="relative max-w-4xl mx-auto px-6 py-20 md:py-24 text-center">
        <p className="eyebrow mb-4">Begin your stay</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-[#f2ecdf] leading-tight mb-4">
          Your stay starts <span className="gold-gradient-text italic">here</span>.
        </h2>
        <p className="text-[#8f8672] text-lg mb-8">
          Book directly for the best rate — or call us at {HOTEL_INFO.phone}.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/book" className="btn-primary !px-9 !py-4 text-base">
            Book Your Stay
          </Link>
          <a
            href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to book a room.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-9 !py-4 text-base"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}