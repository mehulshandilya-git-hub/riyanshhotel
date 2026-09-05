'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Booking } from '@/types';
import { formatPrice, formatDate, calculateNights, getWhatsAppUrl, getPhoneUrl } from '@/lib/utils';
import { bookingService } from '@/services/bookingService';

const HOTEL_PHONE = '+916200760138';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided.');
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const result = await bookingService.getBooking(bookingId);
        if (result) {
          setBooking(result);
        } else {
          setError('Booking not found.');
        }
      } catch {
        setError('Failed to load booking details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [bookingId]);

  const whatsappUrl = booking
    ? getWhatsAppUrl(
        HOTEL_PHONE,
        `Hello Hotel Riyansh, I just sent a booking request for: ${booking.roomName}. Guest: ${booking.guestName}, Check-in: ${booking.checkIn}, Check-out: ${booking.checkOut}, Guests: ${booking.numberOfGuests}, Rooms: ${booking.numberOfRooms}, Booking ID: ${booking.bookingId}. Please confirm my booking.`
      )
    : '';

  const phoneUrl = getPhoneUrl(HOTEL_PHONE);

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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0907] pt-28 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-[#c9a96e] border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-mute">Loading booking details...</p>
            </div>
          ) : error ? (
            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#2a100f] border border-[#4a211d] flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#e07b6b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="font-display text-xl font-semibold text-[#f2ecdf] mb-2">Booking Not Found</h2>
              <p className="text-mute mb-6">{error}</p>
              <Link
                href="/book"
                className="btn-primary"
              >
                Book a Room
              </Link>
            </div>
          ) : booking ? (
            <>
              <div className="card p-8 text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-[#12240f] border border-[#2a4a22] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-[#7fd873]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="font-display text-3xl font-semibold text-cream">BOOKING REQUEST SENT</h1>
                <p className="text-mute mt-2">Your booking details have been shared with Hotel Riyansh on WhatsApp.</p>
                <p className="text-sm text-mute mt-1">Booking ID: <span className="font-mono font-semibold text-gold">{booking.bookingId}</span></p>
              </div>

              <div className="bg-gradient-to-br from-[#211b13] via-[#17140f] to-[#0d0b08] border border-[#312b1e] rounded-2xl p-6 text-center mb-6">
                <p className="font-display text-lg text-cream mb-1">Please call the hotel before arrival for check-in</p>
                <a
                  href={phoneUrl}
                  className="gold-gradient-text text-2xl font-bold hover:underline"
                >
                  {HOTEL_PHONE}
                </a>
              </div>

              <div className="card p-6 sm:p-8 mb-6">
                <h2 className="font-display text-lg font-semibold text-cream mb-4">Booking Details</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-mute">Booking ID</span>
                    <span className="font-semibold text-cream font-mono">{booking.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Guest Name</span>
                    <span className="font-semibold text-cream">{booking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Room</span>
                    <span className="font-semibold text-cream">{booking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Check-in</span>
                    <span className="font-semibold text-cream">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Check-out</span>
                    <span className="font-semibold text-cream">{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Guests</span>
                    <span className="font-semibold text-cream">{booking.numberOfGuests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Rooms</span>
                    <span className="font-semibold text-cream">{booking.numberOfRooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Nights</span>
                    <span className="font-semibold text-cream">{calculateNights(booking.checkIn, booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Total</span>
                    <span className="font-bold text-gold text-lg">{formatPrice(booking.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mute">Payment</span>
                    <span className="font-semibold text-cream">Pay at Hotel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-mute">Booking Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={phoneUrl}
                  className="btn-dark text-sm !py-3"
                >
                  CALL HOTEL
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm !py-3"
                >
                  WHATSAPP HOTEL
                </a>
                <Link
                  href={`/my-bookings`}
                  className="btn-primary text-sm !py-3"
                >
                  VIEW MY BOOKING
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}