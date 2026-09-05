'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Booking } from '@/types';
import { formatPrice, formatDate, calculateNights, getTodayString } from '@/lib/utils';
import { bookingService } from '@/services/bookingService';
import { authService } from '@/services/authService';

type FilterTab = 'all' | 'upcoming' | 'current' | 'past' | 'cancelled';

const TAB_LABELS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'current', label: 'Current' },
  { key: 'past', label: 'Past' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setAuthChecked(true);

    const load = async () => {
      try {
        const result = await bookingService.getCustomerBookings(user.id);
        setBookings(result);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  const filterBookings = (tab: FilterTab) => {
    const today = getTodayString();
    return bookings.filter((b) => {
      if (tab === 'cancelled') return b.bookingStatus?.toLowerCase() === 'cancelled';
      if (tab === 'current') {
        return (
          b.bookingStatus?.toLowerCase() !== 'cancelled' &&
          b.checkIn <= today &&
          b.checkOut >= today
        );
      }
      if (tab === 'upcoming') {
        return (
          b.bookingStatus?.toLowerCase() !== 'cancelled' &&
          b.checkIn > today
        );
      }
      if (tab === 'past') {
        return (
          b.bookingStatus?.toLowerCase() !== 'cancelled' &&
          b.checkOut < today
        );
      }
      return true;
    });
  };

  const filtered = filterBookings(activeTab);

  const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-[#12240f] text-[#7fd873] border border-[#2a4a22]';
      case 'pending':
        return 'bg-[#241d0d] text-[#e8cd97] border border-[#4a3a1c]';
      case 'cancelled':
        return 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]';
      case 'checked_in':
        return 'bg-[#0e2029] text-[#7cc3e0] border border-[#1e3d4d]';
      case 'checked_out':
        return 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]';
      default:
        return 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]';
    }
  };

  const paymentColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-[#12240f] text-[#7fd873] border border-[#2a4a22]';
      case 'pending':
        return 'bg-[#241d0d] text-[#e8cd97] border border-[#4a3a1c]';
      case 'pay_at_hotel':
        return 'bg-[#0e2029] text-[#7cc3e0] border border-[#1e3d4d]';
      case 'failed':
        return 'bg-[#2a100f] text-[#e07b6b] border border-[#4a211d]';
      default:
        return 'bg-[#17140f] text-[#c6bda7] border border-[#2a251d]';
    }
  };

  if (!authChecked) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0907] pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="font-display text-3xl md:text-4xl font-semibold text-cream mb-6">My Bookings</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-br from-[#dcbd85] to-[#c9a96e] text-[#120f0a]'
                    : 'bg-coal text-mute border border-line hover:border-[#3a3427]'
                }`}
              >
                {tab.label}
                {tab.key !== 'all' && (
                  <span className="ml-1 text-xs opacity-70">({filterBookings(tab.key).length})</span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-[#c9a96e] border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-mute">Loading your bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-coal border border-line flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-mute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-semibold text-cream mb-2">No Bookings Found</h2>
              <p className="text-mute mb-6">
                {activeTab === 'all'
                  ? "You haven't made any bookings yet."
                  : `No ${activeTab} bookings found.`}
              </p>
              <Link
                href="/book"
                className="btn-primary"
              >
                Book a Room
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {filtered.map((booking) => (
                <div
                  key={booking.id}
                  className="card p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="font-mono text-xs text-mute">#{booking.bookingId}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-semibold text-cream">{booking.roomName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute mt-1">
                        <span>{formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}</span>
                        <span>{calculateNights(booking.checkIn, booking.checkOut)} night(s)</span>
                        <span>{booking.numberOfGuests} guest(s)</span>
                        <span>{booking.numberOfRooms} room(s)</span>
                      </div>
                    </div>
                    <div className="text-right sm:min-w-[120px]">
                      <p className="text-xl font-bold text-gold">{formatPrice(booking.total)}</p>
                      <p className="text-xs text-mute uppercase mt-1">{booking.paymentMethod?.replace('_', ' ')}</p>
                      <Link
                        href={`/book/confirmation?bookingId=${booking.bookingId}`}
                        className="inline-block mt-2 text-sm text-gold font-semibold hover:underline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}