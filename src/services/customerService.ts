import { User } from '@/types';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const customerService = {
  async getAllCustomers(): Promise<User[]> {
    const snap = await getDocs(collection(db, 'users'));
    const users = snap.docs.map((d) => ({ ...(d.data() as User), id: d.id }));
    return users.filter((u) => u.role === 'customer');
  },

  async getCustomerById(id: string): Promise<User | null> {
    const users = await this.getAllCustomers();
    return users.find((u) => u.id === id) || null;
  },

  async getCustomerCount(): Promise<number> {
    const users = await this.getAllCustomers();
    return users.length;
  },
};