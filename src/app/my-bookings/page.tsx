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
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'checked_in':
        return 'bg-blue-100 text-blue-700';
      case 'checked_out':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const paymentColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'pay_at_hotel':
        return 'bg-blue-100 text-blue-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  if (!authChecked) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#1a2744] mb-6">My Bookings</h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-[#1a2744] text-white'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'
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
              <p className="mt-4 text-gray-500">Loading your bookings...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">No Bookings Found</h2>
              <p className="text-gray-400 mb-6">
                {activeTab === 'all'
                  ? "You haven't made any bookings yet."
                  : `No ${activeTab} bookings found.`}
              </p>
              <Link
                href="/book"
                className="inline-block bg-[#c9a96e] hover:bg-[#b8985d] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Book a Room
              </Link>
            </div>
          ) : (
            <div className="grid gap-5">
              {filtered.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-gray-400">#{booking.bookingId}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor(booking.bookingStatus)}`}>
                          {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${paymentColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a2744]">{booking.roomName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                        <span>{formatDate(booking.checkIn)} — {formatDate(booking.checkOut)}</span>
                        <span>{calculateNights(booking.checkIn, booking.checkOut)} night(s)</span>
                        <span>{booking.numberOfGuests} guest(s)</span>
                        <span>{booking.numberOfRooms} room(s)</span>
                      </div>
                    </div>
                    <div className="text-right sm:min-w-[120px]">
                      <p className="text-xl font-bold text-[#c9a96e]">{formatPrice(booking.total)}</p>
                      <p className="text-xs text-gray-400 uppercase mt-1">{booking.paymentMethod?.replace('_', ' ')}</p>
                      <Link
                        href={`/book/confirmation?bookingId=${booking.bookingId}`}
                        className="inline-block mt-2 text-sm text-[#1a2744] font-semibold hover:underline"
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
