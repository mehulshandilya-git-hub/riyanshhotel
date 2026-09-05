import Link from 'next/link';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils';

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { href: '/rooms', label: 'Rooms & Suites' },
      { href: '/restaurant', label: 'Restaurant' },
      { href: '/facilities', label: 'Facilities & Amenities' },
      { href: '/explore-hansdiha', label: 'Explore Hansdiha' },
      { href: '/contact', label: 'Location & Directions' },
    ],
  },
  {
    title: 'Guest Services',
    links: [
      { href: '/book', label: 'Book a Room' },
      { href: '/my-bookings', label: 'My Bookings' },
      { href: '/account', label: 'My Account' },
      { href: '/login', label: 'Login / Register' },
      { href: '/admin/login', label: 'Staff Login' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080705] border-t border-[#221d14] text-[#c6bda7]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h3 className="font-display text-xl font-semibold tracking-wide mb-4">
              Hotel <span className="gold-gradient-text">Riyansh</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-sm">
              A family-friendly hotel on Dumka Road in Hansdiha for families, tourists and travelers.
              Clean rooms, honest prices, 24-hour check-in.
            </p>
            <p className="text-[#a58659] text-sm mt-4 font-medium tracking-wide">
              Est. {HOTEL_INFO.established} · Hansdiha, Jharkhand
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href={getPhoneUrl(HOTEL_INFO.phone)} className="btn-primary !px-5 !py-2.5 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {HOTEL_INFO.phone}
              </a>
              <a href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to inquire about room availability.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-5 !py-2.5 text-sm">
                WhatsApp
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-xs font-semibold text-[#c9a96e] uppercase tracking-[0.2em] mb-4">
                {col.title}
              </h4>
              <div className="space-y-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-[#8f8672] hover:text-[#dcbd85] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold text-[#c9a96e] uppercase tracking-[0.2em] mb-4">Contact</h4>
            <address className="not-italic text-sm text-[#8f8672] space-y-3">
              <p>{HOTEL_INFO.address}</p>
              <p className="text-[#c6bda7]">
                <span className="text-[#a58659]">Landmark:</span> Opposite Austria Petrol Pump
              </p>
              <p className="pt-1 border-t border-[#1c1811]">
                <span className="text-[#c6bda7]">Check-in:</span> {HOTEL_INFO.checkInTime}
                <br />
                <span className="text-[#c6bda7]">Check-out:</span> {HOTEL_INFO.checkOutTime}
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#1c1811] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[#6f6755]">
          <p>&copy; {new Date().getFullYear()} Hotel Riyansh, Hansdiha. All rights reserved.</p>
          <p>
            <a href={getPhoneUrl(HOTEL_INFO.phone)} className="hover:text-[#c9a96e] transition-colors">
              Book directly for the best rate: {HOTEL_INFO.phone}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}