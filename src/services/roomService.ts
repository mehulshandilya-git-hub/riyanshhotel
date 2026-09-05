import { RoomType, Room, BookingSearch } from '@/types';
import { db } from '@/lib/firebase';
import { ensureSeeded } from '@/lib/seed';
import { doBookingsOverlap, generateId } from '@/lib/utils';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

async function fetchDocs<T extends { id: string }>(path: string): Promise<T[]> {
  const snap = await getDocs(collection(db, path));
  return snap.docs.map((d) => ({ ...(d.data() as T), id: d.id }));
}

export const roomService = {
  async getRoomTypes(): Promise<RoomType[]> {
    await ensureSeeded();
    const types = await fetchDocs<RoomType>('roomTypes');
    return types.filter((rt) => rt.active);
  },

  async getAllRoomTypes(): Promise<RoomType[]> {
    await ensureSeeded();
    return fetchDocs<RoomType>('roomTypes');
  },

  async getRoomTypeById(id: string): Promise<RoomType | null> {
    const types = await fetchDocs<RoomType>('roomTypes');
    return types.find((t) => t.id === id) || null;
  },

  async getPhysicalRooms(): Promise<Room[]> {
    await ensureSeeded();
    return fetchDocs<Room>('rooms');
  },

  async getPhysicalRoomsByType(roomTypeId: string): Promise<Room[]> {
    const rooms = await fetchDocs<Room>('rooms');
    return rooms.filter((r) => r.roomTypeId === roomTypeId && r.active && !r.maintenanceStatus);
  },

  async addRoomType(data: Omit<RoomType, 'id'>): Promise<RoomType> {
    const newType: RoomType = { ...data, id: generateId() };
    await setDoc(doc(db, 'roomTypes', newType.id), newType);
    return newType;
  },

  async updateRoomType(id: string, data: Partial<RoomType>): Promise<RoomType | null> {
    await updateDoc(doc(db, 'roomTypes', id), data as Record<string, unknown>);
    return this.getRoomTypeById(id);
  },

  async addPhysicalRoom(data: Omit<Room, 'id'>): Promise<Room> {
    const newRoom: Room = { ...data, id: generateId() };
    await setDoc(doc(db, 'rooms', newRoom.id), newRoom);
    return newRoom;
  },

  async updatePhysicalRoom(id: string, data: Partial<Room>): Promise<Room | null> {
    await updateDoc(doc(db, 'rooms', id), data as Record<string, unknown>);
    const rooms = await fetchDocs<Room>('rooms');
    return rooms.find((r) => r.id === id) || null;
  },

  async getAvailableRooms(search: BookingSearch): Promise<{ roomType: RoomType; availableCount: number }[]> {
    await ensureSeeded();
    const [roomTypes, physicalRooms, bookings] = await Promise.all([
      fetchDocs<RoomType>('roomTypes'),
      fetchDocs<Room>('rooms'),
      fetchDocs<any>('bookings'),
    ]);

    const activeRoomTypes = roomTypes.filter((rt) => rt.active);
    const activeBookings = bookings.filter(
      (b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected'
    );

    const results: { roomType: RoomType; availableCount: number }[] = [];

    for (const rt of activeRoomTypes) {
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