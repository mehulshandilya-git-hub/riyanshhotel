import { RoomType, Room, BookingSearch } from '@/types';
import { mockRoomTypes, mockRooms, mockBookings } from './mockData';
import { doBookingsOverlap, generateId } from '@/lib/utils';

function getRoomTypes(): RoomType[] {
  if (typeof window === 'undefined') return [...mockRoomTypes];
  const stored = localStorage.getItem('hr_room_types');
  if (stored) {
    return [...mockRoomTypes, ...JSON.parse(stored)];
  }
  return [...mockRoomTypes];
}

function getPhysicalRooms(): Room[] {
  if (typeof window === 'undefined') return [...mockRooms];
  const stored = localStorage.getItem('hr_rooms');
  if (stored) {
    return [...mockRooms, ...JSON.parse(stored)];
  }
  return [...mockRooms];
}

function getBookings() {
  if (typeof window === 'undefined') return [...mockBookings];
  const stored = localStorage.getItem('hr_bookings');
  if (stored) {
    return [...mockBookings, ...JSON.parse(stored)];
  }
  return [...mockBookings];
}

function saveRoomTypes(types: RoomType[]) {
  const customOnly = types.filter((t) => !mockRoomTypes.find((m) => m.id === t.id));
  localStorage.setItem('hr_room_types', JSON.stringify(customOnly));
}

function savePhysicalRooms(rooms: Room[]) {
  const customOnly = rooms.filter((r) => !mockRooms.find((m) => m.id === r.id));
  localStorage.setItem('hr_rooms', JSON.stringify(customOnly));
}

export const roomService = {
  async getRoomTypes(): Promise<RoomType[]> {
    await new Promise((r) => setTimeout(r, 200));
    return getRoomTypes().filter((rt) => rt.active);
  },

  async getAllRoomTypes(): Promise<RoomType[]> {
    await new Promise((r) => setTimeout(r, 200));
    return getRoomTypes();
  },

  async getRoomTypeById(id: string): Promise<RoomType | null> {
    const types = getRoomTypes();
    return types.find((t) => t.id === id) || null;
  },

  async getPhysicalRooms(): Promise<Room[]> {
    await new Promise((r) => setTimeout(r, 200));
    return getPhysicalRooms();
  },

  async getPhysicalRoomsByType(roomTypeId: string): Promise<Room[]> {
    const rooms = getPhysicalRooms();
    return rooms.filter((r) => r.roomTypeId === roomTypeId && r.active && !r.maintenanceStatus);
  },

  async addRoomType(data: Omit<RoomType, 'id'>): Promise<RoomType> {
    await new Promise((r) => setTimeout(r, 300));
    const types = getRoomTypes();
    const newType: RoomType = { ...data, id: generateId() };
    types.push(newType);
    saveRoomTypes(types);
    return newType;
  },

  async updateRoomType(id: string, data: Partial<RoomType>): Promise<RoomType | null> {
    await new Promise((r) => setTimeout(r, 300));
    const types = getRoomTypes();
    const idx = types.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    types[idx] = { ...types[idx], ...data };
    saveRoomTypes(types);
    return types[idx];
  },

  async addPhysicalRoom(data: Omit<Room, 'id'>): Promise<Room> {
    await new Promise((r) => setTimeout(r, 300));
    const rooms = getPhysicalRooms();
    const newRoom: Room = { ...data, id: generateId() };
    rooms.push(newRoom);
    savePhysicalRooms(rooms);
    return newRoom;
  },

  async updatePhysicalRoom(id: string, data: Partial<Room>): Promise<Room | null> {
    await new Promise((r) => setTimeout(r, 300));
    const rooms = getPhysicalRooms();
    const idx = rooms.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    rooms[idx] = { ...rooms[idx], ...data };
    savePhysicalRooms(rooms);
    return rooms[idx];
  },

  async getAvailableRooms(search: BookingSearch): Promise<{ roomType: RoomType; availableCount: number }[]> {
    await new Promise((r) => setTimeout(r, 300));

    const roomTypes = getRoomTypes().filter((rt) => rt.active);
    const physicalRooms = getPhysicalRooms();
    const bookings = getBookings();

    const activeBookings = bookings.filter(
      (b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected'
    );

    const results: { roomType: RoomType; availableCount: number }[] = [];

    for (const rt of roomTypes) {
      const totalRooms = physicalRooms.filter(
        (r) => r.roomTypeId === rt.id && r.active && !r.maintenanceStatus
      ).length;

      if (totalRooms === 0) continue;

      let bookedCount = 0;
      for (const booking of activeBookings) {
        if (booking.roomTypeId === rt.id) {
          if (doBookingsOverlap(booking.checkIn, booking.checkOut, search.checkIn, search.checkOut)) {
            bookedCount += booking.numberOfRooms;
          }
        }
      }

      const available = totalRooms - bookedCount;
      if (available > 0) {
        results.push({ roomType: rt, availableCount: available });
      }
    }

    return results;
  },
};
