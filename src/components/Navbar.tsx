'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authService } from '@/services/authService';
import { HOTEL_INFO } from '@/types';
import { getPhoneUrl, getWhatsAppUrl } from '@/lib/utils';
import { User } from '@/types';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/restaurant', label: 'Restaurant' },
  { href: '/facilities', label: 'Facilities' },
  { href: '/explore-hansdiha', label: 'Explore Hansdiha' },
  { href: '/contact', label: 'Location' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setUser(authService.getCurrentUser());
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = pathname.startsWith('/admin');
  const isAdminLogin = pathname === '/admin/login';

  if (isAdmin && !isAdminLogin && !user) {
    return null;
  }

  if (isAdmin && !isAdminLogin) {
    return <AdminNavbar user={user} onLogout={handleLogout} />;
  }

  async function handleLogout() {
    await authService.logout();
    setUser(null);
    window.location.href = '/';
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className="bg-[#0a0907]/95 text-[#8f8672] text-xs md:text-sm py-2 hidden md:block border-b border-[#221d14]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="text-[#8f8672]">
            <span className="text-[#c9a96e]">Hotel Riyansh</span> · Dumka Road, opposite Austria Petrol Pump, Hansdiha
          </span>
          <div className="flex items-center gap-6">
            <a href={getPhoneUrl(HOTEL_INFO.phone)} className="flex items-center gap-1.5 hover:text-[#dcbd85] transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {HOTEL_INFO.phone}
            </a>
            <a
              href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to inquire about room availability.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#dcbd85] transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
            <Link href="/admin/login" className="hover:text-[#dcbd85] transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#0a0907]/90 backdrop-blur-md border-[#221d14]'
            : 'bg-[#0a0907]/70 backdrop-blur-sm border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-[#f2ecdf] font-semibold text-xl md:text-2xl tracking-wide">
                Hotel <span className="gold-gradient-text">Riyansh</span>
              </span>
              <span className="text-[#a58659] text-[10px] md:text-xs tracking-[0.3em] uppercase mt-1">
                Hansdiha · Est. {HOTEL_INFO.established}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-[#dcbd85] ${
                    isActive(link.href) ? 'text-[#c9a96e]' : 'text-[#c6bda7]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <div className="flex items-center gap-5 border-r border-[#2b2518] pr-5">
                {user ? (
                  <>
                    {user.role !== 'admin' && (
                      <Link href="/my-bookings" className="text-sm font-medium text-[#c6bda7] hover:text-[#dcbd85] transition-colors">
                        My Bookings
                      </Link>
                    )}
                    <button onClick={handleLogout} className="text-sm font-medium text-[#c6bda7] hover:text-[#dcbd85] transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="text-sm font-medium text-[#c6bda7] hover:text-[#dcbd85] transition-colors">
                    Login / Register
                  </Link>
                )}
              </div>
              <Link href="/book" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a] text-sm font-semibold px-6 py-2.5 rounded-lg transition-all hover:brightness-110 shadow-[0_2px_16px_rgba(201,169,110,0.15)]">
                Book Now
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#f2ecdf]"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-[#0a0907]/95 backdrop-blur-md border-t border-[#221d14]">
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2.5 text-sm tracking-wide border-b border-[#17130c] ${
                    isActive(link.href) ? 'text-[#c9a96e] font-semibold' : 'text-[#c6bda7]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                {user ? (
                  <>
                    {user.role !== 'admin' && (
                      <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-[#c6bda7]">
                        My Bookings
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block py-2 text-sm font-medium text-[#c6bda7] text-left">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block py-2 text-sm font-medium text-[#c6bda7]">
                    Login / Register
                  </Link>
                )}
                <Link href="/book" onClick={() => setIsOpen(false)} className="block text-center bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a] font-semibold py-3 rounded-lg text-sm mt-1">
                  Book Now
                </Link>
                <div className="flex gap-2 mt-2">
                  <a href={getPhoneUrl(HOTEL_INFO.phone)} className="btn-dark text-sm flex-1 !py-2.5">
                    Call Now
                  </a>
                  <a href={getWhatsAppUrl(HOTEL_INFO.whatsapp, 'Hello! I would like to inquire about room availability.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-sm flex-1 !py-2.5">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function AdminNavbar({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/bookings', label: 'Bookings' },
    { href: '/admin/rooms', label: 'Rooms' },
    { href: '/admin/customers', label: 'Customers' },
  ];

  return (
    <nav className="bg-[#0a0907] border-b border-[#221d14] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-display text-[#f2ecdf] font-semibold text-lg">Hotel Riyansh</span>
            <span className="text-[#0a0907] bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-xs px-2 py-0.5 rounded font-semibold">Admin</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-[#dcbd85]' : 'text-[#8f8672] hover:text-[#f2ecdf]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user && <span className="text-sm text-[#8f8672]">{user.name}</span>}
            <Link href="/" className="text-sm text-[#8f8672] hover:text-[#c9a96e]">View Site</Link>
            <button onClick={onLogout} className="text-sm text-[#8f8672] hover:text-[#c9a96e]">Logout</button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#f2ecdf] p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[#221d14] bg-[#0a0907]">
          <div className="px-6 py-3 space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  pathname === link.href ? 'text-[#c9a96e]' : 'text-[#8f8672]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-[#221d14] my-2" />
            <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-sm text-[#8f8672]">View Site</Link>
            <button onClick={() => { onLogout(); setIsOpen(false); }} className="block py-2 text-sm text-[#8f8672]">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}