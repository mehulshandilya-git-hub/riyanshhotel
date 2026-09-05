'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookingSearch, RoomType, HOTEL_INFO } from '@/types';
import { formatPrice, formatDate, calculateNights, getTodayString, getWhatsAppUrl } from '@/lib/utils';
import { roomService } from '@/services/roomService';
import { bookingService } from '@/services/bookingService';
import { authService } from '@/services/authService';

type BookingStep = 1 | 2 | 3 | 4 | 5;

interface AvailableRoom {
  roomType: RoomType;
  availableCount: number;
}

const STEP_LABELS = ['Search', 'Select Room', 'Guest Info', 'Review', 'Send via WhatsApp'];

function BookPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<BookingStep>(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [checkIn, setCheckIn] = useState(searchParams.get('checkIn') || getTodayString());
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 1);
  const [numberOfRooms, setNumberOfRooms] = useState(Number(searchParams.get('rooms')) || 1);

  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<AvailableRoom | null>(null);

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setGuestName(user.name || '');
      setGuestEmail(user.email || '');
      setGuestPhone(user.phone || '');
    }
  }, []);

  useEffect(() => {
    if (checkIn && checkOut) {
      const n = calculateNights(checkIn, checkOut);
      setNights(n);
      if (selectedRoom) {
        setTotal(selectedRoom.roomType.price * numberOfRooms * n);
      }
    }
  }, [checkIn, checkOut, selectedRoom, numberOfRooms]);

  const searchRooms = async () => {
    if (!checkIn || !checkOut) return;
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('Check-out date must be after check-in date.');
      return;
    }
    setLoading(true);
    try {
      const results = await roomService.getAvailableRooms({
        checkIn,
        checkOut,
        guests,
        numberOfRooms,
      });
      setAvailableRooms(results);
      setCurrentStep(2);
    } catch (err) {
      alert('Failed to fetch available rooms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectRoom = (room: AvailableRoom) => {
    setSelectedRoom(room);
    setCurrentStep(3);
  };

  const goToStep = (step: BookingStep) => {
    if (step < currentStep) setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep === 1) searchRooms();
    else if (currentStep === 3) {
      if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) {
        alert('Please fill in all required fields.');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
  };

  const buildWhatsAppMessage = (bookingId: string = '') => {
    const lines = [
      'Hotel Riyansh - Booking Request',
      '',
      `Name: ${guestName}`,
      `Mobile: ${guestPhone}`,
      `Email: ${guestEmail}`,
      '',
      `Room: ${selectedRoom?.roomType.name}`,
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Nights: ${nights}`,
      `Guests: ${guests}`,
      `Rooms: ${numberOfRooms}`,
      `Rate: ${formatPrice(selectedRoom?.roomType.price || 0)} / night (GST included)`,
      `Estimated Total: ${formatPrice(total)}`,
      '',
      `Special Requests: ${specialRequests.trim() || 'None'}`,
    ];
    if (bookingId) lines.push(`Booking ID: ${bookingId}`);
    lines.push('', 'Please confirm my booking.');
    return lines.join('\n');
  };

  const submitBooking = async () => {
    if (!selectedRoom) return;

    const message = buildWhatsAppMessage();
    const url = getWhatsAppUrl(HOTEL_INFO.phone, message);
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitting(true);
    try {
      const user = authService.getCurrentUser();
      const result = await bookingService.createBooking({
        userId: user?.id || 'guest',
        guestName,
        guestEmail,
        guestPhone,
        roomTypeId: selectedRoom.roomType.id,
        roomName: selectedRoom.roomType.name,
        roomPrice: selectedRoom.roomType.price,
        checkIn,
        checkOut,
        numberOfGuests: guests,
        numberOfRooms,
        paymentMethod: 'cash',
        specialRequests: specialRequests || undefined,
      });
      if (result.success && result.booking) {
        router.push(`/book/confirmation?bookingId=${result.booking.bookingId}`);
      } else {
        alert(result.error || 'We could not save your booking request. Please send the WhatsApp message to confirm.');
      }
    } catch (err) {
      alert('We could not save your booking request. Please send the WhatsApp message to confirm.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {STEP_LABELS.map((label, i) => {
                const stepNum = (i + 1) as BookingStep;
                const isActive = currentStep >= stepNum;
                return (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-[#1a2744] text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-xs mt-1 hidden sm:block ${
                          isActive ? 'text-[#1a2744] font-semibold' : 'text-gray-400'
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 mt-[-14px] sm:mt-0 ${
                          currentStep > stepNum ? 'bg-[#1a2744]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Find Your Perfect Room</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    min={getTodayString()}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || getTodayString()}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rooms</label>
                  <select
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={searchRooms}
                disabled={loading || !checkIn || !checkOut}
                className="mt-6 w-full bg-[#c9a96e] hover:bg-[#b8985d] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search Available Rooms'}
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <button onClick={() => goToStep(1)} className="text-[#1a2744] font-medium mb-4 hover:underline">
                &larr; Modify Search
              </button>
              <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Available Rooms</h2>
              {availableRooms.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <p className="text-gray-500 text-lg">No rooms available for the selected dates.</p>
                  <button
                    onClick={() => goToStep(1)}
                    className="mt-4 text-[#c9a96e] font-semibold hover:underline"
                  >
                    Try different dates
                  </button>
                </div>
              ) : (
                <div className="grid gap-5">
                  {availableRooms.map((item) => (
                    <div
                      key={item.roomType.id}
                      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1a2744]">{item.roomType.name}</h3>
                        <p className="text-gray-500 mt-1">{item.roomType.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.roomType.amenities?.slice(0, 4).map((a) => (
                            <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {a}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          {item.availableCount} room(s) available
                        </p>
                      </div>
                      <div className="text-right sm:min-w-[160px]">
                        <p className="text-2xl font-bold text-[#c9a96e]">{formatPrice(item.roomType.price)}</p>
                        <p className="text-xs text-gray-400">per night (GST included)</p>
                        <button
                          onClick={() => selectRoom(item)}
                          className="mt-3 bg-[#1a2744] hover:bg-[#243456] text-white font-semibold py-2 px-6 rounded-lg text-sm transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && selectedRoom && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <button onClick={() => goToStep(2)} className="text-[#1a2744] font-medium mb-4 hover:underline">
                &larr; Change Room
              </button>
              <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Guest Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or requirements..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#c9a96e] focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={nextStep}
                className="mt-6 w-full bg-[#c9a96e] hover:bg-[#b8985d] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Continue to Review
              </button>
            </div>
          )}

          {currentStep === 4 && selectedRoom && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <button onClick={() => goToStep(3)} className="text-[#1a2744] font-medium mb-4 hover:underline">
                &larr; Edit Guest Info
              </button>
              <h2 className="text-2xl font-bold text-[#1a2744] mb-6">Booking Summary</h2>

              <div className="border border-gray-200 rounded-xl p-5 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Room Type</p>
                    <p className="font-semibold text-[#1a2744]">{selectedRoom.roomType.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Price per Night</p>
                    <p className="font-semibold text-[#1a2744]">{formatPrice(selectedRoom.roomType.price)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Check-in</p>
                    <p className="font-semibold text-[#1a2744]">{formatDate(checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Check-out</p>
                    <p className="font-semibold text-[#1a2744]">{formatDate(checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Guests</p>
                    <p className="font-semibold text-[#1a2744]">{guests}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rooms</p>
                    <p className="font-semibold text-[#1a2744]">{numberOfRooms}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Nights</p>
                    <p className="font-semibold text-[#1a2744]">{nights}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Guest Name</p>
                    <p className="font-semibold text-[#1a2744]">{guestName}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-5 pt-4">
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>{formatPrice(selectedRoom.roomType.price)} x {numberOfRooms} room(s) x {nights} night(s)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>GST (included)</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#1a2744]">
                    <span>Total</span>
                    <span className="text-[#c9a96e]">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#1a2744] mb-4">Confirmation</h3>
              <button
                onClick={nextStep}
                className="w-full bg-[#1a2744] hover:bg-[#243456] text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Send via WhatsApp
              </button>
            </div>
          )}

          {currentStep === 5 && selectedRoom && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <button onClick={() => goToStep(4)} className="text-[#1a2744] font-medium mb-4 hover:underline">
                &larr; Edit Details
              </button>
              <h2 className="text-2xl font-bold text-[#1a2744] mb-2">Send via WhatsApp</h2>
              <p className="text-gray-500 mb-6">
                Review the details below. When you confirm, WhatsApp will open with your booking details
                ready to send to Hotel Riyansh. Just press Send to place your booking.
              </p>

              <div className="bg-[#1a2744]/5 border border-[#1a2744]/10 rounded-xl p-5 mb-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Room</span>
                  <span className="font-semibold text-[#1a2744]">{selectedRoom.roomType.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Dates</span>
                  <span className="font-semibold text-[#1a2744]">{formatDate(checkIn)} — {formatDate(checkOut)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guests / Rooms / Nights</span>
                  <span className="font-semibold text-[#1a2744]">{guests} / {numberOfRooms} / {nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guest</span>
                  <span className="font-semibold text-[#1a2744]">{guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contact</span>
                  <span className="font-semibold text-[#1a2744]">{guestEmail} | {guestPhone}</span>
                </div>
                {specialRequests && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Requests</span>
                    <span className="font-semibold text-[#1a2744]">{specialRequests}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
                  <span className="font-bold text-[#1a2744]">Estimated Total</span>
                  <span className="font-bold text-[#c9a96e]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-sm text-green-800">
                <strong>Almost done:</strong> tapping the button below opens WhatsApp to{' '}
                <strong>{HOTEL_INFO.phone}</strong> with your booking details pre-filled. Send the message
                to confirm your booking with the hotel.
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800">
                <strong>Important:</strong> Please call the hotel before arrival for check-in arrangements.
              </div>

              <button
                onClick={submitBooking}
                disabled={submitting}
                className="w-full bg-[#25d366] hover:bg-[#1eb658] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {submitting ? 'Sending...' : 'Send Booking via WhatsApp'}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <BookPageContent />
    </Suspense>
  );
}
