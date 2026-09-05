import { Booking, BookingStatus, PaymentStatus, PaymentMethod } from '@/types';
import { mockBookings } from './mockData';
import { generateBookingId, generateId, calculateNights, doBookingsOverlap } from '@/lib/utils';

function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [...mockBookings];
  const stored = localStorage.getItem('hr_bookings');
  if (stored) {
    return [...mockBookings, ...JSON.parse(stored)];
  }
  return [...mockBookings];
}

function saveBookings(bookings: Booking[]) {
  const customOnly = bookings.filter((b) => !mockBookings.find((m) => m.id === b.id));
  localStorage.setItem('hr_bookings', JSON.stringify(customOnly));
}

export const bookingService = {
  async createBooking(data: {
    userId: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomTypeId: string;
    roomName: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    numberOfGuests: number;
    numberOfRooms: number;
    paymentMethod: PaymentMethod;
    specialRequests?: string;
  }): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    await new Promise((r) => setTimeout(r, 500));

    const bookings = getBookings();

    const activeBookings = bookings.filter(
      (b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected'
    );

    let bookedCount = 0;
    for (const existing of activeBookings) {
      if (existing.roomTypeId === data.roomTypeId) {
        if (doBookingsOverlap(existing.checkIn, existing.checkOut, data.checkIn, data.checkOut)) {
          bookedCount += existing.numberOfRooms;
        }
      }
    }

    const nights = calculateNights(data.checkIn, data.checkOut);
    const subtotal = data.roomPrice * data.numberOfRooms * nights;
    const tax = 0;
    const total = subtotal + tax;

    const booking: Booking = {
      id: generateId(),
      bookingId: generateBookingId(),
      userId: data.userId,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone,
      roomTypeId: data.roomTypeId,
      roomId: null,
      roomName: data.roomName,
      roomPrice: data.roomPrice,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      numberOfGuests: data.numberOfGuests,
      numberOfRooms: data.numberOfRooms,
      subtotal,
      tax,
      total,
      paymentMethod: data.paymentMethod,
      paymentStatus: data.paymentMethod === 'cash' ? 'pay_at_hotel' : 'pending',
      bookingStatus: 'confirmed',
      specialRequests: data.specialRequests,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    bookings.push(booking);
    saveBookings(bookings);
    return { success: true, booking };
  },

  async getBooking(id: string): Promise<Booking | null> {
    const bookings = getBookings();
    return bookings.find((b) => b.id === id || b.bookingId === id) || null;
  },

  async getCustomerBookings(userId: string): Promise<Booking[]> {
    await new Promise((r) => setTimeout(r, 200));
    const bookings = getBookings();
    return bookings.filter((b) => b.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getAllBookings(): Promise<Booking[]> {
    await new Promise((r) => setTimeout(r, 200));
    return getBookings().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 300));
    const bookings = getBookings();
    const idx = bookings.findIndex((b) => b.id === id);
    if (idx === -1) return { success: false, error: 'Booking not found' };
    bookings[idx].bookingStatus = status;
    bookings[idx].updatedAt = new Date().toISOString();
    saveBookings(bookings);
    return { success: true };
  },

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 300));
    const bookings = getBookings();
    const idx = bookings.findIndex((b) => b.id === id);
    if (idx === -1) return { success: false, error: 'Booking not found' };
    bookings[idx].paymentStatus = status;
    bookings[idx].updatedAt = new Date().toISOString();
    saveBookings(bookings);
    return { success: true };
  },

  async cancelBooking(id: string): Promise<{ success: boolean; error?: string }> {
    return this.updateBookingStatus(id, 'cancelled');
  },

  async getBookingStats(): Promise<{
    total: number;
    todayCheckIns: number;
    todayCheckOuts: number;
    pending: number;
    confirmed: number;
    occupied: number;
    available: number;
  }> {
    const bookings = getBookings();
    const today = new Date().toISOString().split('T')[0];

    const active = bookings.filter(
      (b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected'
    );

    return {
      total: bookings.length,
      todayCheckIns: active.filter((b) => b.checkIn === today).length,
      todayCheckOuts: active.filter((b) => b.checkOut === today).length,
      pending: bookings.filter((b) => b.bookingStatus === 'pending').length,
      confirmed: bookings.filter((b) => b.bookingStatus === 'confirmed').length,
      occupied: active.filter((b) => b.bookingStatus === 'checked_in').length,
      available: 0,
    };
  },

  async adminCreateBooking(data: {
    userId: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    roomTypeId: string;
    roomName: string;
    roomPrice: number;
    checkIn: string;
    checkOut: string;
    numberOfGuests: number;
    numberOfRooms: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    bookingStatus: BookingStatus;
    specialRequests?: string;
  }): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    const result = await this.createBooking(data);
    if (result.success && result.booking) {
      await this.updateBookingStatus(result.booking.id, data.bookingStatus);
      await this.updatePaymentStatus(result.booking.id, data.paymentStatus);
      const bookings = getBookings();
      const idx = bookings.findIndex((b) => b.id === result.booking!.id);
      if (idx !== -1) {
        result.booking = bookings[idx];
      }
    }
    return result;
  },
};
