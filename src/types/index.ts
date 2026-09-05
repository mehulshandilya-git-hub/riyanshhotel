export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled' | 'rejected';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'pay_at_hotel';
export type PaymentMethod = 'upi' | 'cash' | 'card' | 'bank_transfer';

export interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'ac' | 'non_ac';
  amenities: string[];
  images: string[];
  active: boolean;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomTypeId: string;
  active: boolean;
  maintenanceStatus: boolean;
}

export interface Booking {
  id: string;
  bookingId: string;
  userId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomTypeId: string;
  roomId: string | null;
  roomName: string;
  roomPrice: number;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  numberOfRooms: number;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
  numberOfRooms: number;
}

export interface BookingSummary {
  roomType: RoomType;
  numberOfRooms: number;
  numberOfNights: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  subtotal: number;
  tax: number;
  total: number;
}

export interface HotelInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  established: number;
  checkInTime: string;
  checkOutTime: string;
  facilities: string[];
}

export const HOTEL_INFO: HotelInfo = {
  name: 'Hotel Riyansh',
  tagline: 'Comfortable stays in Hansdiha',
  address: 'Austria Petrol Pump ke saamne, Dumka Road, Hansdiha – 814145, Jharkhand, India',
  phone: '+916200760138',
  whatsapp: '+916200760138',
  established: 2025,
  checkInTime: '24 hours (call before arrival)',
  checkOutTime: '11:00 AM',
  facilities: [
    'Parking',
    'Wi-Fi',
    'Room Service',
    'TV',
    'Geyser / Hot Water',
    'Attached Bathroom',
    'AC',
    'In-house Restaurant',
  ],
};
