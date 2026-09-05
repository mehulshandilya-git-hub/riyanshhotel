import { User } from '@/types';
import { mockUsers } from './mockData';

function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [...mockUsers];
  const stored = localStorage.getItem('hr_users');
  if (stored) {
    return [...mockUsers, ...JSON.parse(stored)];
  }
  return [...mockUsers];
}

export const customerService = {
  async getAllCustomers(): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 200));
    return getAllUsers().filter((u) => u.role === 'customer');
  },

  async getCustomerById(id: string): Promise<User | null> {
    const users = getAllUsers();
    return users.find((u) => u.id === id) || null;
  },

  async getCustomerCount(): Promise<number> {
    const users = getAllUsers();
    return users.filter((u) => u.role === 'customer').length;
  },
};
