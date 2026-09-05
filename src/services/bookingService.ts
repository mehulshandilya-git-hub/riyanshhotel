import { Booking, BookingStatus, PaymentStatus, PaymentMethod } from '@/types';
import { db } from '@/lib/firebase';
import { ensureSeeded } from '@/lib/seed';
import { generateBookingId, generateId, calculateNights, doBookingsOverlap } from '@/lib/utils';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

async function fetchBookings(): Promise<Booking[]> {
  await ensureSeeded();
  const snap = await getDocs(collection(db, 'bookings'));
  return snap.docs.map((d) => ({ ...(d.data() as Booking), id: d.id }));
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
    const bookings = await fetchBookings();

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
      bookingStatus: 'pending',
      specialRequests: data.specialRequests,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'bookings', booking.id), booking);
    return { success: true, booking };
  },

  async getBooking(id: string): Promise<Booking | null> {
    const bookings = await fetchBookings();
    return bookings.find((b) => b.id === id || b.bookingId === id) || null;
  },

  async getCustomerBookings(userId: string): Promise<Booking[]> {
    const bookings = await fetchBookings();
    return bookings
      .filter((b) => b.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getAllBookings(): Promise<Booking[]> {
    const bookings = await fetchBookings();
    return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async updateBookingStatus(id: string, status: BookingStatus): Promise<{ success: boolean; error?: string }> {
    try {
      await updateDoc(doc(db, 'bookings', id), { bookingStatus: status, updatedAt: new Date().toISOString() });
      return { success: true };
    } catch {
      return { success: false, error: 'Booking not found' };
    }
  },

  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<{ success: boolean; error?: string }> {
    try {
      await updateDoc(doc(db, 'bookings', id), { paymentStatus: status, updatedAt: new Date().toISOString() });
      return { success: true };
    } catch {
      return { success: false, error: 'Booking not found' };
    }
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
    const bookings = await fetchBookings();
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
      const refreshed = await this.getBooking(result.booking.id);
      if (refreshed) {
        result.booking = refreshed;
      }
    }
    return result;
  },
};