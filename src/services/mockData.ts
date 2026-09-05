import { RoomType, Room, Booking, User } from '@/types';

export const mockRoomTypes: RoomType[] = [
  {
    id: 'rt-1',
    name: 'Deluxe AC',
    description: 'Spacious air-conditioned room with premium furnishings, attached bathroom, TV, and all modern amenities for a comfortable stay.',
    price: 3000,
    category: 'ac',
    amenities: ['AC', 'TV', 'Wi-Fi', 'Geyser', 'Attached Bathroom', 'Room Service'],
    images: ['/images/rooms/deluxe-ac.jpg'],
    active: true,
  },
  {
    id: 'rt-2',
    name: 'AC Room',
    description: 'Comfortable air-conditioned room with essential amenities, perfect for budget-conscious travelers who prefer AC comfort.',
    price: 2200,
    category: 'ac',
    amenities: ['AC', 'TV', 'Wi-Fi', 'Geyser', 'Attached Bathroom'],
    images: ['/images/rooms/ac-room-1.jpg'],
    active: true,
  },
  {
    id: 'rt-3',
    name: 'AC Room Standard',
    description: 'Standard air-conditioned room offering comfortable accommodation with clean interiors and basic amenities.',
    price: 2000,
    category: 'ac',
    amenities: ['AC', 'TV', 'Wi-Fi', 'Attached Bathroom'],
    images: ['/images/rooms/ac-room-2.jpg'],
    active: true,
  },
  {
    id: 'rt-4',
    name: 'Non-AC Room',
    description: 'Economical non-air-conditioned room with fan and essential amenities. Ideal for travelers seeking an affordable stay.',
    price: 800,
    category: 'non_ac',
    amenities: ['TV', 'Wi-Fi', 'Attached Bathroom'],
    images: ['/images/rooms/non-ac-1.jpg'],
    active: true,
  },
  {
    id: 'rt-5',
    name: 'Non-AC Room Comfort',
    description: 'Well-furnished non-AC room with extra space and additional amenities for a pleasant and affordable stay.',
    price: 1000,
    category: 'non_ac',
    amenities: ['TV', 'Wi-Fi', 'Geyser', 'Attached Bathroom'],
    images: ['/images/rooms/non-ac-2.jpg'],
    active: true,
  },
  {
    id: 'rt-6',
    name: 'Non-AC Room Premium',
    description: 'Premium non-AC room with spacious layout, superior furnishings, and complete amenities for a comfortable budget stay.',
    price: 1500,
    category: 'non_ac',
    amenities: ['TV', 'Wi-Fi', 'Geyser', 'Attached Bathroom', 'Room Service'],
    images: ['/images/rooms/non-ac-3.jpg'],
    active: true,
  },
];

export const mockRooms: Room[] = [
  { id: 'r-101', roomNumber: '101', roomTypeId: 'rt-1', active: true, maintenanceStatus: false },
  { id: 'r-102', roomNumber: '102', roomTypeId: 'rt-1', active: true, maintenanceStatus: false },
  { id: 'r-201', roomNumber: '201', roomTypeId: 'rt-2', active: true, maintenanceStatus: false },
  { id: 'r-202', roomNumber: '202', roomTypeId: 'rt-2', active: true, maintenanceStatus: false },
  { id: 'r-203', roomNumber: '203', roomTypeId: 'rt-2', active: true, maintenanceStatus: false },
  { id: 'r-301', roomNumber: '301', roomTypeId: 'rt-3', active: true, maintenanceStatus: false },
  { id: 'r-302', roomNumber: '302', roomTypeId: 'rt-3', active: true, maintenanceStatus: false },
  { id: 'r-401', roomNumber: '401', roomTypeId: 'rt-4', active: true, maintenanceStatus: false },
  { id: 'r-402', roomNumber: '402', roomTypeId: 'rt-4', active: true, maintenanceStatus: false },
  { id: 'r-403', roomNumber: '403', roomTypeId: 'rt-4', active: true, maintenanceStatus: false },
  { id: 'r-501', roomNumber: '501', roomTypeId: 'rt-5', active: true, maintenanceStatus: false },
  { id: 'r-502', roomNumber: '502', roomTypeId: 'rt-5', active: true, maintenanceStatus: false },
  { id: 'r-601', roomNumber: '601', roomTypeId: 'rt-6', active: true, maintenanceStatus: false },
  { id: 'r-602', roomNumber: '602', roomTypeId: 'rt-6', active: true, maintenanceStatus: false },
];

export const mockUsers: User[] = [
  {
    id: 'u-admin-1',
    name: 'Admin',
    email: 'admin@hotelriyansh.com',
    phone: '+916200760138',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

export const mockBookings: Booking[] = [];
