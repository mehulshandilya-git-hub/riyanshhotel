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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-10 h-10 border-4 border-[#c9a96e] border-t-transparent rounded-full mx-auto" />
              <p className="mt-4 text-gray-500">Loading booking details...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
              <p className="text-gray-500 mb-6">{error}</p>
              <Link
                href="/book"
                className="inline-block bg-[#c9a96e] hover:bg-[#b8985d] text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Book a Room
              </Link>
            </div>
          ) : booking ? (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-[#1a2744]">BOOKING REQUEST SENT</h1>
                <p className="text-gray-500 mt-2">Your booking details have been shared with Hotel Riyansh on WhatsApp.</p>
                <p className="text-sm text-gray-400 mt-1">Booking ID: <span className="font-mono font-semibold text-[#1a2744]">{booking.bookingId}</span></p>
              </div>

              <div className="bg-[#1a2744] rounded-2xl p-6 text-center mb-6">
                <p className="text-white font-bold text-lg mb-1">Please call the hotel before arrival for check-in</p>
                <a
                  href={phoneUrl}
                  className="text-[#c9a96e] text-2xl font-bold hover:underline"
                >
                  {HOTEL_PHONE}
                </a>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-bold text-[#1a2744] mb-4">Booking Details</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Booking ID</span>
                    <span className="font-semibold text-[#1a2744] font-mono">{booking.bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guest Name</span>
                    <span className="font-semibold text-[#1a2744]">{booking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Room</span>
                    <span className="font-semibold text-[#1a2744]">{booking.roomName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Check-in</span>
                    <span className="font-semibold text-[#1a2744]">{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Check-out</span>
                    <span className="font-semibold text-[#1a2744]">{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guests</span>
                    <span className="font-semibold text-[#1a2744]">{booking.numberOfGuests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rooms</span>
                    <span className="font-semibold text-[#1a2744]">{booking.numberOfRooms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nights</span>
                    <span className="font-semibold text-[#1a2744]">{calculateNights(booking.checkIn, booking.checkOut)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold text-[#c9a96e] text-lg">{formatPrice(booking.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment</span>
                    <span className="font-semibold text-[#1a2744]">Pay at Hotel</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Booking Status</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(booking.bookingStatus)}`}>
                      {booking.bookingStatus.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={phoneUrl}
                  className="bg-[#1a2744] hover:bg-[#243456] text-white font-bold py-3 px-4 rounded-lg text-center transition-colors text-sm"
                >
                  CALL HOTEL
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors text-sm"
                >
                  WHATSAPP HOTEL
                </a>
                <Link
                  href={`/my-bookings`}
                  className="bg-[#c9a96e] hover:bg-[#b8985d] text-white font-bold py-3 px-4 rounded-lg text-center transition-colors text-sm"
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
