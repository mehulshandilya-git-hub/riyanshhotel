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
  { href: '/explore-hansdiha', label: 'Explore' },
  { href: '/contact', label: 'Contact' },
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

            <div className="hidden lg:flex items-center gap-6">
              <Link
                href={user ? '/account' : '/login'}
                aria-label={user ? 'My Account' : 'Login / Register'}
                className="text-[#c6bda7] hover:text-[#dcbd85] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
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